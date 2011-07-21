<div class="content clearfix">
	
	<div id="main" role="main">
		<nav id="viewnav">
			<span class="backlink"><span>&laquo;</span> <a class="back" href="schedule/">Schedule</a></span>
			<ul class="clearfix">
				<li id="charttab" class="selected"><a href="#">Chart</a></li>
				<li id="maptab"><a href="#">Map</a></li>
			</ul>
		</nav>
		<div id="stats">
			<hgroup>
				<h2 class="visuallyhidden">Tweets During Fashion Events</h2>
				<h3 class="visuallyhidden">Thursday, September 10th, 12:00 PM through 3:00 PM</h3>
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
							echo '<span role="gridcell" class="gridcell event ellipsis"><span aria-hidden="true" style="color: '.$event['color'].';">'.($index+1).'</span> <span class="listname">'.$event['name'].'</span></span>';
							
							echo '<span role="gridcell" class="gridcell tweetcount" style="background-color: '.$event['color'].'; height: '.(($event['tweet_count']/$max_count)*100).'%;"><span>'.$event['tweet_count'].'</span></span>';
						
						echo '</div>';
						
						$index++;
						
					}
			?>
			
			</div><!-- end #chart -->
		</div>
		<div id="chartheaders">
			<h2 aria-hidden="true">Tweets During Fashion Events</h2>
			<h3 aria-hidden="true">Thu, Feb 10</h3>
			<h4 aria-hidden="true">12:00 PM&ndash; 4:00 PM</h4>
			
			<div id="leftright" class="clearfix">
				<a href="#" class="ir left">Left</a>
				<a href="#" class="ir right">Right</a>
			</div>
			
			<div id="chartmenus">
				<select id="datepicker">
					<option>Thu, Sept 8</option>
					<option>Fri, Sept 9</option>
					<option>Sat, Sept 10</option>
					<option>Sun, Sept 11</option>
					<option>Mon, Sept 12</option>
					<option>Tue, Sept 13</option>
					<option>Wed, Sept 14</option>
					<option>Thu, Sept 15</option>
				</select>
				
				<select id="timepicker">
					<option>9:00 AM &ndash; 11:00 AM</option>
					<option>11:00 AM &ndash; 1:00 PM</option>
					<option>1:00 PM &ndash; 3:00 PM</option>
					<option>3:00 PM &ndash; 5:00 PM</option>
					<option>5:00 PM &ndash; 7:00 PM</option>
					<option>7:00 PM &ndash; 9:00 PM</option>
					<option>9:00 PM &ndash; 11:00 PM</option>
				</select>
			</div>
			
		</div>
		
		<div class="nav clearfix">
			
			<div id="navgroup1">
			<?php 
			$index = 0;
			$halfway = false;
			foreach ($view_slots as $arr) { 
				
				$event = $event_list[$arr["key_index"]];
					
				echo '<div id="event'.($index+1).'" class="listitem"><b style="color: '.$event['color'].';">'.($index+1).'</b> <a class="listname ellipsis" href="designers/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="starttime">'.date('g:i A', $event['start_time']).'</span> <span class="tweetcount">'.$event['tweet_count'].'</span></div>';
				
				if (($index+1) >= ($event_length/2) && !$halfway) {
					echo '</div><div id="navgroup2">';
					$halfway = true;
				}
				
				$index++;
				
			}
			
			?>
			
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
	

</div>