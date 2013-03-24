<?php

namespace overview {
	
	function getOverviewData($what, $group) {
		if ($what == 'karma') {
			$output['karma'] = getKarmaData($group);
		} else if ($what == 'quality') {
            $output['quality'] = getQualityData($group);
        } else if ($what == 'spending') {
            $output['spending'] = getSpendingData($group);
        }
		return $output;
	}

	function getKarmaData($group) {
        $value  = '87';
        $change = '-5%';
        return array('value'  => $value,
                     'change' => $change);
	}

	function getQualityData($group) {
		$turnbacks = '3';
        $scrap     = 'none';
        return array('turnbacks' => $turnbacks,
                     'scrap' => $scrap);
	}

	function getSpendingData($group) {
		$yesterday   = '$200,000';
        $QTD         = '$1,000,000';
        $people      = '$100,000';
        $supplies    = '$100,000';
        $tools       = '$100,000';
        $utilities   = '$50,000';
        $maintenance = '$100,000';
        $other       = '$100,000';
        return array('yesterday'   => $yesterday,
                     'qtd'         => $QTD,
                     'people'      => $people,
                     'supplies'    => $supplies,
                     'tools'       => $tools,
                     'utilities'   => $utilities,
                     'maintenance' => $maintenance,
                     'other'       => $other);
	}

	function getProductionData($group) {
		
	}
}