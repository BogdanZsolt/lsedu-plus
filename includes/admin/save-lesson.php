<?php

function lsedup_save_post_lesson($postID){
	if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ){
		return;
	}

	$rating = get_post_meta($postID, 'lesson_rating', true);
	$rating = empty($rating) ? 0 : floatval($rating);

	update_post_meta($postID, 'lesson_rating', $rating);
}