<?php

namespace overview {
	
	function getOverviewData($what, $group) {
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
        $value  = mt_rand(22, 96);
        $change = mt_rand(-10, 10);
        return ['value'  => $value, 'change' => $change];
	}

	function getQualityData($group) {
		$turnbacks = mt_rand(0, 6);
        $scrap     = mt_rand(0, 50000);
        return ['turnbacks' => $turnbacks,
                'scrap' => $scrap];
	}

	function getSpendingData($group) {
		// We want to generate decimal numbers here.  mt_rand() gives us integers,
		// so call it with our min and max multiplied by 100, then divide the
		// result by 100.
        $people      = mt_rand(-2000, 2000) / 100;
        $supplies    = mt_rand(-900, 900) / 100;
        $tools       = mt_rand(-100, 100) / 100;
        $utilities   = mt_rand(-250, 250) / 100;
        $maintenance = mt_rand(-700, 700) / 100;
        $other       = mt_rand(-300, 300) / 100;
        $yesterday   = $people + $supplies + $tools + $utilities + $maintenance + $other;
			
        return ['yesterday'   => $yesterday,
                'people'      => $people,
                'supplies'    => $supplies,
                'tools'       => $tools,
                'utilities'   => $utilities,
                'maintenance' => $maintenance,
                'other'       => $other];
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
		foreach ($milestones[$group] as $ms) {
			$output['results'][] = ['milestone' => $ms, 'result' => mt_rand(100000, 600000)];
		}
		return $output;
	}
}