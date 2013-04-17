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
		$milestones = ['jenkintown' => ['shipped', 'docked'],
					   'nuts' => ['shipped', 'docked'],
					   'bolts' => ['shipped', 'docked'],
					   'batch quality' => ['shipped', 'docked'],
					   '6211' => ['machine', 'squeeze'],
					   '6216' => ['assemble/stamp', 'blank prep', 'form', 'machine', 'squeeze'],
					   '6219' => ['machine', 'squeeze'],
					   '6220' => ['form', 'screw machine', 'squeeze'],
					   '6221' => ['form', 'screw machine', 'squeeze'],
					   '6222' => ['form', 'screw machine'],
					   '6242' => ['blank prep', 'form'],
					   '6260' => [],
					   '6280' => ['assemble/stamp', 'machine', 'squeeze'],
					   '6290' => ['assemble/stamp', 'machine', 'squeeze'],
					   '6291' => ['machine', 'squeeze'],
					   '6830' => [],
					   '6265' => [],
					   '6614' => ['post-ht machine', 'post-thread machine', 'pre-ht machine'],
					   '6620' => ['post-ht grind', 'post-thread grind', 'pre-ht grind'],
					   '6629' => ['blank prep'],
					   '6630' => ['form'],
					   '6640' => ['blank prep', 'form'],
					   '6651' => ['assemble/stamp', 'post-ht grind', 'post-thread grind', 'pre-ht grind'],
					   '6652' => ['post-ht grind', 'post-thread grind', 'pre-ht grind'],
					   '6662' => ['assemble/stamp', 'post-ht machine', 'post-thread machine', 'pre-ht machine'],
					   '6670' => ['assemble/stamp', 'thread roll'],
					   '6840' => [],
					   '4411' => ['inspect'],
					   '4420' => ['lab'],
					   '4422' => ['ndt'],
					   '6850' => ['heat treat'],
					   '6855' => ['heat treat', 'plate'],
					   '6860' => ['plate', 'pre-form', 'pre-ndt']];
		$period = new DatePeriod(
			new DateTime('2013-04-01'),
			new DateInterval('P1D'),
			new DateTime(NULL)
		);
		foreach($period as $dt) {
			$output['dates'][] = date_format($dt, 'Y-m-d \E\S\T');
			foreach($milestones[$group] as $ms) {
				$output[$ms]['values'][] = mt_rand(100000, 600000);
				if (!array_key_exists($output[$ms], 'reference')) {
					$output[$ms]['reference'] = mt_rand(300000, 400000);
				}
			}
		}
		return $output;
	}
}