

$("#tooltipForm").submit( function(e) {
  e.preventDefault();

     var jsonStr = $("#json-text").val();

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


// chrome.tabs.executeScript({
//     code:'document.getElementsByClassName("center")[8].style.display = "none"'
// });


    // 1 - Ajout d'un attribut id pour identifier l'élément cible
    chrome.tabs.executeScript({
         code:'document.getElementsByClassName("services-title")[0].setAttribute("id", "tooltip-1")'
    });

    // 2 - ajout du tooltil juste avant l'élémént cible
    chrome.tabs.executeScript({
        code:'document.getElementById("tooltip-1").insertAdjacentHTML("beforebegin", "<span id=tooltip-id-1 class=tooltiptext>Tooltip text</span>")'
    });

    // 3 - On ajoute le style au tooltip
    chrome.tabs.executeScript({
          code:'document.getElementsByClassName("tooltiptext")[0].style.backgroundColor = "red"'
     });

    // 3 - On déplace le tooltip dans l'element cible
    chrome.tabs.executeScript({
        code:'document.getElementById("tooltip-1").appendChild(document.getElementById("tooltip-id-1")'
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



