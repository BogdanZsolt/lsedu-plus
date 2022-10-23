<?php

function lsedup_filter_tools_render_cb($atts){
	ob_start();
	?>
		<div class="wp-block-lsedu-plus-filter-tools">
			<?php
			if($atts['showFiltersToolbar']){
			?>
				<a class="filter-button open-select" type="button">
					Filter
				</a>
			<?php
			}
			?>
		</div>
	<?php

	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}