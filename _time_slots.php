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

//Group events into 4 hour time slots
/*
$time_groups = array( strtotime("9:00 AM"), strtotime("12:00 PM"), strtotime("4:00 PM"), strtotime("11:00 PM") );
$time_count = count($time_groups);
$time1 = strtotime("9:00 AM");
$time2 = strtotime("12:00 PM");
$time3 = strtotime("4:00 PM");
 
foreach ($event_list as $key=>$event) {
	//calculate the first time slot
	$this_time = date('g:i A', $event['start_time']);
	$curr_time = strtotime($this_time);
	
	$match = -1;
	for ($i = 0; $i < ($time_count-1); $i++) {
		if ($match == -1 ) {
			if ( $curr_time < $time_groups[$i+1] && $curr_time >= $time_groups[$i]) {
				$match = $i;
			} 
		} 
	}
	
	//$new_slot = $time_groups[$match];

	//format the start_time date and check for a matching day
	$day = date('l, M j', $event['start_time']);
	
	if ( isset($time_slots[$day]) ) {
	
		if ( isset($time_slots[$day][$match]) ) {
			$time_slots[$day][$match][$event['keyword']] = array("name"=>$event['name'], "key_index"=>$key);
			
		} else {
			$time_slots[$day][$match] = array();
			$time_slots[$day][$match][$event['keyword']] = array("name"=>$event['name'], "key_index"=>$key);
		}
	
	} else {
		$time_slots[$day] = array();
		
		$time_slots[$day][$match] = array();
		$time_slots[$day][$match][$event['keyword']] = array("name"=>$event['name'], "key_index"=>$key);
		
	}
	
}
*/

/*
$this_time = date('g:i A', $event['start_time']);
$curr_time = strtotime($this_time);

$time1 = strtotime("9:00 AM");
$time2 = strtotime("12:00 PM");
$time3 = strtotime("4:00 PM");

//Todo group times into time ranges

if ($curr_time < $time2 && $currtime >= $time1) { 

	echo "true"; 
} else { 

	echo "false"; 
	
}


echo "<pre>";
print_r($time_slots);
echo "</pre>";

*/

?>