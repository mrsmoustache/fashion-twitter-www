// Plugins
/* _________________________________________________

1.console.log
2.jQuery Helper
3.smartResize
4.DDE Namespace base
5.helper.js
6.iscroll lite
7.jQuery hashchange plugin
8.timeago plugin

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
	if($(oldEl).is(':animated')) { return false; };
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	/* Since we just removed the old element from the DOM, return a reference
	to the new element, which can be used to restore variable references. */
	return newEl;
};

DDE.hashBasePointer = function ( locationHash ) {
	var hash = locationHash;
	var match = hash.match(/\/[A-Za-z1-9-]*\//);
	var base = match ? match[0] : '';
	
	//pointer is our sub-subdirectory e.g. marcjacobs of /designers/marcjacobs/
	var pointerPattern = new RegExp('#!'+base);
	var point = hash.replace(pointerPattern, '').replace(/\//, '');
	if (!point) point = '';
	
	return {hashBase: base, pointer: point};
};

DDE.getTheMonth = function(date) {
	
	myMonths= ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
	
	myDate=new Date(eval('"'+date+'"'));
	
	return myMonths[myDate.getMonth()];

};

DDE.getClockTime = function(date) {

   var hour   = date.getHours();
   var minute = date.getMinutes();
   //var second = date.getSeconds();
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   //if (hour   < 10) { hour   = "0" + hour;   }
   if (minute < 10) { minute = "0" + minute; }
   //if (second < 10) { second = "0" + second; }
   var timeString = hour +
					':' +
					minute +
					//':' +
					//second +
					" " +
					ap;
   return timeString;
};

DDE.parseDate = function(str) {
  var v=str.split(' ');
  return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
} 

DDE.ISODateString = function(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'}

//IE dynamic max-height
DDE.setMaxHeight = function(elem, height){
	elem.style.height = (elem.scrollHeight > (height - 1)) ? height + "px" : "auto";
}

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
		if (reset) {
			this.style['-webkit-animation-name'] = 'none'; //this needs to be left in for the fill-mode to work
			this.style['-webkit-animation-fill-mode'] = '';
		}
		this.style['-webkit-animation-duration'] = '';
		this.style['-webkit-animation-delay'] = ''
		this.style['-webkit-animation-iteration-count'] = '';
		this.style['-webkit-animation-timing-function'] = '';
		
		//optional: set element style after animation complete
		if (animation == "fade-out") this.style.display = "none";
		
		this.removeEventListener("webkitAnimationEnd", animationCallback, false);
		
		if (props) {
			for (p in props) {
				this.style[p] = props[p];
			}
		}
		if (callback) {
			return callback.call();
		}
		
	}, duration, easingType, callback, delay, props, reset;
	
	if (options.speed == null) duration = 200;
	else duration = options.speed;
	
	if (options.delay == null) delay = 0;
	else delay = options.delay;
		
	if (options.easing == null) easingType = 'ease-out';
	else easingType = options.easing;
	
	if (options.complete && typeof options.complete == 'function') callback = options.complete;
	
	if (options.props) props = options.props;
	
	if (options.reset) reset = true;
	
	if (animation == "fade-in") {
		elem.style.display = "block";
	}
	
	elem.addEventListener("webkitAnimationEnd", animationCallback, false);
	//elem.style.display = "block";
	elem.style['-webkit-animation-name'] = animation;
	elem.style['-webkit-animation-delay'] = delay+'ms';
	elem.style['-webkit-animation-duration'] = duration+'ms';
	elem.style['-webkit-animation-iteration-count'] = '1';
	elem.style['-webkit-animation-fill-mode'] = 'forwards';
	elem.style['-webkit-animation-timing-function'] = easingType;
}

DDE.fadeIn = function(elem, ops) {
	var options = {};
	if (ops && ops.complete) options.complete = ops.complete;
	if (ops && ops.speed) options.speed = ops.speed;
	if (ops && ops.delay) options.delay = ops.delay;
	if (ops && ops.props) options.props = ops.props;
	if (options.props) options.props.opacity = 1;
	else options.props = {opacity: 1};
	
	options.reset = true;
	
	this.cssAnimation(elem, 'fade-in', options);
}

DDE.fadeOut = function(elem, ops) {
	var options = {};
	if (ops && ops.complete) options.complete = ops.complete;
	if (ops && ops.speed) options.speed = ops.speed;
	if (ops && ops.delay) options.delay = ops.delay;
	if (ops && ops.props) options.props = ops.props;
	if (options.props) options.props.opacity = 0;
	else options.props = {opacity: 0};
	options.reset = true;
	
	this.cssAnimation(elem, 'fade-out', options);
}

DDE.cssTransition = function (elem, props, options) {
	var animationCallback = function (e) {
		this.style['-webkit-transition-property'] = 'none';
		this.style['-webkit-transition-duration'] = '';
		this.style['-webkit-transform'] = 'none';
		
		for (p in props) {
			this.style[p] = props[p] + 'px';
		}
		
		this.removeEventListener("webkitTransitionEnd", animationCallback, false);
		
		if (callback) {
			return callback.call();
		}
		
	}, duration, easingType, callback, transX = 0, transY = 0;
	
	if (options.speed == null) duration = 200;
	else duration = options.speed;
	
	if (options.easing == null) easingType = 'ease-out';
	else easingType = options.easing;
	
	if (options.complete && typeof options.complete == 'function') callback = options.complete;
	
	for (p in props) {
		if (p == "top") {
			transY = props[p] - parseInt(window.getComputedStyle(elem, null).getPropertyValue("top"));
		}
		
		if (p == "left") {
			var startLeft = window.getComputedStyle(elem, null).getPropertyValue("left");
			transX = startLeft == "auto" ? props[p] - 0 : props[p] - parseInt(startLeft);
		}
	}
	
	elem.addEventListener("webkitTransitionEnd", animationCallback, false);
	//elem.style.display = "block";
	//elem.style.position = "relative";
	elem.style['-webkit-transition-property'] = '-webkit-transform';
	elem.style['-webkit-transform'] = 'translate3d('+transX+'px,'+transY+'px,0)';
	elem.style['-webkit-transition-duration'] = duration+'ms';
	elem.style['-webkit-transition-timing-function'] = easingType;
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
	    /mobile/i.test(navigator.userAgent) && !pageYOffset && setTimeout(function () {
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
	    //this.element.style.backgroundColor = "rgba(0,0,0,.05)";
	    this.element.className+= ' pressed';
	};
	
	MBP.fastButton.prototype.onTouchMove = function(event) {
	    if(Math.abs(event.touches[0].clientX - this.startX) > 5 || Math.abs(event.touches[0].clientY - this.startY) > 5) {
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
	    this.element.className = this.element.className.replace(/ ?pressed/gi, '');
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


/* 6.iscroll lite */
/*!
 * iScroll Lite base on iScroll v4.1.6 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */

(function(){
var m = Math,
	vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
		'opera' in window ? 'O' : '',

	// Browser capabilities
	has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
	hasTouch = 'ontouchstart' in window,
	hasTransform = vendor + 'Transform' in document.documentElement.style,
	isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
	isPlaybook = (/playbook/gi).test(navigator.appVersion),
	hasTransitionEnd = isIDevice || isPlaybook,
	nextFrame = (function() {
	    return window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| function(callback) { return setTimeout(callback, 17); }
	})(),
	cancelFrame = (function () {
	    return window.cancelRequestAnimationFrame
			|| window.webkitCancelRequestAnimationFrame
			|| window.mozCancelRequestAnimationFrame
			|| window.oCancelRequestAnimationFrame
			|| window.msCancelRequestAnimationFrame
			|| clearTimeout
	})(),

	// Events
	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',

	// Helpers
	trnOpen = 'translate' + (has3d ? '3d(' : '('),
	trnClose = has3d ? ',0)' : ')',

	// Constructor
	iScroll = function (el, options) {
		var that = this,
			doc = document,
			i;

		that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
		that.wrapper.style.overflow = 'hidden';
		that.scroller = that.wrapper.children[0];

		// Default options
		that.options = {
			hScroll: true,
			vScroll: true,
			bounce: true,
			bounceLock: false,
			momentum: true,
			lockDirection: true,
			useTransform: true,
			useTransition: false,

			// Events
			onRefresh: null,
			onBeforeScrollStart: function (e) { e.preventDefault(); },
			onScrollStart: null,
			onBeforeScrollMove: null,
			onScrollMove: null,
			onBeforeScrollEnd: null,
			onScrollEnd: null,
			onTouchEnd: null,
			onDestroy: null
		};

		// User defined options
		for (i in options) that.options[i] = options[i];

		// Normalize options
		that.options.useTransform = hasTransform ? that.options.useTransform : false;
		that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
		that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
		that.options.useTransition = hasTransitionEnd && that.options.useTransition;

		// Set some default styles
		that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
		that.scroller.style[vendor + 'TransitionDuration'] = '0';
		that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
		if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
		
		if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + '0,0' + trnClose;
		else that.scroller.style.cssText += ';position:absolute;top:0;left:0';
				
		that.refresh();

		that._bind(RESIZE_EV, window);
		that._bind(START_EV);
		if (!hasTouch) that._bind('mouseout', that.wrapper);
	};

// Prototype
iScroll.prototype = {
	enabled: true,
	x: 0,
	y: 0,
	steps: [],
	scale: 1,
	
	handleEvent: function (e) {
		var that = this;
		switch(e.type) {
			case START_EV:
				if (!hasTouch && e.button !== 0) return;
				that._start(e);
				break;
			case MOVE_EV: that._move(e); break;
			case END_EV:
			case CANCEL_EV: that._end(e); break;
			case RESIZE_EV: that._resize(); break;
			case 'mouseout': that._mouseout(e); break;
			case 'webkitTransitionEnd': that._transitionEnd(e); break;
		}
	},

	_resize: function () {
		this.refresh();
	},
	
	_pos: function (x, y) {
		x = this.hScroll ? x : 0;
		y = this.vScroll ? y : 0;

		if (this.options.useTransform) {
			this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
		} else {
			x = m.round(x);
			y = m.round(y);
			this.scroller.style.left = x + 'px';
			this.scroller.style.top = y + 'px';
		}

		this.x = x;
		this.y = y;
	},

	_start: function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			matrix, x, y;
			
		if (!that.enabled) return;

		if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
		
		if (that.options.useTransition) that._transitionTime(0);

		that.moved = false;
		that.animating = false;
		that.zoomed = false;
		that.distX = 0;
		that.distY = 0;
		that.absDistX = 0;
		that.absDistY = 0;
		that.dirX = 0;
		that.dirY = 0;

		if (that.options.momentum) {
			if (that.options.useTransform) {
				// Very lame general purpose alternative to CSSMatrix
				matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
				x = matrix[4] * 1;
				y = matrix[5] * 1;
			} else {
				x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
				y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
			}
			
			if (x != that.x || y != that.y) {
				if (that.options.useTransition) that._unbind('webkitTransitionEnd');
				else cancelFrame(that.aniTime);
				that.steps = [];
				that._pos(x, y);
			}
		}

		that.absStartX = that.x;	// Needed by snap threshold
		that.absStartY = that.y;

		that.startX = that.x;
		that.startY = that.y;
		that.pointX = point.pageX;
		that.pointY = point.pageY;

		that.startTime = e.timeStamp || (new Date()).getTime();

		if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

		that._bind(MOVE_EV);
		that._bind(END_EV);
		that._bind(CANCEL_EV);
	},
	
	_move: function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			deltaX = point.pageX - that.pointX,
			deltaY = point.pageY - that.pointY,
			newX = that.x + deltaX,
			newY = that.y + deltaY,
			timestamp = e.timeStamp || (new Date()).getTime();

		if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

		that.pointX = point.pageX;
		that.pointY = point.pageY;

		// Slow down if outside of the boundaries
		if (newX > 0 || newX < that.maxScrollX) {
			newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
		}
		if (newY > 0 || newY < that.maxScrollY) { 
			newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= 0 || that.maxScrollY >= 0 ? 0 : that.maxScrollY;
		}

		if (that.absDistX < 6 && that.absDistY < 6) {
			that.distX += deltaX;
			that.distY += deltaY;
			that.absDistX = m.abs(that.distX);
			that.absDistY = m.abs(that.distY);

			return;
		}

		// Lock direction
		if (that.options.lockDirection) {
			if (that.absDistX > that.absDistY + 5) {
				newY = that.y;
				deltaY = 0;
			} else if (that.absDistY > that.absDistX + 5) {
				newX = that.x;
				deltaX = 0;
			}
		}

		that.moved = true;
		that._pos(newX, newY);
		that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if (timestamp - that.startTime > 300) {
			that.startTime = timestamp;
			that.startX = that.x;
			that.startY = that.y;
		}
		
		if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
	},
	
	_end: function (e) {
		if (hasTouch && e.touches.length != 0) return;

		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			target, ev,
			momentumX = { dist:0, time:0 },
			momentumY = { dist:0, time:0 },
			duration = (e.timeStamp || (new Date()).getTime()) - that.startTime,
			newPosX = that.x,
			newPosY = that.y,
			newDuration;

		that._unbind(MOVE_EV);
		that._unbind(END_EV);
		that._unbind(CANCEL_EV);

		if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

		if (!that.moved) {
			if (hasTouch) {
				// Find the last touched element
				target = point.target;
				while (target.nodeType != 1) target = target.parentNode;

				if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
					ev = document.createEvent('MouseEvents');
					ev.initMouseEvent('click', true, true, e.view, 1,
						point.screenX, point.screenY, point.clientX, point.clientY,
						e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
						0, null);
					ev._fake = true;
					target.dispatchEvent(ev);
				}
			}

			that._resetPos(200);

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		if (duration < 300 && that.options.momentum) {
			momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
			momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

			newPosX = that.x + momentumX.dist;
			newPosY = that.y + momentumY.dist;

 			if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
 			if ((that.y > 0 && newPosY > 0) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
		}

		if (momentumX.dist || momentumY.dist) {
			newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

			that.scrollTo(newPosX, newPosY, newDuration);

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		that._resetPos(200);
		if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
	},
	
	_resetPos: function (time) {
		var that = this,
			resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
			resetY = that.y >= 0 || that.maxScrollY > 0 ? 0 : that.y < that.maxScrollY ? that.maxScrollY : that.y;

		if (resetX == that.x && resetY == that.y) {
			if (that.moved) {
				if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
				that.moved = false;
			}

			return;
		}

		that.scrollTo(resetX, resetY, time || 0);
	},
	
	_mouseout: function (e) {
		var t = e.relatedTarget;

		if (!t) {
			this._end(e);
			return;
		}

		while (t = t.parentNode) if (t == this.wrapper) return;
		
		this._end(e);
	},

	_transitionEnd: function (e) {
		var that = this;

		if (e.target != that.scroller) return;

		that._unbind('webkitTransitionEnd');
		
		that._startAni();
	},

	/**
	 *
	 * Utilities
	 *
	 */
	_startAni: function () {
		var that = this,
			startX = that.x, startY = that.y,
			startTime = (new Date).getTime(),
			step, easeOut;

		if (that.animating) return;

		if (!that.steps.length) {
			that._resetPos(400);
			return;
		}

		step = that.steps.shift();

		if (step.x == startX && step.y == startY) step.time = 0;

		that.animating = true;
		that.moved = true;

		if (that.options.useTransition) {
			that._transitionTime(step.time);
			that._pos(step.x, step.y);
			that.animating = false;
			if (step.time) that._bind('webkitTransitionEnd');
			else that._resetPos(0);
			return;
		}

		(function animate () {
			var now = (new Date).getTime(),
				newX, newY;

			if (now >= startTime + step.time) {
				that._pos(step.x, step.y);
				that.animating = false;
				if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
				that._startAni();
				return;
			}

			now = (now - startTime) / step.time - 1;
			easeOut = m.sqrt(1 - now * now);
			newX = (step.x - startX) * easeOut + startX;
			newY = (step.y - startY) * easeOut + startY;
			that._pos(newX, newY);
			if (that.animating) that.aniTime = nextFrame(animate);
		})();
	},

	_transitionTime: function (time) {
		this.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
	},
	
	_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
		var deceleration = 0.0006,
			speed = m.abs(dist) / time,
			newDist = (speed * speed) / (2 * deceleration),
			newTime = 0, outsideDist = 0;

		// Proportinally reduce speed if we are outside of the boundaries 
		if (dist > 0 && newDist > maxDistUpper) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistUpper = maxDistUpper + outsideDist;
			speed = speed * maxDistUpper / newDist;
			newDist = maxDistUpper;
		} else if (dist < 0 && newDist > maxDistLower) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistLower = maxDistLower + outsideDist;
			speed = speed * maxDistLower / newDist;
			newDist = maxDistLower;
		}

		newDist = newDist * (dist < 0 ? -1 : 1);
		newTime = speed / deceleration;

		return { dist: newDist, time: m.round(newTime) };
	},

	_offset: function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;
			
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		} 

		return { left: left, top: top };
	},

	_bind: function (type, el, bubble) {
		(el || this.scroller).addEventListener(type, this, !!bubble);
	},

	_unbind: function (type, el, bubble) {
		(el || this.scroller).removeEventListener(type, this, !!bubble);
	},


	/**
	 *
	 * Public methods
	 *
	 */
	destroy: function () {
		var that = this;

		that.scroller.style[vendor + 'Transform'] = '';

		// Remove the event listeners
		that._unbind(RESIZE_EV, window);
		that._unbind(START_EV);
		that._unbind(MOVE_EV);
		that._unbind(END_EV);
		that._unbind(CANCEL_EV);
		that._unbind('mouseout', that.wrapper);
		if (that.options.useTransition) that._unbind('webkitTransitionEnd');
		
		if (that.options.onDestroy) that.options.onDestroy.call(that);
	},

	refresh: function () {
		var that = this,
			offset;

		that.wrapperW = that.wrapper.clientWidth;
		that.wrapperH = that.wrapper.clientHeight;

		that.scrollerW = that.scroller.offsetWidth;
		that.scrollerH = that.scroller.offsetHeight;
		that.maxScrollX = that.wrapperW - that.scrollerW;
		that.maxScrollY = that.wrapperH - that.scrollerH;
		that.dirX = 0;
		that.dirY = 0;

		that.hScroll = that.options.hScroll && that.maxScrollX < 0;
		that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

		offset = that._offset(that.wrapper);
		that.wrapperOffsetLeft = -offset.left;
		that.wrapperOffsetTop = -offset.top;


		that.scroller.style[vendor + 'TransitionDuration'] = '0';

		that._resetPos(200);
	},

	scrollTo: function (x, y, time, relative) {
		var that = this,
			step = x,
			i, l;

		that.stop();

		if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
		
		for (i=0, l=step.length; i<l; i++) {
			if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
			that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
		}

		that._startAni();
	},

	scrollToElement: function (el, time) {
		var that = this, pos;
		el = el.nodeType ? el : that.scroller.querySelector(el);
		if (!el) return;

		pos = that._offset(el);
		pos.left += that.wrapperOffsetLeft;
		pos.top += that.wrapperOffsetTop;

		pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
		pos.top = pos.top > 0 ? 0 : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
		time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

		that.scrollTo(pos.left, pos.top, time);
	},

	disable: function () {
		this.stop();
		this._resetPos(0);
		this.enabled = false;

		// If disabled after touchstart we make sure that there are no left over events
		this._unbind(MOVE_EV);
		this._unbind(END_EV);
		this._unbind(CANCEL_EV);
	},
	
	enable: function () {
		this.enabled = true;
	},
	
	stop: function () {
		cancelFrame(this.aniTime);
		this.steps = [];
		this.moved = false;
		this.animating = false;
	}
};

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})();


/* 7.jQuery hashchange plugin */
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);

//////////////////////////////////////////////
/*
8.timeago plugin
*/
////////////////////////////////////////////
/*
 * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
        distanceMillis = Math.abs(distanceMillis);
      }

      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(" "));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
        element.attr("title", '');
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));





