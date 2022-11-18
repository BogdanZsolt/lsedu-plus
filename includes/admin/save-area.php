<?php

function lsedup_save_area_meta($term_id){
	if(!isset($_POST['lsedup_more_info_url'])){
		return;
	}

	update_term_meta($term_id, 'more_info_url', sanitize_url($_POST['lsedup_more_info_url']));
}