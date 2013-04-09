<?php

namespace breakdown {
	
	use \DatePeriod;
	use \DateTime;
	use \DateInterval;
	
	function getBreakdownData($what, $group) {
		switch ($what) {
			case 'karma':
				$output['karma'] = getKarmaData($group);
				break;
		}
		return $output;
	}
	
	function getKarmaData($group) {
		$total = 0;
		//$begin = date_create_from_format("Y-m-d", "2013-04-01");
		//$end = date_create_from_format("Y-m-d", NULL);
		$period = new DatePeriod(
			new DateTime('2013-04-01'),
			new DateInterval('P1D'),
			new DateTime(NULL)
		);
		foreach($period as $dt) {
			$output[] = [date_format($dt, 'Y-m-d \E\S\T'), mt_rand(0, 100)];
		}
		return $output;
	}
    
}