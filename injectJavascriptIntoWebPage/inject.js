// this is the code which will be injected into a given page...

(function () {

	// just place a div at top right
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.style.position = 'absolute';
	div.textContent = 'Injected! 333';
	document.body.appendChild(div);

	//alert('inserted self... giggity');

	console.log("******  Injected !!!!!   ******");
	console.log(window.location.pathname);

	let pathName = window.location.pathname;
	let dataObject = {};

	localStorage.getItem(pathName) ? dataObject = JSON.parse(localStorage.getItem(pathName)) : dataObject = {};

	console.log(dataObject);

	if (location.search.split('delete=')[1] == "true" && dataObject != {}) {
		localStorage.removeItem(pathName);
	}



	let showInfo = false;
	if (location.search.split('show=')[1] == "true") {
		showInfo = true;
	}

	//console.log(dataObject);

	if (showInfo) {   // windows with statistics clics of elements
		var output = '';
		for (var property in dataObject) {
			output += '<tr ><td style="border-bottom: 1px solid #BFBEBE;">' + property + '</td><td>' + dataObject[property] + '</td></tr> ';
		}
		var myLayer = document.createElement('div');
		myLayer.id = 'bookingLayer';
		myLayer.style.position = 'absolute';
		myLayer.style.right = '10px';
		myLayer.style.top = '10px';
		//myLayer.style.width = '300px';
		myLayer.style.height = 'auto';
		myLayer.style.padding = '10px';
		myLayer.style.background = '#d6d4d4';
		htmlString = ` 
        <table>
            <thead>
                <tr>
                    <th colspan="2" style=" background-color: #333;color: #fff;">${pathName}</th>
                </tr>
            </thead>
            <tbody>
               ${output}
            </tbody>
        </table>
        `;
		myLayer.innerHTML = htmlString;
		document.body.appendChild(myLayer);
	}

	function saveData() {    // save in cookie 
		//console.log("object:" + JSON.stringify(dataObject));
		var sortable = [];
		for (var className in dataObject) {
			sortable.push([className.toString(), dataObject[className]]);
		}
		sortable.sort(function (a, b) {
			return b[1] - a[1];
		});
		var newObject = {};
		for (let i = 0; i < sortable.length; i++) {
			newObject[sortable[i][0]] = sortable[i][1];
		}
		dataObject = newObject;
		//console.log("newObject:" + JSON.stringify(newObject));
		//console.log("object:" + JSON.stringify(dataObject));
		localStorage.setItem(pathName, JSON.stringify(dataObject));
	}

	function updateDataObject(newValue) {
		if (dataObject[newValue] == null) { dataObject[newValue] = 0; };
		dataObject[newValue] = dataObject[newValue] + 1;
		saveData();
	}

	// function listen all click and return ID, Classe name , I dex fo table node
	document.addEventListener("click", function (eventArgs) {
		const elementId = eventArgs.target.id;
		const elementClassName = eventArgs.target.classList[0];
		if (!elementId && !elementClassName && eventArgs.target.nodeName !== "HTML") {
			const elementInnerTxt = eventArgs.target.innerHTML;
			const elementArray = document.getElementsByTagName(eventArgs.target.nodeName);
			for (let i = 0; i < elementArray.length; i++) {
				if (elementArray[i].innerHTML == elementInnerTxt) {
					updateDataObject(eventArgs.target.nodeName + "_nodeName_" + i);
					console.log(updateDataObject(eventArgs.target.nodeName + "_nodeName_" + i));
				}
			}
		} else
			if (eventArgs.target.id) {
				if (eventArgs.target.id != "delete_btn") {
					updateDataObject(eventArgs.target.id + "_id");
					//console.log(updateDataObject(eventArgs.target.id + "_id"));
				}
			} else
				if (eventArgs.target.classList) {
					// console.log(document.getElementsByClassName("cs-nav-item"));
					// console.log(document.getElementsByClassName("cs-nav-item").length);
					// console.log(eventArgs.target.innerHTML);
					// console.log(eventArgs);
					const elementInnerTxt = eventArgs.target.innerHTML;
					const elementArray = document.getElementsByClassName(eventArgs.target.classList);
					for (let i = 0; i < elementArray.length; i++) {
						if (elementArray[i].innerHTML == elementInnerTxt && eventArgs.target.classList[0] != "liBarreStat") {
							// console.log(eventArgs.target.classList + "[" + i + "]");
							// console.log("********" + eventArgs.target.classList[0]);
							updateDataObject(eventArgs.target.classList[0] + "_classList_" + i);
						}
					}
					//updateDataObject(eventArgs.target.classList[0] + "_name");
					//console.log(eventArgs.target);

				}
	});



	// Add barre
	function addTopBarreStat(array) {


		var nombres = [];
		var values = [];


		for (var property1 in array) {
			//console.log(array[property1]);
			nombres.push(array[property1]);
			values.push(property1);

		}

		function compare(x, y) {
			return x - y;
		}
		//var nombres = array;
		//nombres.sort(compare);




		function compare(x, y) {
			return y - x;
		}

		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		let somme = nombres.reduce(reducer);
		let coeficient = 100 / somme;


		var barreTopContainer = document.createElement("ul"); //  <ul id="topBarreUl">
		barreTopContainer.style.margin = "0";
		barreTopContainer.style.padding = "0";
		barreTopContainer.setAttribute("id", "barreTopContainer");
		barreTopContainer.style.position = "fixed";
		barreTopContainer.style.top = "0";
		barreTopContainer.style.left = "0";
		barreTopContainer.style.width = "100%";
		barreTopContainer.style.height = "20px";
		barreTopContainer.style.zIndex = 200;

		document.body.appendChild(barreTopContainer);
		var topBarreUl = document.createElement("ul"); //  <ul id="topBarreUl">
		topBarreUl.style.listStyleType = "none";
		topBarreUl.style.margin = "0";
		topBarreUl.style.padding = "0";
		topBarreUl.style.overflow = "hidden";
		topBarreUl.style.cursor = "pointer";

		barreTopContainer.appendChild(topBarreUl);

		for (var i = 0; i < nombres.length; i++) {


			var li = document.createElement("li");

			//
			//console.log("Hello ! " + values[i]);
			var elementName = values[i];



			li.addEventListener('click', findElement, false);
			li.elementNameParam = elementName;



			function findElement(evt) {
				console.log(evt.target.elementNameParam);


				if (evt.target.elementNameParam.includes('_classList_')) {
					var className = evt.target.elementNameParam;
					var classNameWords = className.split('_classList_');
					// console.log(classNameWords[0]);
					// console.log(parseInt(classNameWords[1]));


					//console.log(document.getElementsByClassName(classNameWords[0])[parseInt(classNameWords[1])]);
					var rect = document.getElementsByClassName(classNameWords[0])[parseInt(classNameWords[1])].getBoundingClientRect();
					//console.log(rect.top, rect.right, rect.bottom, rect.left);
					showGreyFiltre(rect.top, rect.right, rect.bottom, rect.left);


				} else if (evt.target.elementNameParam.includes('_nodeName_')) {
					var nodeName = evt.target.elementNameParam;
					var nodeNameWords = nodeName.split('_nodeName_');
					//console.log(nodeNameWords[0]);
					//console.log(parseInt(nodeNameWords[1]));

					//console.log(document.getElementsByTagName(nodeNameWords[0])[parseInt(nodeNameWords[1])]);
					var rect = document.getElementsByTagName(nodeNameWords[0])[parseInt(nodeNameWords[1])].getBoundingClientRect();
					//console.log(rect.top, rect.right, rect.bottom, rect.left);
					showGreyFiltre(rect.top, rect.right, rect.bottom, rect.left);




				} else if (evt.target.elementNameParam.includes('_id')) {
					console.log("C'est un ID ! ");
					var idName = evt.target.elementNameParam;
					var idNameWords = idName.replace('_id', '');
					//console.log(idNameWords);


					console.log(document.getElementById(idNameWords));
					var rect = document.getElementById(idNameWords).getBoundingClientRect();
					console.log(rect.top, rect.right, rect.bottom, rect.left);
					showGreyFiltre(rect.top, rect.right, rect.bottom, rect.left);


				}

				// console.log(document.getElementsByClassName("cs-nav-item")[2]);


				function showGreyFiltre(top, right, bottom, left) {






					//leftGreySquare
					setTimeout(function () { drawSquare(); }, 100);
					function drawSquare() {
						// left square
						document.body.innerHTML += `<div class="greySquareFilter" 
					style="
						position:absolute;
						top:0px;
						left: 0px;
						width:${left}px;
						height:${document.body.scrollHeight}px;
						opacity:0.2;
						z-index:100;
						background:#000;
						pointer-events: none;
						">
					</div>`;

						// Right square
						document.body.innerHTML += `<div class="greySquareFilter"
					style="
						position:absolute;
						top:0px;
						
						left: ${right}px;
						width:100%;
						height:${document.body.scrollHeight}px;
						opacity:0.2;
						z-index:101;
						background:#000;
						pointer-events: none;
						">
					</div>`;

						// top square
						document.body.innerHTML += `<div class="greySquareFilter"
					style="
						position:absolute;
						top:0px;
						left: ${left}px;
						width: ${right - left}px;
						height:${top + document.documentElement.scrollTop}px;
						opacity:0.2;
						z-index:101;
						background:#000;
						pointer-events: none;
						">
					</div>`;

						// bottom square height:${document.body.scrollHeight - bottom}px;
						document.body.innerHTML += `<div class="greySquareFilter"
					style="
						position:absolute;
						top: ${bottom + document.documentElement.scrollTop}px;
						left: ${left}px;
						width: ${right - left}px;
						height:${document.body.offsetHeight }px;
						opacity:0.2;
						z-index:101;
						background:#000;
						pointer-events: none;
						">
					</div>`;



					}



					setTimeout(function () { moveToSquare(); }, 500);
					function moveToSquare() {
						console.log("top:" + top);
						console.log("bottom:" + bottom);
						console.log("window.innerHeight / 2p:" + window.innerHeight / 2);
						console.log("(top - bottom) / 2:" + (top - bottom) / 2);
						console.log("document.documentElement.scrollTop:" + document.documentElement.scrollTop);
						console.log("Total bady height: " + document.body.offsetHeight);
						window.scrollTo(0, top - window.innerHeight / 2 - (top - bottom) / 2 + document.documentElement.scrollTop);

					}







					//leftGreySquare
					setTimeout(function () { deleteSquare(); }, 2000);
					function deleteSquare() {
						const elements = document.getElementsByClassName("greySquareFilter");
						while (elements.length > 0) elements[0].remove();
						addTopBarreStat(dataObject);

					}

				}


			}






			var a = document.createElement("a");
			a.style.color = "white";
			a.style.pointerEvents = "none";
			li.style.color = "white";
			li.classList.add("liBarreStat");
			li.style.fontFamily = "Arial, Helvetica, sans-serif";
			li.style.cssFloat = "left";
			if (Math.round(nombres[i] * coeficient) >= 10 && showInfo == false) { a.appendChild(document.createTextNode(Math.round(nombres[i] * coeficient) + "% ")); }
			else if (Math.round(nombres[i] * coeficient) >= 10 && showInfo == true) { a.appendChild(document.createTextNode(Math.round(nombres[i] * coeficient) + "% " + values[i])); }
			else { a.appendChild(document.createTextNode(".")); a.style.opacity = "0"; }
			a.setAttribute("id", "Div1");

			li.style.background = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
			li.style.width = nombres[i] * coeficient + "%";
			li.appendChild(a);
			topBarreUl.appendChild(li);
			//document.body.style.marginTop = "30px";
		}
	}


	// var newArray = [];
	// var string1 = "";

	// for (var property1 in dataObject) {
	//     console.log(dataObject[property1]);
	//     newArray.push(dataObject[property1]);
	// }




	addTopBarreStat(dataObject);








})();