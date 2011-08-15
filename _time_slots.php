<?php

$time_slots = array();

//Group events into simple time slots based on day of week
 
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