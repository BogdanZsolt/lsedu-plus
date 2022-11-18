<?php

function lsedup_area_add_form_fields(){
	?>
	<div class="form-field">
		<label><?php _e('More Info URL', 'lsedu-plus'); ?></label>
		<input type="text" name="lsedup_more_info_url"/>
		<p><?php _e('A URL a user can click to learn more information about this Area.', 'lsedu-plus'); ?></p>
	</div>
	<?php
}

function lsedup_area_edit_form_fields($term){
	$url = get_term_meta($term->term_id, 'more_info_url', true);
	?>
	<tr class="form-field">
		<th>
			<label><?php _e('More Info URL', 'lsedu-plus'); ?></label>
		</th>
		<td>
			<input type="text" name="lsedup_more_info_url" value="<?php echo $url; ?>" />
			<p class="description"><?php _e('A URL a user can click to learn more information about this Area.', 'lsedu-plus'); ?></p>
		</td>
	</tr>
	<?php
}