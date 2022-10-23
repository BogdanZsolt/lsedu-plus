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
		]]
	];

	foreach($blocks as $block){
		register_block_type(
			LSEDUP_PLUGIN_DIR . 'build/blocks/' . $block['name'],
			isset($block['options']) ? $block['options'] : []
		);
	}
}