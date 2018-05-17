//@todo A TERMINER POUR PLUS ADAPTABLE
/**
 * Contructeur de la classe
 * @param target_input
 * @param input_hidden
 * @param target_url
 */
var Autocomplete = function(info)
{
	this.timeOut = undefined;
	this.timePause = 350;
	this.hidden_dest = "#"+info["hidden_input"];
	this.nb_carac_min = 2;
	this.target_url = info["ajax_url"];
	this.target_id = this.getIDorClass(info["target_input"]);
	this.target_jQueryID = "#"+this.target_id;
	this.autocomplete_id = this.target_id+"_auto_complete_table";
	this.autocomplete_jQueryID = "#"+this.autocomplete_id;
	this.actionAjax = info["specific_data"];
	this.otherEventOnTarget = {"blur" : new Array(), "focus": new Array(), "keypress": new Array()};
	this.otherEventOnTargetLength = 0;
	this.data;
	this.target_border_bottom = '';
	jQuery(this.target_jQueryID).attr("autocomplete", "off");
	jQuery(this.target_jQueryID).unbind('keypress');
	if( jQuery(this.target_jQueryID).length != 0)
	{
		this.initTable();
	}
	if ( info.option != undefined && info.option.nb_carac_min != undefined){
		this.nb_carac_min = info.option.nb_carac_min;
		}
	
};
/**
 * Initie le tableau contenant les resultat Ajax
 */
Autocomplete.prototype.initTable = function()
{
	var table = jQuery(this.autocomplete_jQueryID);
	if(table.length == 0)
	{
		var object= this;
		jQuery("body").append('<table id="'+this.autocomplete_id+'"></table>');
		table = jQuery(this.autocomplete_jQueryID);
		table.css("display", "none");
		table.mouseenter(function(){
			object.mouseEnterInTable();
		});
		table.mouseleave(function(){
			object.mouseLeaveInTable();
		});
		this.rewriteTableCSS();
		this.bindFocusAndBlurToInput();
		jQuery(this.target_jQueryID).keyup(function(event){object.onKeyPress(object, event);});
	}
};
/**
 * Retourne la valeur de l'id ou de la classe
 * @param prefixe
 * @returns
 */
Autocomplete.prototype.getIDorClass = function(prefixe)
{
	var indic = prefixe.substr(0, 1);
	if( indic == "." || indic == "#" )
	{
		return prefixe.substring(1);
	}
	return prefixe;
};
/**
 * Réecrit le CSS du tableau de résuultat
 */
Autocomplete.prototype.rewriteTableCSS = function()
{
	var pos = jQuery(this.target_jQueryID).offset();
	var border_color = jQuery(this.target_jQueryID).css("border-color");
	var outline  = jQuery(this.target_jQueryID).css("outline");
	if( jQuery(this.target_jQueryID).val() != "" )
	{
		jQuery(this.autocomplete_jQueryID).css({
			'position': 'absolute',
			'top': jQuery(this.target_jQueryID).outerHeight(false),
			'margin-top': pos.top,
			'left': pos.left,
			'width': jQuery(this.target_jQueryID).outerWidth(false),
			'background-color': 'white',
			'border-left': '1px solid '+border_color,
			'border-right': '1px solid '+border_color,
			'border-bottom': '1px solid '+border_color,
			'outline': outline,
			'border-top': 'none',
			'padding': '0px',
			'border-collapse': 'collapse',
			'z-index': '99999'
		});
	}
};
/**
 * Bind l'event de focus et de blur sur l'input cible de l'autocompletion
 */
Autocomplete.prototype.bindFocusAndBlurToInput = function()
{
	this.rewriteTableCSS();
	var id = this.autocomplete_jQueryID;
	var object = this;
	jQuery(this.target_jQueryID).focus(function(){ object.focusTarget(id) ;});
	jQuery(this.target_jQueryID).blur(function(){ object.blurTarget(id) ;});
};
/**
 * Au focus de l'input
 */
Autocomplete.prototype.focusTarget = function(id)
{
	if( jQuery(this.target_jQueryID).val().length > 2)
	{
		if( jQuery(this.autocomplete_jQueryID+" td").length != 0 )
		{
			jQuery(id).show();
		}
	}
	jQuery.each(this.otherEventOnTarget["focus"],function(index, value){
		value();
	});
};
/**
 * Quand la souri sort du tabl;eau de resultat
 */
Autocomplete.prototype.mouseLeaveInTable = function()
{
	this.bindFocusAndBlurToInput();
};
/**
 * Quand la souri entre sur le tableau de résultat
 */
Autocomplete.prototype.mouseEnterInTable = function()
{
	var object = this;
	
	jQuery(this.target_jQueryID).unbind('blur');
	jQuery(this.target_jQueryID).unbind('focus', object.focusTarget);
};
/**
 * Au blur de l'input
 */
