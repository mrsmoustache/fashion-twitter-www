<nav id="viewnav">
	<ul class="clearfix">
		<li id="charttab" class="selected"><a href="#">Schedule</a></li>
		<li id="maptab"><a href="#">Designers</a></li>
	</ul>
	<span class="backlink"><a class="back" href="">Go</a> <span>&raquo;</span> </span>
</nav>

<?php

$time_slots = array();
 
foreach ($event_list as $event) {

	//format the start_time date and check for a matching day
	$day = date('l, M j', $event['start_time']);
	
	if ( isset($time_slots[$day]) ) {
	
		if ( isset($time_slots[$day][$event['start_time']]) ) {
			$time_slots[$day][$event['start_time']][] = $event['name'];
			
		} else {
			$time_slots[$day][$event['start_time']] = array();
			$time_slots[$day][$event['start_time']][] = $event['name'];
		}
	
	} else {
		$time_slots[$day] = array();
		$time_slots[$day][$event['start_time']] = array();
		$time_slots[$day][$event['start_time']][] = $event['name'];
		
	}
	
}

?>

<div class="content clearfix">
	
	<div class="nav clearfix">
		<?php 
			foreach ($time_slots as $day=>$arr) {
				echo '<div class="listcat">'.$day.'</div>';
				
				foreach ($arr as $time=>$val) {
					echo '<div class="listitem"><span>'.date('g:i A', $time).'</span> <span class="designers">';
				
					echo implode(", ", $val);
							
					echo '</span></div>';
				}
					
			}
		
		?>
		
	</div>
	
</div>

