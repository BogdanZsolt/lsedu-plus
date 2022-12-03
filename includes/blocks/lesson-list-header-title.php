<?php

function lsedup_lesson_list_header_title_render_cb($attributes, $content, $block){
	$set_taxonomy = $block->context['setTaxonomy'];
	$is_title_set_active = $attributes['isTitleSettingActive'];
	$titleInactive = isset($attributes['titleInactive'] ) && !empty($attributes['titleInactive']) ? $attributes['titleInactive'] : '';
	$term_id = intval($set_taxonomy['taxSelect']);
	$tax_type =  $set_taxonomy['taxType'];
	$term = get_term($term_id, $tax_type);
	$title = !is_wp_error($term) && !empty($term->name) ? $term->name : '';;
	$term_link = get_term_link($term_id, $tax_type);
	$link = !is_wp_error($term_link) && !empty($term_link) ? $term_link : '#';
	$title = $is_title_set_active ? $title : $titleInactive;
	$title = $attributes['isLink'] ? sprintf('<a href="%1$s" target="%2$s">%3$s</a>', $link, esc_attr($attributes['linkTarget']), $title) : $title;
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