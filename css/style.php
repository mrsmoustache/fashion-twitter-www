<?php header("Content-type: text/css"); 

$max_height = isset($_REQUEST['max_height']) ? $_REQUEST['max_height'] : '';
$margin = isset($_REQUEST['margin']) ? $_REQUEST['margin'] : '';
$tr_width = isset($_REQUEST['tr_width']) ? $_REQUEST['tr_width'] : '';
$event_length = isset($_REQUEST['event_length']) ? $_REQUEST['event_length'] : '';

?>
/* _________________________________________________

320 and Up boilerplate extension

Author: Andy Clarke
Version: 0.9b
URL: http://stuffandnonsense.co.uk/projects/320andup/
_____________________________________________________

1.ROOT
2.HEADINGS
3.TYPOGRAPHY
4.LINKS
5.FIGURES & IMAGES
6.TABLES
7.FORMS (See css/mylibs/forms.css)
8.BANNER header[role="banner"]
9.NAVIGATION nav[role="navigation"]
10.CONTENT
11.MAIN div[role="main"]
12.COMPLIMENTARY div[role="complementary"]
13.CONTENTINFO footer[role="contentinfo"]
14.GLOBAL OBJECTS
15.VENDOR-SPECIFIC 
16.TEMPLATE SPECIFICS
17.MODERNIZR
18.CSS ANIMATIONS

COLOURS 

*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin : 0;
padding : 0;
border : 0;
font-size : 100%;
font : inherit;
vertical-align : baseline; }

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display : block; }

abbr[title] { 
border-bottom : 1px dotted; 
cursor : help; }

/* 1.ROOT */

html {
overflow-y : scroll;
background : rgb(255,255,255) /* url(../img/tmp/grid.png) repeat-y 50% 0 */; }

body { 
margin : 0 auto;
padding : 16px 0 0;
width : 90% /* 252px */;
font : 100%/1.4 Georgia,"Times New Roman", Times, serif ;
color: #282828; 
background-color : transparent; 
position: relative;
}

/* 2.HEADINGS */

h1, 
h2, 
h3, 
h4, 
h5, 
h6 {
font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
font-weight : bold; }

h1 { 
margin-bottom : .75em;
font-size : 1.5em; /* 48 / 16 = 3 */
line-height : 1.2; }

h2 { 
margin-bottom : .75em;
font-size : 2em; /* 36 / 16 = 2 */
line-height : 1.2; }

h3 { 
margin-bottom : 1em;
font-size : 1.5em; /* 24 / 16 = 1.5 */
line-height : 1.3; }

h4 { 
margin-bottom : 1.25em;
font-size : 1.25em; /* 20 / 16 = 1.25 */
line-height : 1.25; }

h5 { 
margin-bottom : 1.5em;
font-size : 1em; /* 16 / 16 = 1 */ }

h6 { 
font-size : 1em; /* 16 / 16 = 1 */ }

/* 3.TYPOGRAPHY */

p, 
ol, 
ul, 
dl, 
address { 
margin-bottom : 1.5em; 
font-size : 1em; /* 16 / 16 = 1 */ }

ul, 
ol { 
margin : 0 0 1.5em 0px; 
padding-left : 24px; }

ul { 
list-style-type : disc; }

ol { 
list-style-type : decimal; }

li ul, 
li ol { 
margin : 0;
font-size : 1em; /* 16 / 16 = 1 */ }

dl, 
dd { 
margin-bottom : 1.5em; }

dt { 
font-weight : normal; }

blockquote  { 
margin : 0 0 1.5em -24px; 
padding-left : 24px; 
border-left : 1px solid rgb(200,200,200);
font-style : italic; }

blockquote:before, 
blockquote:after, 
q:before, 
q:after {
content : '';
content : none; }

b, 
strong	{ 
font-weight : bold; }

i, 
em { 
font-style : italic; }

sup, 
sub { 
position : relative;
font-size : 75%; 
line-height : 0; }

sup { 
top : -.5em; }

sub { 
bottom : -.25em; }

address { 
font-style : normal; }

pre { 
margin-bottom : 1.5em; 
white-space : pre; 
white-space : pre-wrap; 
word-wrap : break-word; }

pre, 
code { 
font : .875em 'andale mono', 'lucida console', monospace; 
line-height : 1.5; }

small {
font-size : 1em; /* 16 / 16 = 1 */ }

/* 4.LINKS */

a, 
a:visited {
outline : none;
color : rgb(23,119,175);
text-decoration : none; }
 
a:hover { 
outline : none;
color : rgb(40,40,40); 
text-decoration : underline; }
 
a:active, 
a:focus { 
outline : none;
color : rgb(0,0,0); }

a.twitter-share-button {
	color: white;
}

