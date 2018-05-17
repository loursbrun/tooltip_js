var domaine_simulation = "https://services.preventimmo.fr";
var link_redirection = "https://services.preventimmo.fr/espace-client/visitor.php?action=register&code_referent=MACOMMUNE";

var Simulation = function()
{
	jQuery("#ernt-simulator").append('<input type="hidden" id="code_insee_commune">');
	jQuery("#submit-code-postal").attr("disabled", "");
	this.createBox();
	this.autocomplete = new Autocomplete({ target_input: "code-postal",
										   hidden_input: "code_insee_commune",
										   ajax_url: domaine_simulation+"/api/simulateur/communeAjax/",
										   specific_data: "special=collapse"});
	var object = this;
	this.autocomplete.bindAnotherEventToInput("blur", function(){ object.isCommuneExist(); } );
	this.bind();
};
Simulation.contentMaintenance = 'Le site est actuellement en maintenance, veuillez réessayé plus tard.';
Simulation.contentRequette = 'Trop de requette pour cette adresse IP';
Simulation.contentError = 'Oups une erreur est survenue.';
/**
 * Bind les différents evennement javascript au element
 */
Simulation.prototype.bind = function()
{
	var object = this;
	jQuery("#ernt-simulator").submit(function(){
		if( jQuery("content", object.autocomplete.data).length == 0 ){
			return false;
		}
		var commune_id = jQuery("#code_insee_commune").val();
		var commune_checked = false;
		var communes = jQuery("content", object.autocomplete.data);
		for( var i = 0; i < communes.length; i++ ){
			if( jQuery("id",communes[i]).text() == commune_id ){
				commune_checked = true;
				break;
			}
		}
		if( !commune_checked ){
			jQuery("#code-postal").val(jQuery('info',communes[0]).text());
			jQuery("#code_insee_commune").val(jQuery('id',communes[0]).text());
		}
		object.getSimulationContent();
		return false;
	});
	jQuery(".ernt_simulator_modal").click(function(){ object.closeBox(); });
	jQuery("#ernt_simulator_close").click(function(){ object.closeBox(); });
};
/**
 * Créer la box de contenu
 */
Simulation.prototype.createBox = function()
{
	var html = '<div id="ernt_simulator_box">'+
					'<div id="ernt_simulator_content">'+
						'<div id="ernt_simulator_content_txt"></div>'+
					'</div>'+
				'</div>'+
				'<div id="ernt_simulator_patienter">'+
					'<div id="ernt_simulator_patienter_content">'+
						'<img src="'+domaine_simulation+'/portail/images/chargement.gif" >'+
						'<p>Veuillez patienter</p>'+
					'<div>'+
				'</div>';
	jQuery("#ernt-simulator-result").append(html);
};
/**
 * Affiche la box de simulation
 */
Simulation.prototype.showSimulationBox = function()
{
	jQuery("#ernt_simulator_box").fadeIn(200);
	jQuery("#ernt-simulator-form").hide();
	jQuery("#about-simulateur").hide();
};
/**
 * Va récupérer le contenu de la box
 */
Simulation.prototype.getSimulationContent = function()
{
	var object = this;
	this.showPatienter();
	this.code_insse = jQuery("#code_insee_commune").val();
	var data = "code_insee="+jQuery("#code_insee_commune").val();
	var ajax = new Ajax( domaine_simulation+"/api/simulateur/simulationRisqueAjax/",
			             data,
			             function(data){
			 				switch( jQuery("return_code", data).text() )
			 				{
			 					//Tout c'est bien passé
			 					case '0':
			 						object.hidePatienter();
			 						jQuery("#ernt_simulator_content_txt").html(object.formatContent(data));
			 						object.showSimulationBox();
			 						//red_button
			 						jQuery(".red_button").mousedown(function(){
			 							jQuery(this).addClass("red_button_active");
			 						});
			 						jQuery(".red_button").mouseup(function(){
			 							jQuery(this).removeClass("red_button_active");
			 						});
			 						jQuery(".red_button").mouseout(function(){
			 							jQuery(this).removeClass("red_button_active");
			 						});
                                    var adwords = jQuery("#input-from-adwords").length;
                                    if(adwords > 0){
                                        link_redirection += "&code_referent=ADWORDS";
                                    }
									var bing = jQuery("#input-from-bing").length;
									if(bing > 0){
									link_redirection += "&code_referent=BING";
									}

			 						jQuery("#button_icon_download").click(function(){ document.location.href = link_redirection; });
			 					break;
			 					//Une erreur inconue est survenue
			 					case '1':
			 						object.hidePatienter();
			 						jQuery("#ernt_simulator_content_txt").html(Simulation.contentError);
			 						object.showSimulationBox();
			 					break;
			 					//Le site est en maitnenance
			 					case '2':
			 						object.hidePatienter();
			 						jQuery("#ernt_simulator_content_txt").html(Simulation.contentMaintenance);
			 						object.showSimulationBox();
			 					break;
			 					//Trop de requête pour cette IP
			 					case '3':
			 						object.hidePatienter();
			 						jQuery("#ernt_simulator_content_txt").html(Simulation.contentRequette);
			 						object.showSimulationBox();
			 					break;
			 				}},
			 			"azea");
	ajax.load();
};
/**
 * Permet de vérifier que la commune tappé dans le champ commune (ernt_etape1_commune) est bien valide
 */
