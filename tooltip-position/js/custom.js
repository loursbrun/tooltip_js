

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
    logMessage(obj.fontSize);
    logMessage(obj.color);
    logMessage(obj.backgroundColor);
    logMessage(obj.borderColor);
    
   

    logMessage(obj.tooltips[0].elementTagName);
    logMessage(obj.tooltips[0].indexElement);
    logMessage(obj.tooltips[0].tooltipText);
    logMessage(obj.tooltips[0].width);
    logMessage(obj.tooltips[0].height);
    logMessage(obj.tooltips[0].marginTop);
    logMessage(obj.tooltips[0].marginLeft);
    logMessage(obj.tooltips[0].arrowPosition);
    logMessage(obj.tooltips[0].marginTop);


    var currentTooltipNumber;
    for(currentTooltipNumber=0; currentTooltipNumber<2; i++)
    {
  
     chrome.tabs.executeScript({
        code:'document.getElementsByTagName("' + obj.tooltips[currentTooltipNumber].elementTagName + '")[' + obj.tooltips[currentTooltipNumber].indexElement + '].insertAdjacentHTML("beforebegin", "<div class=tooltiptext>' + obj.tooltips[currentTooltipNumber].tooltipText + '</div>")'
   });


    // 3 - arrowTooltipBorderTop
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipBorderTop")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipTop")'
        
    });
     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipBorderBottom")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipBottom")'
        
    });

     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipBorderLeft")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipLeft")'
        
    });

     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipBorderRight")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[0].appendChild(div); div.setAttribute("class", "arrowTooltipRight")'
        
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
        code:'document.getElementsByClassName("tooltiptext")[0].style.border = "4px solid"'
     });
    // borderColor
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.borderColor = "' + obj.borderColor + '"'
    });


    


     



     // width
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.width = "' + obj.tooltips[0].width + '"'
     });
     // height
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.height = "' + obj.tooltips[0].height + '"'
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
        code:'document.getElementsByClassName("tooltiptext")[0].style.marginTop = "' + obj.tooltips[currentTooltipNumber].marginTop + '"'
     });
     // margin-top
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[0].style.marginLeft = "' + obj.tooltips[currentTooltipNumber].marginLeft + '"'
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
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.borderBottomColor = "' + obj.borderColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipTop")[0].style.borderBottomColor = "' + obj.backgroundColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.borderTopColor = "' + obj.borderColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.borderTopColor =  "' + obj.backgroundColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.borderLeftColor = "' + obj.borderColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.borderLeftColor =  "' + obj.backgroundColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.borderRightColor = "' + obj.borderColor + '"'
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
        code:'document.getElementsByClassName("arrowTooltipRight")[0].style.borderRightColor =  "' + obj.backgroundColor + '"'
     });


     // Hide arrow depend of the position
     if(obj.tooltips[0].arrowPosition == "left") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipRight")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderRight")[0].style.display = "block"'
         });
     }
     if(obj.tooltips[0].arrowPosition == "right") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipLeft")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderLeft")[0].style.display = "block"'
         });
     }
     if(obj.tooltips[0].arrowPosition == "top") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipTop")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderTop")[0].style.display = "block"'
         });
     }
     if(obj.tooltips[0].arrowPosition == "bottom") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBottom")[0].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderBottom")[0].style.display = "block"'
         });
     }

    }
     // end of iteration



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



