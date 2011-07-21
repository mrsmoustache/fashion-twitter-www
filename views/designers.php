<?php 

//echo $designers;

$match = -1;
foreach ($time_slots as $arr) {
	foreach($arr as $group) {
		if (isset($group[$designers])) {
			$match = $group[$designers]["key_index"];
		}
	}
}

$designer_event;
if ($match != -1) {
	//we have a designer by that name
	$designer_event = $event_list[$match];
	include '_designer_db_request.php';
	
} else {
	//sorry no matching designer found
}

?>



<div class="content clearfix">

	<div id="main" role="main">
		<nav id="viewnav">
			<span class="backlink"><span>&laquo;</span> <a class="back" href="/">Back</a></span>
			<ul class="clearfix">
				<li id="charttab" class="selected"><a href="designers/<?php echo $designers; ?>/#">Chart</a></li>
				<li id="maptab"><a href="designers/<?php echo $designers; ?>/#">Map</a></li>
			</ul>
		</nav>
		<div id="stats">
			<hgroup>
				<h2 class="visuallyhidden"><?php echo $designer_event['name']; ?> Tweets During Fashion Week</h2>
				<!-- <h3 class="visuallyhidden">Thursday, September 10th, 12:00 PM through 3:00 PM</h3>  -->
			</hgroup>
			<div role="grid" id="chart">
				<div role="row" class="visuallyhidden">
					<span role="columnheader" class="columnheader">Event</span>
					<span role="columnheader" class="columnheader">Tweets</span>
				</div>
				
			<style>
				
				<?php 
					$index2 = 0;
					foreach ($view_slots as $arr) {
						$event = $event_list[$arr["key_index"]];
						echo '#row'.($index2+1).' b { background-color: '.$event['color'].'; } ';
						$index2++;
					}
				?>
				
			</style>
			
			<?php //loop through collections and count tweets 
				
					//style="height: '.($event['tweet_count']*$scale).'em;"
					
					foreach ($view_slots as $arr) {
					
					
						echo '<div role="row" id="row'.($index+1).'" class="tablerow" style="margin-left: '.(($tr_width*$index)+($margin*$index)).'%;">';
							$event = $event_list[$arr["key_index"]];
							echo '<span role="gridcell" class="gridcell event ellipsis"><span aria-hidden="true" style="color: '.$event['color'].';">'.($index+1).'</span> </span>';
							
							echo '<span role="gridcell" class="gridcell tweetcount" style="background-color: '.$event['color'].'; height: '.(($event['tweet_count']/$max_count)*100).'%;"><span>'.$event['tweet_count'].'</span></span>';
						
						echo '</div>';
						
						$index++;
						
					}
			?>
			
			</div><!-- end #chart -->
		</div>
		
		<div id="modules" class="clearfix">
		
			<div id="mainsection">
				<div id="chartheaders">
					<div id="detailnav">
						<ul class="clearfix">
							<li id="tweettab" class="selected"><a href="designers/<?php echo $designers; ?>/#">Tweets</a></li>
							<li id="trendtab"><a href="designers/<?php echo $designers; ?>/#">Trends</a></li>
							<li id="phototab"><a href="designers/<?php echo $designers; ?>/#">Photos</a></li>
						</ul>
					</div>
					<h3 aria-hidden="true"><?php echo $designer_event['name']; ?></h3>
					<h4 aria-hidden="true">Most Recent Tweets</h4>
					
					<div id="leftright" class="clearfix">
						<a href="#" class="ir left">Left</a>
						<a href="#" class="ir right">Right</a>
					</div>
								
				</div>
		
			
				<div class="nav clearfix tweets">
				
					<?php 
					date_default_timezone_set('America/New_York');
					
					$index = 0;
					foreach ($tweet_list as $arr) { 
						
						$text = $arr["tweet"]["text"];
						$username = $arr["tweet"]["user"]["screen_name"];
						$created_at = date('d M Y, h:m:s', strtotime($arr["tweet"]["created_at"]));
						echo '<div id="tweet'.$index.'" class="listitem"><h3>@'.$username.'</h3> <span class="tweettext">'.$text.'</span> <span class="tweettime">'.$created_at.'</span></div>';
						
						$index++;
						
					}
					
					?>
				
				</div>
				
				<h2 class="no-tab">Trends</h2>
				
				<div class="nav clearfix trends">
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
				
			</div>
			
			<div id="photosection">
				<h2 class="no-tab">Photos</h2>
			</div>
			
		</div>
	
	</div>

</div>