/**
 * On définit la classe ajax pour que toutes les requêtes qui partent de preventimmo soit formater de la même maniére
 * Et que leurs retour soit gérer de facon uniforme
 * Données membres :
 * 	- url: l'url sur lequel la requete ajax est lancé
 *  - data: les données a joindre a l'url
 *  - callbackSucces: la fonction appelé en retour de requête en cas de success
 *  - dataType: Le type de données attendu en retour de requête. Default -> xml
 *  - async: Determine si la requête est asynchrone ou non ( true = asynchrone, false = synchrone ). Default -> true
 *  - executeCallback: Determine si la fonction callbackSucces doit être executer ou non a la fin de la requete ( true = executée,
 *  	fasle = non executé ). Default -> true
 *  -type: le type de requete XHR ( POST ou GET ). Default -> POST
 *  -returnedData: Contient les donnée retourné par la requête Ajax
 */
var xdr; //Pour windows xDomaine
var Ajax;
/**
 * Contructeur de la classe
 * @param url String L'url de la requete Ajax
 * @param data Array/Object Les données a joindre à la requête Ajax
 * @param callbackSuccess Handler la fonction executer au retour de la requête ajax
 * @param other Array/Object Tableau contenant d'autre paramêtre de la requête ajax.
 * 		  Option possible : { dataType: 'xml'|'json'|'html'|'text',
 * 							  async: true|false,
 * 							  executeCallback: true|false,
 * 							  type: 'GET'|'POST'}
 */
Ajax = function( url, data, callbackSuccess, other )
{
	this.url = url;
	this.data = data;
	this.callbackSuccess = callbackSuccess;
	this.dataType = "xml";
	this.async = true;
	this.executeCallback = true;
	this.type = 'POST';
	if( other != undefined && other.length != 0 )
	{
		this.dataType        = (other.dataType != undefined)?other.dataType:this.dataType;
		this.async           = (other.async == false)?other.async:this.async;
		this.executeCallback = (other.executeCallback == false)?other.executeCallback:this.executeCallback;
		this.type            = (other.type == 'GET')?other.type:this.type;
		this.callbackError   = (other.callbackError != undefined )?other.callbackError:undefined;
	}
	this.returnedData = {};
};
/**
 * Si une erreur survient lors de la requete ( code http != 200 )
 */
Ajax.prototype.error = function( code, jqXHR, textStatus, errorThrown)
{
	console.log(textStatus);
	err_code = code!=undefined?('errno '+code):'';
	if( this.callbackError != undefined ){
		this.callbackError();
		return null;
	}
	var html = 	'<div id="window_ajax_error_content">'+
					'<p>'+
					 	(textStatus!=undefined?textStatus+"<br>":"Erreur<br>")+
					 	'( '+err_code+' )'+
				    '</p>'+
				    '<button class="gray_button" id="ernt_ajaxError" >'+
				   		'Recharger la page'+
				    '</button>'+
			    '</div>';
	jQuery("#patienter").fadeOut();
	jQuery.newWindow({ id:'window_ajax_error',
				visible: true,
				modal: true,
				hideOnClose : false,
				fixe: true,
				opacity:1,
				windowTitle: 'Erreur',
				content: html,
				width: 200,
				height : 'auto',
				posx: 50,
				posy: 50,
				resizeable: false,
				maximizeButton: false,
				draggable: false,
				statusBar: false,
				minimizeButton: false,
				closeButton: false		
	});
	jQuery("#ernt_ajaxError").click(function(){ window.location.reload();});
	bindDefaultEventOnButton();
	jQuery("#patienter").hide();
};
/**
 * Si la requête c'est bien passé Les code d'erreur n'ont été implémentés que pour les retours en XML pour le moment
 */
Ajax.prototype.success = function()
{
	//Pour Internet explorer si le xdomaine et definit
	if( xdr != undefined && xdr.thisObject.xdomain )
	{
		//Pour convertir la chaine de caractére en XML lisible par jquery pour IE7-8
		var xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
		xmlDoc.loadXML(xdr.responseText);
		this.returnedData       = xmlDoc;
		//On doit redefinir tous les this car IE ne garde pas le context
		this.error              = xdr.thisObject.error;
		this.callbackSuccess    = xdr.thisObject.callbackSuccess;
		this.callbackError      = xdr.thisObject.callbackError;
		this.maintenanceService = xdr.thisObject.maintenanceService;
		this.dataType           = xdr.thisObject.dataType;
	}
	var returnCode = '-1';
	if( this.dataType == 'xml' )
	{
		returnCode = jQuery("return_code", this.returnedData).text();
	}
	if( this.dataType == 'json' )
	{
		returnCode = '0';
	}
	switch( returnCode )
	{
		case '0':
			this.callbackSuccess( this.returnedData );
		break;
		case '1':
			this.error();
		break;
		case '2':
			this.connectionTimeout(this.returnedData);
		break;
		case '3':
			this.maintenanceService();
		break;
		default:
			this.error( jQuery("return_code", this.returnedData).text(), undefined,  jQuery("return_content", this.returnedData).text());
	}
};
/**
 * Affice la fenêtre de connection perdu pour inactivité
 * FIXME a refaire correctement
 */
