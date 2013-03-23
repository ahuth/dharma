<?php

namespace overview {
	
	function getOverviewData($what, $group) {
		if ($what == 'karma') {
			$output['karma'] = getKarmaData($group);
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
		
	}

	function getSpendingData($group) {
		
	}

	function getProductionData($group) {
		
	}
}