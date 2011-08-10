<?php 
	
require_once('_global.php');
require_once('_config.php');

$schedule = isset($_REQUEST['schedule']) ? $_REQUEST['schedule'] : null;
$daterange = isset($_REQUEST['daterange']) ? $_REQUEST['daterange'] : null;
$designers = isset($_REQUEST['designers']) ? $_REQUEST['designers'] : null;	
?>

<!DOCTYPE html>

<!-- 
320 and Up boilerplate extension
Author: Andy Clarke
Version: 0.9b
URL: http://stuffandnonsense.co.uk/projects/320andup 
-->

<!--[if IEMobile 7 ]><html class="no-js iem7" manifest="default.appcache?v=1"><![endif]-->
<!--[if lt IE 7 ]><html class="no-js ie6" lang="en"><![endif]-->
<!--[if IE 7 ]><html class="no-js ie7" lang="en"><![endif]-->
<!--[if IE 8 ]><html class="no-js ie8" lang="en"><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html class="no-js" manifest="default.appcache?v=1" lang="en"><!--<![endif]-->

<head>
	<?php require_once('_default_db_request.php'); ?>
	<?php include '_head.php'; ?>
</head>


<body class="clearfix <?php if ( isset($schedule) ) { echo "schedule"; } ?>">

<header id="banner" role="banner" class="clearfix">
	
	<h1 class="clearfix"><span class="hashtag">#<span> </span></span><span class="logo1">New York</span> <span class="logo2">Fashion Week</span></h1>
	
	<div id="socialtop">
		
		
		<a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
		<g:plusone size="medium" count="false"></g:plusone>
		<img src="img/l/facebook.gif" />

	</div>
	<div id="log">
		<b>Real-time Disabled:  </b>
		<span id="fps"></span>
	</div>
</header>

<?php

/*
if (isset($schedule) && $schedule == "show" && !$daterange) {
	include 'views/static_html/schedule.html';
	//include 'views/schedule.php';
} else if (isset($schedule) && $schedule == "long" && !$daterange) {
	include 'views/schedule_long.php';

} else if (isset($designers)) {
	include 'views/designers.php';

} else {
	include 'views/main.php'; 
}
*/

include 'views/main.php'; 

?>


<footer id="footer" role="contentinfo" class="clearfix">
	<div id="socialbottom">
		
		
		<a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
		<g:plusone size="medium" count="false"></g:plusone>
		<img src="img/l/facebook.gif" />

	</div>
</footer>

<!-- Scripts & Analytics -->
<?php include '_foot.php'; ?>

</body>
</html>
