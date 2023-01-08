<?php

function lsedup_lesson_single_video_render_cb($attributes, $content, $block){
	$post_id = $block->context['postId'];
	$active_id = isset($block->context['activeId']) && !empty($block->context['activeId']) ? $block->context['activeId'] : $post_id;
	$attr = array(
		'controls' => (isset($attributes['controls']) && $attributes['controls']) ? (int)$attributes['controls'] : 0,
		'autoplay' => ((isset($attributes['autoplay']) && $attributes['autoplay'])) ? $attributes['autoplay'] : 0,
		'loop' => (isset($attributes['loop']) && $attributes['loop']) ? $attributes['loop'] : 0,
		'muted' => (isset($attributes['muted']) && $attributes['muted']) ? $attributes['muted'] : 0,
	);
	$download .= (isset($attributes['download']) && $attributes['download']) ? 'download' : 'nodownload';
	$featured_image = esc_url(get_the_post_thumbnail_url( $active_id, 'videoPlaceholderImage'));
	$video_data = is_user_logged_in() ? get_post_meta($active_id, 'video_data', true) : null;
	$video_src = isset($video_data['video_src']) && !empty($video_data['video_src']) ? esc_url($video_data['video_src']) : '';
	$provider = isset($video_data['provider']) && !empty($video_data['provider']) ? sanitize_text_field($video_data['provider']) : '';
	$responsive = isset($video_data['responsive']) && !empty($video_data['responsive']) ? $video_data['responsive'] : false;
	$dataset = ['data-controls' => $attr['controls'], 'data-autoplay' => $attr['autoplay'], 'data-loop' => $attr['loop'], 'data-muted' => $attr['muted']];
	$wrapper_attributes = get_block_wrapper_attributes($dataset);

	ob_start();
	?>
<figure <?php echo $wrapper_attributes; ?>></figure>
<?php

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/M7lc1UVf-VE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

// <iframe width="640" height="360" src="//videa.hu/player?v=ouycF3cwIN6A05Bg" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" frameborder="0"></iframe>//

//<iframe src="https://player.vimeo.com/video/717781102?h=c9e7627272" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>//