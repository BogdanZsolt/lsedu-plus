<?php

function lsedup_lesson_list_header_render_cb(){
		ob_start();
		?>
<h2>Hello</h2>
<?php

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
}