Simulation.prototype.isCommuneExist = function()
{
	if( jQuery("#code_insee_commune").val() != undefined  || jQuery("#code_insee_commune").val() != "")
	{
		var tmp_code_post_commune = jQuery("#code-postal").val();
//		var code_postal = tmp_code_post_commune.substring(0,5);
		var commune = jQuery.trim(tmp_code_post_commune.substring(6));
		var check = false;
		if( commune != "" )
		{
			jQuery("content", this.autocomplete.data).each(function(){
				var row = jQuery("info", this).text();
				if( tmp_code_post_commune.toLowerCase() == row.toLowerCase() )
				{
					check = true;
				}
			});
		}

		if( jQuery("#code-postal").val() == undefined || jQuery.trim(jQuery("#code-postal").val()) == "" || !check)
		{
			jQuery("#submit-code-postal").attr("disabled", "disabled");
			return;
		}
		if( check )
		{
			jQuery("#submit-code-postal").removeAttr("disabled");
		}
	}
};
/**
 * Montre une erreur ajax
 */
Simulation.prototype.ajaxError = function()
{
	var html = '<p>Le service est actuellement indisponible veuillez réessayer plus tard.</p>';
	if (navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.userAgent.match(/MSIE ([0-9.]+);/)[1]) < 8 ){
		html =  '<p>Le service n\'est pas disponible pour les naviguateurs inférieur à Internet Explorer 7.<br><br>'+
				'Pour pouvoir utiliser le service, veuillez mettre à jour votre naviguateur, ou telecharger un naviguateur compatible : <br>'+
				'- <a href="http://www.google.fr/intl/fr/chrome/browser/">Google Chrome</a><br>'+
				'- <a href="http://www.mozilla.org/fr/firefox/new/">Mozilla Firefox</a><br>'+
				'- <a href="http://www.opera.com/">Opera</a><br>'+
				'</p>'
	}
	jQuery("#ernt_simulator_content_txt").html(html);
	this.showSimulationBox();
};
/**
 * Format le contenu de la div
 */
