<?php

function lsedup_lesson_list_header_title_render_cb($attributes, $content, $block){
	$title = isset($attributes['title'] ) && !empty($attributes['title']) ? $attributes['title'] : '';
	$link = isset($attributes['link']) && !empty($attributes['link']) ? $attributes['link'] : '#';
	$title = sprintf('<a href="%1$s" target="%2$s">%3$s</a>', $link, esc_attr($attributes['linkTarget']), $title);
	$tag_name = 'h3';
	$align_class_name = empty($attributes['textAlign']) ? '' : "has-text-align-{$attributes['textAlign']}";
	if(isset($attributes['level'])){
		$tag_name = $attributes['level'] === 0 ? 'p' : 'h' . $attributes['level'];
	}
	$wrapper_attributes = get_block_wrapper_attributes(array('class' => $align_class_name));
	return sprintf(
		'<%1$s $%2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$title
	);
}