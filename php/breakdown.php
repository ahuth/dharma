<?php

namespace breakdown {
	
	use \DatePeriod;
	use \DateTime;
	use \DateInterval;
	
	/*
	The client will expect the data to be in the following format:
		{
			dates:    array of dates,
			category1: {
				values: array of values for each date,
				reference: daily average for the previous quarter
			}
			category2: ...,
			category3: ...
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
        return ['dates' => $dates, 
				'karma' => ['values' => $karma, 'reference' => 66]];
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
				'turnbacks' => ['values' => $turnbacks, 'reference' => 1],
				'scrap' => ['values' => $scrap, 'reference' => 1000]];
	}
}