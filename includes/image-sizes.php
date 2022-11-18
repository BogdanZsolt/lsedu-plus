<?php

function lsedup_custom_image_sizes($sizes){
	return array_merge($sizes, [
		'videoPlaceholderImage' => __('Video Placeholder Image', 'lsedu-plus')
	]);
}