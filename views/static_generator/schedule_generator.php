<?php

$WEB_ROOT;

if ($_SERVER['SERVER_NAME'] != "tweetyvent.dev") {
	$WEB_ROOT = "http://".$_SERVER['SERVER_NAME']."/node-projects/tweet-event-map/public_html/";
} else {
	$WEB_ROOT = "http://".$_SERVER['SERVER_NAME']."/";
}

$cache_folder = $WEB_ROOT."views/static_html/";
$source_page = $WEB_ROOT."views/schedule.php";
$temp_filename = "/Applications/MAMP/htdocs/node-projects/tweet-event-map/public_html/views/tmp/temp_schedule.html";
$target_filename = "/Applications/MAMP/htdocs/node-projects/tweet-event-map/public_html/views/static_html/schedule.html";

$dynamic_source = fopen($source_page, 'r');

if (!$dynamic_source) { 
	echo "<strong>Unable to load $source_page - Static page! Update Failed!</strong>"; 
	exit(); 
}

$htmldata = fread($dynamic_source, 1024*1024); 
fclose($dynamic_source); 
$tempfile = fopen($temp_filename, 'w');

if(!$tempfile){  
	echo"<strong>Unable to open temporary file $temp_filename for writing! Static page update aborted!</strong>"; 
	exit(); 
}

fwrite($tempfile, $htmldata); 
fclose($tempfile);

copy($temp_filename, $target_filename);  
unlink($temp_filename); 
echo "<strong>Tutorial Index Updated!</strong>";

?>