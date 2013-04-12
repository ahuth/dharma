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
			case 'spending':
				$output = getSpendingData($group);
				break;
			case 'production':
				$output = getProductionData($group);
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
				'karma' => ['values' => $karma, 'reference' => 50]];
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
				'turnbacks' => ['values' => $turnbacks, 'reference' => 2],
				'scrap' 	=> ['values' => $scrap, 'reference' => 2500]];
	}
	
	function getSpendingData($group) {
		$period = new DatePeriod(
			new DateTime('2013-04-01'),
			new DateInterval('P1D'),
			new DateTime(NULL)
		);
		foreach($period as $dt) {
			$dates[] 	   = date_format($dt, 'Y-m-d \E\S\T');
			$people[]      = mt_rand(20000, 60000);
			$supplies[]    = mt_rand(5000, 20000);
			$tools[]       = mt_rand(0, 5000);
			$utilities[]   = 10000;
			$maintenance[] = mt_rand(0, 10000);
			$other[]       = mt_rand(5000, 10000);
			$yesterday[]   = $people[count($people) - 1] + $supplies[count($supplies) - 1] + 
							 $tools[count($tools) - 1] + $utilities[count($utilities) -1] + 
							 $maintenance[count($maintenance) - 1] + $other[count($other) - 1];
		}
		return ['dates' => $dates,
				'yesterday'   => ['values' => $yesterday, 'reference' => 77500],
				'people' 	  => ['values' => $people, 'reference' => 40000],
				'supplies' 	  => ['values' => $supplies, 'reference' => 12500],
				'tools' 	  => ['values' => $tools, 'reference' => 2500],
				'utilities'   => ['values' => $utilities, 'reference' => 10000],
				'maintenance' => ['values' => $maintenance, 'reference' => 5000],
				'other' 	  => ['values' => $other, 'reference' => 7500]];
	}
	
	function getProductionData($group) {
		$period = new DatePeriod(
			new DateTime('2013-04-01'),
			new DateInterval('P1D'),
			new DateTime(NULL)
		);
		foreach($period as $dt) {
			$dates[]   = date_format($dt, 'Y-m-d \E\S\T');
			$preform[] = mt_rand(50000, 200000);
			$prendt[]  = mt_rand(200000, 400000);
			$plating[] = mt_rand(400000, 800000);
		}
		return ['dates'    => $dates,
				'Pre-form' => ['values' => $preform, 'reference' => 125000],
				'Pre-NDT'  => ['values' => $prendt, 'reference' => 300000],
				'Plating'  => ['values' => $plating, 'reference' => 600000]];
	}
}