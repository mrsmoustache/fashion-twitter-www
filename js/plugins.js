// Plugins
/* _________________________________________________

1.console.log
2.jQuery Helper
3.smartResize
4.DDE Namespace base
5.helper.js

*/

/* 1.console.log */

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
log.history = log.history || [];   // store logs to an array for reference
log.history.push(arguments);
arguments.callee = arguments.callee.caller; 
if(this.console) console.log( Array.prototype.slice.call(arguments) );
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info, log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

/* 2.jQuery Helper */

// jQuery/helper plugins

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
 
;(function($) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea');
	if (isInputSupported && isTextareaSupported) {
		$.fn.placeholder = function() {
			return this;
		};
		$.fn.placeholder.input = $.fn.placeholder.textarea = true;
	} else {
		$.fn.placeholder = function() {
			return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.bind('focus.placeholder', clearPlaceholder)
				.bind('blur.placeholder', setPlaceholder)
			.trigger('blur.placeholder').end();
		};
		$.fn.placeholder.input = isInputSupported;
		$.fn.placeholder.textarea = isTextareaSupported;
	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder() {
		var $input = $(this);
		if ($input.val() === $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input.hide().next().attr('id', $input.removeAttr('id').data('placeholder-id')).show().focus();
			} else {
				$input.val('').removeClass('placeholder');
			}
		}
	}

	function setPlaceholder(elem) {
		var $replacement,
		    $input = $(this),
		    $origInput = $input,
		    id = this.id;
		if ($input.val() === '') {
			if ($input.is(':password')) {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ type: 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { type: 'text' }));
					}
					$replacement
						.removeAttr('name')
						// We could just use the `.data(obj)` syntax here, but that wouldn’t work in pre-1.4.3 jQueries
						.data('placeholder-password', true)
						.data('placeholder-id', id)
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data('placeholder-textinput', $replacement)
						.data('placeholder-id', id)
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
			}
			$input.addClass('placeholder').val($input.attr('placeholder'));
		} else {
			$input.removeClass('placeholder');
		}
	}

	$(function() {
		// Look for forms
		$('form').bind('submit.placeholder', function() {
			// Clear the placeholder values so they don’t get submitted
			var $inputs = $('.placeholder', this).each(clearPlaceholder);
			setTimeout(function() {
				$inputs.each(setPlaceholder);
			}, 10);
		});
	});

	// Clear placeholder values upon page reload
	$(window).bind('unload.placeholder', function() {
		$('.placeholder').val('');
	});

}(jQuery));

/* 3.smartResize */
/*
 * smartresize: debounced resize event for jQuery
 *
 * latest version and complete READDE available on Github:
 * https://github.com/lrbabe/jquery.smartresize.js
 *
 * Copyright 2011 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var event = $.event,
	resizeTimeout;

event.special[ "smartresize" ] = {
	setup: function() {
		$( this ).bind( "resize", event.special.smartresize.handler );
	},
	teardown: function() {
		$( this ).unbind( "resize", event.special.smartresize.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments;

		// set correct event type
        event.type = "smartresize";

		if(resizeTimeout)
			clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			jQuery.event.handle.apply( context, args );
		}, execAsap === "execAsap"? 0 : 100);
	}
}

$.fn.smartresize = function( fn ) {
	return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
};

})(jQuery);


/* 4.DDE Namespace base */

//Creating Namespaces
//http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    

    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
}

namespace('DDE');



//http://blog.stevenlevithan.com/archives/faster-than-innerhtml
DDE.replaceHtml = function (el, html) {
	var oldEl = typeof el === "string" ? document.getElementById(el) : el;
	/*@cc_on // Pure innerHTML is slightly faster in IE
		oldEl.innerHTML = html;
		return oldEl;
	@*/
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	/* Since we just removed the old element from the DOM, return a reference
	to the new element, which can be used to restore variable references. */
	return newEl;
};

