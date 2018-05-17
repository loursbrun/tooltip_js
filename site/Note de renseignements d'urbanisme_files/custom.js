jQuery(document).ready(function(){
	if(!jQuery.browser)
		jQuery.browser=browser_detect();
	
	if(jQuery.browser.msie && jQuery.browser.version < 8)
		return;
	
	if(jQuery.browser.webkit || jQuery.browser.chrome || jQuery.browser.safari)
		jQuery('body').addClass('webkit');
	else if(jQuery.browser.msie)
		jQuery('body').addClass('msie');
	else if(jQuery.browser.mozilla)
		jQuery('body').addClass('mozilla');
		
	if(jQuery.browser.msie && jQuery.browser.version == 8)
		jQuery('img').removeAttr('width').removeAttr('height');
		
	if(!!('ontouchstart' in window))
		jQuery('body').addClass('touch');
	else
		jQuery('body').addClass('no-touch');

	jQuery('.portfolio-small-preview .pic a').prepend('<span class="before" />');
		
	jQuery('.big-slider-slide, .flickr_badge_image a').append('<span class="after" />');

	fix_placeholders();	
		
	responsiveListener_init();

	menu_init();

});

/***********************************/

function fix_placeholders() {
	
	var input = document.createElement("input");
  if(('placeholder' in input)==false) { 
		jQuery('[placeholder]').focus(function() {
			var i = jQuery(this);
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			var i = jQuery(this);	
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			jQuery(this).find('[placeholder]').each(function() {
				var i = jQuery(this);
				if(i.val() == i.attr('placeholder')) {
					i.val('').removeClass('placeholder').addClass('placeholder-submitting');
					if(i.hasClass('password')) {
						i.removeClass('password');
						this.type='password';
					}			
				}
			})
		});
	}
}

/***********************************/

function browser_detect() {
	
	var matched, browser;

	ua = navigator.userAgent.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	matched = {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};

	browser = {};

	if ( matched.browser ) {
		browser[ matched.browser ] = true;
		browser.version = matched.version;
	}

	if ( browser.webkit ) {
		browser.safari = true;
	}

	return browser;
}

/***********************************/

function responsiveListener_init(){
	var lastWindowSize=jQuery(window).width();
	jQuery(window).data('mobile-view',(lastWindowSize<768));
	
	jQuery(window).resize(function(){
		var w=jQuery(this).width();
		if(
			(w>=1420 && lastWindowSize < 1420) ||
			(w>=1270 && lastWindowSize < 1270) ||
			(w>=980 && lastWindowSize < 980) ||
			(w>=768 && lastWindowSize < 768) ||
			(w>=480 && lastWindowSize < 480) ||
			
			(w<=1419 && lastWindowSize > 1419) ||
			(w<=1269 && lastWindowSize > 1269) ||
			(w<=979 && lastWindowSize > 979) ||
			(w<=767 && lastWindowSize > 767) ||
			(w<=479 && lastWindowSize > 479)		
		){
			jQuery(window).data('mobile-view',(w<768));
			responsiveEvent();
		}
		lastWindowSize=w;
	});
	
}

function responsiveEvent(){
	
	sliderRewind();
	sliderCheckControl();
	isotopeCheck();
	thumbs_masonry_refresh();
	jQuery(window).scroll();
}

/*************************************/

