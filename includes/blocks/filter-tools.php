<?php

function lsedup_filter_tools_render_cb($atts){
	$wrapper_attributes = get_block_wrapper_attributes();
	ob_start();
	?>
<div <?php echo $wrapper_attributes; ?>>
  <?php
			if($atts['showFiltersToolbar']){
			?>
  <a class="filter-button open-select" type="button">
    <?php _e('Filters', 'lsedu-plus'); ?>
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