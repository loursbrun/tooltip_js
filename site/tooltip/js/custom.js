//open database connection...
//Linxer.dbs.open();

//Linxer.dbs.createTable();

//Linxer.dbs.getLinks(); //lists the link stored in the database

$("#tooltipForm").submit( function(e) {
  e.preventDefault();

   //logMessage("simple log");

     var jsonStr = $("#json-text").val();

     //logMessage("texte area is :" + jsonStr);

     if( isValidJson(jsonStr) ){
        logMessage("json is valid");
        addTooltips();
     }
     else{
      logMessage("json is not valid");
     }

});



function logMessage(msg){
    chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
}

function addTooltips(){

    logMessage("add tooltip !!!");
    changeBackgroundColor("red");
    document.body.style.backgroundColor = "red";

   //document.getElementsByClassName("my-title").style
   //document.getElementsByClassName("my-title").style.display = "none"; 


   //chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
   //chrome.tabs.executeScript({code:"document.getElementsByClassName('my-title').style.display = 'none'"});

   chrome.tabs.executeScript({code:"console.log('cocococ')"});

   chrome.tabs.executeScript(null, {
   //code: 'document.getElementsByClassName("my-title")[0].style.display = "none"'//this line not working
});

// chrome.tabs.executeScript(null, {
//     //code: 'document.getElementsByClassName("my-title")[0].replaceWith("New heading")'
//     code: 'document.getElementsByClassName("my-title")[0].replaceWith("cococ")'
    
// });

chrome.tabs.executeScript(null, {
    //code: 'document.getElementsByClassName("my-title")[0].replaceWith("New heading")'
    code: 'var script = document.createElement("script");document.getElementsByClassName("my-title")[0].replaceWith("New heading")'
    
});


// $(document).ready(function(){
//     $("button").click(function(){
//         $("p").replaceWith(function(n){
//             return "<h3>This element has index " + n + ".</h3>";
//         });
//     });
// });






// Exécute jquery

//chrome.tabs.executeScript(null, {code:"$('body').css('backgroundColor','yellow');"});


	// // for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(null, {
		file: 'content.js'
	});










   
   //logMessage("json is not valid");
   

}

function isValidJson(json){

      try {
        JSON.parse(json);
    } catch (e) {
        //the json is not ok
        return false;
    }
    return true;
    
}

/**
 * Change the background color of the current page.
 *
 * @param {string} color The new background color.
 */
function changeBackgroundColor(color) {
    var script = 'document.body.style.backgroundColor="' + color + '";';
    // See https://developer.chrome.com/extensions/tabs#method-executeScript.
    // chrome.tabs.executeScript allows us to programmatically inject JavaScript
    // into a page. Since we omit the optional first argument "tabId", the script
    // is inserted into the active tab of the current window, which serves as the
    // default.
    chrome.tabs.executeScript({
      code: script
    });
  }