function slider_init(){
	
	sliderCheckControl();
	
	var $box=jQuery('#big-slider-control .control-seek-box');
	var $slidesInner=jQuery('#big-slider .big-slider-inner');
	var initialPos=0;
	var initialOffset=0;
	var seekWidth=0;
	var boxWidth=0;
	var lastDirection=0;
	var lastPageX=0;
	var autoslide_direction=1;
	var autoslide_timer;
	
	var slidesWidth=0;
	var slidesPaneWidth=0;
	
	var movehandler=function(e){
		var left=initialOffset+(e.pageX-initialPos);
		if(left < 0)
			left=0;
		if(left > seekWidth-boxWidth)
			left = seekWidth-boxWidth;
		
		var percent=left/(seekWidth-boxWidth);
			
		$box.css('left',left+'px');
		var offset=(slidesPaneWidth-slidesWidth)*percent;
		$slidesInner.css('margin-left',offset+'px');
		
		lastDirection=lastPageX-e.pageX;
		lastPageX=e.pageX;
	}
	
	
	$box.mousedown(function(e){
		e.preventDefault();
		initialPos=e.pageX;
		initialOffset=parseInt($box.css('left'));
		boxWidth=$box.width();
		seekWidth=jQuery('#big-slider-control .control-seek').width();
		
		slidesWidth=jQuery('#big-slider .big-slider-uber-inner').width();
		slidesPaneWidth=jQuery('#big-slider').width();
		
		jQuery(this).addClass('pressed');

		jQuery(document).bind('mousemove',movehandler);
	});

	jQuery(document).mouseup(function(){
		if($box.hasClass('pressed')){
			$box.removeClass('pressed');
			jQuery(document).unbind('mousemove',movehandler);

			var $fs=jQuery('#big-slider .big-slider-slide:last');
			var sw=$fs.outerWidth()+parseInt($fs.css('margin-left'))+parseInt($fs.css('margin-right'));
			var ml=parseInt($slidesInner.css('margin-left'));
			if(lastDirection > 0) {
				ml=Math.ceil(ml/sw)*sw;
				if(ml > 0)
					ml=0;
			} else {
				ml=Math.floor(ml/sw)*sw;
				if(ml < slidesPaneWidth-slidesWidth)
					ml=slidesPaneWidth-slidesWidth;
			}
			$slidesInner.stop(true).animate({marginLeft: ml+'px'}, 300);
			fitBox(ml);
		}
	});
	
	/***/
	
	function fitBox(newMarginLeft){
		$box.stop(true);
		
		var percent=newMarginLeft/(slidesPaneWidth-slidesWidth);

		boxWidth=$box.width();
		seekWidth=jQuery('#big-slider-control .control-seek').width();

		var left=(seekWidth-boxWidth)*percent;
		$box.animate({left:left+'px'},300);
	}
	
	/***/
	
	jQuery('#big-slider-control .control-left').click(function(e){
		
		e.preventDefault();
		
		autoslide_direction=0;
		
		slider_scroll_left();
		
	});
	
	function slider_scroll_left() {
		
		$slidesInner.stop(true,true);
		
		var ml=parseInt($slidesInner.css('margin-left'));
		if(ml < 0)
		{
			var $fs=jQuery('#big-slider .big-slider-slide:last');
			var sw=$fs.outerWidth()+parseInt($fs.css('margin-left'))+parseInt($fs.css('margin-right'));
			ml+=sw;
			ml=Math.round(ml/sw)*sw;
			$slidesInner.animate({marginLeft: ml+'px'}, 300);
			fitBox(ml);
			
			return true;
		} else {
			return false;
		}
		
	}
	

	jQuery('#big-slider-control .control-right').click(function(e){
		
		e.preventDefault();
		
		autoslide_direction=1;
		
		slider_scroll_right();
		
	});
	
	function slider_scroll_right() {
		
		$slidesInner.stop(true,true);
		
		slidesWidth=jQuery('#big-slider .big-slider-uber-inner').width();
		slidesPaneWidth=jQuery('#big-slider').width();
		var ml=parseInt($slidesInner.css('margin-left'));
		if(isNaN(ml))
			ml=0;
		if(slidesWidth+ml > (slidesPaneWidth + 20))
		{
			var $fs=jQuery('#big-slider .big-slider-slide:last');
			var sw=$fs.outerWidth()+parseInt($fs.css('margin-left'))+parseInt($fs.css('margin-right'));
			ml-=sw;
			ml=Math.round(ml/sw)*sw;
			$slidesInner.animate({marginLeft: ml+'px'}, 300);
			fitBox(ml);
			return true;
		} else {
			return false;
		}
		
	}
	
	var autoslideTimeout=parseInt(jQuery('#big-slider').data('timeout'));
	
	function slider_set_timer() {
		clearInterval(autoslide_timer);
		autoslide_timer=setInterval(function(){
			if(autoslide_direction == 1) {
				if(!slider_scroll_right()) {
					autoslide_direction=0;
					slider_scroll_left();
				}
			} else {
				if(!slider_scroll_left()) {
					autoslide_direction=1;
					slider_scroll_right()
				}
			}
		}, autoslideTimeout);
	}
	
	if(autoslideTimeout > 0 && jQuery('body').hasClass('no-touch')) {
		
		slider_set_timer();
		
		jQuery('#big-slider-control').mouseenter(function(){
			clearInterval(autoslide_timer);
		}).mouseleave(function(){
			slider_set_timer(); 
		});
		jQuery('#big-slider').mouseenter(function(){
			clearInterval(autoslide_timer);
		}).mouseleave(function(){
			slider_set_timer();
		});
	}
	
	
	/***/
	
	/*
	var touchStartPos=-1;
	var touchStartPosY=-1;
	var sliderInnerOffset=0;
	
	jQuery('#big-slider').bind('touchstart',function(e){
		
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		touchStartPos=touch.pageX;
		touchStartPosY=touch.pageY;
		
		slidesWidth=jQuery('#big-slider .big-slider-uber-inner').width();
		slidesPaneWidth=jQuery('#big-slider').width();
		sliderInnerOffset=parseInt(jQuery('#big-slider .big-slider-inner').css('margin-left'));
	});
	
	jQuery('#big-slider').bind('touchmove',function(e){
		if(touchStartPos>=0) {

			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

			if(Math.abs(touch.pageY-touchStartPosY) < 30 ) {
				
				e.preventDefault();	
						
				var ml=sliderInnerOffset+touch.pageX-touchStartPos;
	
				if(ml > 0)
					ml=0;
				if(ml < slidesPaneWidth-slidesWidth)
					ml=slidesPaneWidth-slidesWidth;
				
				jQuery('#big-slider .big-slider-inner').css('margin-left',ml+'px');
				
				lastDirection=lastPageX-touch.pageX;
				lastPageX=touch.pageX;
				
			} else {
				event_touchend();
			}
		}
	});
	
	jQuery(document).bind('touchend', function(){
		
		event_touchend();

	});
	*/
	
	function event_touchend() {
		
		if(touchStartPos>=0) {
			
			touchStartPos=-1;
			
			var $fs=jQuery('#big-slider .big-slider-slide:last');
			var sw=$fs.outerWidth()+parseInt($fs.css('margin-left'))+parseInt($fs.css('margin-right'));
			var ml=parseInt($slidesInner.css('margin-left'));
			if(lastDirection < 0)
				ml=Math.ceil(ml/sw)*sw;
			else
				ml=Math.floor(ml/sw)*sw;
			$slidesInner.stop(true).animate({marginLeft: ml+'px'}, 300);
			
		}

	}
	
	/***/
	
	jQuery('#big-slider .big-slider-slide').mouseenter(function(){
		
		jQuery(this).find('.text-inner').stop(true,true).animate({top: '-120px'},150, function(){
			var $text=jQuery(this).find('.text-text');
			$text.stop(true,true);
			jQuery(this).css('top','120px');
			$text.css('top','30px');
			jQuery(this).animate({top: 0},150);
			$text.animate({top: 0},350);
		});
		
	});
}

