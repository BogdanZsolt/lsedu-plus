<?php

function lsedup_enqueue_scripts(){
	$authURLs = json_encode([
		'signup' => esc_url_raw(rest_url('lsedup/v1/signup')),
		'signin' => esc_url_raw(rest_url('lsedup/v1/signin'))
	]);

	wp_add_inline_script(
		'lsedu-plus-auth-modal-script',
		"const lsedup_auth_rest = {$authURLs}",
		'before'
	);
}