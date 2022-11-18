<?php

function lsedup_lesson_summary_render_cb($atts, $content, $block){
	$postID = $block->context['postId'];
	$postAreaTerms = get_the_terms($postID, 'area');
	$postAreaTerms = is_array($postAreaTerms) ? $postAreaTerms : [];
	$areas = '';
	foreach($postAreaTerms as $key => $term){
		$url = get_term_meta($term->term_id, 'more_info_url', true);
		$comma = $key === array_key_last($postAreaTerms) ? '' : ', ';
		$areas .= "<a href='{$url}' target='_blank'>{$term->name}</a>{$comma}";
	}

  $postCategoryTerms = wp_get_post_categories($postID, ['fields' => 'names']);
  $postCategoryTerms = is_array($postCategoryTerms) ? $postCategoryTerms : [];
  $categories = '';
  foreach($postCategoryTerms as $key => $term){
    $comma = $key === array_key_last($postCategoryTerms) ? '' : ', ';
    $categories .= $term . $comma;
  }

	$postIntensityTerms = get_the_terms($postID, 'intensity');
	$postIntensityTerms = is_array($postIntensityTerms) ? $postIntensityTerms : [];
	$intensities = '';
	foreach($postIntensityTerms as $key => $term){
		$comma = $key === array_key_last($postIntensityTerms) ? '' : ', ';
		$intensities .= $term->name . $comma;
	}
	$postLevelTerms = get_the_terms($postID, 'level');
	$postLevelTerms = is_array($postLevelTerms) ? $postLevelTerms : [];
	$levels = '';
	foreach($postLevelTerms as $key => $term){
		$comma = $key === array_key_last($postLevelTerms) ? '' : ', ';
		$levels .= $term->name . $comma;
	}
	$postDurationTerms = get_the_terms($postID, 'duration');
	$postDurationTerms = is_array($postDurationTerms) ? $postDurationTerms : [];
	$durations = '';
	foreach($postDurationTerms as $key => $term){
		$comma = $key === array_key_last($postDurationTerms) ? '' : ', ';
		$durations .= $term->name . $comma;
	}

	$video_src = get_post_meta($postID, 'video_src', true);

  if(has_post_parent($postID)){
    $parent = get_post_parent($postID);
    $course = $parent->post_title;
  } else {
    $course = get_the_title($postID);
    $children = get_children([
      'post_parent' => $postID,
      'fields' => 'ids',
      'orderby' => 'date',
      'order' => 'ASC',
    ]);

  }

  $lessons = '';
  if(!empty($children)){
    $lessons = "<ul class='lesson-course__list'>";
    foreach($children as $child){
      $child_name = get_the_title($child);
      $lessons .= "<a>{$child_name}</a>";
    }
    $lessons .= "</ul>";
  }

  $rating = get_post_meta($postID, 'lesson_rating', true);

  global $wpdb;
  $userID = get_current_user_id();
  $ratingCount = $wpdb->get_var($wpdb->prepare(
    "SELECT COUNT(*) FROM {$wpdb->prefix}lesson_ratings WHERE post_id=%d AND user_id=%d", $postID, $userID
  ));

	ob_start();

	?>
<div class="wp-block-lsedu-plus-lesson-summary">
  <div class="row separator">
    <i class="bi bi-play-btn"></i>
    <div class="lesson-column-8">
      <div class="lesson-title">
        <?php _e('Video url', 'lsedup-plus'); ?>
      </div>
      <div class="lesson-data">
        <div class="lesson-video-url">
          <iframe src="<?php echo sanitize_url($video_src); ?>" class="lesson-video-player"
            allow="fullscreen; autoplay; clipboard-write;">
          </iframe>
        </div>
      </div>
    </div>

    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Duration Time', 'lsedu-plus'); ?>
      </div>
      <div class="lesson-data lesson-duration-time"></div>
    </div>
  </div>

  <div class="row separator">
    <i class="bi bi-info-square"></i>
    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Area', 'lsedu-plus') ?>
      </div>
      <div class="lesson-data lesson-area">
        <?php echo $areas; ?>
      </div>
    </div>

    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Category', 'lsedu-plus') ?>
      </div>
      <div class="lesson-data lesson-area">
        <?php echo $categories; ?>
      </div>
    </div>

    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Author', 'lsedu-plus') ?>
      </div>
      <div class="lesson-data lesson-area">
        <?php echo get_the_author(); ?>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Intensity', 'lsedu-plus') ?>
      </div>
      <div class="lesson-data lesson-area">
        <?php echo $intensities; ?>
      </div>
    </div>

    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Level', 'lsedu-plus') ?>
      </div>
      <div class="lesson-data lesson-area">
        <?php echo $levels; ?>
      </div>
    </div>

    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e('Duration', 'lsedu-plus') ?>
      </div>
      <div class="lesson-data lesson-area">
        <?php echo  $durations; ?>
      </div>
    </div>
  </div>

  <div class="row separator">
    <i class="bi bi-hand-thumbs-up"></i>
    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e( 'Rating', 'lsedu-plus' ); ?>
      </div>
      <div class="lesson-data lesson-rating" id="lesson-rating" data-post-id="<?php echo $postID; ?>"
        data-avg-rating="<?php echo $rating; ?>" data-logged-in="<?php echo is_user_logged_in(); ?>"
        data-rating-count="<?php echo $ratingCount; ?>"></div>
    </div>
    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e( 'Course', 'lsedu-plus' ); ?>
      </div>
      <div class="lesson-data lesson-course">
        <?php echo $course; ?>
      </div>
    </div>
    <div class="lesson-column-4">
      <div class="lesson-title">
        <?php _e( 'Lessons', 'lsedu-plus' ); ?>
      </div>
      <div class="lesson-data lesson-course">
        <?php echo $lessons; ?>
      </div>
    </div>
  </div>
</div>
<?php
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}