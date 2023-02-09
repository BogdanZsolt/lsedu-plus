<?php

function la_saphire_lesson_block_register_pattern_cat(){
	register_block_pattern_category('la-saphire-patterns', array(
		'label' => __('La Saphire', 'lsedu-plus'),
	));
}

function la_saphire_lesson_block_register_pattern(){
	register_block_pattern('la-saphire-patterns/lesson-query',
	array(
		'title' => __('Lesson Query', 'lsedu-plus'),
		'description' => __('some description', 'lsedu-plus'),
		'categories' => array('la-saphire-patterns'),
		'keywords' => array('lesson', 'query', 'list'),
		'content' => '<!-- wp:lsedu-plus/lesson-query {"setTaxonomy":[{"taxSelect":"20","field":"term_id","taxType":"area"}]} --><div class="wp-block-lsedu-plus-lesson-query"><!-- wp:lsedu-plus/lesson-list-header --><div class="wp-block-lsedu-plus-lesson-list-header"><!-- wp:lsedu-plus/lesson-list-header-title /--><!-- wp:lsedu-plus/lesson-list-header-title {"titleInactive":"See All","isTitleSettingActive":false,"level":5} /--></div><!-- /wp:lsedu-plus/lesson-list-header --><!-- wp:lsedu-plus/lesson-list {"isSlider":true,"columns":4,"displayLayout":"flex"} --><!-- wp:post-featured-image {"isLink":true,"sizeSlug":"videoPlaceholderImage","linkTarget":"_blank"} /--><!-- wp:lsedu-plus/lesson-title {"level":4,"isLink":true,"linkTarget":"_blank"} /--><!-- /wp:lsedu-plus/lesson-list --></div><!-- /wp:lsedu-plus/lesson-query -->',
	));
}