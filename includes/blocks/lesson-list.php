<?php

function lsedup_lesson_list_render_cb($attributes, $content, $block){
	global $wp_query;
	$taxonomy_list = $block->context['taxonomyList'];
	$use_global_query = ( isset( $block->context['inherit'] ) && $block->context['inherit'] );
	$area_id = (isset($taxonomy_list['area']) && !empty($taxonomy_list['area'])) ? intval($taxonomy_list['area']) : intval('');
	$area_operator = (isset($taxonomy_list['area']) && !empty($taxonomy_list['area'])) ? 'IN' : 'NOT IN';
	$category_id = (isset($taxonomy_list['category']) && !empty($taxonomy_list['category'])) ? intval($taxonomy_list['category']) : intval('');
	$category_operator = (isset($taxonomy_list['category']) && !empty($taxonomy_list['category'])) ? 'IN' : 'NOT IN';
	$intensity_id = (isset($taxonomy_list['intensity']) && !empty($taxonomy_list['intensity'])) ? intval($taxonomy_list['intensity']) : intval('');
	$intensity_operator = (isset($taxonomy_list['intensity']) && !empty($taxonomy_list['intensity'])) ? 'IN' : 'NOT IN';
	$level_id = (isset($taxonomy_list['level']) && !empty($taxonomy_list['level'])) ? intval($taxonomy_list['level']) : intval('');
	$level_operator = (isset($taxonomy_list['level']) && !empty($taxonomy_list['level'])) ? 'IN' : 'NOT IN';
	$duration_id = (isset($taxonomy_list['duration']) && !empty($taxonomy_list['duration'])) ? intval($taxonomy_list['duration']) : intval('');
	$duration_operator = (isset($taxonomy_list['duration']) && !empty($taxonomy_list['duration'])) ? 'IN' : 'NOT IN';
	$query_args = array(
		'post_type'	=> $block->context['postType'],
		'post_status' => 'publish',
		'order'	=> 'ASC',
		'orderby'	=> 'title',
		'posts_per_page' => -1,
		'post_parent'	=> 0,
		'tax_query' => array(
			'relation' => 'AND',
			array(
				'taxonomy' => 'area',
				'field' => 'term_id',
				'terms' => $area_id,
				'operator' => $area_operator,
			),
			array(
				'taxonomy' => 'category',
				'field' => 'term_id',
				'terms' => $category_id,
				'operator' => $category_operator,
			),
			array(
				'taxonomy' => 'intensity',
				'field' => 'term_id',
				'terms' => $intensity_id,
				'operator' => $intensity_operator,
			),
			array(
				'taxonomy' => 'level',
				'field' => 'term_id',
				'terms' => $level_id,
				'operator' => $level_operator,
			),
			array(
				'taxonomy' => 'duration',
				'field' => 'term_id',
				'terms' => $duration_id,
				'operator' => $duration_operator,
			)
		)
	);
	if($use_global_query){
		global $wp_query;
		$query = clone $wp_query;
	} else {
		$query = new WP_Query($query_args);
	}
	if(!$query->have_posts()){
		return '';
	}
	$isSlider = isset($attributes['isSlider']) ? $attributes['isSlider'] : false;
	$listTitle = isset($attributes['listTitle']) ? $attributes['listTitle'] : '';
	$displayLayout = isset( $attributes['displayLayout']) ? $attributes['displayLayout'] : 'list';
	$columns = isset($attributes['columns']) ? $attributes['columns'] : 3;
	$classnames = 'lsedup-lesson-list';
	$classnames .= $isSlider ? ' swiper' : '';
	$classnames .= $displayLayout === 'flex' && !$isSlider ? ' is-flex-container' : '';
	$classnames .= $displayLayout === 'flex' && !$isSlider && $columns > 1 ? ' has-columns-'. $columns : '';
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );
	$content = '';
	while ( $query->have_posts() ) {
		$query->the_post();
		if(wp_get_post_parent_id() === 0) {
			$block_instance = $block->parsed_block;
			$block_instance['blockName'] = 'core/null';
			$block_content = ( new WP_Block(
					$block_instance,
					array(
						'postType' => get_post_type(),
						'postId'	=> get_the_ID(),
					)
				)
			)->render(array('dynamic'=> false));
			$post_classes = implode( ' ', get_post_class( 'wp-block-post swiper-slide' ) );
			$content .= '<div class="' . $post_classes . '">' . $block_content . '</div>';
		}
	}

	ob_start();
	?>
<div class="lsedup-lesson-list__container">
  <div <?php echo $wrapper_attributes; ?>>
    <?php if($isSlider){ ?>
    <div class="lsedup-lesson-list__wrapper swiper-wrapper">
      <?php echo $content; ?>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <?php } else {?>
    <?php echo $content; ?>
    <?php } ?>
  </div>
</div>
<?php
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}