Autocomplete.prototype.blurTarget = function(id)
{
	jQuery(id).hide();
	jQuery.each(this.otherEventOnTarget["blur"],function(index, value){
		value();
	});
};
/**
 * Executer lors de l'appuis d'un touche au clavier, execute la fonction keyPressManager
 * @param object
 */
Autocomplete.prototype.onKeyPress = function(object, event)
{
	object.rewriteTableCSS();
	if( object != undefined )
	{
		if( !(this.isSpecialKeyCode(event.which)) )
		{
			clearTimeout(object.timeOut);
			object.timeOut = setTimeout(function(){object.keyPressManager(event);}, object.timePause);
		}
		else
		{
			object.keyPressManager(event);
		}
	}
};
/**
 * Gestion des keypresse selont les keycode et autre
 * @param event
 */
Autocomplete.prototype.keyPressManager = function(event)
{
	var code = event.which;
	if( this.isSpecialKeyCode(code) )
	{

		if( event.which == 13 )
		{
			if( jQuery(this.autocomplete_jQueryID+":hidden").length == 0)
			{
				if( jQuery("td.auto_complete_"+this.target_id+"_selected_row").length != 0)
				{	
					this.assignValueToTarget(jQuery("td.auto_complete_"+this.target_id+"_selected_row"), this.target_jQueryID, this.hidden_dest);
					jQuery(this.autocomplete_jQueryID+":hidden").hide();
				}
			}
		}
		if( event.which == 40)
		{
			if( jQuery("td.auto_complete_"+this.target_id+"_selected_row").length == 0)
			{
				var tbody = jQuery(this.autocomplete_jQueryID).children();
				var td =  jQuery(tbody).children(":first-child").children();
				td.css("background-color", "#E0ECF5");
				td.addClass("auto_complete_"+this.target_id+"_selected_row");
			}
			else
			{
				var new_selected = jQuery("td.auto_complete_"+this.target_id+"_selected_row").parent().next().children();
				jQuery("td.auto_complete_"+this.target_id+"_selected_row").css("background-color", "white");
				jQuery("td.auto_complete_"+this.target_id+"_selected_row").removeClass("auto_complete_"+this.target_id+"_selected_row");
				new_selected.css("background-color", "#E0ECF5");
				new_selected.addClass("auto_complete_"+this.target_id+"_selected_row");
			}
		}
		if( event.which == 38)
		{
			if( jQuery("td.auto_complete_"+this.target_id+"_selected_row").length == 0)
			{
				var tbody = jQuery(this.autocomplete_jQueryID).children();
				var td =  jQuery(tbody).children(":last-child").children();
				td.css("background-color", "#E0ECF5");
				td.addClass("auto_complete_"+this.target_id+"_selected_row");
			}
			else
			{
				var new_selected = jQuery("td.auto_complete_"+this.target_id+"_selected_row").parent().prev().children();
				jQuery("td.auto_complete_"+this.target_id+"_selected_row").css("background-color", "white");
				jQuery("td.auto_complete_"+this.target_id+"_selected_row").removeClass("auto_complete_"+this.target_id+"_selected_row");
				new_selected.css("background-color", "#E0ECF5");
				new_selected.addClass("auto_complete_"+this.target_id+"_selected_row");
			}
		}
	}
	else
	{
		var data = this.actionAjax;
		var object = this;
		if( jQuery(this.target_jQueryID).val().length > this.nb_carac_min )
		{
			jQuery(this.target_jQueryID).css({"background-image": "url('/images/ajax-loader.gif')",
										 "background-repeat": "no-repeat",
										 "background-position": "right"});
			data += "&needle_autocomplete="+jQuery(this.target_jQueryID).val();
			var simulateur = new Simulation();
			var ajax = new Ajax(this.target_url, data, function(data){ object.successAjaxLoading(data); }, {callbackError: function(){ simulateur.ajaxError(); } });
			ajax.load();
		}
		jQuery(this.hidden_dest).val("");
	}
};
/**
 * En cas de succes de l'Ajax
 * @param xml
 */
