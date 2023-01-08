<?php

function lsedup_lesson_single_list_render_cb($attributes, $content, $block){
	$post_id = isset($block->context['postId']) && !empty($block->context['postId']) ? $block->context['postId'] : '';
	$active_id = $post_id;
	$post_type = isset($block->context['postType']) && !empty($block->context['postType']) ? $block->context['postType'] : '';
	$order = isset($block->context['order']) && !empty($block->context['order']) ? $block->context['order'] : '';
	$orderby = isset($block->context['orderBy']) && !empty($block->context['orderBy']) ? $block->context['orderBy'] : '';
	$rating = get_post_meta($postID, 'lesson_rating', true);

  global $wpdb;
  $userID = get_current_user_id();
  $ratingCount = $wpdb->get_var($wpdb->prepare(
		"SELECT COUNT(*) FROM {$wpdb->prefix}lesson_ratings WHERE post_id=%d AND user_id=%d", $postID, $userID
  ));

	$video_data = get_post_meta($active_id, 'video_data', true);
	$video_src = isset($video_data['video_src']) && !empty($video_data['video_src']) ? $video_data['video_src'] : '';
	$args = array(
		'post_type' => $post_type,
		'post_status' => 'publish',
		'order' => $order,
		'orderby' => $orderby,
		'nopaging' => true,
		'post_per_page' => -1,
		'post_parent' => $post_id,
	);
	$query = new WP_Query($args);
	$content = '';
	$child_posts = array();
	while($query->have_posts()){
		$query->the_post();
		// $child_posts = $child_posts + 1;
		// $active = get_the_ID() === $active_id ? 'active' : '';
		// $content .= sprintf('<li class="%1$s">%2$s</li>', $active, get_the_title());
		$video_data = is_user_logged_in() ? get_post_meta(get_the_id(), 'video_data', true) : null;
		$insert = array(
			'id' => get_the_ID(),
			'name' => get_the_title(),
			'thumbnail' => esc_url(get_the_post_thumbnail_url( get_the_id(), 'videoPlaceholderImage')),
			'listimage' => esc_url(get_the_post_thumbnail_url(get_the_id(), 'listFeaturedImage')),
			'video_src' => !empty($video_data['video_src']) ? esc_url($video_data['video_src']) : '',
			'provider' => !empty($video_data['video_src']) ? sanitize_text_field($video_data['provider']) : '',
			'responsive' => !empty($video_data['responsive']) ?  $video_data['responsive'] : false,
		);
		array_push($child_posts, $insert);
	}
	wp_reset_query();
	$active = $post_id;
	$have_child = count($child_posts) > 0 ? 1 : 0;
	$video_data = is_user_logged_in() ? get_post_meta($post_id, 'video_data', true) : null;
	if(!empty($video_src)){
		$insert = array(
			array(
				'id' => $post_id,
				'name' => get_the_title(),
				'thumbnail' => esc_url(get_the_post_thumbnail_url( $post_id, 'videoPlaceholderImage')),
				'listimage' => esc_url(get_the_post_thumbnail_url( $post_id, 'listFeaturedImage')),
				'video_src' => !empty($video_data['video_src']) ? esc_url($video_data['video_src']) : '',
				'provider' => !empty($video_data['video_src']) ? sanitize_text_field($video_data['provider']) : '',
				'responsive' => !empty($video_data['responsive']) ?  $video_data['responsive'] : false,
			)
		);
		$child_posts = array_merge( $insert, $child_posts );
	} else {
		if(!empty($child_posts)){
			$active = $child_posts[0]['id'];
		} else {
			$insert = array(
				array(
					'id' => $post_id,
					'name' => get_the_title(),
					'thumbnail' => esc_url(get_the_post_thumbnail_url( $post_id, 'videoPlaceholderImage')),
					'listimage' => esc_url(get_the_post_thumbnail_url( $post_id, 'listFeaturedImage')),
					'video_src' => !empty($video_data['video_src']) ? esc_url($video_data['video_src']) : '',
					'provider' => !empty($video_data['video_src']) ? sanitize_text_field($video_data['provider']) : '',
					'responsive' => !empty($video_data['responsive']) ?  $video_data['responsive'] : false,
				)
			);
			$child_posts = array_merge( $insert, $child_posts );
		}
	}
	foreach($child_posts as $child){
		$is_active = $active === $child['id'] ? 'active' : '';
		$list_item = sprintf('<img src="%1$s"><div><h4>%2$s</h4></div>', $child['listimage'], $child['name']);
		$content .= sprintf('<li class="%1$s" data-id="%2$d" data-thumb="%3$s" data-video_src="%4$s" data-provider="%5$s" data-responsive="%6$s">%7$s</li>', $is_active, $child['id'], $child['thumbnail'], $child['video_src'], $child['provider'], $child['responsive'], $list_item);
	}
	$content = sprintf('<ul data-have-child="%1$d">%2$s</ul>', $have_child, $content);
	ob_start();
		echo $content;
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}