Simulation.prototype.formatContent = function(data)
{
	var code_postal = jQuery("#code-postal").val().substring(0, 5);
	var commune = jQuery("commune", data).text()+" ("+code_postal+")";
	var ville = jQuery("commune", data).text()+"";
	var risque  = jQuery("alea", data);
	var nb_cat_nat = jQuery("nbs_catnat", data).text();
	var obligation_txt = '<p class="text-danger"><strong>Oui, votre commune est concernée par l\'état des servitudes risques et d\'information sur les sols !</strong></p>';
	var s_arrete = (nb_cat_nat < 2)?"":"s";
	var s_risque = (risque.length < 2)?"":"s";
	var class_alert = 'simulator_hint';
	var src_img_alert = 'http://www.preventimmo.fr/wp-content/themes/preventimmo-2012/images/information_icon_24x24.png';
	var txt_alert = 'Si vous réalisez une opération immobilière (vente, location, donation, ...) sur '+(jQuery("commune", data).text())+', '+
					'vous devez joindre au contrat un Etat des Servitudes \'Risques\' et d\'Information sur les Sols (ESRIS) <strong>à jour, '+
					'datant de moins de 6 mois</strong>. '+
					'<br>En cas d\'ESRIS manquant, erroné ou périmé, <strong>votre responsabilité pourra être engagée </strong>et '+
					'l\'opération remise en cause. ';
	if( (risque.lenght == 0 || risque.lenght == undefined) && nb_cat_nat == '0' )
	{
		obligation_txt = '<p class="text-success"><strong>Non, votre commune n\'est pas concernée<br> par l\'état des servitudes risques et d\'information sur les sols !</strong></p>';
		class_alert = 'simulator_warning';
		src_img_alert = 'http://www.preventimmo.fr/wp-content/themes/preventimmo%20v3/images/warning_icon_24x24.png';
		txt_alert = 'Si vous réalisez une opération immobilière (vente, location, donation, ...) sur '+commune+', '+
					'l\'état des risques n\'est pas obligatoire. '+
					'Pour valider que vous avez respecté toutes les obligations et être certain d\'être à jour '+
					'lors de la signature de l\'opération, nous vous conseillons cependant d\'établir un état des risques.';
	}
	var static_catnat_txt_void = '<p>'+(jQuery("commune", data).text())+' n\'a subi aucune catastrophe naturelle entre 1982 et ce jour.<br>';
								 '(reconnues comme telles par arrêté interministrériel publié au Journal officiel)'+'<span class="glyphicon glyphicon-align-left" aria-hidden="true" data-toggle="tooltip" data-placement="left" title="Tooltip on left"></span></p>';
	var static_catnat_txt = (jQuery("commune", data).text())+' a subi '+nb_cat_nat+' catastrophe'+s_arrete+' naturelle'+s_arrete+' entre 1982 et ce jour. <sup data-toggle="tooltip" data-placement="left" title="reconnues comme telle'+s_arrete+' par arrêté interministrériel publié au Journal officiel"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></sup>';
	var html =  '<h3>Résultat de votre recherche sur la commune de : <strong>'+commune+'</strong></h3>'+
				'<hr>'+
				'<div class="row">'+
					'<div  class="col-md-8">'+
						'<div id="ernt_simulator_left_content" class="panel panel-default panel-simulateur">'+
							'<div class="panel-heading"><span class="badge">'+risque.length+'</span>  risque'+s_risque+' réglementé'+s_risque+' à ' +ville+ ' :</div>'+
							this.getRisqueTable(risque, jQuery("commune", data).text())+
						'</div>'+
						'<div id="ernt_simulator_right_content" class="panel panel-default panel-simulateur">'+
							'<div class="panel-heading"><span class="badge">'+nb_cat_nat+'</span> catastrophe'+s_arrete+' naturelle'+s_arrete+'  à ' +ville+ ':</div>'+
							'<div class="panel-body">'+((nb_cat_nat==0)?static_catnat_txt_void:static_catnat_txt)+'</div>'+
						'</div>'+
						'<div id="ernt_simulator_right_content" class="panel panel-default panel-simulateur">'+
							'<div class="panel-heading">Êtes-vous soumis à l\'obligation de fournir un diangostic ESRIS ?</div>'+
							'<div class="panel-body"> '+obligation_txt+'</div>'+
						'</div>'+
						'<ul id="ernt_simulator_button_container" class="list-inline">'+
							'<li><button class="btn btn-buy" id="button_icon_download"><i class="fa fa-cart-plus" aria-hidden="true"></i>Je veux obtenir maintenant mon état des risques</button></li>'+
							'<li><a class="btn btn-download" href="/etats-risques/simulateur/"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>&nbsp;Recommencer</a></li>'+
						'</ul>'+
					'</div>'+
					'<div class="col-md-4">'+
						'<div id="ernt_simulator_info" class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><strong> Important</strong> : '+txt_alert+'</div>'+
					'</div>'+
				'</div>'+
				'<div id="ernt_simulator_footer">'+
					'<p>* Les informations fournies sont données à titre indicatif et ne constituent '+
					'en aucun cas un l\'état des servitudes risques et d\'information sur les sols.</p>'+
				'</div>'
	return html;
};
/**
 *
 */
Simulation.prototype.getRisqueTable = function(risque, commune)
{
	var html = ''
	if( risque.length == 0 )
	{
		html += '<p>'+commune+' n\'est concernée par aucun risque réglementé par un plan de prévention.</p>'
	} else {
		html += '<ul id="ernt_simulator_left_content_table" class="list-inline">'
		jQuery.each(risque, function(key, value){
			html += '<li><span class="ernt_simulator_left_content_table_img"><img src="'+domaine_simulation+'/portail/images/aleas/alea_'+jQuery('alea_id', value).text()+'.jpg" width="24" height="24" class="img-circle"></span><span id="ernt_simulator_left_content_table_txt">'+jQuery('risque_txt', value).text()+'</span></li>'
		});
		html += '</ul>'
	}
	return html;
};
/**
 * Affiche un petit loader
 */
Simulation.prototype.showPatienter = function()
{
	jQuery("#ernt_simulator_patienter_content").css({ left: (jQuery(window).width()/2)-(jQuery("#ernt_simulator_patienter_content").width()/2)+'px',
												 top: (jQuery(window).height()/2)-(jQuery("#ernt_simulator_patienter_content").height()/2)+'px'});
	jQuery("#ernt_simulator_patienter").show();
};
/**
 * Cache le petit loader
 */
Simulation.prototype.hidePatienter = function()
{
	jQuery("#ernt_simulator_patienter").hide();
};
/**
 * Ferme la box
 */
Simulation.prototype.closeBox = function()
{
	jQuery("#ernt_simulator_box").fadeOut(200);
	jQuery("#ernt_simulator_patienter").fadeOut(200);
};

jQuery(document).ready(function(){
	var simul = new Simulation();
});
