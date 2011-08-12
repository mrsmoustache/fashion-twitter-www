	<div id="nav" role="navigation">
		<h2 class="secondary"><a id="dayslink">Sept 8-15</a> / <span>Spring 2012</span></h2>
		<nav id="viewnav">
			<ul class="clearfix">
				<li id="scheduletab" class="<?php if (isset($schedule) || (!isset($schedule) && !isset($designers))) { echo "selected"; } ?>"><a href="schedule/">Schedule</a></li>
				<li id="designerstab" class="<?php if (isset($designers)) { echo "selected"; } ?>"><a href="designers/">A&ndash;Z</a></li>
			</ul>
		</nav>
		
		<div id="contentnav" class="clearfix">
			
			<div id="dayslist">
				<h3>Days</h3>
				<ul class="clearfix">
					<li id="daylink1"><a href="schedule/#day1" class="clearfix"><span><b>1</b><b>0</b></span> <em>Thu</em></a></li>
					<li id="daylink2"><a href="schedule/#day2" class="clearfix"><span><b>1</b><b>1</b></span> <em>Fri</em></a></li>
					<li id="daylink3"><a href="schedule/#day3" class="clearfix"><span><b>1</b><b>2</b></span> <em>Sat</em></a></li>
					<li id="daylink4"><a href="schedule/#day4" class="clearfix"><span><b>1</b><b>3</b></span> <em>Sun</em></a></li>
					<li id="daylink5"><a href="schedule/#day5" class="clearfix"><span><b>1</b><b>4</b></span> <em>Mon</em></a></li>
					<li id="daylink6"><a href="schedule/#day6" class="clearfix"><span><b>1</b><b>5</b></span> <em>Tue</em></a></li>
					<li id="daylink7"><a href="schedule/#day7" class="clearfix"><span><b>1</b><b>6</b></span> <em>Wed</em></a></li>
					<li id="daylink8"><a href="schedule/#day8" class="clearfix"><span><b>1</b><b>7</b></span> <em>Thu</em></a></li>
				</ul>
			</div>
			
			<div id="alphalist">
				<ul class="clearfix">
					<?php 
					
						foreach ($alpha_list as $alpha=>$alpha_arr) { 
							echo '<li id="alphalink-'.strtolower($alpha).'"><a href="designers/#alpha-'.strtolower($alpha).'">'.$alpha.'</a></li>';
							
						}
					
					?>
				</ul>
			</div>
			
			<div id="schedulenav" class="schedule nav scroll">
			
				<div>
				
					<div id="scheduleview">
				
						<div id="all-designers-item" class="listitem <?php if ($designers == 'all' || $schedule == 'show') {echo "selected"; } ?>">All Designers<span class="arrow"><!--[if IEMobile 7]><img src="img/m/nav-arrow-right1.5x.png" width="13" height="22" /><![endif]--></span></div>
					
						<?php 
						$index = 0;
						$day_index = 1;
						foreach ($event_list as $day=>$day_arr) { 
							$day_str = date('l, M j', $day);
							echo '<div id="day'.$day_index.'" class="listcat">'.$day_str.'</div>';
							//$event = $event_list[$arr["key_index"]];
							$day_index++;
							foreach ($day_arr as $time=>$time_arr) {
								
								$time_index = 0;
								
								foreach ($time_arr as $event) {
									
									if ($event['keyword'] == $designers || $event['keyword'] == $schedule ) {
										echo '<div id="'.$event["keyword"].'" class="listitem clearfix selected">';
									} else {
										echo '<div id="'.$event["keyword"].'" class="listitem clearfix">';
									}
									
									
									if ($time_index == 0) {
										echo '<b class="timegroup">'.date('g:i', $event['start_time']).' <span>'.date('A', $event['start_time']).'</span></b> <div class="itemcontent"><a class="listname" href="schedule/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="tweetcount" style="background-color: '.$event['color'].';">'.$event['tweet_count'].'</span><span class="arrow"><!--[if IEMobile 7]><img src="img/m/nav-arrow-right1.5x.png" width="13" height="22" /><![endif]--></span></div>';
									} else {
										echo '<b>&nbsp;</b> <div class="itemcontent"><a class="listname" href="schedule/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="tweetcount" style="background-color: '.$event['color'].';">'.$event['tweet_count'].'</span><span class="arrow"><!--[if IEMobile 7]><img src="img/m/nav-arrow-right1.5x.png" width="13" height="22" /><![endif]--></span></div>';
									}
									
									echo '</div>';
									
							
									$time_index++;
									$index++;
								}
							
							}
							
						}
						
						?>
						
					</div> <!-- end #scheduleview -->
					
					
					<div id="designersview">
					
						<div id="all-designers-item-" class="listitem <?php if ($designers == 'all' || $schedule == 'show') {echo "selected"; } ?>">All Designers<span class="arrow"><!--[if IEMobile 7]><img src="img/m/nav-arrow-right1.5x.png" width="13" height="22" /><![endif]--></span></div>
						
						<?php 
						foreach ($alpha_list as $alpha=>$alpha_arr) { 
							echo '<div id="alpha-'.strtolower($alpha).'" class="listcat">'.$alpha.'</div>';
							
							$alpha_index = 0;
							
							foreach ($alpha_arr as $event) {
								
								if ($event['keyword'] == $designers || $event['keyword'] == $schedule ) {
									echo '<div id="'.$event["keyword"].'-" class="listitem clearfix selected">';
								} else {
									echo '<div id="'.$event["keyword"].'-" class="listitem clearfix">';
								}
								
								if ($alpha_index == 0) {
									echo '<div class="itemcontent first"><a class="listname" href="designers/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="tweetcount">'.$event['tweet_count'].'</span><span class="arrow"><!--[if IEMobile 7]><img src="img/m/nav-arrow-right1.5x.png" width="13" height="22" /><![endif]--></span></div>';
								} else {
									echo '<div class="itemcontent"><a class="listname" href="designers/'.$event['keyword'].'/">'.$event['name'].'</a> <span class="tweetcount">'.$event['tweet_count'].'</span><span class="arrow"><!--[if IEMobile 7]><img src="img/m/nav-arrow-right1.5x.png" width="13" height="22" /><![endif]--></span></div>';
								}
								
								echo '</div>';
								
								$alpha_index++;
								
							}
							
						}
						
						?>
					
					</div><!-- end #designersview -->
					
				</div> <!-- scroller -->
				
			</div> <!-- end #schedulenav -->
			
		</div> <!-- end #contentnav -->
		
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
	</div> <!-- end #nav -->
