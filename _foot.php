<!-- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID -->
<!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script>
-->
<script>
//window.jQuery || document.write('<script src="js/libs/jquery-1.5.1.min.js">\x3C/script>');
var nodeDomain = "<?php echo $NODE_DOMAIN; ?>";
</script> 
<script src="js/libs/jquery-1.5.1.min.js"></script>
<script src="js/libs/jquery-ui-1.8.14.min.js"></script>

<!--[if (lt IE 9) & (!IEMobile)]>
<script src="js/libs/DOMAssistantCompressed-2.8.js"></script>
<script src="js/libs/selectivizr-1.0.1.js"></script>
<script src="js/libs/respond.min.js"></script>
<![endif]-->

<!--[if (lt IE 9)]>
<script src="js/libs/json2.js"></script>
<![endif]-->

<!-- <script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script> -->

<!-- for blackberry testing -->
<!-- <script src="js/libs/json2.js"></script> -->

<!-- Scripts -->
<script src="js/plugins.js"></script>

<script>

DDE.onScreenEventIndexes = {};
DDE.onScreenEvents = [];
DDE.allEventIndexes = {};
//DDE.allEvents = [];
//Todo: might not needs this for 
DDE.allEventsSchedule = <?php echo json_encode($event_list); ?>;
	
<?php
	/*
	$index = 0;
	foreach ($event_list as $event) {
		echo 'DDE.allEventIndexes["'.$event['keyword'].'"] = {"index": '.$index.' };';
		echo 'DDE.allEvents['.$index.'] = { "keyword": "'.$event['keyword'].'", "startTime": "'.$event['start_time'].'", "duration": '.$event['duration'].', "tweetCount": '.$event['tweet_count'].', "color": "'.$event['color'].'", "rainIndex": 0 };';
		$index++;
	}
	*/
	
	/*
	$index = 0;
	foreach ($limited_event_list as $event) {
		echo 'DDE.onScreenEventIndexes["'.$event['keyword'].'"] = {"index": '.$index.' };';
		echo 'DDE.onScreenEvents['.$index.'] = { "keyword": "'.$event['keyword'].'", "startTime": "'.$event['start_time'].'", "duration": '.$event['duration'].', "tweetCount": '.$event['tweet_count'].', "color": "'.$event['color'].'", "rainIndex": 0 };';
		$index++;
	}
	*/
	
if (isset($url_list)) {	
?>

	
DDE.externalLinks = [];


	
<?php
	$count = count($url_list);
	for ($i=0; $i<$count; $i++) {
		echo 'DDE.externalLinks['.$i.'] = { "id" : "'.$url_list[$i]["id"].'", "tweet" : '.json_encode($url_list[$i]["tweet"]).', "img_urls" : '.json_encode($url_list[$i]["img_urls"]).'};';
	}
	
}
?>
	

</script>
<script src="js/script.js?v=2"></script>

<!--  Place this tag after the last plusone tag -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>

<?php

if ($GA_ANALYTICS) {

?>
<!-- http://t.co/HZe9oJ4 -->
<script>
var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']]; // Change UA-XXXXX-X to be your site's ID
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));
</script>

<?php

}

?>

<noscript>
	<p>Your browser does not support JavaScript! Only basic features available.</p>
</noscript>