function sliderRewind() {
	var $box=jQuery('#big-slider-control .control-seek-box');
	var $slidesInner=jQuery('#big-slider .big-slider-inner');

	$box.css('left',0);
	$slidesInner.css('margin-left',0);
	
}

function sliderCheckControl() {

	var sn=jQuery('#big-slider .big-slider-slide').length;
	var w=jQuery(window).width();

	if((sn < 4 && w >=768) || (sn == 1 && w < 768)) {
		jQuery('#big-slider-control').hide();
	} else {
		jQuery('#big-slider-control').show();
	}

}

/******************************************/
function menu_init(){

	if(!!('ontouchstart' in window)) {
		jQuery('.primary-menu li ul').each(function(){
			jQuery(this).parent().addClass('touch-childs').children('a').bind('touchstart',function(e){
				if(jQuery(this).parent().hasClass('active')) {
					menu_close(jQuery(this).parent().get(0));
				} else {				
					e.preventDefault();
					e.stopPropagation();

					jQuery(this).parent().parents('li.menu-item').addClass('thouch-not-to-close');
					jQuery('.primary-menu li.touch-childs').each(function(){
						if(!jQuery(this).hasClass('thouch-not-to-close'))
							menu_close(this);
					});
					jQuery('.primary-menu li.thouch-not-to-close').removeClass('thouch-not-to-close');
					
					menu_open(jQuery(this).parent().get(0));
				}
			}).mouseleave(function(){
				menu_close(this);
			});
		});
	} else {
		jQuery('.primary-menu li ul').each(function(){
			jQuery(this).parent().mouseenter(function(){
				menu_open(this);
			}).mouseleave(function(){
				menu_close(this);
			});
		});
	}
	
}

function menu_open(obj) {
	
	var $ul=jQuery(obj).addClass('active').children('ul');
	if(jQuery('body').hasClass('no-touch')) {
		$ul.children('li').stop(true).css('opacity',0);
		$ul.stop(true,true).delay(150).slideDown(200,function(){
			var i=0;
			jQuery(this).children('li').each(function(){
				jQuery(this).fadeTo(100+100*i,1);
				i++;
			});
		});
	} else {
		$ul.stop(true,true).delay(150).slideDown(200);
	}
	
}

function menu_close(obj) {
	jQuery(obj).removeClass('active');
	jQuery(obj).children('ul').stop(true,true).fadeOut(300);
}
