<meta charset="utf-8">
<base href="<?php echo $WEB_ROOT; ?>" />

<title>Tweet Event Map</title>
<meta name="description" content="">
<meta name="author" content="">

<!-- http://t.co/dKP3o1e -->
<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="320">
<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1">

<!-- For less capable mobile browsers
<link rel="stylesheet" media="handheld" href="css/handheld.css?v=1">  -->

<!-- For all browsers -->
<?php //echo '<link rel="stylesheet" href="css/style.php?v=10&margin='.$margin.'&tr_width='.$tr_width.'&event_length='.$event_length.'&max_height='.$max_height.'">'; ?>
<link rel="stylesheet" href="css/style.php?v=13">

<style>
<?php 
	$index = 0;
	$navBackgroundColors = array();
	
	foreach ($event_list as $day=>$day_arr) { 
	
		foreach ($day_arr as $time=>$time_arr) {
			
			foreach ($time_arr as $event) {
			
				$hexColor = $event['color'];
				$hexRGB = hex2RGB($hexColor);
				$brighten = 150;
				
				$red;
				if (($hexRGB['red'] + $brighten) > 255) {
					$red = 255;
				} else {
					$red = $hexRGB['red'] + $brighten;
				}
				$green;
				if (($hexRGB['green'] + $brighten) > 255) {
					$green = 255;
				} else {
					$green = $hexRGB['green'] + $brighten;
				}
				$blue;
				if (($hexRGB['blue'] + $brighten) > 255) {
					$blue = 255;
				} else {
					$blue = $hexRGB['blue'] + $brighten;
				}
				
				//if colors are too light, redo with less brighness
				
				if ($red > 250 && $green > 250 && $blue > 250) {
					$brighten = 75;
				
					$red;
					if (($hexRGB['red'] + $brighten) > 255) {
						$red = 255;
					} else {
						$red = $hexRGB['red'] + $brighten;
					}
					$green;
					if (($hexRGB['green'] + $brighten) > 255) {
						$green = 255;
					} else {
						$green = $hexRGB['green'] + $brighten;
					}
					$blue;
					if (($hexRGB['blue'] + $brighten) > 255) {
						$blue = 255;
					} else {
						$blue = $hexRGB['blue'] + $brighten;
					}
				}
				
				$navBackgroundColors[$event['keyword']] = 'rgb('.$red.','.$green.','.$blue.')';
				
			
				echo ' #'.$event["keyword"].':hover { background-color: rgb('.$red.','.$green.','.$blue.'); }';
				echo ' #'.$event["keyword"].'.selected { background-color: rgb('.$red.','.$green.','.$blue.'); }';
				
				echo' #'.$event["keyword"].' .tweetcount { background-color: '.$event['color'].'; }';
				echo' .'.$event["keyword"].' #detailnav li a { color: '.$event['color'].'; }';
				echo' .'.$event["keyword"].' #detailnav li.selected a { color: black; }';
				
				echo' .'.$event["keyword"].' .tweettext a { color: '.$event['color'].'; border-bottom: dotted 1px #aaa; }';
				echo' .'.$event["keyword"].' .tweettext a:hover { border-bottom: solid 1px black; text-decoration: none; }';
				
				echo ' @-webkit-keyframes itemCountRight'.$event['keyword'].' { from { right: 30px; background-color: '.$event['color'].'); } to { right: 0; background-color: rgb(200,200,200); } }';
				
				echo ' @-webkit-keyframes itemCountLeft'.$event['keyword'].' { from { right: 0; background-color: rgb(200,200,200); } to { right: 30px; background-color: '.$event['color'].'; } }';
				
				$index++;
			}
		
		}
		
	}
?>
</style>

<script>
var navBackgroundColors = <?php echo json_encode($navBackgroundColors); ?>;

</script>

<!-- JavaScript at bottom except for Modernizr -->
<script src="js/libs/modernizr-1.7.min.js"></script>

<!-- For iPhone 4 -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/h/apple-touch-icon.png">
<!-- For iPad 1-->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/m/apple-touch-icon.png">
<!-- For iPhone 3G, iPod Touch and Android -->
<link rel="apple-touch-icon-precomposed" href="img/l/apple-touch-icon-precomposed.png">
<!-- For Nokia -->
<link rel="shortcut icon" href="img/l/apple-touch-icon.png">
<!-- For everything else -->
<link rel="shortcut icon" href="/favicon.ico">

<!--iOS. Delete if not required -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-startup-image" href="img/splash.png">

<!--Microsoft. Delete if not required -->
<meta http-equiv="cleartype" content="on">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- http://t.co/y1jPVnT -->
<link rel="canonical" href="/">
