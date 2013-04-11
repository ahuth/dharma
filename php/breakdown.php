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
			case 'quality':
				$output['quality'] = getQualityData($group);
				break;
		}
		return $output;
	}
	
	function getKarmaData($group) {
		$total = 0;
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
    
	function getQualityData($group) {
		$total = 0;
        $period = new DatePeriod(
            new DateTime('2013-04-01'),
            new DateInterval('P1D'),
            new DateTime(NULL)
        );
        foreach($period as $dt) {
            $dates[] = date_format($dt, 'Y-m-d \E\S\T');
            $turnbacks[] = mt_rand(0, 4);
            $scrap[] = mt_rand(0, 20000);
        }
        return ['dates' => $dates, 'turnbacks' => $turnbacks, 'scrap' => $scrap];
	}
}