/* 5.FIGURES & IMAGES */

figure {
margin-bottom : 1.5em; }

figure img,
figure object,
figure embed {
margin-bottom : .75em;
max-width : 100%; }

figcaption {
display : block;
font-weight : normal; }

/* 6.TABLES */

table { 
border-collapse : collapse;
border-spacing : 0;
margin-bottom : 1.4em; 
width : 100%;
font-size : .875em; /* 14 / 16 = .875 */ }

th { 
font-weight : bold; }

th, td, caption { 
padding : .25em 10px .25em 5px; }

tfoot { 
font-style : italic; }

caption { 
background-color : transparent; }

/* 7.FORMS (See css/mylibs/forms.css) */

/* 8.BANNER */
#banner {
	z-index: 1;
	position: relative;
	overflow: visible;
}

h1.with-sub {
	margin-bottom: .10em;
	line-height: 1.1em;
}

.iem7 header img {
	position: absolute;
}

h1 .logo {
	width: 50px;
	height: 50px;
	float: left;
	padding: 0;
	background: black url(../img/l/nyt-logo.gif) no-repeat 0 0;
}

.iem7 h1 .logo {
	background: none;
}

#banner .search {
	position: absolute;
	right: 0px;
	top: 0px;
	display: none;
}

#banner .search h2 {
	position: absolute;
	right: 0px;
	margin: 0;
	width: 48px;
	height: 50px;
	border-left: 1px solid #ccc;
}

#banner .search h2 a {
	background-repeat: no-repeat;
	background-image: url(../img/l/search.gif);
	background-position: 0 right;
	margin-top: 7px;
}

#banner .search form {
	display: none;
}

#banner #log {
	text-align: center;
	position: absolute;
	top: -14px;
	width: 100%;
	line-height: .8em;
	display: block;
}

#banner b {
	font-style: italic; 
	color: #aaa; 
	font-weight: normal; 
	font-size: .7em;
	display: inline;
}

#fps {
	color: #aaa; 
	font-size: .7em;
	display: inline;
}

.ie7 #banner b, .iem7 #banner b {
	font-style: normal;
}

h1 span {
	padding: 0 0 0 5px;
}

p.sub-title {
	margin: -1.5em 0 0 55px;
	line-height: 1.3em;
	font-size: .9em;
}

#socialtop {
	display: none;
	overflow: hidden;
}


/* 9.NAVIGATION */

#nav {
	position: relative;
	display: none;
}

.schedule #nav {
	display: block;
}

h2.secondary {
	font-size: 1em; 
	letter-spacing: 1px; 
	text-transform: uppercase;
	text-align: left;
	font-weight: normal; 
}

#viewnav, #detailnav {
	position: relative;
	margin: 0 0 1em;
	border-bottom: solid 1px #ccc;
	overflow: visible;
	line-height: 1.8em;
	background: #fff;
	z-index: 1;
	height: 29px;
}

.no-js #detailnav {
	display: none;
}

#viewnav .backlink {
	font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
	float: left;
}

.no-js #viewnav .backlink {
	display: none;
}

#viewnav .backlink a {
	font-size: .9em;
	text-decoration: underline;
}

#viewnav .backlink span {
	text-decoration: none;
	color: #333;
}

#viewnav ul, #detailnav ul {
	margin: 0;
	width: 75%;
	position: relative;
	float: right;
	top: 1px;
	right: 5%;
	padding: 0;
	list-style: none;
}

#viewnav li, #detailnav li {
	text-align: center;
	height: 27px;
	padding: 0 .6em;
	border-top: solid 1px #ccc;
	border-right: solid 1px #ccc;
	border-left: solid 1px #ccc;
	background: #fff;
	float: right;
	margin: 0 5px 0 0;
}

#viewnav li a, #detailnav li a {
	font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 1em;
	color: #333;
	font-weight: normal;
}

#detailnav li a {
	font-size: .8em;
}

.iem7 #detailnav, .ie7 #detailnav {
	height: 28px;
}


#viewnav li.selected, #detailnav li.selected {
	height: 28px;
}

#viewnav li.selected a, #detailnav li.selected a {
	color: #000;
	font-weight: bold;
}

.tabnav {
	background: white;
}

#detailnav ul {
	top: 0;
	right: ;
	left: 5%;
	width: 100%;
	float: left;
}

#modules #detailnav ul {
	width: auto;
	overflow: hidden;
}

#detailnav li {
	float: left;
}


/* days navigation */

#dayslist {
	width: auto;
	overflow: auto;
	position: absolute;
	z-index: 999;
	border-top: solid 1px #ccc;
	border-bottom: solid 1px #ccc;
	border-right: solid 1px #ccc;
	background: white;
	-webkit-box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	-moz-box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	-o-box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	display: none;
}

