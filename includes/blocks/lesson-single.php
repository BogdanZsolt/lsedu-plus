<?php

function lsedup_lesson_single_render_cb($attributes, $content, $block){
		ob_start();
		?>
<h2>Hello Single Stuff</h2>
<?php

		$output = ob_get_contents();
		ob_end_clean();

		return $output;
}

// <iframe width="840" height="472" src="https://www.youtube.com/embed/17KgzVklTmo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>