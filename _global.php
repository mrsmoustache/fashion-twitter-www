<?php 

function subval_sort( $a, $subkey, $order='asc' ) {
	foreach( $a as $k=>$v )
		$b[$k] = strtolower( $v[$subkey] );
	if( $order === 'desc' )
		arsort( $b );
	else
		asort( $b );
	foreach( $b as $key=>$val )
		$c[$key] = $a[$key];
	return $c;
}

?>