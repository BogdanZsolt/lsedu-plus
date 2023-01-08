<?php

function lsedup_lesson_featured_image_render_cb($attributes, $content, $block){
		ob_start();
		?>
<h2>Hello</h2>
<?php

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
}