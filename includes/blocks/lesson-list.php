<?php

function lsedup_lesson_list_render_cb($attributes, $content, $block){
	$category_id = (isset($attributes['category']) && !empty($attributes['category'])) ? intval($attributes['category']) : intval('');
	$category_operator = (isset($attributes['category']) && !empty($attributes['category'])) ? 'IN' : 'NOT IN';
	$area_id = (isset($attributes['area']) && !empty($attributes['area'])) ? intval($attributes['area']) : intval('');
	$area_operator = (isset($attributes['area']) && !empty($attributes['area'])) ? 'IN' : 'NOT IN';
	$intensity_id = (isset($attributes['intensity']) && !empty($attributes['intensity'])) ? intval($attributes['intensity']) : intval('');
	$intensity_operator = (isset($attributes['intensity']) && !empty($attributes['intensity'])) ? 'IN' : 'NOT IN';
	$query_args = array(
		'post_type'	=> 'lesson',
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
			)
		)
	);
	$query = new WP_Query($query_args);
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

	ob_start();
	?>
<div class="lsedup-lesson-list__container">
  <div class="lsedup-lesson-list__header">
    <h2 class="lsedup-lesson-list__title"><?php echo $listTitle; ?></h2>
    <a class="lsedup-lesson-list__button" href="/area/lifedesign/">
      See All
    </a>
  </div>
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