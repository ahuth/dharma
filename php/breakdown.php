<?php

namespace breakdown {
	
	use \DatePeriod;
	use \DateTime;
	use \DateInterval;
	
	/*
	The client will expect the data to be in the following format:
		{
			dates: array of dates,
			(category): array of values for each day in the current quarter,
			... can have multiple categories,
			(category)Reference: average daily value for the previous quarter,
			... can have multiple category references
		}
	*/
	
	function getBreakdownData($what, $group) {
		switch ($what) {
			case 'karma':
				$output = getKarmaData($group);
				break;
			case 'quality':
				$output = getQualityData($group);
				break;
		}
		return $output;
	}
	
	function getKarmaData($group) {
		$period = new DatePeriod(
            new DateTime('2013-04-01'),
            new DateInterval('P1D'),
            new DateTime(NULL)
        );
        foreach($period as $dt) {
            $dates[] = date_format($dt, 'Y-m-d \E\S\T');
            $karma[] = mt_rand(0, 100);
        }
        return ['dates' => $dates, 'karma' => $karma, 'karmaReference' => 66];
	}
    
	function getQualityData($group) {
        $period = new DatePeriod(
            new DateTime('2013-04-01'),
            new DateInterval('P1D'),
            new DateTime(NULL)
        );
        foreach($period as $dt) {
            $dates[] = date_format($dt, 'Y-m-d \E\S\T');
            $turnbacks[] = mt_rand(0, 4);
            $scrap[] = mt_rand(0, 5000);
        }
        return ['dates' => $dates,
				'turnbacks' => $turnbacks,
				'turnbacksReference' => 1,
				'scrap' => $scrap,
				'scrapReference' => 1000];
	}
}