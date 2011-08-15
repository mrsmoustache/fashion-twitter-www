<div class="content clearfix">
	<?php 
		
	//list of designers sortable by designer list or schedule
	include 'views/schedule.php'; 
	
	?>
	
	<div id="main" role="main">
		
			<!-- <h2 class="page-title">On Location News via Twitter</h2> -->
			<div class="tabnav detailnav">
				<?php if ((isset($designers) && $designers != 'all') || (isset($schedule) && $schedule != 'show')) { 
				
					if (isset($designers)) {
						$key = $designers;
					} else {
						$key = $schedule;
					}
				?>
				<h3 class="designer"><a href="schedule/" class="breadcrumb">Designers</a> <b>/ </b><span class="designer-name"><?php echo $designer_lookup[$key]["name"]; ?></span></h3>
				
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
			
			<?php include 'views/designers.php' ?>
			
	</div>
		
	

</div>