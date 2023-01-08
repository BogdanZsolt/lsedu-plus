<?php

function lsedup_lesson_post_type(){

	$labels = array(
		'name'                  => _x( 'Lessons', 'Post type general name', 'lsedu-plus' ),
		'singular_name'         => _x( 'Lesson', 'Post type singular name', 'lsedu-plus' ),
		'menu_name'             => _x( 'Lessons', 'Admin Menu text', 'lsedu-plus' ),
		'name_admin_bar'        => _x( 'Lesson', 'Add New on Toolbar', 'lsedu-plus' ),
		'add_new'               => __( 'Add New', 'lsedu-plus' ),
		'add_new_item'          => __( 'Add New Lesson', 'lsedu-plus' ),
		'new_item'              => __( 'New Lesson', 'lsedu-plus' ),
		'edit_item'             => __( 'Edit Lesson', 'lsedu-plus' ),
		'view_item'             => __( 'View Lesson', 'lsedu-plus' ),
		'all_items'             => __( 'All Lessons', 'lsedu-plus' ),
		'search_items'          => __( 'Search Lessons', 'lsedu-plus' ),
		'parent_item_colon'     => __( 'Parent Lessons:', 'lsedu-plus' ),
		'not_found'             => __( 'No Lessons found.', 'lsedu-plus' ),
		'not_found_in_trash'    => __( 'No Lessons found in Trash.', 'lsedu-plus' ),
		'featured_image'        => _x( 'Lesson Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'archives'              => _x( 'Lesson archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'lsedu-plus' ),
		'insert_into_item'      => _x( 'Insert into Lesson', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'lsedu-plus' ),
		'uploaded_to_this_item' => _x( 'Uploaded to this Lesson', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'lsedu-plus' ),
		'filter_items_list'     => _x( 'Filter Lessons list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'lsedu-plus' ),
		'items_list_navigation' => _x( 'Lessons list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'lsedu-plus' ),
		'items_list'            => _x( 'Lessons list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'lsedu-plus' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'lesson' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => true,
		'can_export'         => true,
		'menu_position'      => 20,
		'menu_icon'          => 'dashicons-welcome-learn-more',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields',  'page-attributes' ),
		'show_in_rest'       => true,
		'description'        => __('A custom post type for lesson', 'lsedu-plus'),
		'taxonomies'         => ['category'],
	);

	register_post_type( 'lesson', $args );

	// Add Area Taxonomy

	$labels = [
		'name'                       => _x( 'Areas', 'taxonomy general name', 'lsedu-plus' ),
		'singular_name'              => _x( 'Area', 'taxonomy singular name', 'lsedu-plus' ),
		'search_items'               => __( 'Search Areas', 'lsedu-plus' ),
		'popular_items'              => __( 'Popular Areas', 'lsedu-plus' ),
		'all_items'                  => __( 'All Areas', 'lsedu-plus' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit Area', 'lsedu-plus' ),
		'update_item'                => __( 'Update Area', 'lsedu-plus' ),
		'add_new_item'               => __( 'Add New Area', 'lsedu-plus' ),
		'new_item_name'              => __( 'New Area Name', 'lsedu-plus' ),
		'separate_items_with_commas' => __( 'Separate Areas with commas', 'lsedu-plus' ),
		'add_or_remove_items'        => __( 'Add or remove Areas', 'lsedu-plus' ),
		'choose_from_most_used'      => __( 'Choose from the most used Areas', 'lsedu-plus' ),
		'not_found'                  => __( 'No Areas found.', 'lsedu-plus' ),
		'menu_name'                  => __( 'Areas', 'lsedu-plus' ),
	];

	$args = [
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => ['slug' => 'area'],
		'show_in_rest'          => true,
	];

	register_taxonomy('area', 'lesson', $args);

	register_term_meta( 'area', 'more_info_url', [
		'type' => 'string',
		'description' => __('A URL for more information on an area', 'lsedu-plus'),
		'single' => true,
		'show_in_rest' => true,
		'default' => '#',
	]);

	// Add Intensity Taxonomy

	$labels = [
		'name'                       => _x( 'Intensities', 'taxonomy general name', 'lsedu-plus' ),
		'singular_name'              => _x( 'Intensity', 'taxonomy singular name', 'lsedu-plus' ),
		'search_items'               => __( 'Search Intensities', 'lsedu-plus' ),
		'popular_items'              => __( 'Popular Intensities', 'lsedu-plus' ),
		'all_items'                  => __( 'All Intensities', 'lsedu-plus' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit Intensity', 'lsedu-plus' ),
		'update_item'                => __( 'Update Intensity', 'lsedu-plus' ),
		'add_new_item'               => __( 'Add New Intensity', 'lsedu-plus' ),
		'new_item_name'              => __( 'New Area Name', 'lsedu-plus' ),
		'separate_items_with_commas' => __( 'Separate Intensities with commas', 'lsedu-plus' ),
		'add_or_remove_items'        => __( 'Add or remove Intensities', 'lsedu-plus' ),
		'choose_from_most_used'      => __( 'Choose from the most used Intensities', 'lsedu-plus' ),
		'not_found'                  => __( 'No Intensities found.', 'lsedu-plus' ),
		'menu_name'                  => __( 'Intensities', 'lsedu-plus' ),
	];

	$args = [
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => ['slug' => 'intensity'],
		'show_in_rest'          => true,
	];

	register_taxonomy('intensity', 'lesson', $args);

	// Add Level Taxonomy

	$labels = [
		'name'                       => _x( 'Levels', 'taxonomy general name', 'lsedu-plus' ),
		'singular_name'              => _x( 'Level', 'taxonomy singular name', 'lsedu-plus' ),
		'search_items'               => __( 'Search Levels', 'lsedu-plus' ),
		'popular_items'              => __( 'Popular Levels', 'lsedu-plus' ),
		'all_items'                  => __( 'All Levels', 'lsedu-plus' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit Level', 'lsedu-plus' ),
		'update_item'                => __( 'Update Level', 'lsedu-plus' ),
		'add_new_item'               => __( 'Add New Level', 'lsedu-plus' ),
		'new_item_name'              => __( 'New Level Name', 'lsedu-plus' ),
		'separate_items_with_commas' => __( 'Separate Levels with commas', 'lsedu-plus' ),
		'add_or_remove_items'        => __( 'Add or remove Levels', 'lsedu-plus' ),
		'choose_from_most_used'      => __( 'Choose from the most used Levels', 'lsedu-plus' ),
		'not_found'                  => __( 'No Levels found.', 'lsedu-plus' ),
		'menu_name'                  => __( 'Levels', 'lsedu-plus' ),
	];

	$args = [
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => ['slug' => 'level'],
		'show_in_rest'          => true,
	];

	register_taxonomy('level', 'lesson', $args);

	// Add Duration Taxonomy

	$labels = [
		'name'                       => _x( 'Durations', 'taxonomy general name', 'lsedu-plus' ),
		'singular_name'              => _x( 'Duration', 'taxonomy singular name', 'lsedu-plus' ),
		'search_items'               => __( 'Search Durations', 'lsedu-plus' ),
		'popular_items'              => __( 'Popular Durations', 'lsedu-plus' ),
		'all_items'                  => __( 'All Durations', 'lsedu-plus' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit Duration', 'lsedu-plus' ),
		'update_item'                => __( 'Update Duration', 'lsedu-plus' ),
		'add_new_item'               => __( 'Add New Duration', 'lsedu-plus' ),
		'new_item_name'              => __( 'New Duration Name', 'lsedu-plus' ),
		'separate_items_with_commas' => __( 'Separate Durations with commas', 'lsedu-plus' ),
		'add_or_remove_items'        => __( 'Add or remove Durations', 'lsedu-plus' ),
		'choose_from_most_used'      => __( 'Choose from the most used Durations', 'lsedu-plus' ),
		'not_found'                  => __( 'No Durations found.', 'lsedu-plus' ),
		'menu_name'                  => __( 'Durations', 'lsedu-plus' ),
	];

	$args = [
		'hierarchical'          => false,
		'labels'                => $labels,
		'show_ui'               => true,
		'show_admin_column'     => true,
		'update_count_callback' => '_update_post_term_count',
		'query_var'             => true,
		'rewrite'               => ['slug' => 'duration'],
		'show_in_rest'          => true,
	];

	register_taxonomy('duration', 'lesson', $args);

	register_post_meta('lesson', 'lesson_rating', [
		'type' => 'number',
		'description' => __('The rating for a lesson', 'lsedu-plus'),
		'single' => true,
		'show_in_rest' => true,
		'default' => 0,
	]);

	// register_post_meta('lesson', 'video_src', [
	// 	'type' => 'string',
	// 	'description' => __('The lesson\'s video source link.', 'lsedu-plus'),
	// 	'single' => true,
	// 	'show_in_rest' => true,
	// 	'sanitize_callback' => 'esc_url_raw',
	// 	'auth_callback' => function(){
	// 		return current_user_can( 'edit_posts' );
	// 	}
	// ]);

	register_post_meta('lesson', 'video_data', [
		'type' => 'object',
		'description' => __('The lesson\'s video data.', 'lsedu-plus'),
		'single' => true,
		'show_in_rest' => array(
			'schema' => array(
				'type' => 'object',
				'properties' => array(
					'video_src' => array(
						'type' => 'string',
						'sanitize_callback' => 'esc_url_raw',
 					),
					'provider' => array(
						'type' => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'responsive' => array(
						'type' => 'boolean',
					),
				),
			),
		),
		'auth_callback' => function(){
			return current_user_can( 'edit_posts' );
		}
	]);
}

function lsedup_page_row_actions($actions, $post){
	if($post->post_type === 'lesson'){
		$actions['id'] = 'ID: ' . $post->ID;
	}
	return $actions;
}