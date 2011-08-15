<?php 

//echo $designers; //this is a GET variable

$match = -1;
$designer_event;

if ((!isset($designers) && !isset($schedule)) || ( $designers == "all" || $schedule == "show")) {
	//fetch assorted designers data
	include '_designer_db_wrapper.php';
	$designer_event = array(
		"name"=>"All"
	);
} else {
	
	$slug;
	if (isset($designers)) {
		$slug = $designers;
	} else {
		$slug = $schedule;
	}
	
	foreach ($event_list as $day_arr) {
		foreach($day_arr as $time_arr) {
			foreach ($time_arr as $event) {
				if ($event["keyword"] == $slug) {
					$designer_event = $event;
					$match = 1;
				}
			}
		}
	}
	
	
	if ($match != -1) {
		//we have a designer by that name
		include '_designer_db_request.php';
		
	} else {
		//sorry no matching designer found
		echo "No designer exists for that slug";
	}
	
}

?>

		<div id="modules" class="clearfix">
		
			<div id="mainsection" class="scroll">
			
				<div>
			
					<div class="list tweets">
					
						<?php 
						date_default_timezone_set('America/New_York');
						
						$index = 0;
						foreach ($tweet_list as $arr) { 
							
							$value = $arr["tweet"];
							$text = $arr["tweet"]["text"];
							$author_name = $arr["tweet"]["user"]["screen_name"];
							$thumb = $arr["tweet"]["user"]["profile_image_url"];
							$author = $arr["tweet"]["user"]["name"];
							$author_url = 'http://twitter.com/'.$arr["tweet"]["user"]["screen_name"];
							
							
							$urls_length = count($value["entities"]["urls"]);
		
							for ($i=0;$i<$urls_length;$i++) { 
								if (isset($value["entities"]["urls"][$i]["url"])) {
									$url = $value["entities"]["urls"][$i]["url"];
									$url_match = preg_replace('/\//', '\/', $url);
									$pattern = '/'.$url_match.'/';
									$replace = '<a href="'.$url.'" target="_blank">'.$url.'</a>';
									$text = preg_replace($pattern, $replace, $text);
								}
							}
							
							$mentions_length = count($value["entities"]["user_mentions"]);
							for ($i=0;$i<$mentions_length;$i++) { 
								if (isset($value["entities"]["user_mentions"][$i]["screen_name"])) {
									$username = $value["entities"]["user_mentions"][$i]["screen_name"];
									
									$pattern = '/@'.$username.'\b/i';
									$replace = '<a href="http://twitter.com/'.$username.'" target="_blank">@'.$username.'</a>';
									$text = preg_replace($pattern, $replace, $text);
								}
							}
							
							
							
							$created_at = date('M j, g:i A', strtotime($arr["tweet"]["created_at"]));
							echo '<div id="tweet'.$index.'" class="listitem clearfix"><div class="listthumb"><img src="'.$thumb.'" height="48" width="48" /></div><div class="listcontent"><h3><a href="'.$author_url.'" target="_blank">'.$author_name.'</a></h3> <span class="tweettext">'.$text.'</span> <span class="tweettime">'.$created_at.'</span></div></div>';
							
							$index++;
							
						}
						
						?>
					
					</div>
					
					<h2 class="no-tab">Trends</h2>
					
					<div class="list trends">
						<div class="controlcontainer">
							<ul class="switchcontrol clearfix">
								<li class="selected" id="wordswitch">Words</li>
								<li id="colorswitch">Colors</li>
							</ul>
						</div>
						
						<h3 class="no-tab">Words</h3>
					
						<div id="trendingwords">
						
						<?php
							$index = 0;
							foreach($trends_list as $arr) {
								$word = $arr["word"];
								$count = $arr["count"];
								echo '<div id="trend'.$index.'" class="listitem"><h3>'.$word.'</h3> <span class="trendcount">'.$count.'</span> </div>';
							
							$index++;
							}
						?>
						
						</div>
						
						<h3 class="no-tab">Colors</h3>
						
						<div id="trendingcolors">
						
						<?php
							$index = 0;
							foreach($colors_list as $arr) {
								$color = $arr["color"];
								$count = $arr["count"];
								echo '<div id="trend'.$index.'" class="listitem"><h3>'.$color.'</h3> <span class="trendcount">'.$count.'</span> </div>';
							
							$index++;
							}
						?>
						
						</div>	
					</div>
					
					<h2 id="photosheader" class="no-tab">Photos</h2>
					
					<div class="list photos">
					
					<?php
						foreach($url_list as $arr) {
							$url = $arr["img_urls"][0];
		
							$pattern = '/^http:\/\/(yfrog.|instagr.|lockerz.|twitpic.|pic.twitter.)/i';
							preg_match($pattern, $url, $url_group);
							
							$request;
							
							switch($url_group[0]) {
								case 'http://yfrog.':
									$request = $url.":iphone";
									break;
								
								case 'http://instagr.':
									$imgID = preg_replace('/^http:\/\/instagr.am\/p\//i', '', $url);
									$request = "http://instagr.am/p/".$imgID."media";
									break;
									
								case 'http://lockerz.':
									$request = "http://api.plixi.com/api/TPAPI.svc/imagefromurl?size=big&url=".$url;
									break;
									
								case 'http://twitpic.':
									$imgID = preg_replace('/^http:\/\/twitpic.com\//i', '', $url);
									$request = "http://twitpic.com/show/large/".$imgID;
									break;
							}
							
							$tweetStr = $arr["tweet"]["text"];
			
							$tweetStr = preg_replace('/http:\/\/[a-zA-Z0-9-.\/]+/i', ' ', $tweetStr);
			
							$author = $arr["tweet"]["user"]["name"];
							$author_url = 'http://twitter.com/'.$arr["tweet"]["user"]["screen_name"];
			
							$photo_date = date('M j, g:i A', strtotime($arr["tweet"]["created_at"]));
							
							if (isset($request)) {
								echo '<div class="listitem"><div class="photocontainer clearfix">';
								echo '<img src="'.$request.'" />';
								echo '<div class="caption">'.$tweetStr.' &mdash;<a href="'.$author_url.'" target="_blank">'.$author.'</a> <span class="photodate">'.$photo_date.'</span></div>';
								echo '</div></div>';
							}
							
						}
						
					?>
					
					</div>
					
					<div id="loadmore">Load More</div>
				
				</div>			
								
			</div>
			
		</div>
	
