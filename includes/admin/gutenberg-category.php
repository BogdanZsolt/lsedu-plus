<?php

function lsedup_new_gutenberg_category($categories, $post){
	return array_merge(
		array(
			array(
				'slug' => 'la-saphire',
				'title' => 'La Saphire',
			),
		),
		$categories,
	);
}