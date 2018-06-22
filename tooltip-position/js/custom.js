

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


chrome.tabs.executeScript({
    code:'document.getElementsByClassName("center")[8].style.display = "none"'
});
// chrome.tabs.executeScript({
//     code:'document.getElementsByClassName("center")[7].appendChild(document.createElement("DIV"))'
// });


// chrome.tabs.executeScript({
//     code:'g = document.createElement("div");'
// });

// chrome.tabs.executeScript({
//     code:'g.setAttribute("id", "Div1");'
// });

// chrome.tabs.executeScript({
//     code:'document.getElementsByClassName("center")[7].appendChild(g)'
// });


// url prevenimmo : http://www.preventimmo.fr/urba/note-renseignement-durbanisme

// Set arguments with add tooltip class number
chrome.tabs.executeScript({
    code:'document.getElementsByClassName("services-title")[0].setAttribute("id", "tooltip-1")'
});

//  chrome.tabs.executeScript({
//      code:'document.getElementById("tooltip-1").setAttribute("title", "My first tootip !")'
//  });

//  chrome.tabs.executeScript({
//     code:'document.getElementById("tooltip-1").setAttribute("data-content", "It is the content of the tooltip,it is the comment of the tooltip,it is the comment of the tooltip,it is the comment of the tooltip,it is the comment of the tooltip  ")'
// });

// chrome.tabs.executeScript({
//     code:'document.getElementById("tooltip-1").setAttribute("data-toogle", "tooltip")'
// });

// chrome.tabs.executeScript({
//     code:'document.getElementById("tooltip-1").tooltip("show"))'
// });







// // Add div before 
// chrome.tabs.executeScript({
//     code:'document.getElementById("tooltip-1").insertAdjacentHTML("beforebegin", "<div data-toggle=tooltip data-placement=left title=coco data-original-title=Dans85pourcentsdecasjenevoispasdetooltips>")'
// });

// // Add div after 
// // chrome.tabs.executeScript({
// //     code:'document.getElementById("tooltip-1").insertAdjacentHTML("afterend", "</div>")'
// // });


// // Add div before 
// chrome.tabs.executeScript({
//     code:'document.getElementById("tooltip-1").insertAdjacentHTML("beforebegin", "<div>two")'
// });

// // Add div after 
// chrome.tabs.executeScript({
//     code:'document.getElementById("tooltip-1").insertAdjacentHTML("afterend", "</div>")'
// });


 


    // 1
    chrome.tabs.executeScript({
        code:'document.getElementById("tooltip-1").insertAdjacentHTML("beforebegin", "<span id=tooltip-id-1 class=tooltiptext>Tooltip text</span>")'
    });

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



