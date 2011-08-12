<?php
//Build data lists and variables
try {

	// open connection to MongoDB server
	$conn = new Mongo($NODE_HOST);
	
	// access database
	$db = $conn->{'tweet-event'};
						
	//get list of all collections
	//$list = $db->listCollections();
	
	$max_height = 150;
	
	$events = $db->events;
	
	$cursor = $events->find()->sort(array('startTime'=>1)); //we can use limit here in the future
	
	$event_list = array();
	$designer_lookup = array();
	$designer_ids = array();
	$index = 0;
		
	//build $event_list array and group by day of the week
	foreach ($cursor as $obj) {
	
		$day = date('l, M j', $obj['startTime']->sec);
		$day = strtotime($day);
		
		$designer_lookup[$obj['keyword']] = array("name"=>$obj['name'], "tweet_count"=>$obj['tweetCount'], "keyword"=>$obj['keyword']);
		$designer_ids[] = $obj['keyword'];
	
		if ( isset($event_list[$day]) ) {
		
			if ( isset($event_list[$day][$obj['startTime']->sec]) ) {
				$event_list[$day][$obj['startTime']->sec][] = array(
					'keyword'=>$obj['keyword'],
					'name'=>$obj['name'],
					'start_time'=>$obj['startTime']->sec,
					'duration'=>$obj['duration'],
					'location'=>$obj['location'],
					'latlng'=>$obj['latlng'],
					'tweet_count'=>$obj['tweetCount'],
					'color'=>$obj['color'],
					'index'=>$index
				);
				
			} else {
				$event_list[$day][$obj['startTime']->sec] = array();
				$event_list[$day][$obj['startTime']->sec][] = array(
					'keyword'=>$obj['keyword'],
					'name'=>$obj['name'],
					'start_time'=>$obj['startTime']->sec,
					'duration'=>$obj['duration'],
					'location'=>$obj['location'],
					'latlng'=>$obj['latlng'],
					'tweet_count'=>$obj['tweetCount'],
					'color'=>$obj['color'],
					'index'=>$index
				);
			}
		
		} else {
			$event_list[$day] = array();
			$event_list[$day][$obj['startTime']->sec] = array();
			$event_list[$day][$obj['startTime']->sec][] = array(
				'keyword'=>$obj['keyword'],
				'name'=>$obj['name'],
				'start_time'=>$obj['startTime']->sec,
				'duration'=>$obj['duration'],
				'location'=>$obj['location'],
				'latlng'=>$obj['latlng'],
				'tweet_count'=>$obj['tweetCount'],
				'color'=>$obj['color'],
				'index'=>$index
			);
			
		}
		
		$index++;
		
	}
	
	//Create Designers alpha view
	
	$alpha_order = subval_sort($designer_lookup, 'name');
	$alpha_list = array();
	
	foreach ($alpha_order as $arr) {
	
		$letter = strtoupper( substr($arr["name"], 0, 1) );
		
		if ( isset($alpha_list[$letter]) ) {
			$alpha_list[$letter][] = array(
				'keyword'=>$arr['keyword'],
				'name'=>$arr['name'],
				'tweet_count'=>$arr['tweet_count']
			);
		} else {
			$alpha_list[$letter] = array();
			$alpha_list[$letter][] = array(
				'keyword'=>$arr['keyword'],
				'name'=>$arr['name'],
				'tweet_count'=>$arr['tweet_count']
			);
		}
	}
	
	
	
	// disconnect from server
	$conn->close();
} catch (MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch (MongoException $e) {
	die('Error: ' . $e->getMessage());
}

?>