.iem7 #dayslist, .ie7 #dayslist, .ie8 #dayslist {
	border: solid 6px #222;
}

#dayslist h3 {
	display: none;
}

#dayslist ul {
	padding: 5px 10px 8px 5px;
	list-style: none;
	font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
	margin: 0;
}

#dayslist li {
	text-align: right;
	cursor: pointer;
	width: 6em;
	float: left;
	background-color: #eee;
	margin-left: 5px;
	margin-top: 5px;
	padding: 5px;
	
}

.csstransforms #dayslist ul {
	padding: 5px 5px 8px 5px;
}

.csstransforms #dayslist li {
	width: 4.8em;
	position: relative;
}

#dayslist a {
	color: #222;
	display: block;
	cursor: pointer;
}

#dayslist a:hover {
	text-decoration: none;
	cursor: pointer;
}

#dayslist span {
	float: right;
	font-size: 3em;
	line-height: 1.06em;
	cursor: pointer;
}

#dayslist span b + b {
	position: relative;
	left: -.1em;
	cursor: pointer;
}

.ie7 #dayslist span b + b, .iem7 #dayslist span b + b {
	position: static;
}

#dayslist em {
	float: right;
	font-size: 1.0em;
	font-style: normal;
	text-transform: uppercase;
	color: #555;
	letter-spacing: 1px;
	padding-top: .3em;
	cursor: pointer;
}

.csstransforms #dayslist em {
	position: absolute;
	float: none;
	right: 0;
	-webkit-transform: rotate(-90deg) translate(-.5em, -5.2em);
	-moz-transform: rotate(-90deg) translate(-.5em, -5.2em);
	-o-transform: rotate(-90deg) translate(-.5em, -5.2em);
	-ms-transform: rotate(-90deg) translate(-.5em, -5.2em);
	transform: rotate(-90deg) translate(-.5em, -5.2em);
	
	-webkit-transform-origin: right top;
	-moz-transform-origin: right top;
	-o-transform-origin: right top;
	-ms-transform-origin: right top;
	transform-origin: right top;
}


/* dynamic javascript popup */
#schedule-popup {
	width: 94%;
	max-width: 17em;
	position: absolute;
	top: -70px;
	background: #fff;
	z-index: 998;
	-webkit-box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	-moz-box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	-o-box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	box-shadow: 0px 0px 20px rgba(0,0,0,.75);
	overflow: hidden;
	padding: 0 10px 10px;
	opacity: .99;
	bottom: 10px;
	display: none;
}

#schedule-popup #viewnav .backlink {
	display: none;
}

#schedule-popup div.nav .listitem {
	background: none;
	padding: 0.75em .6em 0.8em;
}

#schedule-popup div.nav .designers {
	margin-right: 0;
}



/* 10.CONTENT */

.content {
	margin: 1em 0;
	position: relative;
}

h2.page-title {
	font-size: 1.1em;
	font-weight: bold;
	font-family: Georgia, "Times New Roman", Times, serif;
	margin-bottom: .25em;
	text-align: center;
}

#map {
	border: solid 1px #ccc;
	margin: 0 0 1em;
}

div.minimap {
	height: 125px;
	
}

#stats {
	padding: 1em 0 1.5em;
	border-bottom: solid 1px #000;
	margin: 0 0 .5em 0;
}

#chart {
	position: relative;
	border-bottom: solid 3px #000;
	height: <?php echo ($max_height+20); ?>px;
}

#chart .tablerow {
	position: absolute;
	height: 100%; 
	width: <?php echo $tr_width; ?>%;
	/* table-layout: fixed; */
}

#chart .gridcell {
	position: absolute;
	padding: 1px 0 0 0;
	text-align: center;
	width: 100%;
}

#chart .event .listname {
	position : absolute;
	clip : rect(0 0 0 0); 
	overflow : hidden;
	margin: -1px;
	padding : 0;
	height : 1px;      
	width : 1px;
	border : 0;
}

#chart .tweetcount span {
	position: relative;
	top: -25px;
	font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
	color: white;
	background: #aaa;
	padding: 1px 3px;
	font-size: .9em;
	z-index: 1;
}

#chart .tablerow .tweetcount {
	bottom: 0px;
}

#chart .tablerow .event {
	bottom: -1.5em;
	text-transform: uppercase;
	letter-spacing: 1px;
}

#chart .tablerow .event span {
	color: #aaa;
	font-size: .9em;
	font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-weight: bold;
}

#chart .tablerow .event span + span {
	font-weight: normal;
	color: #282828;
	font-size: .9em;
}

