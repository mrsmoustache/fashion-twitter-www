<?php
// open connection to MongoDB server
	$conn = new Mongo($NODE_HOST);
		
	// access database
	$db = $conn->{'tweet-event'};
	
	
	//get the designers collection of tweets
	if (isset($designers) && $designers != "all") {
	
		$collection = $db->$designers;
		
	
		$tweets_cursor = $collection->find()->sort(array('created_at'=>-1))->limit(10);
		
		foreach ($tweets_cursor as $key=>$value) {
			
			$tweet_list[] = array("id"=>$key, "tweet"=>$value);
			
		}
		
		//get tweets with urls and images
		
		//db.marcjacobs.find({ $or : [ { 'entities.urls':{ $elemMatch :  { 'url' : /^http:\/\/(twitpic.)/i  }  }}, { 'entities.urls': { $elemMatch : { 'url': /^http:\/\/yfrog./i  }  }  }  ] }).sort({'created_at':-1}).limit(10); 
		
		//db.marcjacobs.find({'entities.urls':{ $elemMatch :  { 'url' : /^http:\/\/(twitpic.)/i  }  }}).sort({'created_at':-1}).limit(10);
		
		
		
		$pattern = '/^http:\/\/(yfrog.|instagr.|lockerz.|twitpic.|pic.twitter.)/i';
		$url_link = 'entities.urls';
		
		$mongoRegExp = new MongoRegex($pattern);
		
		$elemMatch1 = array( $url_link => array( '$elemMatch' => array( 'url'=> $mongoRegExp )));
		$elemMatch2 = array( $url_link => array( '$elemMatch' => array( 'expanded_url'=> $mongoRegExp )));
		$orArr = array( $elemMatch1, $elemMatch2  );
		
		
		$url_cursor = $collection->find( array( '$or' => $orArr )  )->limit(10);
		//$url_cursor = $collection->find( array( $url_link=>array('$size'=>1) ) )->sort(array('created_at'=>-1))->limit(20);
		
		foreach($url_cursor as $key=>$value) {
			$urls_length = count($value["entities"]["urls"]);
			$img_urls = array();
			for ($i=0;$i<$urls_length;$i++) {
				if (isset($value["entities"]["urls"][$i]["url"])) {
				
					if (isset($value["entities"]["urls"][$i]["expanded_url"])) {
						$str = $value["entities"]["urls"][$i]["expanded_url"];
						if (preg_match($pattern, $str)) {
							$img_urls[] = $str;
							
						}
					} else {
						$str = $value["entities"]["urls"][$i]["url"];
						if (preg_match($pattern, $str)) {
							$img_urls[] = $str;
							
						}
					}
				}
			}
			
			$img_count = count($img_urls);
			if ($img_count > 0) {
				$url_list[] = array("id"=>$key, "tweet"=>$value, "img_urls"=>$img_urls);
			}
		}
		
		//get the global words collection for trend list
		$words = $db->words;
		
		$designer_counts = 'counts.'.$designers;
		$words_cursor = $words->find(array( $designer_counts=>array( '$exists'=> true ) ))->sort(array($designer_counts=>-1))->limit(10);
			
		
		foreach ($words_cursor as $key=>$arr) {
		
			if ($arr["counts"][$designers]) {
				$trends_list[] = array("count"=>$arr["counts"][$designers], "word"=>$arr["word"]);
			}
			
			//$words_list[] = array("id"=>$key, "tweet"=>$value);
			
		}
		
		//get colors
		$colors = $db->colors;
		
		$designer_counts = 'counts.'.$designers;
		$colors_cursor = $colors->find(array( $designer_counts=>array( '$exists'=> true ) ))->sort(array($designer_counts=>-1))->limit(10);
		foreach ($colors_cursor as $key=>$arr) {
		
			if ($arr["counts"][$designers]) {
				$colors_list[] = array("count"=>$arr["counts"][$designers], "color"=>$arr["color"]);
			}
			
			//$words_list[] = array("id"=>$key, "tweet"=>$value);
			
		}
		
	} else {
		//for all designers we can only get the trend info until we restructure the database better for tweets
		$words = $db->words;
		
		$designer_counts = 'counts.total';
		$words_cursor = $words->find(array( $designer_counts=>array( '$exists'=> true ) ))->sort(array($designer_counts=>-1))->limit(10);
			
		
		foreach ($words_cursor as $key=>$arr) {
		
			if ($arr["counts"]["total"]) {
				$trends_list[] = array("count"=>$arr["counts"]["total"], "word"=>$arr["word"]);
			}
			
			//$words_list[] = array("id"=>$key, "tweet"=>$value);
			
		}
		
		//get colors
		$colors = $db->colors;
		
		$designer_counts = 'counts.total';
		$colors_cursor = $colors->find(array( $designer_counts=>array( '$exists'=> true ) ))->sort(array($designer_counts=>-1))->limit(10);
		foreach ($colors_cursor as $key=>$arr) {
		
			if ($arr["counts"]["total"]) {
				$colors_list[] = array("count"=>$arr["counts"]["total"], "color"=>$arr["color"]);
			}
			
			//$words_list[] = array("id"=>$key, "tweet"=>$value);
			
		}

	}

?>