/*
touchSupport
*/

DDE.isEventSupported = function (eventName) {
	var el = document.createElement('div');
	eventName = 'on' + eventName;
	var isSupported = (eventName in el);
	if (!isSupported) {
		el.setAttribute(eventName, 'return;');
		isSupported = typeof el[eventName] == 'function';
	}
	el = null;
	return isSupported;
}

DDE.touchStart = DDE.isEventSupported("touchstart") ? "touchstart" : "mousedown";
DDE.touchMove = DDE.isEventSupported("touchmove") ? "touchmove" : "mousemove";
DDE.touchEnd = DDE.isEventSupported("touchend") ? "touchend" : "mouseup";

/*
CSS Browser Prefixes
*/

DDE.cssPrefixes = ["", "webkit", "ms", "O", "Moz"];

DDE.applyCSSPrefix = function(elem, prop, value){
	var count = cssPrefixes.length;

	for (var i=0; i<count; i++) {
		var prefix = cssPrefixes[i];
		elem.style[''+prefix+prop] = value;
	}
}



/* 
CSS Animation Helpers
*/
DDE.cssPrefixes = ["", "webkit", "ms", "O", "Moz"];

DDE.cssAnimation = function(elem, animation, options) {
	//Use predefined css animations in style.css to avoid extra overhead of dynamically injecting <style> nodes
	var animationCallback = function(e) {
		this.style['-webkit-animation-name'] = 'none';
		this.style['-webkit-animation-duration'] = '';
		this.style['-webkit-animation-iteration-count'] = '';
		this.style['-webkit-animation-timing-function'] = '';
		
		//optional: set element style after animation complete
		if (animation == "fade-out") this.style.display = "none";
		
		this.removeEventListener("webkitAnimationEnd", animationCallback, false);
		
		if (callback) {
			return callback.call();
		}
		
	}, duration, easingType, callback;
	
	if (options.speed == null) duration = 200;
	else duration = options.speed;
	
	if (options.easing == null) easingType = 'ease-out';
	else easingType = options.easing;
	
	if (options.complete && typeof options.complete == 'function') callback = options.complete;
	
	if (animation == "fade-in") {
		elem.style.display = "block";
	}
	
	elem.addEventListener("webkitAnimationEnd", animationCallback, false);
	//elem.style.display = "block";
	elem.style['-webkit-animation-name'] = animation;
	elem.style['-webkit-animation-duration'] = duration+'ms';
	elem.style['-webkit-animation-iteration-count'] = '1';
	elem.style['-webkit-animation-timing-function'] = easingType;
}

DDE.fadeIn = function(elem, speed, callback) {
	var options = {};
	if (callback) options = {complete: callback};
	this.cssAnimation(elem, 'fade-in', options);
}

DDE.fadeOut = function(elem, speed, callback) {
	var options = {};
	if (callback) options = {complete: callback};
	this.cssAnimation(elem, 'fade-out', options);
}

DDE.fpsCounter = function() {
	var fps = 0, now, lastUpdate = (new Date)*1 - 1;

	// The higher this value, the less the FPS will be affected by quick changes
	// Setting this to 1 will show you the FPS of the last sampled frame only
	var fpsFilter = 50;
	
	var drawFrame = function (){
	  // ... draw the frame ...
	
	  var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
	 if (isNaN(thisFrameFPS)) thisFrameFPS = 0;
	  
	  fps += (thisFrameFPS - fps) / fpsFilter;
	  if (isNaN(fps)) fps = 0;
	  lastUpdate = now;
	
	  setTimeout( drawFrame, 16 );
	};
	
	drawFrame();
	
	var fpsOut = document.getElementById('fps');
	setInterval(function(){
	  fpsOut.innerHTML = Math.round(fps) + " fps";
	}, 1000); 
}

/* 5.helper.js */
/*
 * MBP - Mobile boilerplate helper functions
 */


