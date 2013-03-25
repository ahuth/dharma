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
        return array('value'  => $value,
                     'change' => $change . '%');
	}

	function getQualityData($group) {
		$turnbacks = mt_rand(0, 6);
        $scrap     = mt_rand(0, 50000);
        $scrap = $scrap < 10000 ? 'none' : '$' . number_format($scrap, 0, '.', ',');
        return array('turnbacks' => $turnbacks,
                     'scrap' => $scrap);
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
        return array('yesterday'   => '$' . number_format($yesterday, 0, '.', ','),
                     'qtd'         => '$' . number_format($QTD, 0, '.', ','),
                     'people'      => '$' . number_format($people, 0, '.', ','),
                     'supplies'    => '$' . number_format($supplies, 0, '.', ','),
                     'tools'       => '$' . number_format($tools, 0, '.', ','),
                     'utilities'   => '$' . number_format($utilities, 0, '.', ','),
                     'maintenance' => '$' . number_format($maintenance, 0, '.', ','),
                     'other'       => '$' . number_format($other, 0, '.', ','));
	}

	function getProductionData($group) {
        $data = [];
		for ($i = 1; $i <= 31; $i++) {
            $inner[0] = '2013-01-' . (string)$i;
            $inner[1] = mt_rand(400000, 700000);
            $data[] = $inner;
        }
        return $data;
	}
}