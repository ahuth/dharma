<?php

namespace overview {
	
	function getOverviewData($what, $group) {
		if ($what == 'karma') {
			$output['karma'] = getKarmaData($group);
		} else if ($what == 'quality') {
            $output['quality'] = getQualityData($group);
        }
		return $output;
	}

	function getKarmaData($group) {
        $value = '87';
        $change = '-5%';
        return array('value'  => $value,
                     'change' => $change);
	}

	function getQualityData($group) {
		$turnbacks = '3';
        $scrap = 'none';
        return array('turnbacks' => $turnbacks,
                     'scrap' => $scrap);
	}

	function getSpendingData($group) {
		
	}

	function getProductionData($group) {
		
	}
}