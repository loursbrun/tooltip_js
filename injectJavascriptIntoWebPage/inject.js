
(function () {

	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.style.position = 'absolute';
	div.textContent = 'Injected!';
	document.body.appendChild(div);
	//console.log(window.location.pathname);
	let pathName = window.location.pathname;
	let dataObject = {};
	localStorage.getItem(pathName) ? dataObject = JSON.parse(localStorage.getItem(pathName)) : dataObject = {};
	//console.log(dataObject);
	// Cookie for save names 
	let nameObject = {};
	localStorage.getItem("elementsName") ? nameObject = JSON.parse(localStorage.getItem("elementsName")) : nameObject = {};
	// console.log(nameObject);
	// console.log(dataObject);

	if (location.search.split('delete=')[1] == "true" && dataObject != {}) {
		localStorage.removeItem(pathName);
		localStorage.removeItem("elementsName");
		document.location.reload(true);
	}
	let showInfo = false;
	if (location.search.split('show=')[1] == "true") {
		showInfo = true;
	}

	if (showInfo) {   // windows with statistics clics of elements
		var output = '';
		for (var property in dataObject) {
			output += '<tr ><td class="element-name-td" style="display:block; border-bottom: 1px solid #BFBEBE;">' +
				'<a class="icon-settings-classname" class="icon-settings-classname" style="pointer:cursor"><img class="image-settings-classname" title="' +
				 property +
				 '"  src="https://png.pngtree.com/svg/20160510/35d8eb958b.png" style="width: 16px; margin-bottom: -2px; margin-right: 10px"/></a>' +
				property + '</td><td style=" padding-left:20px">' +
				dataObject[property] +
				'</td></tr> ';
		}
		var myLayer = document.createElement('div');
		myLayer.id = 'bookingLayer';
		myLayer.style.position = 'absolute';
		myLayer.style.fontSize = "14px";
		myLayer.style.right = '10px';
		myLayer.style.top = '10px';
		myLayer.style.height = 'auto';
		myLayer.style.padding = '10px';
		myLayer.style.background = '#d6d4d4';
		myLayer.style.cursor = "pointer";
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
		myLayer.style.zIndex = "100";
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
		localStorage.setItem(pathName, JSON.stringify(dataObject));
	}

	function updateDataObject(newValue) {
		if (dataObject[newValue] == null) { dataObject[newValue] = 0; };
		dataObject[newValue] = dataObject[newValue] + 1;
		saveData();
	}

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
					if (eventArgs.target.classList[0] == "image-settings-classname") {
						// console.log("settings");
						// console.log(eventArgs.target.title);
						// add dynamic form to update word
						var formDiv = document.createElement('div');
						formDiv.style.position = 'fixed';
						formDiv.style.top = 0;
						formDiv.style.right = 0;
						formDiv.style.width = "100%";
						formDiv.style.height = "100%";
						formDiv.style.position = 'absolute';
						formDiv.style.zIndex = '100';
						formDiv.style.backgroundColor = "white";
						formDiv.setAttribute("class", "form-div-class");

						var inputTitle = document.createElement("a");
						inputTitle.setAttribute("class", "form-div-class");
						inputTitle.style.marginTop = window.innerHeight / 2 + "px";
						inputTitle.style.borderWidth = " 1px";
						inputTitle.style.padding = "5px";
						inputTitle.style.fontFamily = "Arial, Helvetica, sans-serif";
						inputTitle.style.fontSize = "14px";
						inputTitle.style.position = "absolute";
						inputTitle.style.marginTop = window.innerHeight / 2 - 130 + "px";
						inputTitle.style.marginLeft = window.innerWidth / 2 - 100 + "px";
						inputTitle.appendChild(document.createTextNode("Change element name"));
						formDiv.appendChild(inputTitle);

						var inputTxt = document.createElement("INPUT");
						inputTxt.setAttribute("class", "form-div-class");
						inputTxt.setAttribute("value", nameObject[eventArgs.target.title] ? nameObject[eventArgs.target.title] : eventArgs.target.title);
						inputTxt.name = "member";
						inputTxt.style.border = "true";
						inputTxt.style.marginTop = window.innerHeight / 2 - 40 + "px";
						inputTxt.style.borderStyle = "solid";
						inputTxt.style.borderWidth = " 1px";
						inputTxt.style.fontSize = "14px";
						inputTxt.style.padding = "5px";
						inputTxt.style.position = "absolute";
						inputTxt.style.marginLeft = window.innerWidth / 2 - 100 + "px";
						inputTxt.style.marginTop = window.innerHeight / 2 - 100 + "px";

						// Save button
						var buttonSave = document.createElement("button");
						buttonSave.setAttribute("class", "form-div-class");
						buttonSave.style.padding = "20px";
						buttonSave.style.lineHeight = "60px";
						buttonSave.style.padding = "0 40px";
						buttonSave.style.background = "#ddffdd";
						buttonSave.style.border = "none";
						buttonSave.innerHTML = "Save";
						buttonSave.style.width = "130px";
						buttonSave.style.position = "absolute";
						buttonSave.style.outline = "none";
						buttonSave.style.marginLeft = window.innerWidth / 2 - 150 + "px";
						buttonSave.style.marginTop = window.innerHeight / 2 - 50 + "px";
						formDiv.appendChild(buttonSave);

						// Delete button
						var buttonDelete = document.createElement("button");
						buttonDelete.setAttribute("class", "form-div-class");
						buttonDelete.style.padding = "20px";
						buttonDelete.style.lineHeight = "60px";
						buttonDelete.style.padding = "0 40px";
						buttonDelete.style.background = "salmon";
						buttonDelete.style.width = "130px";
						buttonDelete.style.border = "none";
						buttonDelete.innerHTML = "Delete";
						buttonDelete.style.position = "absolute";
						buttonDelete.style.outline = "none";
						buttonDelete.style.marginLeft = window.innerWidth / 2 + "px";
						buttonDelete.style.marginTop = window.innerHeight / 2 - 50 + "px";
						formDiv.appendChild(buttonDelete);


						// Close button
						var buttonClose = document.createElement("button");
						buttonClose.setAttribute("class", "form-div-class");
						buttonClose.style.padding = "20px";
						buttonClose.style.lineHeight = "60px";
						buttonClose.style.padding = "0 40px";
						buttonClose.style.border = "none";
						buttonClose.innerHTML = "Close";
						buttonClose.style.position = "absolute";
						buttonClose.style.marginLeft = window.innerWidth / 2 - 75 + "px";
						buttonClose.style.marginTop = window.innerHeight / 2 + 20 + "px";
						buttonClose.style.outline = "none";
						formDiv.appendChild(buttonClose);
						formDiv.appendChild(inputTxt);
						document.body.appendChild(formDiv);

						buttonSave.addEventListener("click", function () {
							let nameObject = {};
							localStorage.getItem("elementsName") ? nameObject = JSON.parse(localStorage.getItem("elementsName")) : nameObject = {};
							nameObject[eventArgs.target.title] = inputTxt.value;
							localStorage.setItem("elementsName", JSON.stringify(nameObject));
							formDiv.remove();
							document.location.reload(true);

						});
						buttonDelete.addEventListener("click", function () {
							console.log(dataObject);
							delete dataObject[eventArgs.target.title];
							console.log(dataObject);
							localStorage.setItem(pathName, JSON.stringify(dataObject));
							formDiv.remove();
							document.location.reload(true);
						});
						buttonClose.addEventListener("click", function () {
							formDiv.remove();
						});
						return;
					}

					const elementInnerTxt = eventArgs.target.innerHTML;
					const elementArray = document.getElementsByClassName(eventArgs.target.classList);
					for (let i = 0; i < elementArray.length; i++) {
						if (elementArray[i].innerHTML == elementInnerTxt &&
							eventArgs.target.classList[0] != "liBarreStat" &&
							eventArgs.target.classList[0] != "delete-icon-tag" &&
							eventArgs.target.classList[0] != "element-name-td" &&
							eventArgs.target.classList[0] != "icon-settings-classname" &&
							eventArgs.target.classList[0] != "image-settings-classname" &&
							eventArgs.target.classList[0] != "form-div-class") {
							updateDataObject(eventArgs.target.classList[0] + "_classList_" + i);
						}
					}
				}
	});



	// Add barre
	function addTopBarreStat(array) {
		var nombres = [];
		var values = [];
		for (var property1 in array) {
			nombres.push(array[property1]);
			values.push(property1);
		}
		function compare(x, y) {
			return x - y;
		}
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
			var elementName = values[i];
			li.addEventListener('click', findElement, false);
			li.elementNameParam = elementName;

			function findElement(evt) {
				//console.log(evt.target.elementNameParam);
				if (evt.target.elementNameParam.includes('_classList_')) {
					var className = evt.target.elementNameParam;
					var classNameWords = className.split('_classList_');
					var rect = document.getElementsByClassName(classNameWords[0])[parseInt(classNameWords[1])].getBoundingClientRect();
					showGreyFiltre(rect.top, rect.right, rect.bottom, rect.left);
				} else if (evt.target.elementNameParam.includes('_nodeName_')) {
					var nodeName = evt.target.elementNameParam;
					var nodeNameWords = nodeName.split('_nodeName_');
					var rect = document.getElementsByTagName(nodeNameWords[0])[parseInt(nodeNameWords[1])].getBoundingClientRect();
					showGreyFiltre(rect.top, rect.right, rect.bottom, rect.left);
					// id
				} else if (evt.target.elementNameParam.includes('_id')) {
					console.log("C'est un ID ! ");
					var idName = evt.target.elementNameParam;
					var idNameWords = idName.replace('_id', '');
					console.log(document.getElementById(idNameWords));
					var rect = document.getElementById(idNameWords).getBoundingClientRect();
					console.log(rect.top, rect.right, rect.bottom, rect.left);
					showGreyFiltre(rect.top, rect.right, rect.bottom, rect.left);
				}

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

						// bottom square 
						document.body.innerHTML += `<div class="greySquareFilter"
					style="
						position:absolute;
						top: ${bottom + document.documentElement.scrollTop}px;
						left: ${left}px;
						width: ${right - left}px;
						height:${document.body.offsetHeight}px;
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
			li.style.overflow = "hidden";
			li.style.whiteSpace = "nowrap";
			li.style.fontFamily = "Arial, Helvetica, sans-serif";
			li.style.cssFloat = "left";
			if (Math.round(nombres[i] * coeficient) >= 10 && showInfo == false) { a.appendChild(document.createTextNode(nameObject[values[i]] != undefined ? nameObject[values[i]] :  Math.round(nombres[i] * coeficient) + "% ")); }
			else if (Math.round(nombres[i] * coeficient) >= 10 && showInfo == true) { a.appendChild(document.createTextNode(nameObject[values[i]] != undefined ? nameObject[values[i]] : Math.round(nombres[i] * coeficient) + "% " + values[i])); }
			else { a.appendChild(document.createTextNode(".")); a.style.opacity = "0"; }
			a.setAttribute("id", "Div1");
			a.style.overflow = "hidden";
			a.style.whiteSpace = "nowrap";
			a.style.fontSize = "14px";
			a.style.marginLeft = "5px";

			var icon = document.createElement('a');
			var linkText = document.createTextNode("x");
			icon.appendChild(linkText);
			icon.style.opacity = "0.5";
			icon.style.marginRight = "5px";
			icon.setAttribute("class", "delete-icon-tag");

			var elementName2 = values[i];
			icon.addEventListener('click', deleteElement, false);
			icon.elementNameParam = elementName2;
			function deleteElement(evt) {
				delete dataObject[evt.target.elementNameParam];
				localStorage.setItem(pathName, JSON.stringify(dataObject));
			}
			icon.style.cssFloat = "right";
			li.appendChild(icon);
			li.style.background = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
			li.style.width = nombres[i] * coeficient + "%";
			li.appendChild(a);
			topBarreUl.appendChild(li);
		}
	}
	addTopBarreStat(dataObject);
})();