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


//create our own namespace
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

$.ajaxSetup ({
	cache: false
});

DDE.TweetYvent = function(){

	var that = this;
	that.globals = {
		connected: false,
		RETRY_INTERVAL: 10000,
		socketInterval: null,
		nodeServer: "http://"+nodeDomain+":8124",
		maxRainPerEvent: 10,
		cssAnimationOn: false,
		lastBodyHeight: 0,
		lastWindowWidth: 0,
		lastWindowHeight: 0,
		chartHeight: 0,
		tweetUpdates: 0,
		currView: null
	};
	
	this.reorderScheduleJSON = function() {
		var designers = {};
		
		for (dayGroup in DDE.allEventsSchedule) {
			var day = DDE.allEventsSchedule[dayGroup];
			for (timeGroup in day) {
				var time = day[timeGroup];
				var count = time.length;
				for (var i=0; i<count; i++) {
					
					var event = time[i];
					designers[event.keyword] = event;
				}
			}
			
		}
		
		return designers;
	};
		
	this.allEventsDesigners = this.reorderScheduleJSON();
	
	this.watchWindowSizes = function() {
		var tg = that.globals;
		tg.lastWindowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
		tg.lastWindowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
		
		//console.log("document.documentElement.clientHeight: "+document.documentElement.clientHeight);
		//console.log("document.documentElement.clientWidth: "+document.documentElement.clientWidth);
		//console.log("screen.width: "+screen.width);
		//console.log("screen.height: "+screen.height);
		//console.log("window.innerHeight: "+window.innerHeight);
	},
	
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
		tg.$tweetsTab = $('div.tweets');
		tg.$scheduleNav = $('div.schedule.nav');
		
		if($('.ie7 body')[0]) tg.ie7 = true;
		
		this.browserCheck();
		
		//Modernizr Feature Detection
		if (Modernizr.cssanimations) tg.cssAnimationOn = true;
		
		//cache global selectors
		tg.$headerB = $('header b');
		
	},
	
	setScreenSizes: function() {
		var tg = this.globals;
		
		this.watchWindowSizes();
		
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
			
			if (tg.ie7) {
				var height = tg.lastWindowHeight - 157;
				DDE.setMaxHeight(tg.$body[0], height);
			}
		
		//768	
		} else if (tg.lastWindowWidth >= 768) { 
		
			tg.chartHeight = (DDE.maxHeight+20)*2;
			
		}
	},
	
	loadView: function() {
		
		var tg = this.globals;
		//Todo: remove this for production
		var pathname = location.pathname.replace(/\/node-projects\/tweet-event-map\/fashion-twitter-www\//, '/');
		
		if (pathname.match(/designers/g)) pathname = '/designers/';
				
		switch(pathname){
			case "/":
				tg.currView = new this.MainView(this);
				tg.detailView = new this.DetailView(this);
				break;
				
			case "/schedule/":
				//scheduleView();
				break;
				
			case "/designers/":
				tg.currView = new this.DetailView(this);
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
		//return false;
		var that = this;
		var tg = that.globals;
		
		//TODO: set a timeout for clients that are connected too long
		
		$.getScript (tg.nodeServer+"/socket.io/socket.io.js", function(){
			
			var socket = new io.Socket(nodeDomain, {"port": 8124});
			
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
						tg.currView.redrawChart(tg);
					} else {
						if (tg.tweetUpdates > 20) tg.currView.redrawChart(tg);
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
						tg.currView.redrawChart(tg);
					} else {
						if (tg.tweetUpdates > 20) tg.currView.redrawChart(tg);
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
		
		tg.$chartDiv = $('#chart');
		tg.$content = $('div.content');
		this.$chartCountNodes = $('.tweetcount', tg.$chartDiv[0]);
		tg.$tableRows = $('.tablerow', tg.$chartDiv[0]);
		this.$scheduleNavItems = $('div.schedule .listitem');
		
		this.listCountNodes = []; //cache references to tweetcount nodes in the nav list
		
		this.saveOnScreenRefs();
		this.redrawChart(tg);
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
				
				tg.currView.redrawChart(tg);
				
			}
			
		});
};


/*//////////////////////////////////
//
//			Main View
//
///////////////////////////////////*/


DDE.TweetYvent.prototype.MainView.prototype = {
		
	saveOnScreenRefs: function() {
		//store onScreenEvents in order
		//subtract one for the All Designers list item
		var count = this.$scheduleNavItems.length-1;
		for (var i=0; i<count; i++) {
			var listItem = this.$scheduleNavItems[i+1],
				$listCountNode = $('.tweetcount', listItem);
				
			this.listCountNodes[i] = $listCountNode; 
		}
	},
	
	redrawChart: function( globals ) {
		//Temporarily disabled: We may delete this in the future
		return false;
		var tg = globals;
		var count = this.$chartCountNodes.length;
	
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
				this.$chartCountNodes[i].style.height = DDE.onScreenEvents[i].tweetCount + "px";
			}
			
		} else {
		
			for (var i=0; i<count; i++) {
				this.$chartCountNodes[i].style.height = ((DDE.onScreenEvents[i].tweetCount/DDE.maxCount)*100) + '%';
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
			
			//update tweetCounts for each keyword represented
			for (var i=1; i<keywordCount; i++) {
				var keyword = data.keywords[i],
					eventIndex;
				
				//match keyword to event array and get index
				eventIndex = that.allEventsDesigners[keyword].index;
				
				/* Todo: update this for new schedule list
				//raindrops
				var rainSelector = '#cloud'+eventIndex+'rain'+DDE.onScreenEvents[eventIndex].rainIndex;
				that.rainAnimation(rainSelector);
				
				if (DDE.onScreenEvents[eventIndex].rainIndex == (tg.maxRainPerEvent-1) ) DDE.onScreenEvents[eventIndex].rainIndex = 0;
				else DDE.onScreenEvents[eventIndex].rainIndex++; 
				
				*/
				
				//update tweetCount labels
				that.allEventsDesigners[keyword].tweet_count++;
								
				DDE.replaceHtml(this.listCountNodes[eventIndex].context.children[1].children[1], that.allEventsDesigners[keyword].tweet_count);
				
				classStr += data.keywords[i] + ' ';
				if (i == 1) firstColor = that.allEventsDesigners[keyword].color;
			}
			
			//Todo: updateMap
			
			//insert data based on which designer is toggled
			//filter data based on toggle
			var pathname = location.pathname.replace(/\/node-projects\/tweet-event-map\/fashion-twitter-www\//, '/');
			var hashBase = location.hash ? location.hash.match(/\/[A-Za-z1-9-]*\//)[0] : '';
			var pointerPattern = new RegExp('#'+hashBase);
			var pointer = location.hash.replace(pointerPattern, '').replace(/\//, '');
			
			switch(hashBase){
				
				case "/schedule/":
					//scheduleView();
					break;
					
				case "/designers/":
					var match = false;
					for (var i=1; i<keywordCount; i++) {
						var keyword = new RegExp(data.keywords[i]);
						if (pointer.match(keyword)) match = true;
					}
					if (!match) return false;
					
					break;
					
				default:
				
					break;
				
			}
			
			var text = data["tweet"]["text"];
			var username = data["tweet"]["user"]["screen_name"];
			var thumb = data["tweet"]["user"]["profile_image_url"];
			//var created_at = data["tweet"]["created_at"];
			//Todo: create timestamp locally on client based on time of html insert
			
			var html = '<div class="listitem clearfix"><div class="listthumb"><img src="'+thumb+'" height="48" width="48" /></div><div class="listcontent"><h3>'+username+'</h3> <span class="tweettext">'+text+'</span> <span class="tweettime"></span></div></div>';
			
			tg.$tweetsTab.prepend(html);
			
			
			
			//$("<li class='"+classStr+"' style='color: "+firstColor+";'> </li>").text("@" + data.tweet.user.screen_name + ": " + data.tweet.text).prependTo("#main ul");
			
			//Todo: insert photos
			var pattern = new RegExp('^http:\/\/(yfrog.|instagr.|lockerz.|twitpic.|pic.twitter.)', 'i');
			var value = data["tweet"];
			var urls_length = value["entities"]["urls"].length;
			var img_urls = [];
			for (i=0;i<urls_length;i++) { 
				if (value["entities"]["urls"][i]["url"]) {
					if (value["entities"]["urls"][i]["expanded_url"]) {
						var str = value["entities"]["urls"][i]["expanded_url"];
						if (str.match(pattern)) {
							img_urls.push(str);
						} else {
							str = value["entities"]["urls"][i]["url"];
							if (str.match(pattern)) {
								img_urls.push(str);
								
							}
						}
					}
				}
			}
			
			var img_count = img_urls.length;
			
			if (img_count > 0) {
				var arrayWrapper = [{"img_urls" : img_urls}];
				this.fetchImgUrls(arrayWrapper);
			}
			
			
			//Todo: adjust trends
			
			
		}
	},
	
	enhanceUI: function( globals ) {
		
		var tg = globals;
		
		//this.loadScheduleView(tg); //Change this to active Days menu for small screens
		
		this.enableScheduleLinks(tg);
		
			
	},
	
	enableScheduleLinks: function ( globals ) {
		var tg = globals;
		var that = this;
		
		//change all link href to use hash links
		var links = $('a', tg.$scheduleNav);
		var count = links.length;
				
		for (var i=0; i<links.length; i++) {
			var baseURI = links[i].baseURI;
			var pathname = links[i].pathname;
			links[i].href = baseURI + '#' + pathname;
		}
		
		//enable listitem click events
		console.log(this.$scheduleNavItems);
		//change this back to $scheduleNavItems.click
		$(this.$scheduleNavItems[0]).click(function(e){
			$('.tweets').html('');
			$('h3.designer').html('All Designers');
			window.location.href = '/';
			
		});
		
		//todo: delete this later when we improve the click event above
		links.click(function(e){
			$('.tweets').html('');
			$('.trends #trendingwords').html('');
			$('.trends #trendingcolors').html('');
			$('.photos').html('');
			$('h3.designer').html(this.innerHTML);
			
			var designer = this.parentNode.parentNode.id;
			that.$scheduleNavItems.removeClass('selected');
			$(this.parentNode.parentNode).addClass('selected');
			
			//fetch designer db proxy
			var xhr = $.ajax({
				url: 'designer_db_request_proxy.php',
				data: {"designers": designer},
				dataType: "json",
				success: function ( data ) {
					
					console.log(data);
					
					//insert archived tweets
					//data.tweetList = []
					var html = ''
					for (var i=0; i<data.tweetList.length; i++) {
						var text = data.tweetList[i]["tweet"]["text"];
						var username = data.tweetList[i]["tweet"]["user"]["screen_name"];
						var thumb = data.tweetList[i]["tweet"]["user"]["profile_image_url"];
						//var created_at = data["tweet"]["created_at"];
						//Todo: create timestamp locally on client based on time of html insert
						
						html += '<div class="listitem clearfix"><div class="listthumb"><img src="'+thumb+'" height="48" width="48" /></div><div class="listcontent"><h3>'+username+'</h3> <span class="tweettext">'+text+'</span> <span class="tweettime"></span></div></div>';
						
					}
					
					tg.$tweetsTab.append(html);	
					
					//insert archived trending words
					//data.trendsList = []
					var html = ''
					for (var i=0; i<data.trendsList.length; i++) {
						var word = data.trendsList[i]["word"];
						var count = data.trendsList[i]["count"];
						html += '<div class="listitem"><h3>'+word+'</h3> <span class="trendcount">'+count+'</span> </div>';
						
					}
					
					$('.trends #trendingwords').append(html);
					
					//insert archived trending colors
					//data.colorsList = []
					var html = ''
					for (var i=0; i<data.colorsList.length; i++) {
						var color = data.colorsList[i]["color"];
						var count = data.colorsList[i]["count"];
						html += '<div class="listitem"><h3>'+color+'</h3> <span class="trendcount">'+count+'</span> </div>';
					}
					
					$('.trends #trendingcolors').append(html);
					
					//insert archived photos
					//data.urlList = []
					that.fetchImgUrls(data.urlList);
					
				},
				error: function ( data ) {
					
					console.log("error");
					console.log(data);
					console.log(data.responseText);
				}
			});
			
		});
		
	},
	
	fetchImgUrls: function( urlList ) {
	
		if (urlList.length == 0) {return;}
		
		var fetchImgProxy = function( request ) {
			//var params = {"url":  url_test};
			console.log(request)
			var xhr = $.ajax({
				url: request,
				//url: "external_img_proxy.php",
				//data: params,
				dataType: "json",
				success: function ( data ) {
					//console.log("success getting foursquare data");
					console.log(data);
					console.log(typeof data);
				},
				error: function ( data ) {
					//console.log("error: could not get foursquare data");
					console.log("error");
					console.log(data);
					console.log(data.responseText);
				}
			});
		};
		
		var fetchImgDirect = function (request) {
			var img = new Image();
			img.src = request;
			$(img).load(function(){
				$('.photos').append(this);
			});
		};
		
		//var url_test = "http://yfrog.com/klu2qjtj:iphone";
		//var url_test = "http://twitpic.com/show/large/5t4c7y";
		
		var chooseImgAPI = function(url) {
		
			var imgURL = url;
			var allowedurls = ['http:\/\/yfrog.com\/','http:\/\/lockerz.com\/','http:\/\/instagr.am\/','http:\/\/twitpic.com\/', 'http:\/\/pic.twitter.com\/'];
		
			var url_pattern = new RegExp('^('+ allowedurls.join('|')+')', 'i');
			var url_group = imgURL.match(url_pattern);
			console.log(url_group);
			
			if (imgURL == "http://yfrog.com/gzcbeeuj" ) {return false; };
	
			
			switch(url_group[0]) {
				case "http://yfrog.com/":
					var request = imgURL+":iphone";
					fetchImgDirect(request);
					break;
					
				case "http://twitpic.com/":
					var imgID = imgURL.replace(/^http:\/\/twitpic.com\//i,'');
					var request = "http://twitpic.com/show/large/"+imgID;
					fetchImgDirect(request);
					break;
					
				case "http://lockerz.com/":
					var request = "http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=big&url="+imgURL;
					fetchImgDirect(request);
					break;
					
				case "http://instagr.am/":
					var imgID = imgURL.replace(/^http:\/\/instagr.am\/p\//i,'');
					var request = "http://instagr.am/p/"+imgID+"media";
					fetchImgDirect(request);
					break;
			}
		}; 
		
		for(var i=0; i<urlList.length; i++) {
			//console.log(DDE.externalLinks[i]);
			for(var j=0; j<urlList[i]["img_urls"].length; j++) {
				var url = urlList[i]["img_urls"][j];
				chooseImgAPI(url);
				
			}
		}
		
		
		
		
		
		
		
	},
	
	loadScheduleView: function( globals ) {
		return false;
		var tg = globals;
		var that = this;
		//create popup container
		var DOMstr = '<aside id="schedule-popup" class="schedule"><div id="event-list"></div></aside>';
		
		tg.$content.prepend(DOMstr);
		tg.$schedulePopup = $('#schedule-popup');
		var $eventList = $('#event-list');
		
		$eventList.load('views/static_html/schedule.html', function(){
			//box-shadow isn't rendering on top edge of container on iphone until we nudge styling
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
		
	}

}

/*//////////////////////////////////
//
//			Detail View
//
///////////////////////////////////*/

DDE.TweetYvent.prototype.DetailView = function( parent ) {
		console.log("New Detail View Object");
		console.log(this);
		var that = parent;
		var tg = that.globals;
		
		//TODO: finish fetchImgURLs 
		
		this.makeTabs();
		
		/*
		that.initSocketListening();
		
		//Smart Resize function to minimize resize function calls
		$(window).bind('smartresize', function() {
			
			//IE6, IE7, IE8 fire resize events when the body.clientHeight changes after AJAX additions.
			//A little check to prevent the smartresize code from executing in those circumstances
			if (document.documentElement.clientWidth != tg.lastWindowWidth || document.documentElement.clientHeight != tg.lastWindowHeight) {
				console.log("smartresize");
								
				that.setScreenSizes();
				
				//tg.currView.redrawChart(that);
				
			}
			
		});
		*/
};

DDE.TweetYvent.prototype.DetailView.prototype = {
		
	saveOnScreenRefs: function( parent ) {
		//store onScreenEvents in order
		var that = parent;
		var tg = that.globals;
		var count = tg.$scheduleNavItems.length;
		for (var i=0; i<count; i++) {
			var listItem = tg.$scheduleNavItems[i],
				$listCountNode = $('.tweetcount', listItem);
				
			tg.listCountNodes[i] = $listCountNode; 
		}
	},
	
	makeTabs: function() {
		//Todo: make more efficient code
		var $extraHeaders = $('h2.no-tab');
		var $detailNavMenu = $('#detailnav ul');
		var $tweetsContent = $('div.tweets');
		var $trendsContent = $('div.trends');
		var $photosContent = $('div.photos');
		var $tweetTab = $('#tweettab');
		var $trendTab = $('#trendtab');
		var $photoTab = $('#phototab');
		var $tabSubTitle = $('#chartheaders h4');
		
		var $colorSwitch = $('#colorswitch');
		var $wordSwitch = $('#wordswitch');
		var $colorContent = $('#trendingcolors');
		var $wordContent = $('#trendingwords');
		
		
			
		$extraHeaders.addClass("visuallyhidden");
		
		$trendsContent[0].style.display = "none";
		
		$trendTab.click(function(e){
			e.preventDefault();
			$trendsContent[0].style.display = "block";
			$tweetsContent[0].style.display = "none";
			$photosContent[0].style.display = "none";
			$trendTab.addClass("selected");
			$tweetTab.removeClass("selected");
			$photoTab.removeClass("selected");
			$tabSubTitle.html('Top Trending Words');
			
		});
		
		$tweetTab.click(function(e){
			e.preventDefault();
			$trendsContent[0].style.display = "none";
			$tweetsContent[0].style.display = "block";
			$photosContent[0].style.display = "none";
			$trendTab.removeClass("selected");
			$photoTab.removeClass("selected");
			$tweetTab.addClass("selected");
			$tabSubTitle.html('Most Recent Tweets');
			
		});
		
		$photoTab.click(function(e){
			e.preventDefault();
			$trendsContent[0].style.display = "none";
			$tweetsContent[0].style.display = "none";
			$photosContent[0].style.display = "block";
			$trendTab.removeClass("selected");
			$tweetTab.removeClass("selected");
			$photoTab.addClass("selected");
			
		});
		
		$wordSwitch.click(function(e){
			$colorContent[0].style.display = "none";
			$wordContent[0].style.display = "block";
			$colorSwitch.removeClass("selected");
			$wordSwitch.addClass("selected");
		});
		
		$colorSwitch.click(function(e){
			$colorContent[0].style.display = "block";
			$wordContent[0].style.display = "none";
			$colorSwitch.addClass("selected");
			$wordSwitch.removeClass("selected");
		});
		
		
		
	},
	
	updateScreen: function( data, parent ) {
		var that = parent;
		var tg = that.globals;
		if (data.keywords.length > 1) { //we send a 'default' keyword that is ignored
			tg.tweetUpdates++;
			
			var keywordCount = data.keywords.length;
			for (var i=1; i<keywordCount; i++) {
			
			}
			
		}
	}
	
};


var tweetYvent = new DDE.TweetYvent();

console.log("New TweetYvent Object");
console.log(tweetYvent);


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
