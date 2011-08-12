<?php

include('_config.php');
include('_global.php');
//Build data lists and variables
$designers = $_GET["designers"];
$tweet_list = array();
$url_list = array();
$trends_list = array();
$colors_list = array();

include('_default_db_request.php');

try {
	
	include('_designer_db_request.php');
	
	$response = array(
		"tweetList"=>$tweet_list,
		"urlList"=>$url_list,
		"trendsList"=>$trends_list,
		"colorsList"=>$colors_list
	);
	
	echo json_encode($response);
	
	// disconnect from server
	$conn->close();
} catch (MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch (MongoException $e) {
	die('Error: ' . $e->getMessage());
}

?>
