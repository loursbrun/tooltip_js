//open database connection...
//Linxer.dbs.open();

//Linxer.dbs.createTable();

//Linxer.dbs.getLinks(); //lists the link stored in the database

$("#linxerForm").submit( function(e) {
  e.preventDefault();

   //logMessage("simple log");

     var jsonStr = $("#json-text").val();

     logMessage("texte area is :" + jsonStr);


     if( isValidJson(jsonStr) ){
        logMessage("json is valid");
     }
     else{
      logMessage("json is not valid");
     }

});



function logMessage(msg){
    chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
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