#chart .tablerow b {
	width: 5px;
	height: 5px;
	top: -40px;
	left: 0;
	position: absolute;
}

#chartheaders {
	border-bottom: solid 1px #000;
	position: relative;
}

#chartheaders h2 {
	font-size: .95em;
	font-weight: normal;
	text-transform: uppercase;
	letter-spacing: 0px;
	font-family: Georgia, "Times New Roman", Times, serif;
	padding: .4em 0 0 0;
}

#leftright {
	width: 116px;
	position: absolute;
	right: 12px;
	top: 3.7em;
	display: none;
}

.designers #leftright {
	display: none;
}

#leftright a {
	height: 33px;
	width: 33px;
	background-repeat: no-repeat;
	margin-left: 25px;
}

#leftright a.left {
	background-image: url(../img/l/nav-btn-left.gif);
	background-position: 0 0;
	float: left;
	
}

#leftright a.right {
	background-image: url(../img/l/nav-btn-right.gif);
	background-position: 0 0;
	float: left;
}

#chartmenus {
	display: none;
	padding: .2em 0 0 0;
	margin: .7em 0 .5em 0;
}

#chartmenus select {
	display: block;
}

.bb5 #chartheaders h2 {
	font-size: .8em;
}

#chartheaders h3 {
	border-top: solid 3px #000;
	padding: .2em 0 0 0;
	margin: .7em 0 0 0;
}

#chartheaders h4 {
	font-size: 1em;
	font-weight: normal;
	margin: 0 0 .5em 0;
}

div.nav, div.list {
	margin: 0em 0 1em;
	padding-left: 0em;
	font-family : "Helvetica Neue", Helvetica, Arial, sans-serif;
}

div.list {
	overflow: hidden;
}


div.nav b {
	display: block;
	float: left;
	width: 3.3em;
	padding: .92em .75em 0 0;
	text-align: right;
	font-size: .9em;
	line-height: 1em;
	color: #aaa;
	font-weight: bold;
}

div.schedule .listitem:hover b, div.schedule .listitem.selected b {
	color: #666;
}

div.nav .listitem, div.list .listitem {
	border-bottom: solid 1px #ddd;
	padding: .75em 0 .8em;
	position: relative;
}

div.schedule .arrow {
	position: absolute;
	height: 22px;
	width: 13px;
	right: 8px;
	top: 50%;
	margin-top: -9px;
	background: url(../img/l/nav-arrow-right.png) no-repeat 97% 50%;
}

div.nav .listitem {
	cursor: pointer;
}

div.list .listitem:first-child {
	padding-top: 0;
}

div.nav .listitem.selected {
	background-color: #eee;
}

div.nav #all-designers-item {
	text-transform: uppercase;
	font-weight: bold;
	padding: .5em 0 .4em .7em;
	border-top: solid 1px #ccc;
	font-size: 1.3em;
}

.ie7 div.nav #all-designers-item {
	border-top: solid 2px #eee;
}

div.schedule .listitem {
	border: none;
	padding: 0;
	overflow: visible;
}

div.schedule b.timegroup {
	border-top: solid 1px #444;
}

div.schedule b.timegroup span {
	font-size: .5em;
	display: block;
	line-height: .9em;
}

div.schedule .itemcontent {
	margin-left: 3.5em;
	border-left: dotted 1px #ccc;
	padding: .9em 0 .9em .5em;
	border-top: solid 1px #ddd;
}

div.schedule b.timegroup + .itemcontent {
	border-top: solid 1px #444;
}

#modules div.list .listitem {
	background: none;
}

div.nav .listitem h3, div.list .listitem h3 {
	font-size: 1em;
}

div.list .listitem h3 {
	margin: 0 0 0 0;
}

div.list.tweets .listitem h3 {
	margin: 0 0 .4em;
	font-size: .9em;
	line-height: .8em;
}

div.nav .listitem a {
	color: #282828;
}

div.nav .listitem a:hover {
	text-decoration: none;
}

div.nav .listitem a.listname {
	display: block;
}

div.nav .selected, #schedule-popup div.nav .selected {
	background-color: #eee;
}

div.nav .listname {
	display: block; 
	margin-right: 5.5em; 
	font-weight: bold; 
	text-transform: uppercase;
}

div.nav .starttime {
	display: block; 
	width: 70%; 
	line-height: 1em;  
	font-size: .9em;
}

div.nav .tweetcount, div.list .trendcount {
	position: absolute; 
	top: 50%;
	margin-top: -.75em; 
	right: 30px; 
	background: #aaa;
	color: #fff;
	padding: .2em .3em;
	font-size: .9em;
}

div.list .trendcount {
	margin-top: -.8em;
}

.tweets .listthumb {
	width: 50px;
	height: 50px;
	float: left;
	background-color: #ddd;
	border: solid 1px #ccc;
}

