//open database connection...
//Linxer.dbs.open();

//Linxer.dbs.createTable();

//Linxer.dbs.getLinks(); //lists the link stored in the database

$("#linxerForm").submit( function(e) {
  e.preventDefault();

   //logMessage("simple log");

     var jsonStr = $("#json-text").val();

     logMessage("jvjvjkvjvjkvkjhv" + jsonStr);


     if( isValidJson(json) ){
        logMessage("simple log");
     }
     else{
      alert("please, provide a valid json");
      logMessage("please, provide a valid json");
     
     }

});



function logMessage(msg){
    chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
}


function isValidJson(json){

      try {
        JSON.parse(json);
        console.log("try json");
    } catch (e) {
        //the json is not ok
        return false;
        console.log("json is not valid");
    }
    return true;
    console.log("json is valid");
    

}

