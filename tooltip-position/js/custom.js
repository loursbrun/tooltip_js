

$("#tooltipForm").submit( function(e) {
  e.preventDefault();

     var jsonStr = $("#json-text").val();

     if( isValidJson(jsonStr) ){
        logMessage("json is valid");

         /*

            http://www.preventimmo.fr/

            {
            "elementTagName":"span",
            "indexElement":"5",
            "tooltipText":"<h1>Mon Titre</h1>Ceci est mon premier commentaire de tooltip<br>Ceci est mon premier<br> commentaire de tooltip",
            "backgroundColor":"grey",
            "color":"white",
            "width":"300px",
            "height":"auto",
            "marginTop":"200px",
            "marginLeft":"-50px",
            "fontSize":"12px",
            "arrowPosition":"top",
            "tooltips":[ 
            {
                "elementTagName":"span",
                "indexElement":"5",
                "tooltipText":"<h1>Mon Titre</h1>Ceci est mon premier commentaire de tooltip<br>Ceci est mon premier<br> commentaire de tooltip",
                "backgroundColor":"grey",
                "color":"white",
                "width":"300px",
                "height":"auto",
                "marginTop":"200px",
                "marginLeft":"-50px",
                "fontSize":"12px",
                "arrowPosition":"top"
            }, 
            {
                "elementTagName":"span",
                "indexElement":"5",
                "tooltipText":"<h1>Mon Titre</h1>Ceci est mon premier commentaire de tooltip<br>Ceci est mon premier<br> commentaire de tooltip",
                "backgroundColor":"grey",
                "color":"white",
                "width":"300px",
                "height":"auto",
                "marginTop":"200px",
                "marginLeft":"-50px",
                "fontSize":"12px",
                "arrowPosition":"top"
            }
            ]
            }

         */

         var obj = JSON.parse(jsonStr);
         
        

        addTooltips(obj);
     }
     else{
      logMessage("json is not valid");
     }

});



function logMessage(msg){
    chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
}

function addTooltips(obj){
    logMessage(obj.tooltips[0].elementTagName);
    logMessage(obj.tooltips[0].indexElement);
    logMessage(obj.tooltips[0].tooltipText);
    logMessage(obj.tooltips[0].backgroundColor);
    logMessage(obj.tooltips[0].color);
    logMessage(obj.tooltips[0].width);
    logMessage(obj.tooltips[0].height);
    logMessage(obj.tooltips[0].marginTop);
    logMessage(obj.tooltips[0].marginLeft);
    logMessage(obj.tooltips[0].fontSize);
    logMessage(obj.tooltips[0].arrowPosition);
    logMessage(obj.tooltips[0].marginTop);






    // 1 - Ajout d'un attribut id pour identifier l'élément cible
    chrome.tabs.executeScript({
         code:'document.getElementsByTagName("' + obj.elementTagName + '")[' + obj.indexElement + '].setAttribute("id", "tooltip-1")'
    });

    // 2 - ajout du tooltip juste avant l'élémént cible
    chrome.tabs.executeScript({
        code:'document.getElementById("tooltip-1").insertAdjacentHTML("beforebegin", "<div id=tooltip-id-1 class=tooltiptext>' + obj.tooltipText + '</div>")'
    });


    // 3 - arrowTooltipBorderTop
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipBorderTop")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipTop")'
        
    });
     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipBorderBottom")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipBottom")'
        
    });

     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipBorderLeft")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipLeft")'
        
    });

     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipBorderRight")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementById("tooltip-id-1").appendChild(div); div.setAttribute("class", "arrowTooltipRight")'
        
    });

    // 4 - On ajoute le style au tooltip 

    // background color
     chrome.tabs.executeScript({
          code:'document.getElementsByClassName("tooltiptext")[0].style.backgroundColor = "' + obj.backgroundColor + '"'
     });
     // color
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.color = "' + obj.color + '"'
     });
      // font-size
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.fontSize = "' + obj.fontSize + '"'
     });
     // text-align
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.textAlign = "center"'
     });
      // position
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.position = "absolute"'
     });
      // border
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.border = "4px solid darkgrey"'
     });



     



     // width
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.width = "' + obj.width + '"'
     });
     // height
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.height = "' + obj.height + '"'
     });
     
     // border-radius
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.borderRadius = "6px"'
     });
     // padding
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.padding = "5px 0"'
     });
    
     // position
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.zIndex = "1"'
     });
     // margin-top
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.marginTop = "' + obj.marginTop + '"'
     });
     // margin-top
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.marginLeft = "' + obj.marginLeft + '"'
     });


    /* ---  arrowTooltipBorderTop   ---*/

     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.display = "none"'
    });
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.bottom = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.border = "solid transparent"'
     });
     // border transparent tooltiptext:after
    chrome.tabs.executeScript({
        //code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.border = "transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.marginLeft = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.borderBottomColor = "darkgrey"'
     });


     /* ---  arrowTooltipTop   ---*/
    
     // bottom tooltiptext:after
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.display = "none"'
    });
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.bottom = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.marginLeft = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.borderBottomColor = "grey"'
     });


     /* ---  arrowTooltipBorderBottom   ---*/

    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.top = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.marginLeft = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.borderTopColor = "darkgrey"'
     });


     /* ---  arrowTooltipBottom   ---*/
    
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.top = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.marginLeft = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.borderTopColor = "grey"'
     });


     /* ---  arrowTooltipBorderLeft   ---*/

     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.left = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.marginTop = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.borderLeftColor = "darkgrey"'
     });


     /* ---  arrowTooltipLeft   ---*/
    
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.left = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.marginTop = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.borderLeftColor = "grey"'
     });



      /* ---  arrowTooltipBorderRight   ---*/

      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.right = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.marginTop = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.borderRightColor = "darkgrey"'
     });


     /* ---  arrowTooltipRight   ---*/
    
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.right = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.marginTop = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.borderRightColor = "grey"'
     });


     // Hide arrow depend of the position
     if(obj.arrowPosition == "left") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipRight")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.display = "block"'
         });
     }
     if(obj.arrowPosition == "right") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.display = "block"'
         });
     }
     if(obj.arrowPosition == "top") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipTop")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.display = "block"'
         });
     }
     if(obj.arrowPosition == "bottom") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.display = "block"'
         });
     }




     

    // 3 - On déplace le tooltip dans l'element cible
    chrome.tabs.executeScript({
       // code:'document.getElementById("tooltip-1").appendChild(document.getElementById("tooltip-id-1")'
    });


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