.ie7 .tweets .listthumb, .iem7 .tweets .listthumb {
	width: 48px;
	height: 48px;
}

.tweets .listcontent {
	margin-left: 60px;
	position: relative;
}

.ie8 .tweets .listcontent {
	zoom: 1;
	position: static; /* need this to apply opacity */
}

.tweets .tweettext {
	display: block;
	font-size: .9em;
	line-height: 1.3em;
}

.tweets .listthumb img {
	display: block;
}

.tweets .tweettime {
	font-size: .8em;
	color: #aaa;
	position: absolute;
	top: 0;
	right: 0;
	line-height: .8em;
}



ul {
	padding: 0;
}

ul li {
	overflow: hidden;
}

div.nav .listcat {
	font-weight: bold;
	border-bottom: solid 1px #ccc;
	border-top: solid 3px #333;
}


/* 11.MAIN */

.schedule #main {
	display: none;
}

.no-js #map {
	display: none;
}

h3.designer {
	font-size: .9em;
	margin: 0 0 1em;
	text-transform: uppercase;
	font-weight: normal;
	letter-spacing: 1px;
	text-align: center;
	width: 100%;
}

.no-js h3.designer {
	position: relative;
	top: 0;
}

h3.designer .breadcrumb {
	text-decoration: underline;
}

.trends .controlcontainer {
	border-bottom: solid 1px #eee;
	overflow: visible;
	height: 15px;
	margin-bottom: 1em;
}

.no-js .trends .controlcontainer {
	display: none;
}

ul.switchcontrol {
	padding: 1px 0;
	width: 12.3em;
	margin: 0 auto;
}


ul.switchcontrol li {
	float: left;
	padding: .25em 1.5em;
	border: solid 1px #ccc;
	font-size: .8em;
	letter-spacing: 1px;
	text-transform: uppercase;
	background: white;
	cursor: pointer;
	color: #aaa;
}

ul.switchcontrol li.selected {
	font-weight: bold;
	color: #000;
}

/* 12.COMPLIMENTARY */

#trendingcolors {
	display: none;
}

.no-js #trendingwords {
	margin-bottom: 2em;
}

.no-js #trendingcolors {
	display: block;
}

.photos img {
	max-width: 100%;
}
/* 13.CONTENTINFO */
#footer {
	text-align: center;
	border-top: solid 2px #2a2a2a;
	padding-top: 1em;
	background: white;
	height: 20px; 
	width: 100%; 
	margin: 0;
}

#socialbottom {
	width: 120px;
	margin: 0 auto;
	overflow: hidden;
}

/* 14.GLOBAL OBJECTS */

.clearfix { 
zoom : 1; }

.clearfix:before, 
.clearfix:after { 
content : "\0020"; 
display : block; 
height : 0; 
overflow : hidden; }

.clearfix:after { 
clear : both; }

.col {
	float: left;
}

/* 15.VENDOR-SPECIFIC */

body {
-webkit-text-size-adjust : 100%; 
-ms-text-size-adjust : 100%; }

a:link { 
-webkit-tap-highlight-color : rgb(52,158,219); }

::-webkit-selection { 
background : rgb(23,119,175); 
color : rgb(250,250,250); 
text-shadow : none; }

::-moz-selection { 
background : rgb(23,119,175); 
color : rgb(250,250,250); 
text-shadow : none; }

::selection { 
background : rgb(23,119,175); 
color : rgb(250,250,250); 
text-shadow : none; }

.no-js .scroll {
	overflow-y: scroll;
}

.scroll {
	overflow-y: hidden;
	-webkit-overflow-scrolling: touch;
}

.scroll::-webkit-scrollbar {
	width: 15px;
}

.scroll::-webkit-scrollbar-track-piece {
	background-color: white;
}

.scroll::-webkit-scrollbar-button:vertical {
	background-color:transparent;
	height:5px;
}
.scroll::-webkit-scrollbar-thumb:vertical {
	background-color: rgba(0,0,0,0.2);
	height: 50px;
	border-right: 4px solid white;
	border-left: 4px solid white;
}
.scroll::-webkit-scrollbar-corner:vertical {
	background-color:white;
}
.scroll::-webkit-scrollbar-resizer:vertical {
	background-color:red;
}
.scroll::-webkit-scrollbar-button:end:increment {
	display:block;
}
.scroll::-webkit-scrollbar-button:start:decrement {
	display:block;
}
.scroll::-webkit-scrollbar-thumb:vertical:hover {
	background-color:rgba(0,0,0,0.4);
}
.scroll::-webkit-scrollbar-button:vertical:end:decrement {
	display:none;
}
.scroll::-webkit-scrollbar-button:vertical:start:increment {
	display:none;
}

