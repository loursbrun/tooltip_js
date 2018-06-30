

$("#tooltipForm").submit( function(e) {
  e.preventDefault();

     var jsonStr = $("#json-text").val();

     if( isValidJson(jsonStr) ){
        logMessage("json is valid");

         /*

            http://www.preventimmo.fr/

      

            {
            "fontSize":"14px",
            "color":"white",
            "backgroundColor":"rgb(59,59,59,0.9)",
            "borderColor":"white",
            "boxShadow":"0px 0px 20px 4px grey",
            "tooltips":[ 
            {
                "elementTagName":"span",
                "indexElement":"5",
                "tooltipText":"<h4>Premier titre</h4>Ceci est mon premier commentaire de tooltip<br>Ceci est mon premier<br> commentaire de tooltip<br><br>",
                "width":"300px",
                "height":"auto",
                "fontSize":"12px",
                "arrowPosition":"left",
                "marginLeft":"0px",
                "marginTop":"0px"
            }, 
            {
                "elementTagName":"span",
                "indexElement":"6",
                "tooltipText":"<h1>Deusième titre</h1>Ceci est mon premier commentaire de tooltip<br>Ceci est mon premier<br> commentaire de tooltip",
                "width":"200px",
                "height":"auto",
                "fontSize":"12px",
                "arrowPosition":"top",
                "marginLeft":"0px",
                "marginTop":"100px"
            },
            {
                "elementTagName":"img",
                "indexElement":"11",
                "tooltipText":"<h1>Troisième titre</h1>Ceci est mon premier commentaire de tooltip<br>Ceci est mon premier<br> commentaire de tooltip",
                "width":"200px",
                "height":"auto",
                "fontSize":"12px",
                "arrowPosition":"top",
                "marginLeft":"0px",
                "marginTop":"100px"
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
    logMessage(obj.boxShadow);
    


    var currentTooltipNumber;
    for(currentTooltipNumber=0; currentTooltipNumber<3; currentTooltipNumber++)
    {

        logMessage("currentTooltipNumber" + currentTooltipNumber);
        logMessage(obj.tooltips[currentTooltipNumber].elementTagName);
        logMessage(obj.tooltips[currentTooltipNumber].indexElement);
        logMessage(obj.tooltips[currentTooltipNumber].tooltipText);
        logMessage(obj.tooltips[currentTooltipNumber].width);
        logMessage(obj.tooltips[currentTooltipNumber].height);
        logMessage(obj.tooltips[currentTooltipNumber].marginTop);
        logMessage(obj.tooltips[currentTooltipNumber].marginLeft);
        logMessage(obj.tooltips[currentTooltipNumber].arrowPosition);
        logMessage(obj.tooltips[currentTooltipNumber].marginTop);


  
     chrome.tabs.executeScript({
        code:'document.getElementsByTagName("' + obj.tooltips[currentTooltipNumber].elementTagName + '")[' + obj.tooltips[currentTooltipNumber].indexElement + '].insertAdjacentHTML("beforebegin", "<div class=tooltiptext>' + obj.tooltips[currentTooltipNumber].tooltipText + '</div>")'
   });


    // 3 - arrowTooltipBorderTop
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipBorderTop")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipTop")'
        
    });
     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipBorderBottom")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipBottom")'
        
    });

     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipBorderLeft")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipLeft")'
        
    });

     // 3 - arrowTooltipBorderBottom
     chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipBorderRight")'
        
    });
    chrome.tabs.executeScript({
        code: 'var div=document.createElement("div"); document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].appendChild(div); div.setAttribute("class", "arrowTooltipRight")'
        
    });

    // 4 - On ajoute le style au tooltip 

    // background color
     chrome.tabs.executeScript({
          code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.backgroundColor = "' + obj.backgroundColor + '"'
     });
      // boxshadow color
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.boxShadow = "' + obj.boxShadow + '"'
   });
     // color
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.color = "' + obj.color + '"'
     });
      // font-size
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.fontSize = "' + obj.fontSize + '"'
     });
     // text-align
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.textAlign = "center"'
     });
      // position
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
      // border
      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.border = "4px solid"'
     });
    // borderColor
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.borderColor = "' + obj.borderColor + '"'
    });


    


     



     // width
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.width = "' + obj.tooltips[currentTooltipNumber].width + '"'
     });
     // height
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.height = "' + obj.tooltips[currentTooltipNumber].height + '"'
     });
     
     // border-radius
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.borderRadius = "6px"'
     });
     // padding
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.padding = "5px 0"'
     });
    
     // position
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.zIndex = "1"'
     });
     // margin-top
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.marginTop = "' + obj.tooltips[currentTooltipNumber].marginTop + '"'
     });
     // margin-top
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("tooltiptext")[' + currentTooltipNumber + '].style.marginLeft = "' + obj.tooltips[currentTooltipNumber].marginLeft + '"'
     });


    /* ---  arrowTooltipBorderTop   ---*/

     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.display = "none"'
    });
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.bottom = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.marginLeft = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.borderBottomColor = "' + obj.borderColor + '"'
     });


     /* ---  arrowTooltipTop   ---*/
    
     // bottom tooltiptext:after
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.display = "none"'
    });
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.bottom = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.marginLeft = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.borderBottomColor = "' + obj.backgroundColor + '"'
     });


     /* ---  arrowTooltipBorderBottom   ---*/

    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.top = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.marginLeft = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.borderTopColor = "' + obj.borderColor + '"'
     });


     /* ---  arrowTooltipBottom   ---*/
    
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.top = "100%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.left = "50%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.marginLeft = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.borderTopColor =  "' + obj.backgroundColor + '"'
     });


     /* ---  arrowTooltipBorderLeft   ---*/

     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.left = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.marginTop = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.borderLeftColor = "' + obj.borderColor + '"'
     });


     /* ---  arrowTooltipLeft   ---*/
    
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.left = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.marginTop = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.borderLeftColor =  "' + obj.backgroundColor + '"'
     });



      /* ---  arrowTooltipBorderRight   ---*/

      chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.right = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.marginTop = "-16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.borderWidth = "16px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.borderRightColor = "' + obj.borderColor + '"'
     });


     /* ---  arrowTooltipRight   ---*/
    
     chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.display = "none"'
    });
     // bottom tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.top = "50%"'
     });
     // left tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.right = "100%"'
     });
     // border solid tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.border = "solid transparent"'
     });
     // height tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.height = "0"'
     });
    // width tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.width = "0"'
     });
     // position tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.position = "absolute"'
     });
    // pointer-events tooltiptext:after
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.pointerEvents = "none"'
     });
     // borderColor tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.borderColor = "transparent"'
     });
     // marginLeft tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.marginTop = "-10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.borderWidth = "10px"'
     });
     // border-width tooltiptext:after '
    chrome.tabs.executeScript({
        code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.borderRightColor =  "' + obj.backgroundColor + '"'
     });


     // Hide arrow depend of the position
     if(obj.tooltips[currentTooltipNumber].arrowPosition == "left") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipRight")[' + currentTooltipNumber + '].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderRight")[' + currentTooltipNumber + '].style.display = "block"'
         });
     }
     if(obj.tooltips[currentTooltipNumber].arrowPosition == "right") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipLeft")[' + currentTooltipNumber + '].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderLeft")[' + currentTooltipNumber + '].style.display = "block"'
         });
     }
     if(obj.tooltips[currentTooltipNumber].arrowPosition == "top") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipTop")[' + currentTooltipNumber + '].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderTop")[' + currentTooltipNumber + '].style.display = "block"'
         });
     }
     if(obj.tooltips[currentTooltipNumber].arrowPosition == "bottom") {
        chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBottom")[' + currentTooltipNumber + '].style.display = "block"'
         });
         chrome.tabs.executeScript({
            code:'document.getElementsByClassName("arrowTooltipBorderBottom")[' + currentTooltipNumber + '].style.display = "block"'
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



