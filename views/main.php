<div class="content clearfix">
	<?php 
	
	/*
	if (isset($schedule) && $schedule == "show" && !$daterange) {
		include 'views/static_html/schedule.html';
		include 'views/schedule.php';
	} else if (isset($schedule) && $schedule == "long" && !$daterange) {
		include 'views/schedule_long.php';
	
	} else if (isset($designers)) {
		include 'views/designers.php';
	
	} else {
		include 'views/main.php'; 
	}
	*/
	
	//list of designers sortable by designer list or schedule
	include 'views/schedule.php'; 
	
	?>
	
	<div id="main" role="main" class="scroll">
		
		<h2 class="page-title">On Location News via Twitter</h2>
		<h3 class="designer"><span class="breadcrumb">Schedule</span> <b>/ </b>All Designers</h3>
		
		<div id="map" class="minimap" style="overflow: hidden; background-image: url(img/l/map-temp.png); background-repeat: no-repeat; background-position: 25% 0;"></div>
		
		<?php include 'views/designers.php' ?>
		
		
	</div>
		
	

</div>