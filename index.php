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
add_action('init', 'lsedup_register_blocks');
add_action('rest_api_init', 'lsedup_rest_api_init');
add_action('wp_enqueue_scripts', 'lsedup_enqueue_scripts');
add_action('init', 'lsedup_course_post_type');