<?php

function lsedup_course_post_type(){

	$labels = array(
		'name'                  => _x( 'Courses', 'Post type general name', 'lsedu-plus' ),
		'singular_name'         => _x( 'Course', 'Post type singular name', 'lsedu-plus' ),
		'menu_name'             => _x( 'Courses', 'Admin Menu text', 'lsedu-plus' ),
		'name_admin_bar'        => _x( 'Course', 'Add New on Toolbar', 'lsedu-plus' ),
		'add_new'               => __( 'Add New', 'lsedu-plus' ),
		'add_new_item'          => __( 'Add New Course', 'lsedu-plus' ),
		'new_item'              => __( 'New Course', 'lsedu-plus' ),
		'edit_item'             => __( 'Edit Course', 'lsedu-plus' ),
		'view_item'             => __( 'View Course', 'lsedu-plus' ),
		'all_items'             => __( 'All Courses', 'lsedu-plus' ),
		'search_items'          => __( 'Search Courses', 'lsedu-plus' ),
		'parent_item_colon'     => __( 'Parent Courses:', 'lsedu-plus' ),
		'not_found'             => __( 'No Courses found.', 'lsedu-plus' ),
		'not_found_in_trash'    => __( 'No Courses found in Trash.', 'lsedu-plus' ),
		'featured_image'        => _x( 'Course Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'lsedu-plus' ),
		'archives'              => _x( 'Course archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'lsedu-plus' ),
		'insert_into_item'      => _x( 'Insert into Course', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'lsedu-plus' ),
		'uploaded_to_this_item' => _x( 'Uploaded to this Course', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'lsedu-plus' ),
		'filter_items_list'     => _x( 'Filter Courses list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'lsedu-plus' ),
		'items_list_navigation' => _x( 'Courses list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'lsedu-plus' ),
		'items_list'            => _x( 'Courses list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'lsedu-plus' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'course' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 20,
		'menu_icon'          => 'dashicons-welcome-learn-more',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		'show_in_rest'       => true,
		'description'        => __('A custom post type for course', 'lsedu-plus'),
	);

	register_post_type( 'course', $args );
}