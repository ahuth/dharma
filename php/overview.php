<?php

namespace overview {
	
	function getOverviewData($what, $group) {
		switch ($what) {
			case 'karma':
				$output['karma'] = getKarmaData($group);
				break;
			case 'quality':
				$output['quality'] = getQualityData($group);
				break;
			case 'spending':
				$output['spending'] = getSpendingData($group);
				break;
			case 'production':
				$output['production'] = getProductionData($group);
				break;
		}
		return $output;
	}

	function getKarmaData($group) {
        $value  = mt_rand(22, 96);
        $change = mt_rand(-10, 10);
        $change = $change < 0 ? (string)$change : '+' . (string)$change;
        return ['value'  => $value,
                'change' => $change . '%'];
	}

	function getQualityData($group) {
		$turnbacks = mt_rand(0, 6);
        $scrap     = mt_rand(0, 50000);
        return ['turnbacks' => $turnbacks,
                'scrap' => $scrap];
	}

	function getSpendingData($group) {
        $QTD         = mt_rand(1000000, 2000000);
        $people      = mt_rand(20000, 60000);
        $supplies    = mt_rand(5000, 20000);
        $tools       = mt_rand(0, 5000);
        $utilities   = 10000;
        $maintenance = mt_rand(0, 10000);
        $other       = mt_rand(5000, 10000);
        $yesterday   = $people + $supplies + $tools + $utilities + $maintenance + $other;
        return ['yesterday'   => $yesterday,
                'qtd'         => $QTD,
                'people'      => $people,
                'supplies'    => $supplies,
                'tools'       => $tools,
                'utilities'   => $utilities,
                'maintenance' => $maintenance,
                'other'       => $other];
	}

	function getProductionData($group) {
        $milestones[] = ['milestone' => 'pre-form'];
        $milestones[] = ['milestone' => 'pre-ndt'];
        $milestones[] = ['milestone' => 'plating'];
        $results[] = ['total' => mt_rand(100000, 400000)];
        $results[] = ['total' => mt_rand(200000, 500000)];
        $results[] = ['total' => mt_rand(500000, 900000)];
        return ['milestones' => $milestones, 'results' => $results];
	}
}