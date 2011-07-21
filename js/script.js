if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
var viewportmeta = document.querySelectorAll('meta[name="viewport"]')[0];
if (viewportmeta) {
viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
document.body.addEventListener('gesturestart', function() {
viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
}, false);
}
}

//prevent console.logs from breaking script in wp7
try { console.log("console"); }
catch(e){ console={log: function(){ return; }}}

(function(){

$(window).load(function(){
	if (window.MBP) MBP.hideUrlBar();
	setTimeout(function(){
		tweetYvent.setScreenSizes();
	},1000);
		
});

$(document).ready(function(){
	
	tweetYvent.initSelectors();
	
	tweetYvent.setScreenSizes();
	
	tweetYvent.loadView();
	
});

DDE.TweetYvent = function(){

	var that = this;
	that.globals = {
		connected: false,
		RETRY_INTERVAL: 10000,
		socketInterval: null,
		nodeServer: "http://"+nodeDomain+":8080",
		$chartCountNodes: null,
		$tableRows: null,
		listCountNodes: [], //cache references to tweetcount nodes in the nav list
		tweetUpdates: 0,
		maxRainPerEvent: 10,
		cssAnimationOn: false,
		lastBodyHeight: 0,
		lastWindowWidth: 0,
		lastWindowHeight: 0,
		chartHeight: 0,
		currView: null
	};
	
	this.browserCheck = function(){
		if (navigator.userAgent.match(/Blackberry/i)) {
			if(navigator.userAgent.match(/\/6\./i)) {
				$body.addClass('bb6');
			} else {
				$body.addClass('bb5');
				
			}
		}
	},
	
	this.compareBiggest = function(a,b) {
		return b-a;
	}
        
};

DDE.TweetYvent.prototype = {
    
	initSelectors: function() {
		var tg = this.globals;
		tg.$body = $('body');
		
		this.browserCheck();
		
		//Modernizr Feature Detection
		if (Modernizr.cssanimations) tg.cssAnimationOn = true;
		
		//cache global selectors
		tg.$headerB = $('header b');
		tg.$listNav = $('ol.nav');
		tg.$chartDiv = $('#chart');
		tg.$content = $('div.content');
	},
	
	setScreenSizes: function() {
		var tg = this.globals;
		tg.lastWindowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
		tg.lastWindowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
		
		//console.log("document.documentElement.clientHeight: "+document.documentElement.clientHeight);
		//console.log("document.documentElement.clientWidth: "+document.documentElement.clientWidth);
		//console.log("screen.width: "+screen.width);
		//console.log("screen.height: "+screen.height);
		//console.log("window.innerHeight: "+window.innerHeight);
		
		//Default
		tg.chartHeight = (DDE.maxHeight+20);
		if (tg.$schedulePopup) {
			tg.$schedulePopup[0].style.display = '';
			tg.$schedulePopup.click(function(e){
				if (tg.cssAnimationOn) {
					DDE.fadeOut(this, 400, function(){
						tg.$schedulePopup[0].style.display = '';
					});
				} else {
					$(this).fadeOut();
				}
			});
		}
		
		//1802
		if (tg.lastWindowWidth >= 1802) { 
		
			tg.chartHeight = (DDE.maxHeight+20)*3.5; 
		
		//1382	
		} else if (tg.lastWindowWidth >= 1382) { 
		
			tg.chartHeight = (DDE.maxHeight+20)*2.5;
		
		//992
		} else if (tg.lastWindowWidth >= 992) {
			
			if (tg.$schedulePopup) {
				tg.$schedulePopup.unbind();
			}
		
		//768	
		} else if (tg.lastWindowWidth >= 768) { 
		
			tg.chartHeight = (DDE.maxHeight+20)*2;
			
		}
	},
	
	loadView: function() {
		
		var tg = this.globals;
		var pathname = location.pathname.replace(/\/node-projects\/tweet-event-map\/public_html\//, '/');
		
		if (pathname.match(/designers/g)) pathname = '/designers/';
				
		switch(pathname){
			case "/":
				tg.currView = new this.MainView(this);
				break;
				
			case "/schedule/":
				//scheduleView();
				break;
				
			case "/designers/":
				//TODO: finish fetchImgURLs 
				//fetchImgUrls();
				makeTabs();
				break;
			
		}
	},
	
	makeRainClouds: function() {
		var tg = this.globals;
		var length = tg.$tableRows.length;
		for (var i=0; i<length; i++) {
			var row = tg.$tableRows[i],
				str = '';
				
			for (var j=0; j<tg.maxRainPerEvent; j++) {
				str += '<b id="cloud'+i+'rain'+j+'" style="margin-left: '+(j*(100/(tg.maxRainPerEvent)))+'%;"></b>';
			}
			
			$(row).append(str);
		}
	},
	
	initSocketListening: function() {
		var that = this;
		var tg = that.globals;
		
		//TODO: set a timeout for clients that are connected too long
		
		$.getScript (tg.nodeServer+"/socket.io/socket.io.js", function(){
				
			var socket = new io.Socket(nodeDomain, {"port": 8080});
			
			socket.on('connect', function() {
				tg.connected = true;
				clearInterval(tg.socketInterval);
				tg.socketInterval = null;
				
				tg.$headerB.html("Connected:  ");
			});
			 
			socket.on('message', function (json) {
				
				var data = JSON.parse(json);
				tg.currView.updateScreen(data, that);
				
			});
			
			socket.on('disconnect', function() {
				tg.connected = false;
				console.log('disconnected');
				tg.$headerB.html("reconnecting..." +                   
				            tg.RETRY_INTERVAL/1000 + " seconds.");
				retryConnectOnFailure(tg.RETRY_INTERVAL);
			});
			
			var retryConnectOnFailure = function(retryInMilliseconds) {
				tg.socketInterval = setInterval(function() {
					if (!tg.connected) {
						console.log("pinging server. waiting for response");
						$.get(tg.nodeServer+'/ping', function(data) {
							tg.connected = true;
							window.location.href = unescape(window.location.pathname);
							console.log("server responded. reconnecting...");
						});
					}
				}, retryInMilliseconds);
			}
			
			socket.connect();
		}); 
	},
	
	rainAnimation: function( selector ) {
		var that = this;
		var tg = that.globals;
		var windowWidth = document.documentElement.clientWidth;
		if (tg.cssAnimationOn) {
			var rain = document.querySelector(selector);
			var animationName = 'raindrop';
			
			if (windowWidth >= 1802) animationName ='raindrop-1802';
			else if (windowWidth >= 1382) animationName ='raindrop-1382';
			else if (windowWidth >= 768) animationName ='raindrop-768';
			
			DDE.cssAnimation(rain, animationName, {speed: 800, easing: 'ease-in', complete: function(){
					//periodically redraw charts
					if (DDE.maxCount < tg.chartHeight) {
						tg.currView.redrawChart(that);
					} else {
						if (tg.tweetUpdates > 20) tg.currView.redrawChart(that);
					}
				}
			});
		} else {
			var $rain = $(selector);
			var distance = tg.chartHeight - 6;
			
			$rain.animate({top: distance},{duration: 800, easing: 'easeInQuad', complete: function(){ 
					$(this).css({top: -40});
					//periodically redraw charts
					if (DDE.maxCount < tg.chartHeight) {
						tg.currView.redrawChart(that);
					} else {
						if (tg.tweetUpdates > 20) tg.currView.redrawChart(that);
					}
				}
			});
		}
	}

	
};

DDE.TweetYvent.prototype.MainView = function( parent ) {
		console.log("New Main View Object");
		console.log(this);
		var that = parent;
		var tg = that.globals;
		
		tg.$chartCountNodes = $('.tweetcount', tg.$chartDiv[0]);
		tg.$tableRows = $('.tablerow', tg.$chartDiv[0]);
		tg.$listNavItems = $('div.nav .listitem');
			
		this.saveOnScreenRefs(that);
				
		this.redrawChart(that);
		
		this.enhanceUI(tg);
	
		DDE.fpsCounter();
		
		that.makeRainClouds();
		
		//rainPerfTest();
		
		that.initSocketListening();
		
		//Smart Resize function to minimize resize function calls
		$(window).bind('smartresize', function() {
			
			//IE6, IE7, IE8 fire resize events when the body.clientHeight changes after AJAX additions.
			//A little check to prevent the smartresize code from executing in those circumstances
			if (document.documentElement.clientWidth != tg.lastWindowWidth || document.documentElement.clientHeight != tg.lastWindowHeight) {
				console.log("smartresize");
								
				that.setScreenSizes();
				
				tg.currView.redrawChart(that);
				
			}
			
		});
};

DDE.TweetYvent.prototype.MainView.prototype = {
		
	saveOnScreenRefs: function( parent ) {
		//store onScreenEvents in order
		var that = parent;
		var tg = that.globals;
		var count = tg.$listNavItems.length;
		for (var i=0; i<count; i++) {
			var listItem = tg.$listNavItems[i],
				$listCountNode = $('.tweetcount', listItem);
				
			tg.listCountNodes[i] = $listCountNode; 
		}
	},
	
	redrawChart: function( parent ) {
		var that = parent;
		var tg = that.globals;
		var count = tg.$chartCountNodes.length;
	
		var arr = [], index = 0;
		for (var item in DDE.onScreenEvents) {
			arr[index] = DDE.onScreenEvents[item].tweetCount;
			index++;
		}
		arr.sort(tweetYvent.compareBiggest);
		
		var biggest = arr[0];
		DDE.maxCount = biggest/.95;
		
		if (DDE.maxCount < tg.chartHeight) {
			
			for (var i=0; i<count; i++) {
				tg.$chartCountNodes[i].style.height = DDE.onScreenEvents[i].tweetCount + "px";
			}
			
		} else {
		
			for (var i=0; i<count; i++) {
				tg.$chartCountNodes[i].style.height = ((DDE.onScreenEvents[i].tweetCount/DDE.maxCount)*100) + '%';
			}
		}
	
		tg.tweetUpdates = 0;
	},
	
	updateScreen: function( data, parent ) {
		var that = parent;
		var tg = that.globals;
		if (data.keywords.length > 1) { //we send a 'default' keyword that is ignored
			tg.tweetUpdates++;
			
			var keywordCount = data.keywords.length;
			var classStr = '', firstColor = '';
			for (var i=1; i<keywordCount; i++) {
				var keyword = data.keywords[i],
					eventIndex;
				
				//match keyword to event array and get index
				eventIndex = DDE.onScreenEventIndexes[keyword].index;
				
				//raindrops
				var rainSelector = '#cloud'+eventIndex+'rain'+DDE.onScreenEvents[eventIndex].rainIndex;
				that.rainAnimation(rainSelector);
				
				if (DDE.onScreenEvents[eventIndex].rainIndex == (tg.maxRainPerEvent-1) ) DDE.onScreenEvents[eventIndex].rainIndex = 0;
				else DDE.onScreenEvents[eventIndex].rainIndex++; 
				
				//update tweetCount labels
				DDE.onScreenEvents[eventIndex].tweetCount++;
				DDE.replaceHtml(tg.$chartCountNodes[eventIndex].firstChild, DDE.onScreenEvents[eventIndex].tweetCount);
				DDE.replaceHtml(tg.listCountNodes[eventIndex].context.children[3], DDE.onScreenEvents[eventIndex].tweetCount);
				
				classStr += data.keywords[i] + ' ';
				if (i == 1) firstColor = DDE.onScreenEvents[eventIndex].color;
			}
			//$("<li class='"+classStr+"' style='color: "+firstColor+";'> </li>").text("@" + data.tweet.user.screen_name + ": " + data.tweet.text).prependTo("#main ul");
			
			
		} else {
			//$("<li> </li>").text("@" + data.tweet.user.screen_name + ": " + data.tweet.text).prependTo("#main ul");
		}
	},
	
	enhanceUI: function( globals ) {
		
		var tg = globals;
		
		this.loadScheduleView(tg);
			
	},
	
	loadScheduleView: function( globals ) {
		var tg = globals;
		//create popup container
		var DOMstr = '<aside id="schedule-popup" class="schedule"><div id="event-list"></div></aside>';
		
		tg.$content.prepend(DOMstr);
		tg.$schedulePopup = $('#schedule-popup');
		var $eventList = $('#event-list');
		
		$eventList.load('views/static_html/schedule.html', function(){
			tg.$schedulePopup[0].style.opacity = 1;
			setTimeout(function(){
				tg.$schedulePopup[0].style.height = tg.lastWindowHeight - 25 + "px";
				//alert(screen.height);
			}, 1100);
			
			var selectedItem = $('div.listitem', '#event-list' )[1];
			var $backLink = $('#viewnav .backlink a');
			
			$(selectedItem).addClass('selected');
			
			$backLink.bind(DDE.touchStart, function(e){
				//stop url bar from dropping on iphone
				//Todo: make this work with hashtags for bookmarking
				this.href = '';
				
			}, false);
			
			$backLink.click(function(e){
				console.log("click");
				
				e.preventDefault();
				if (tg.cssAnimationOn) {
					DDE.fadeIn(tg.$schedulePopup[0], 400);
				} else {
					tg.$schedulePopup.fadeIn()
				}
				
			});
			
			
		});
		
		//box-shadow isn't rendering on top edge of container on iphone until we nudge styling
		;
		
	}

}


var tweetYvent = new DDE.TweetYvent();

console.log("New TweetYvent Object");
console.log(tweetYvent);

function fetchImgUrls() {
	for(var i=0; i<DDE.externalLinks.length; i++) {
		//console.log(DDE.externalLinks[i]);
		for(var j=0; j<DDE.externalLinks[i]["img_urls"].length; j++) {
			var url = DDE.externalLinks[i]["img_urls"][j];
			
			
		}
	}
	
	var url_test = DDE.externalLinks[0]["img_urls"][0];
	console.log(url_test);
	var params = {"url":  url_test};
	var xhr = $.ajax({
		url: "external_img_proxy.php",
		data: params,
		dataType: "json",
		success: function ( data ) {
			//console.log("success getting foursquare data");
			console.log(data);
			console.log(typeof data);
		},
		error: function ( data ) {
			//console.log("error: could not get foursquare data");
			console.log("error");
			console.log(data.responseText);
		}
	});
	
}

function makeTabs() {
	//Todo: make more efficient code
	var $extraHeaders = $('h2.no-tab');
	var $detailNavMenu = $('#detailnav ul');
	var $tweetsContent = $('div.tweets');
	var $trendsContent = $('div.trends');
	var $tweetTab = $('#tweettab');
	var $trendTab = $('#trendtab');
	var $photoTab = $('#phototab');
	var $tabSubTitle = $('#chartheaders h4');
		
	$extraHeaders.addClass("visuallyhidden");
	
	$trendsContent[0].style.display = "none";
	
	$trendTab.click(function(e){
		e.preventDefault();
		$trendsContent[0].style.display = "block";
		$tweetsContent[0].style.display = "none";
		$trendTab.addClass("selected");
		$tweetTab.removeClass("selected");
		$tabSubTitle.html('Top Trending Words');
		
	});
	
	$tweetTab.click(function(e){
		e.preventDefault();
		$trendsContent[0].style.display = "none";
		$tweetsContent[0].style.display = "block";
		$trendTab.removeClass("selected");
		$tweetTab.addClass("selected");
		$tabSubTitle.html('Most Recent Tweets');
		
	});
	
	$photoTab.click(function(e){
		e.preventDefault();
		
		
	});
	
}



})(); //End of TweetYvent Namespace

/*

function rainPerfTest() {
	var length = $tableRows.length;
	
	var rainIndex = 0;
	setInterval(function(){
		for (var i=0; i<length; i++) {
			var rainSelector = '#cloud'+i+'rain'+rainIndex;
			rainAnimation(rainSelector);
		}
		if (rainIndex == (maxRainPerEvent-1) ) rainIndex = 0;
		else rainIndex++;
	}, 300);
}

*/
