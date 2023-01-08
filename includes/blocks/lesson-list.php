<?php

function lsedup_lesson_list_render_cb($attributes, $content, $block){
	$order = (isset($block->context['order']) && !empty($block->context['order'])) ? $block->context['order'] : 'ASC';
	$orderby = (isset($block->context['orderBy']) && !empty($block->context['orderBy'])) ? $block->context['orderBy'] : 'title';
	$set_taxonomy = $block->context['setTaxonomy'];
	$slider_scroller_textcolor = (isset($attributes['sliderScrollerColor']['textColor']) && !empty($attributes['sliderScrollerColor']['textColor'])) ? $attributes['sliderScrollerColor']['textColor'] : '#d3d3d3bf';
	$slider_scroller_background = (isset($attributes['sliderScrollerColor']['background']) && !empty($attributes['sliderScrollerColor']['background'])) ? $attributes['sliderScrollerColor']['background'] : '#ffffff00';
	$use_global_query = ( isset( $block->context['inherit'] ) && $block->context['inherit'] );
	$tax_id = (isset($set_taxonomy['taxSelect']) && !empty($set_taxonomy['taxSelect'])) ? intval($set_taxonomy['taxSelect']) : intval('');
	$tax_operator = (isset($set_taxonomy['taxSelect']) && !empty($set_taxonomy['taxSelect'])) ? 'IN' : 'NOT IN';
	$query_args = array(
		'post_type'	=> $block->context['postType'],
		'post_status' => 'publish',
		'order'	=> $order,
		'orderby'	=> $orderby,
		'nopaging' => true,
		'posts_per_page' => -1,
		'post_parent'	=> 0,
		'tax_query' => array(
			array(
				'taxonomy' => $set_taxonomy['taxType'],
				'field' => 'term_id',
				'terms' => $tax_id,
				'operator' => $tax_operator,
			),
		)
	);
	if($use_global_query){
		global $wp_query;
		$args = array_merge(
			$wp_query->query_vars,
			array(
				'post_status' => 'publish',
				'nopaging' => true,
				'posts_per_page' => -1,
				'order' => $order,
				'orderby' => $orderby,
				'post_parent' => 0
			));
		$query = new WP_Query($args);
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
	wp_reset_query();

	ob_start();
	?>
<div class="lsedup-lesson-list__container">
  <div <?php echo $wrapper_attributes; ?>>
    <?php if($isSlider){ ?>
    <div class="lsedup-lesson-list__wrapper swiper-wrapper">
      <?php echo $content; ?>
    </div>
    <div class="swiper-button-prev"
      style="color: <?php echo $slider_scroller_textcolor; ?>; background-color: <?php echo $slider_scroller_background; ?>;">
    </div>
    <div class="swiper-button-next"
      style="color: <?php echo $slider_scroller_textcolor; ?>; background-color: <?php echo $slider_scroller_background; ?>;">
    </div>
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