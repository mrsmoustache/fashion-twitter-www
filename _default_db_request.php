<?php
//Build data lists and variables
try {

	// open connection to MongoDB server
	$conn = new Mongo($NODE_HOST);
	
	// access database
	$db = $conn->{'tweet-event'};
						
	//get list of all collections
	$list = $db->listCollections();
	
	$max_height = 150;
	
	$events = $db->events;
	
	$cursor = $events->find()->sort(array('startTime'=>1)); //we can use limit here in the future
	
	$event_list = array();
		
	?>
	
	<?php
	
	foreach ($cursor as $obj) {
		$event_list[] = array(
			'keyword'=>$obj['keyword'],
			'name'=>$obj['name'],
			'start_time'=>$obj['startTime']->sec,
			'duration'=>$obj['duration'],
			'location'=>$obj['location'],
			'latlng'=>$obj['latlng'],
			'tweet_count'=>$obj['tweetCount'],
			'color'=>$obj['color']
		);
	}
	
	require_once('_time_slots.php');
	
	//$daterange
	//$time_slots
	$view_slots;
	$limited_event_list = array();
	
	if (!$daterange) {
		$view_slots = $time_slots['Thursday, Feb 10'][1];
		foreach ($view_slots as $arr) {
			foreach($arr as $key=>$item) {
				//$key = "name";
				//$item = "Vena Cava
			}
			
			$limited_event_list[] = $event_list[$arr["key_index"]];
		}
	}
	 
		
	$biggest_first = subval_sort($limited_event_list, 'tweet_count', 'desc');
	$highest_count = $biggest_first[key($biggest_first)]['tweet_count'];
	
	$max_count = $highest_count/.95;
	if ($max_count == 0) $max_count = 1;
	$scale = $max_height/$max_count;
	$index = 0;
	$event_length = count($limited_event_list);
	$margin = 2;
	$margin_total = $margin*($event_length-1);
	$tr_width = (100-$margin_total)/($event_length);
	$tr_spaced = $tr_width * .70;
		
	
	?>

	
	<?php
	
	/*
	$events = array();
	
	foreach ($list as $collection) {
		// access collection
		//echo $collection;
		
		//$collection = $db->items;
		
		//echo $list;
		
		$name = $collection->getName();
		$count = $collection->count();
		$events[$index] = array("name"=>$name, "count"=>$count);
		
		$index++;
		//echo "<li style='height: ".(($count*.2)+1)."em;'><span>".$index."</span> ".$name."</li>";
		
	}
	
	
	//sort events by date-time
	
	
	//create a copy of the events array and sort by tweet count
	$biggest_first = subval_sort($events, 'count', 'desc');
	echo "<br />";
	print_r($biggest_first);
	
	//get the event with the largest count
	*/
	
	
	
	
	// disconnect from server
	$conn->close();
} catch (MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch (MongoException $e) {
	die('Error: ' . $e->getMessage());
}

?>