/* input[type=search] {
-webkit-appearance : none; }

input[type="search"]::-webkit-search-decoration, 
input[type="search"]::-webkit-search-cancel-button {
display : none; } */

::-webkit-input-placeholder {
padding : 10px;
font-size : .875em; 
line-height : 1.4; }

input:-moz-placeholder { 
padding : 10px;
font-size : .875em; 
line-height : 1.4; }

.ie7 img,
.iem7 img { 
-ms-interpolation-mode : bicubic; }

div,
input,
textarea  { 
-webkit-box-sizing : border-box;
-moz-box-sizing : border-box;
-o-box-sizing : border-box;
box-sizing : border-box; }

/* Non-semantic helper classes */

/* Image replacement */
.ir { 
display : block; 
text-indent : -999em; 
overflow : hidden; 
background-repeat : no-repeat; 
text-align : left; 
direction : ltr; }

/* Hide for screenreaders and visual browsers */
.hidden { 
display : none; 
visibility : hidden; }

/* Hide visually */
.visuallyhidden { 
position : absolute;
clip : rect(0 0 0 0); 
overflow : hidden;
margin: -1px;
padding : 0;
height : 1px;      
width : 1px;
border : 0; }

/* Allow an element to be focusable via keyboard  */
.visuallyhidden.focusable:active,
.visuallyhidden.focusable:focus { 
position : static;
clip : auto; 
overflow : visible;
height : auto; 
margin : 0;   
width : auto; }

/* Hide but maintain layout */
.invisible { 
visibility : hidden; }

/* Text overflow with ellipsis */
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* 16.TEMPLATE SPECIFICS */

#goog-fixurl ul  {
list-style-type : none; }

#goog-fixurl input  {
margin-bottom : 1.5em; }

/* 17.MODERNIZR */

/* 18.CSS ANIMATIONS */

@-webkit-keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
@-webkit-keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
@-o-keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
@-o-keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
@-ms-keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
@-ms-keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
@-moz-keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
@-moz-keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
@keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
@keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    
@-webkit-keyframes raindrop {
	from {
		top: -40px; /* position hiding out of bounds */
	}
	to {
		top: <?php echo ($max_height+14); ?>px; /* max height */
	}
}

@-webkit-keyframes itemCountRight {
	from {
		right: 30px;
	}
	to {
		right: 0;
	}
}

@-webkit-keyframes tweetLoad {
	from {
		top: 50px;
		opacity: 0;
	}
	to {
		top: 0px;
		opacity: 1;
	}
}

/* MEDIA QUERIES */

/*Print __________________________________________________________________________________________________________ */
@media print {
* { 
background : transparent !important; 
color : black !important; 
text-shadow : none !important; 
filter : none !important;
-ms-filter : none !important; } 

a, a:visited { 
color : #444 !important; 
text-decoration : underline; }

a[href]:after { 
content : " (" attr(href) ")"; }

abbr[title]:after { 
content : " (" attr(title) ")"; }

a[href^="javascript:"]:after, 
a[href^="#"]:after { 
content : ""; }
  
pre, blockquote { 
border : 1px solid #999; 
page-break-inside : avoid; }

thead { 
display : table-header-group; }

tr, img { 
page-break-inside : avoid; }

@page { 
margin : .5cm; }

p, h2, h3 { 
orphans : 3; 
widows : 3; }

h2, h3 { 
page-break-after : avoid; }
}/*/mediaquery*/

/*480px __________________________________________________________________________________________________________ */
@media only screen and (min-width: 480px) {

/* 1.ROOT */
/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */
#banner .search h2 {
	border-left: none;
}

/* 9.NAVIGATION */
/* 10.CONTENT */
/* 11.MAIN */
/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */

}/*/mediaquery*/

/*768px __________________________________________________________________________________________________________ */
@media only screen and (min-width: 768px) {

/* 1.ROOT */

/* 1.ROOT */
/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */

#banner {
	border-bottom: solid 2px #000;
	padding-bottom: .5em;
}

h1 .logo {
	width: 152px;
	height: 23px;
	float: none;
	position: absolute;
	bottom: .5em;
	padding: 0;
	background: white url(../img/l/nytlogo152x23.gif) no-repeat 0 0;
}

h1 span {
	display: block;
	text-align: center;
	padding: 0;
	width: 100%;
}

p.sub-title {
	width: 100%;
	text-align: center;
	margin: 0;
}

#socialtop {
	display: block;
	position: absolute;
	bottom: .5em;
	right: 0;
}

/* 9.NAVIGATION */

#nav {
	
}

