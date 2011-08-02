	<div id="nav" role="navigation">
		<h2 class="secondary">NY Fashion Week Fall 2011</h2>
		<nav id="viewnav">
			<ul class="clearfix">
				<li id="charttab" class="selected"><a href="#">Schedule</a></li>
				<li id="maptab"><a href="#">Designers</a></li>
			</ul>
			<span class="backlink daystab"><a class="back" href="">Days</a> <span>&raquo;</span> </span>
		</nav>
		
		<div id="contentnav" class="clearfix">
			
			<div id="dayslist" class="scroll">
				<h3>Days</h3>
				<ul class="clearfix">
					<li id="daylink1"><a href="#day1" class="clearfix"><span><b>1</b><b>0</b></span> <em>Thu</em></a></li>
					<li id="daylink2"><a href="#day2" class="clearfix"><span><b>1</b><b>1</b></span> <em>Fri</em></a></li>
					<li id="daylink3"><a href="#day3" class="clearfix"><span><b>1</b><b>2</b></span> <em>Sat</em></a></li>
					<li id="daylink4"><a href="#day4" class="clearfix"><span><b>1</b><b>3</b></span> <em>Sun</em></a></li>
					<li id="daylink5"><a href="#day5" class="clearfix"><span><b>1</b><b>4</b></span> <em>Mon</em></a></li>
					<li id="daylink6"><a href="#day6" class="clearfix"><span><b>1</b><b>5</b></span> <em>Tue</em></a></li>
					<li id="daylink7"><a href="#day7" class="clearfix"><span><b>1</b><b>6</b></span> <em>Wed</em></a></li>
					<li id="daylink8"><a href="#day8" class="clearfix"><span><b>1</b><b>7</b></span> <em>Thu</em></a></li>
				</ul>
			</div>
			
			<div id="schedulenav" class="schedule nav scroll">
			
				<div>
				
					<div id="all-designers-item" class="listitem">All Designers</div>
					
					<?php 
					$index = 0;
					$day_index = 1;
					$halfway = false;
					foreach ($event_list as $day=>$day_arr) { 
						$day_str = date('l, M j', $day);
						echo '<div id="day'.$day_index.'" class="listcat">'.$day_str.'</div>';
						//$event = $event_list[$arr["key_index"]];
						$day_index++;
						foreach ($day_arr as $time=>$time_arr) {
							
							$time_index = 0;
							
							foreach ($time_arr as $event) {
							
								echo '<div id="'.$event["keyword"].'" class="listitem clearfix">';
								
								if ($time_index == 0) {
									echo '<b class="timegroup">'.date('g:i', $event['start_time']).' <span>'.date('A', $event['start_time']).'</span></b> <div class="itemcontent"><a class="listname" href="designers/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="tweetcount" style="background-color: '.$event['color'].';">'.$event['tweet_count'].'</span></div>';
								} else {
									echo '<b>&nbsp;</b> <div class="itemcontent"><a class="listname" href="designers/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="tweetcount" style="background-color: '.$event['color'].';">'.$event['tweet_count'].'</span></div>';
								}
								
								echo '</div>';
								
						
								$time_index++;
								$index++;
							}
						
						}
						
					}
					
					?>
				</div>
				
			</div>
			
		</div>
		
		<?php 
		/*
		echo "<pre>";
		print_r($event_list);
		print_r($time_slots);
		echo "</pre>";
		*/
		?>
		
		<!-- temporary real-time tweets list -->
		<ul></ul>
	</div>
