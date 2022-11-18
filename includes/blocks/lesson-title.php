<?php

function lsedup_lesson_title_render_cb($attributes, $content, $block){
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}
	$post_ID	= $block->context['postId'];
	$title = get_the_title();
	if ( isset( $attributes['isLink'] ) && $attributes['isLink'] ) {
		$rel   = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
		$title = sprintf( '<a href="%1$s" target="%2$s" %3$s>%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $attributes['linkTarget'] ), $rel, $title );
	}
	$tag_name = 'h5';
	$align_class_name = empty($attributes['textAlign']) ? '' : "has-text-align-{$attributes['textAlign']}";
	if ( isset( $attributes['level'] ) ) {
		$tag_name = 0 === $attributes['level'] ? 'p' : 'h' . $attributes['level'];
	}
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $align_class_name ) );
		return sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			$title,
		);
}