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
		localStorage.setItem(pathName, JSON.stringify(dataObject));
		//location.reload();
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
					updateDataObject(eventArgs.target.nodeName + "[" + i + "]");
					console.log(updateDataObject(eventArgs.target.nodeName + "[" + i + "]"));
				}
			}
		} else
			if (eventArgs.target.id) {
				if (eventArgs.target.id != "delete_btn") { 
					updateDataObject(eventArgs.target.id + "_id"); 
					console.log(updateDataObject(eventArgs.target.id + "_id"));
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
						if (elementArray[i].innerHTML == elementInnerTxt) {
							console.log(eventArgs.target.classList + "[" + i + "]");
							updateDataObject(eventArgs.target.classList[0] + "[" + i + "]");
						}
					}

					//updateDataObject(eventArgs.target.classList[0] + "_name");
					//console.log(eventArgs.target);




				}
	});





})();