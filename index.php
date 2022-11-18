<?php
/**
 * Plugin Name:       La Saphire Education Plus
 * Plugin URI:        https://zsoltbogdan.hu/plugins/lsedu-plus/
 * Description:       A plugin for adding blocks to a theme.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            Zsolt Bogdán
 * Author URI:        https://www.zsoltbogdan.hu/
 * Text Domain:       lsedu-plus
 * Domain Path:       /languages
 */

if(!function_exists('add_action')){
	echo 'Seems like you stumbled here by accident.';
	exit;
}

// Setup
define('LSEDUP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles = glob(LSEDUP_PLUGIN_DIR . 'includes/*.php');
$subdirectoryFiles = glob(LSEDUP_PLUGIN_DIR . 'includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

foreach($allFiles as $fileName){
	include_once($fileName);
}

// Hooks
register_activation_hook(__FILE__, 'lsedup_activate_plugin');
add_action('init', 'lsedup_register_blocks');
add_action('rest_api_init', 'lsedup_rest_api_init');
add_action('wp_enqueue_scripts', 'lsedup_enqueue_scripts');
add_action('init', 'lsedup_lesson_post_type');
add_filter('page_row_actions', 'lsedup_page_row_actions', 10, 2);
add_action('area_add_form_fields', 'lsedup_area_add_form_fields');
add_action('create_area', 'lsedup_save_area_meta');
add_action('area_edit_form_fields', 'lsedup_area_edit_form_fields');
add_action('edited_area', 'lsedup_save_area_meta');
add_filter('block_categories_all', 'lsedup_new_gutenberg_category', 10, 2);
add_action('save_post_lesson', 'lsedup_save_post_lesson');
add_action('after_setup_theme', 'lsedup_setup_theme');
add_action('init', 'la_saphire_lesson_blocks_register_video_metabox_template');

add_filter('image_size_names_choose', 'lsedup_custom_image_sizes');