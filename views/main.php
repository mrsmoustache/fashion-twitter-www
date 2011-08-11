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
	
	<div id="main" role="main">
		
			<!-- <h2 class="page-title">On Location News via Twitter</h2> -->
			<div class="tabnav detailnav">
				<?php if (isset($designers)) { ?>
				<h3 class="designer"><a href="schedule/" class="breadcrumb">Designers</a> <b>/ </b><span class="designer-name"><?php echo $designer_lookup[$designers]; ?></span></h3>
				<?php } else { ?>
				<h3 class="designer"><a href="schedule/" class="breadcrumb">Designers</a> <b>/ </b><span class="designer-name">All Designers</span></h3>
				
				<?php } ?>
				<div id="detailnav">
					<ul class="clearfix">
						<li id="tweettab" class="selected"><a href="#">Tweets</a></li>
						<li id="trendtab"><a href="#">Trends</a></li>
						<li id="phototab"><a href="#">Photos</a></li>
					</ul>
				</div>
			</div>
			
			<!--
			<div id="map" class="minimap" style="overflow: hidden; background-image: url(img/l/map-temp.png); background-repeat: no-repeat; background-position: 25% 0;"></div> -->
			
			<?php include 'views/designers.php' ?>
			
	</div>
		
	

</div>