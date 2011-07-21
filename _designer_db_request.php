<?php
//Build data lists and variables
try {
	// open connection to MongoDB server
	$conn = new Mongo($NODE_HOST);
	
	// access database
	$db = $conn->{'tweet-event'};
						
	//get the designers collection of tweets	
	$collection = $db->$designers;
		
	$tweets_cursor = $collection->find()->sort(array('created_at'=>-1))->limit(10);
	
	$tweet_list = array();
		
	foreach ($tweets_cursor as $key=>$value) {
		$tweet_list[] = array("id"=>$key, "tweet"=>$value);
		
	}
	
	//get tweets with urls and images
	$url_link = 'entities.urls';
	$url_cursor = $collection->find( array( $url_link=>array('$size'=>1) ) )->sort(array('created_at'=>-1))->limit(20);
	
	$url_list = array();
	$pattern = '/^http:\/\/(yfrog.|instagr.|lockerz.|twitpic.)/i';
	
	foreach($url_cursor as $key=>$value) {
	
		$urls_length = count($value["entities"]["urls"]);
		$img_urls = array();
		for ($i=0;$i<$urls_length;$i++) {
			if (isset($value["entities"]["urls"][$i]["url"])) {
				$str = $value["entities"]["urls"][$i]["url"];
				if (preg_match($pattern, $str)) {
					$img_urls[] = $str;
				}
			}
		}
		
		$img_count = count($img_urls);
		if ($img_count > 0) {
			$url_list[] = array("id"=>$key, "tweet"=>$value, "img_urls"=>$img_urls);
		}
		
	}
	
	?>
	

	
	<?php
	
	
	//get the global words collection for trend list
	$words = $db->words;
	
	$designer_counts = 'counts.'.$designers;
	$words_cursor = $words->find(array( $designer_counts=>array( '$exists'=> true ) ))->sort(array($designer_counts=>-1))->limit(10);
		
	$trends_list = array();
	
	foreach ($words_cursor as $key=>$arr) {
	
		if ($arr["counts"][$designers]) {
			$trends_list[] = array("count"=>$arr["counts"][$designers], "word"=>$arr["word"]);
		}
		
		//$words_list[] = array("id"=>$key, "tweet"=>$value);
		
	}
	
	// disconnect from server
	$conn->close();
} catch (MongoConnectionException $e) {
	die('Error connecting to MongoDB server');
} catch (MongoException $e) {
	die('Error: ' . $e->getMessage());
}

?>
