// this is the code which will be injected into a given page...

(function() {

	// just place a div at top right
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = 'Injected! 2222';
	document.body.appendChild(div);

	//alert('inserted self... giggity');

	console.log("******  Injected !!!!!   ******");





})();