#dayslist {
	width: 8em;
	display: block;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	box-shadow: none;
	position: ;
	float: left;
	border-top: none;
	border-bottom: none;
	
}

.iem7 #dayslist, .ie7 #dayslist, .ie8 #dayslist {
	border: none;
	border-right: solid 1px #ccc;
	position: static;
}

#dayslist ul, .csstransforms #dayslist ul {
	padding: 0 1em 0;
}

#dayslist li, .csstransforms #dayslist li {
	width: auto;
	float: none;
	background: white;
	margin: 0;
	padding: 0;
}

#dayslist h3 {
	display: block;
	font-size: 1.8em;
	text-transform: uppercase;
	text-align: right;	
	padding-right: .7em;
	line-height: 1em;
	margin: 0 0 -.1em;
}


#viewnav .daystab {
	display: none;
}

#detailnav li a {
	font-size: 1em;
}

/* 10.CONTENT */
h2.page-title {
	font-size: 1.8em;
	font-weight: normal;
	text-transform: none;
	margin-bottom: .7em;
	text-align: center;
}

#chart .event .listname {
	position : relative;
	clip: auto; 
	overflow : auto;
	margin: 0px;
	padding : 0;
	height : auto;      
	width : auto;
	border : 0;
}

div.schedule {
	margin-left: 9.25em;
}

.ie7 div.nav {
	position: relative;
}

div.minimap {
	height: 300px;
}

/* 11.MAIN */
#main {
	
}

h3.designer {
	letter-spacing: 0px; 
	font-size: 1.5em; 
	font-weight: bold;
	margin-top: .3em;
}

/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
#socialbottom {
	display: none;
}
/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */
@-webkit-keyframes raindrop-768 {
	from {
		top: -40px; /* position hiding out of bounds */
	}
	to {
		top: <?php echo ($max_height+14)*2; ?>px; /* max height */
	}
}

}/*/mediaquery*/

/*992px __________________________________________________________________________________________________________ */
@media only screen and (min-width: 992px) {

/* 1.ROOT */
html {
	overflow: hidden;
	height: 100%;
	max-height: 100%;
}

body {
	overflow: visible;
	height: 100%;
	max-height: 100%;
}

.touch body {
	overflow: hidden;
}

.no-js body {
	height: 92%;
	max-height: 92%;
}

html.no-js {
	height: 92%;
	max-height: 92%;
}

/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */
/* 9.NAVIGATION */

#nav {
	display: block;
	margin-top: 0;
	float: left;
	width: 45%;
	height: 100%;
	margin-right: 1.5em;
	overflow-x: visible;
}

.scroller {
	width: 14px;
	bottom: 0px;
	top: 0px;
	overflow: hidden;
	right: -15px;
	position: absolute;
	z-index: 999;
}

.scroller .track {
	background-color: white;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.scroller .thumb {
	background-color: #ccc;
	position: absolute;
	left: 6px;
	width: 8px;
	height: 40px;
}

.scroller .thumb:hover {
	background-color: #777;
}

#schedulenavscroller {
	bottom: 69px;
}

.ie7 #schedulenavscroller {
	bottom: 69px;
}

#mainsectioncroller {
	bottom: 125px;
}

.ie7 #mainsectionscroller {
	bottom: 0px;
}

h2.secondary {
	position: absolute; 
	z-index: 9999; 
	width: 10em; 
}

#viewnav {
	margin-top: 1.4em;
}

.ie7 #viewnav {
	top: 1.4em;
}

#contentnav {
	height: 100%;
	padding-bottom: 68px;
	position: relative;
}

.ie7 #contentnav {
	margin-top: 2.4em;
	padding-bottom: 0px;
}

#viewnav .backlink {
	display: none;
}

div.schedule {
	height: 100%;
}

/* dynamic javascript popup */
#schedule-popup {
	top: 0;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	box-shadow: none;
	overflow: visible;
	padding: 0 10px 10px 0;
	display: block;
	border-right: solid 1px #ccc;
}
/* 10.CONTENT */
.content {
	height: 100%;
	padding-bottom: 125px;
}

.no-js .content {
	padding-bottom: 40px;
}

.ie7 .content {
	padding-bottom: 0px;
}

/* 11.MAIN */

h2.page-title {
	margin-bottom: 0em;
}

#main {
	position: static;
	top: auto;
	height: 100%;
	border-left: solid 1px #ccc;
	padding-left: 1.5em;
	margin-left: 48%;
}

.schedule #main {
	display: block;
}

.ie7 #main {
	position: relative;
	
}

#modules {
	height: 100%;
	padding-bottom: 112px;
	margin-top: 0;
	position: relative;
}

.ie7 #modules {
	padding-bottom: 0;
}

