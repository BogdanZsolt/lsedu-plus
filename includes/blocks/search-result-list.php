<?php

function lsedup_lesson_search_result_list_render_cb($attributes, $content, $block){
	if(!is_search()){
		return '';
	}
	$post_type = isset($block->context['postType']) && !empty($block->context['postType']) ? sanitize_text_field( $block->context['postType'] ) : '';
	$post_type = !empty($post_type) ? $post_type : sanitize_text_field($_GET['post_type']);
	$order = (isset($block->context['order']) && !empty($block->context['order'])) ? sanitize_text_field($block->context['order']) : 'ASC';
	$orderby = (isset($block->context['orderBy']) && !empty($block->context['orderBy'])) ? sanitize_text_field($block->context['orderBy']) : 'title';
	$search_text = $_GET['s'];
	$area = isset($_GET['area']) && $_GET['area'] !== '0' ? $_GET['area'] : '';
	$category = isset($_GET['category']) && $_GET['category'] !== '0' ? $_GET['category'] : '';
	$intensity = isset($_GET['intensity']) && $_GET['intensity'] !== '0' ? $_GET['intensity'] : '';
	$level = isset($_GET['level']) && $_GET['level'] !== '0' ? $_GET['level'] : '';
	$duration = isset($_GET['duration']) && $_GET['duration'] ? $_GET['duration'] : '';

	$args = array(
		'post_type' => $post_type,
		'post_status'	=> 'publish',
		'order' => $order,
		'orderby' => $orderby,
		'nopaging' => true,
		'posts_per_page' => -1,
		'post_parent'	=> 0,
		's' => $_GET['s'],
		'tax_query' => array(
			'relation' => 'AND',
			array(
				'taxonomy' => 'area',
				'field' => 'slug',
				'terms' => $area,
				'operator' => !empty($area) ? 'IN' : 'NOT IN',
			),
			array(
				'taxonomy' => 'category',
				'field' => 'slug',
				'terms' => $category,
				'operator' => !empty($category) ? 'IN' : 'NOT IN',
			),
			array(
				'taxonomy' => 'intensity',
				'field' => 'slug',
				'terms' => $intensity,
				'operator' => !empty($intensity) ? 'IN' : 'NOT IN',
			),
			array(
				'taxonomy' => 'level',
				'field' => 'slug',
				'terms' => $level,
				'operator' => !empty($level) ? 'IN' : 'NOT IN',
			),
			array(
				'taxonomy' => 'duration',
				'field'	=> 'slug',
				'terms' => $duration,
				'operator' => !empty($duration) ? 'IN' : 'NOT IN',
			),
		)
	);
	if($_GET['author'] !== '0'){
		$args['author'] = (int)$_GET['author'];
	} else {
		$args['author_not_in'] = [''];
	}
	$query = new WP_Query($args);
  if(!$query->have_posts()){
		return 'There are no results matching your search.';
	}

	$display_layout = isset( $attributes['displayLayout']) ? sanitize_text_field($attributes['displayLayout']) : 'list';
	$columns = isset($attributes['columns']) ? $attributes['columns'] : 3;
	$classnames = 'lsedup-search-result-list';
	$classnames .= $display_layout === 'flex' ? ' is-flex-container' : '';
	$classnames .= $display_layout === 'flex' && $columns > 1 ? ' has-columns-'. $columns : '';
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

	// var_dump($block->parsed_block);

	$content = '';
	while($query->have_posts()){
		$query->the_post();
		$block_instance = $block->parsed_block;
		$block_instance['blockName'] = 'core/null';
		$block_content = ( new WP_Block(
				$block_instance,
				array(
					'postType' => $post_type,
					'postId'	=> get_the_ID(),
				)
			)
		)->render(array('dynamic'=> false));
		$post_classes = implode( ' ', get_post_class( 'wp-block-post' ) );
		$content .= sprintf('<div class="%1$s">%2$s</div>', $post_classes, $block_content);
	}
	wp_reset_query();
	ob_start();
	?>

<div class="lsedup-search-result-list__container">
  <div <?php echo $wrapper_attributes; ?>>
    <?php echo $content; ?>
  </div>
</div>

<?php
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}