Autocomplete.prototype.successAjaxLoading = function(xml)
{
	if( jQuery("return_code", xml).text() != 0)
	{
		this.errorAjaxLoading();
		return null;
	}
	jQuery(this.target_jQueryID).css("background", "");
	jQuery(this.autocomplete_jQueryID).html("");
	var inputTargetID = this.target_jQueryID;
	var tableTargetID = this.autocomplete_jQueryID;
    jQuery("content", xml).each(function(){
    	var info = jQuery("info", this).text();
    	if( jQuery("complement", this).text() != "")
    	{
    		info += ' '+jQuery("complement", this).text();
    	}
    	var help = ''+jQuery("help", this).text()+"";
    	expression = new RegExp(jQuery(inputTargetID).val(),'gi');
    	info = info.replace( expression,'<b>'+expression.exec(info)+'</b>');
    	jQuery(tableTargetID).append(
    			'<tr>'+
    				'<td class="auto_complete_rows auto_complete_rows_underline">'+
    					'<span class="auto_complete_info">'+
    						info+
    					'</span>' +
    					'<span class="auto_complete_help">'+
    						help+
    					'</span>'+
    					'<input type="hidden" value="'+jQuery("id", this).text()+'"/>'+
    				'</td>'+
    			'</tr>');
    });
    this.rewriteRowsCSS();
	this.bindEventToRows(this.target_jQueryID, this.hidden_dest);
	if( jQuery(this.autocomplete_jQueryID+" td").length != 0 )
	{
		jQuery(this.autocomplete_jQueryID).show();
	}
	this.data = xml;
};
/**
 * Si une erreur survient lors de l'upload Ajax
 */
Autocomplete.prototype.errorAjaxLoading = function()
{
	jQuery(this.autocomplete_jQueryID).html("");
	jQuery(this.autocomplete_jQueryID).append(
			'<tr>'+
				'<td class="auto_complete_rows_error auto_complete_rows_underline">'+
					'<span class="auto_complete_error">'+
						'Une erreur est survenue, impossible d\'afficher la/les donnée(s) reçue(s).'+
					'</span>'+
				'</td>'+
			'</tr>');
	this.rewriteRowsCSS();
	jQuery(this.autocomplete_jQueryID).show();
};
/**
 * Bind les evenement au cellule de l'autocomplete
 * @param target
 * @param input_hidden
 */
Autocomplete.prototype.bindEventToRows = function(target, input_hidden)
{
	var object = this;
	jQuery(".auto_complete_rows").click(function(){
		object.assignValueToTarget(this,target, input_hidden);
		jQuery(this.target_jQueryID).blur();
	});
};
/**
 * Assigne les valeurs au input cible
 * @param row
 * @param target
 * @param input_hidden
 */
Autocomplete.prototype.assignValueToTarget = function(row, target, input_hidden)
{
	jQuery(".auto_complete_rows").removeClass("autocomplete_selected_row");
	this.bindFocusAndBlurToInput();
	jQuery(target).val(jQuery(row).children(".auto_complete_info").text());
	jQuery(row).addClass("autocomplete_selected_row");
	jQuery(input_hidden).val(jQuery(row).children("input").val());
	this.blurTarget(this.autocomplete_jQueryID);
};
/**
 * Réecrit le style des cellule de l'autocomplete
 */
Autocomplete.prototype.rewriteRowsCSS = function()
{
	jQuery(this.autocomplete_jQueryID+" tr").css({
		'padding': '0px',
		'margin': '0px'
	});
	jQuery(".auto_complete_rows_underline").css({
		'border-top': '1px solid #CCCCCC'
	});
	jQuery(".auto_complete_rows").css({
		'cursor': 'pointer',
		'padding': '3px',
		'text-align': 'left',
		'height': jQuery(this.target_jQueryID).height()
	});
	jQuery(".auto_complete_help").css({
		'font-style': 'italic',
		'font-weight': 'bold',
		'color': '#AAAAAA',
		'float': 'right'
	});
	jQuery(".auto_complete_rows_error").css({
		'text-align': 'left',
		'color': 'red',
		'background-color': '#FFAAAA'
	});
	jQuery(".auto_complete_rows").hover(function(){
		jQuery(this).css("background-color", "#E0ECF5");
	},
	function(){
		jQuery(this).css("background-color", "white");
	});
};
/**
 * Permet de savoir si la touche appuyé et bien un spécial char ou non
 * @param code
 * @returns {Boolean}
 */
Autocomplete.prototype.isSpecialKeyCode = function(code)
{
	switch(code)
	{
		case 9:
		case 13:
		case 17:
		case 20:
		case 35:
		case 36:
		case 38:
		case 40:
			return true;
		break;
		default:
			return false;
	}
};
/**
 * Bind l'evenement de la touche entré sur un bouton de submit spécifique
 * @param button_filter
 */
Autocomplete.prototype.bindOnEnter = function(button_filter)
{
	this.button = button_filter;
};
/**
 * Bind un autre handler de fonction à un evenement donné
 * @param eventType
 * @param handler
 */
Autocomplete.prototype.bindAnotherEventToInput = function(eventType, handler)
{
	jQuery(this.target_jQueryID).bind(eventType, handler);
	this.otherEventOnTarget[eventType][this.otherEventOnTargetLength] = handler;
	this.otherEventOnTargetLength++;
};