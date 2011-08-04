<?php
//Build data lists and variables
$tweet_list = array();
$url_list = array();
$trends_list = array();
$colors_list = array();

try {

	include('_designer_db_request.php');
	
	// disconnect from server
	$conn->close();
} catch (MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch (MongoException $e) {
	die('Error: ' . $e->getMessage());
}

?>