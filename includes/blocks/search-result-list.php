<?php

function lsedup_search_result_list_render_cb($attributes, $content, $block){
	if(!is_search()){
		return '';
	}
	$search_text = $_GET['s'];
	$post_type = $_GET['post_type'];
	$area = isset($_GET['area']) && $_GET['area'] !== '0' ? $_GET['area'] : '';
	$category = isset($_GET['category']) && $_GET['category'] !== '0' ? $_GET['category'] : '';
	$intensity = isset($_GET['intensity']) && $_GET['intensity'] !== '0' ? $_GET['intensity'] : '';
	$level = isset($_GET['level']) && $_GET['level'] !== '0' ? $_GET['level'] : '';
	$duration = isset($_GET['duration']) && $_GET['duration'] ? $_GET['duration'] : '';

	$args = array(
		'post_type' => $post_type,
		'post_status'	=> 'publish',
		'order' => 'asc',
		'orderby' => 'title',
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
	$content = '';
	while($query->have_posts()){
		$query->the_post();
		$content .= sprintf('<li>%1$s</li>', get_the_title());
	}
	wp_reset_postdata();
	ob_start();
	?>

<div class="lsedup-search-result-list">
  <h2>Hello Search Result List</h2>
  <ul>
    <?php echo $content; ?>
  </ul>
</div>

<?php
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}