<?php 
$daterange = isset($_REQUEST['daterange']) ? $_REQUEST['daterange'] : null;
require_once(dirname(__FILE__)."/../_global.php");
require_once(dirname(__FILE__)."/../_config.php");
	
require_once(dirname(__FILE__)."/../_default_db_request.php");

?>


<nav id="viewnav">
	<ul class="clearfix">
		<li id="charttab" class="selected"><a href="#">Schedule</a></li>
		<li id="maptab"><a href="#">Designers</a></li>
	</ul>
	<span class="backlink"><a class="back" href="">Go</a> <span>&raquo;</span> </span>
</nav>


<div class="content clearfix">
	
	<div class="nav clearfix">
		<?php 
			foreach ($time_slots as $day=>$arr) {
				echo '<div class="listcat">'.$day.'</div>';
				
				foreach ($arr as $time=>$design_arr) {
					$list = array();
					foreach ($design_arr as $key=>$item) {
						$list[] = $item["name"];
					}
					echo '<div class="listitem"><span>'.date('g:i A', $time_groups[$time]).' &ndash; '.date('g:i A', $time_groups[$time+1]).' </span> <span class="designers">';
				
					echo implode(", ", $list);
							
					echo '</span></div>';
				}
			}
		
		?>
		
	</div>
	
</div>

