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
        $change = $change < 0 ? (string)$change : '+' . (string)$change;
        return ['value'  => $value, 'change' => $change . '%'];
	}

	function getQualityData($group) {
		$turnbacks = mt_rand(0, 6);
        $scrap     = mt_rand(0, 50000);
        return ['turnbacks' => $turnbacks,
                'scrap' => $scrap];
	}

	function getSpendingData($group) {
        $people      = mt_rand(20000, 60000);
        $supplies    = mt_rand(5000, 20000);
        $tools       = mt_rand(0, 5000);
        $utilities   = 10000;
        $maintenance = mt_rand(0, 10000);
        $other       = mt_rand(5000, 10000);
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
        $results[] = ['milestone' => 'Pre-form', 'result' => mt_rand(50000, 200000)];
        $results[] = ['milestone' => 'Pre-NDT', 'result' => mt_rand(200000, 400000)];
		$results[] = ['milestone' => 'Plating', 'result' => mt_rand(400000, 800000)];
        return ['results' => $results];
	}
}