<?php

$url = $_GET["url"];
$allowedurls = array(
'http:\/\/yfrog.com',
'http:\/\/lockerz.com',
'http:\/\/instagr.am',
'http:\/\/twitpic.com'
);

$url_pattern = '/^(';
$url_pattern = $url_pattern.implode($allowedurls, '|');
$url_pattern = $url_pattern.')/i';

if (preg_match($url_pattern, $url, $match)) {

	$ch = curl_init();

	curl_setopt ($ch, CURLOPT_URL, $url);
	
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	
	curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 15);
	
	$data = curl_exec($ch);
	
	curl_close($ch);
	
	switch($match[0]) {
		case 'http://yfrog.com':
		
			break;
		case 'http://lockerz.com':
		
			break;
			
		case 'http://instagr.am':
		
			break;
			
		case 'http://twitpic.com':
			preg_match_all('/<img class="photo"[^>]*>/msi',$data, $content);
			break;
	}
	
	if(isset($content)){
		echo json_encode($content);
	} else {
		echo "Proxy error parsing html content: content is not defined.";
	}
}

/*



*/

//$content = preg_replace('/.*<body[^>]*>/msi','',$data);
//$content = preg_replace('/<\/body>.*/msi','',$content);
//$content = preg_replace('/<?/body[^>]*>/msi','',$content);
//$content = preg_replace('/[r|n]+/msi','',$content);
//$content = preg_replace('/<--[Ss]*?-->/msi','',$content);
//$content = preg_replace('/<noscript[^>]*>[Ss]*?</noscript>/msi','',$content);
//$content = preg_replace('/<script[^>]*>[Ss]*?<\/script>/msi','',$content);
//$content = preg_replace('/<script.*\/>/msi','',$content);
//$content = preg_replace('/<script[^>]*>.*<\/script>/msi','',$content);

//echo json_encode($content);



?>