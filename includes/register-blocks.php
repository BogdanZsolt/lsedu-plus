<?php

function lsedup_register_blocks(){
	$blocks = [
		[ 'name' => 'fancy-header' ],
		[ 'name' => 'header-tools', 'options' => [
			'render_callback' => 'lsedup_header_tools_render_cb'
		]],
		[ 'name' => 'auth-modal', 'options' => [
			'render_callback' => 'lsedup_auth_modal_render_cb'
		]],
		[ 'name' => 'filter-tools', 'options' => [
			'render_callback' => 'lsedup_filter_tools_render_cb'
		]],
		[ 'name' => 'filter-select', 'options' => [
			'render_callback' => 'lsedup_filter_select_render_cb'
		]],
		[ 'name' => 'lesson-summary', 'options' => [
			'render_callback' => 'lsedup_lesson_summary_render_cb'
		]],
		[ 'name' => 'lesson-list', 'options' => [
			'render_callback' => 'lsedup_lesson_list_render_cb',
			'skip_inner_blocks' => true,
		]],
		[ 'name' => 'lesson-title', 'options' => [
			'render_callback' => 'lsedup_lesson_title_render_cb'
		]],
		[ 'name' => 'lesson-featured-image', 'options' => [
			'render_callback' => 'lsedup_lesson_featured_image_render_cb'
		]],
		[ 'name' => 'lesson-list-header-title', 'options' => [
			'render_callback' => 'lsedup_lesson_list_header_title_render_cb'
		]],
		[ 'name' => 'lesson-query' ],
		[ 'name' => 'lesson-list-header'],
		[ 'name' => 'lesson-single' ],
		[ 'name' => 'lesson-single-video', 'options' => [
			'render_callback' => 'lsedup_lesson_single_video_render_cb'
		]],
		[ 'name' => 'lesson-single-list', 'options' => [
			'render_callback' => 'lsedup_lesson_single_list_render_cb'
		]],
		['name' => 'search-result-query'],
		[
			'name' => 'search-result-list', 'options' => [
			'render_callback' => 'lsedup_lesson_search_result_list_render_cb'
		]],
	];

	foreach($blocks as $block){
		register_block_type(
			LSEDUP_PLUGIN_DIR . 'build/blocks/' . $block['name'],
			isset($block['options']) ? $block['options'] : []
		);
	}
}