#mainsection {
	position: relative;
	height: 100%;
}

div.nav .tweettext {
	display: block;
	padding-right: 1em;
}

div.nav .tweettime {
	right: 1em;
}

h3.designer {
	position: static;
	top: 0;
	width: auto;
	letter-spacing: 0px; 
	font-size: 2.3em; 
	font-weight: bold; 
	margin-bottom: .5em;
}

h3.designer .breadcrumb {
	display: none;
}

h3.designer b {
	display: none;
}

/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
#footer, .no-js noscript {
	position: absolute; 
	bottom: 15px; 
	z-index: 9999; 
}
.no-js #footer {
	bottom: -70px;
}

.no-js noscript {
	bottom: -100px;
}

/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */

}/*/mediaquery*/

/*1382px __________________________________________________________________________________________________________ */
@media only screen and (min-width: 1382px) {

/* 1.ROOT */
/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */
/* 9.NAVIGATION */
#nav {
	width: 35em;
}
/* 10.CONTENT */
#chart {
	height: <?php echo ($max_height+20)*2.5; ?>px;
}
/* 11.MAIN */

#main {
	margin-left: 37.3em;
}

/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */
@-webkit-keyframes raindrop-1382 {
	from {
		top: -40px; /* position hiding out of bounds */
	}
	to {
		top: <?php echo ($max_height+14)*2.5; ?>px; /* max height */
	}
}

}/*/mediaquery*/

/*1382px __________________________________________________________________________________________________________ */
@media only screen and (min-width: 1802px) {

/* 1.ROOT */
/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */
/* 9.NAVIGATION */
/* 10.CONTENT */
#chart {
	height: <?php echo ($max_height+20)*3.5; ?>px;
}
/* 11.MAIN */
/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */
@-webkit-keyframes raindrop-1802 {
	from {
		top: -40px; /* position hiding out of bounds */
	}
	to {
		top: <?php echo ($max_height+14)*3.5; ?>px; /* max height */
	}
}

}/*/mediaquery*/

/*1.5x Android______________________________________________________________________________________________________ */
@media only screen and (-webkit-device-pixel-ratio:1.5){

/* 1.ROOT */
/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */
h1 .logo {
	background: url(../img/m/nyt-logo1.5x.gif) no-repeat 0 0;
	background-size: 50px 50px;
	-webkit-background-size: 50px 50px;
}
/* 9.NAVIGATION */
/* 10.CONTENT */
ol.nav li {
	background: url(../img/m/nav-arrow-right1.5x.gif) no-repeat center right;
	background-size: 14px 22px;
	-webkit-background-size: 14px 22px;
}
/* 11.MAIN */
/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */

}

/*2x __________________________________________________________________________________________________________ */
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {

/* 1.ROOT */
/* 2.HEADINGS */
/* 3.TYPOGRAPHY */
/* 4.LINKS */
/* 5.FIGURES & IMAGES */
/* 6.TABLES */
/* 7.FORMS */
/* 8.BANNER */
h1 .logo {
	background: url(../img/h/nyt-logo2x.gif) no-repeat 0 0;
	background-size: 50px 50px;
	-webkit-background-size: 50px 50px;
}
/* 9.NAVIGATION */
/* 10.CONTENT */
ol.nav li {
	background: url(../img/h/nav-arrow-right2x.png) no-repeat center right;
	background-size: 13px 22px;
	-webkit-background-size: 13px 22px;
}
/* 11.MAIN */
/* 12.COMPLIMENTARY */
/* 13.CONTENTINFO */
/* 14.GLOBAL OBJECTS */
/* 15.VENDOR-SPECIFIC */
/* 16.TEMPLATE SPECIFICS */
/* 17.MODERNIZR */
/* 18.CSS ANIMATIONS */

}

/* 
Sources: 
http://meyerweb.com/eric/tools/css/reset
http://people.opera.com/patrickl/experiments/keyboard/test
http://gist.github.com/413930
http://pathf.com/blogs/2008/05/formatting-quoted-code-in-blog-posts-css21-white-space-pre-wrap
http://sitepoint.com/blogs/2010/08/20/ie-remove-textarea-scrollbars
http://tjkdesign.com/ez-css/css/base.css
http://viget.com/inspire/styling-the-button-element-in-internet-explorer
http://code.flickr.com/blog/2008/11/12/on-ui-quality-the-little-things-client-side-image-resizing
http://html5doctor.com/html-5-reset-stylesheet/
http://praegnanz.de/weblog/htmlcssjs-kickstart/
http://camendesign.com/design/
http://yui.yahooapis.com/2.8.1/build/base/base.css
http://webaim.org/techniques/css/invisiblecontent/
http://drupal.org/node/897638
*/