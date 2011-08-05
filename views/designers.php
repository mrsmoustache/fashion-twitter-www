<?php 

//echo $designers; //this is a GET variable

$match = -1;
$designer_event;

if (!isset($designers) || $designers == "all") {
	//fetch assorted designers data
	include '_designer_db_wrapper.php';
	$designer_event = array(
		"name"=>"All"
	);
} else {
	
	foreach ($event_list as $day_arr) {
		foreach($day_arr as $time_arr) {
			foreach ($time_arr as $event) {
				if ($event["keyword"] == $designers) {
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
			
				<div class="list tweets">
				
					<?php 
					date_default_timezone_set('America/New_York');
					
					$index = 0;
					foreach ($tweet_list as $arr) { 
						
						$text = $arr["tweet"]["text"];
						$username = $arr["tweet"]["user"]["screen_name"];
						$thumb = $arr["tweet"]["user"]["profile_image_url"];
						$created_at = date('d M Y, h:m:s', strtotime($arr["tweet"]["created_at"]));
						echo '<div id="tweet'.$index.'" class="listitem clearfix"><div class="listthumb"><img src="'.$thumb.'" height="48" width="48" /></div><div class="listcontent"><h3>'.$username.'</h3> <span class="tweettext">'.$text.'</span> <span class="tweettime">'.$created_at.'</span></div></div>';
						
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
				
				<h2 class="no-tab">Photos</h2>
				
				<div class="photos"></div>
								
								
			</div>
			
			
		</div>
	