Ajax.prototype.connectionTimeout = function(data)
{
	var msg_title = 'Session expirée';
	jQuery("#patienter").fadeOut();

	var html = '<div style="padding:10px;">'+
					jQuery("return_content", data).text()+
				'</div>'+
				'<button class="gray_button" id="error_recharger">Me connecter</button>';
	jQuery.newWindow({ id:'ajax_session_timeout',
				  visible: true,
				  displayClass: "window-black",
				  modal: true,
				  fixe: true,	
				  opacity:1,
				  windowTitle: msg_title,
			  	  content: html,
				  width: 250,
				  height: 150,
				  posx: 50,
				  posy: 50,
				  resizeable: false,
				  maximizeButton: false,
				  draggable: false,
				  minimizeButton: false,
				  closeButton: true });
	jQuery("#error_recharger").click(function(){ document.location.reload(); });
};
/**
 * Si le site est en maintenance.
 */
Ajax.prototype.maintenanceService = function()
{
	var msg_title = 'Maintenance';
	var msg_error = '<p style="text-align:justify; padding:0px">L\'application Preventimmo est en cours de maintenance. Nous vous invitons à réessayer dans quelques instants.</p>';

	jQuery("#patienter").fadeOut();
	if(jQuery('#window_maintenance').length != 0){
		jQuery('#window_maintenance').window('destroy');
	}

	var html = "<div style='padding:10px;'>"+msg_error+"</br></div>"+
	"<button class='button_big' id='error_recharger' onclick='window.location.reload();'>Recharger<br/>la page</button>";

	jQuery.newWindow({
		id:'window_maintenance',
		visible:true,
		displayClass: "window-black",
		modal:true,
		fixe:true,	
		opacity:1,
		windowTitle: msg_title,
		content: html,
		width:250,
		height :150,
		posx:50,
		posy:50,
		resizeable:false,
		maximizeButton:false,
		draggable:false,
		minimizeButton:false,
		closeButton:true		
	});
};
/**
 * Execute la requête ajax
 */
Ajax.prototype.load = function()
{
	this.xdomain = false;
	if( this.url.search("http://") != -1 && this.url.search("http://"+document.domain) == -1 && jQuery.browser.msie )
	{
		this.xdomain = true;
	}
	if( this.url.search("https://") != -1 && this.url.search("https://"+document.domain) == -1 && jQuery.browser.msie )
	{
		this.xdomain = true;
	}
	if( parseInt(jQuery.browser.version,10) == 7)
	{
		this.xdomain = false;
	}
	if( !this.xdomain )
	{
		var object = this;
		jQuery.ajax({ url:      object.url,
			 	 data:     object.data,
			 	 dataType: object.dataType,
			 	 async:	   object.async,
			 	 type: 	   object.type,
			 	 error:    function(jqXHR, textStatus, errorThrown){ object.error( 1, jqXHR, textStatus, errorThrown); },
			 	 success:  function(data)
			 	 { 
			 		 object.returnedData = data;
			 		 if( object.executeCallback == true )
		 			{
			 			object.success();
		 			}
			 	 }
		});
	}
	else{
		
		if (window.XDomainRequest) // Check whether the browser supports XDR. 
        {
            xdr = new XDomainRequest(); // Create a new XDR object.
            if (xdr)
            {
            	var dataForURl = "?"+this.data;
            	if( typeof(this.data) == 'object' )
            	{
            		var data = "";
	            	jQuery.each(this.data, function(key, value){
	            		data += key+"="+value+"&";
	            	});
            	}
            	xdr.onerror     = this.error;   
            	xdr.ontimeout   = this.error;
            	xdr.onload      = this.success;
            	xdr.timeout     = 10000;
            	xdr.thisObject  = this;
                // The URL is preset in the text area. This is passed in the 
                // open call with a get request.
            	xdr.open("POST", this.url+dataForURl);
                // The request is then sent to the server.  
            	xdr.send();
            }
            else
            {
                alert('Failed to create new XDR object.');
            }
        }
        else
        {
            alert('XDR does not exist.');
        }
	}
	
};