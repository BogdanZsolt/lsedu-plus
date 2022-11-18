<?php

function la_saphire_lesson_blocks_register_video_metabox_template(){
	$post_type_object = get_post_type_object( 'lesson' );
	$post_type_object->template = array(
		array('lsedu-plus/lesson-summary')
	);
}