if (DDE.isEventSupported("touchstart")) {
	window.MBP = window.MBP || {}; 
 
	// Hide URL Bar for iOS
	// http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
	
	MBP.hideUrlBar = function () {
	    /mobile/i.test(navigator.userAgent) && !pageYOffset && !location.hash && setTimeout(function () {
	    window.scrollTo(0, 1);
	    }, 1000);
	}
	
	
	// Fast Buttons
	// http://code.google.com/mobile/articles/fast_buttons.html
	
	MBP.fastButton = function (element, handler) {
	    this.element = element;
	    this.handler = handler;
	    element.addEventListener('touchstart', this, false);
	    element.addEventListener('click', this, false);
	};
	
	MBP.fastButton.prototype.handleEvent = function(event) {
	    switch (event.type) {
	        case 'touchstart': this.onTouchStart(event); break;
	        case 'touchmove': this.onTouchMove(event); break;
	        case 'touchend': this.onClick(event); break;
	        case 'click': this.onClick(event); break;
	    }
	};
	
	MBP.fastButton.prototype.onTouchStart = function(event) {
	    event.stopPropagation();
	    this.element.addEventListener('touchend', this, false);
	    document.body.addEventListener('touchmove', this, false);
	    this.startX = event.touches[0].clientX;
	    this.startY = event.touches[0].clientY;
	    this.element.style.backgroundColor = "rgba(0,0,0,.7)";
	};
	
	MBP.fastButton.prototype.onTouchMove = function(event) {
	    if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
	        this.reset();
	    }
	};
	MBP.fastButton.prototype.onClick = function(event) {
	    event.stopPropagation();
	    this.reset();
	    this.handler(event);
	    if(event.type == 'touchend') {
	        MBP.preventGhostClick(this.startX, this.startY);
	    }
	    this.element.style.backgroundColor = "";
	};
	MBP.fastButton.prototype.reset = function() {
	    this.element.removeEventListener('touchend', this, false);
	    document.body.removeEventListener('touchmove', this, false);
	    this.element.style.backgroundColor = "";
	};
	MBP.preventGhostClick = function (x, y) {
	    MBP.coords.push(x, y);
	    window.setTimeout(function (){
	        MBP.coords.splice(0, 2);
	    }, 2500);
	};
	;
	MBP.ghostClickHandler = function (event) {
	    for(var i = 0, len = MBP.coords.length; i < len; i += 2) {
	        var x = MBP.coords[i];
	        var y = MBP.coords[i + 1];
	        if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
	            event.stopPropagation();
	            event.preventDefault();
	        }
	    }
	};
	document.addEventListener('click', MBP.ghostClickHandler, true);
	MBP.coords = [];
	
	
	// iOS Startup Image
	// https://github.com/shichuan/mobile-html5-boilerplate/issues#issue/2
	
	MBP.splash = function () {
	  var filename = navigator.platform === 'iPad' ? 'h/' : 'l/';
	  document.write('<link rel="apple-touch-startup-image" href="/img/' + filename + 'splash.png" />' );
	}
	
	
	// Autogrow
	// http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
	
	MBP.autogrow = function (element, lh) {
	    
	    function handler(e){
	        var newHeight = this.scrollHeight,
	            currentHeight = this.clientHeight;
	        if (newHeight > currentHeight) {
	            this.style.height = newHeight + 3 * textLineHeight + "px";
	        }
	    }
	    
	    var setLineHeight = (lh) ? lh : 12,
	        textLineHeight = element.currentStyle ? element.currentStyle.lineHeight : 
	                         getComputedStyle(element, null).lineHeight;
	                         
	    textLineHeight = (textLineHeight.indexOf("px") == -1) ? setLineHeight :
	                     parseInt(textLineHeight, 10);
	
	    element.style.overflow = "hidden";
	    element.addEventListener ? element.addEventListener('keyup', handler, false) :
	                               element.attachEvent('onkeyup', handler);
	}
}




