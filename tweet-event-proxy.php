<?php

include '_config.php';

try {
	// open connection to MongoDB server
	$conn = new Mongo($MONGO_HOST);
	
	// access database
	$db = $conn->{'tweet-event'};
						
	//get list of all collections
	$list = $db->listCollections();
	
	$max_height = 150;
	
	$events = $db->events;
	
	$cursor = $events->find()->sort(array('startTime'=>1)); //we can use limit here in the future
	
	$index = 0;
	$event_list = array();
	
	foreach ($cursor as $obj) {
		echo 'onScreenEventIndexes["'.$obj['keyword'].'"] = {"index": '.$index.' };';
		echo 'onScreenEvents['.$index.'] = { "keyword": "'.$obj['keyword'].'", "tweetCount": '.$obj['tweetCount'].', "color": "'.$obj['color'].'", "rainIndex": 0 };';
		$event_list[$index] = array(
			'keyword'=>$obj['keyword'],
			'name'=>$obj['name'],
			'start_time'=>$obj['startTime']->sec,
			'duration'=>$obj['duration'],
			'location'=>$obj['location'],
			'latlng'=>$obj['latlng'],
			'tweet_count'=>$obj['tweetCount'],
			'color'=>$obj['color']
		);
		$index++;
	}
	
	// disconnect from server
	$conn->close();
} catch (MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch (MongoException $e) {
	die('Error: ' . $e->getMessage());
}

?>