<?php

function lsedup_filter_select_render_cb($attributes, $content, $block){
	$hiding = $attributes['hidingFilterToolbar'] ? 'hidden' : '';
	$taxonomies = get_object_taxonomies('lesson');
	$areas = get_terms(array('taxonomy' => 'area', 'hide_empty' => false, 'order' => 'asc'));
  $term_link = get_term_link($areas[0], 'area');
	$categories = get_terms(array('taxonomy' => 'category', 'hide_empty' => false, 'order' => 'asc'));
	$intensities = get_terms(array('taxonomy' => 'intensity', 'hide_empty' => false, 'order' => 'asc'));
	$levels = get_terms(array('taxonomy' => 'level', 'hide_empty' => false, 'order' => 'asc'));
	$durations = get_terms(array('taxonomy' => 'duration', 'hide_empty' => false, 'order' => 'asc'));
	// $authors = wp_list_authors(array('orderby' => 'name', 'order' => 'ASC'));
	$authors = get_users(array('fields' => array('ID', 'display_name', 'role' => 'author', 'orderby' => 'display_name', 'order' => 'ASC')));

  $search_r = is_search() ? true : false;
  // var_dump($_GET['area']);

	ob_start();
  if(is_tax()){
    $term = get_queried_object();
  };
	?>
<div class="wp-block-lsedu-plus-filter-select <?php echo $hiding; ?>" data-controller="toggle">
  <form role="search" method="get" id="filter-select" data-tax="<?php echo is_tax('area') ? $term->slug : '0'; ?>"
    action="<?php echo home_url( '/' ); ?>">
    <input type="hidden" class="search-field" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
    <input type="hidden" name="post_type" value="lesson" />
    <?php if(is_tax('area') && !is_search()){ ?>
    <input type="hidden" name="area" value="<?php echo $term->slug; ?>" />
    <?php }; ?>
    <div id="filter-container" class="filter-container">
      <?php if(!is_tax('area') || is_search()){ ?>
      <div class="filter">
        <label for="area">Area</label>
        <div class="select">
          <select name="area" id="area">
            <option value=0 <?php echo (!$search_r || $search_r && $_GET['area'] === '0') ? 'selected' : '' ?>>All
            </option>
            <?php foreach($areas as $area){ ?>
            <option value="<?php echo $area->slug; ?>"
              <?php echo $search_r && $area->slug === $_GET['area'] ? 'selected' : ''; ?>>
              <?php echo $area->name; ?></option>
            <?php } ?>
          </select>
        </div>
      </div>
      <?php }; ?>
      <div class="filter">
        <label for="category">Category</label>
        <div class="select">
          <select name="category" id="category">
            <option value=0 <?php echo (!$search_r || $search_r && $_GET['category'] === '0') ? 'selected' : '' ?>>All
            </option>
            <?php foreach($categories as $category){ ?>
            <option value="<?php echo $category->slug; ?>"
              <?php echo $search_r && $category->slug === $_GET['category'] ? 'selected' : ''; ?>>
              <?php echo $category->name; ?></option>
            <?php } ?>
          </select>
        </div>
      </div>
      <div class="filter">
        <label for="author">Author</label>
        <div class="select">
          <select name="author" id="author">
            <option value=0 <?php echo (!$search_r || $search_r && $_GET['author'] === '0') ? 'selected' : '' ?>>All
            </option>
            <?php foreach($authors as $author){ ?>
            <option value="<?php echo $author->id ?>"
              <?php echo $search_r && $author->id === $_GET['author'] ? 'selected' : ''; ?>>
              <?php echo $author->display_name; ?></option>
            <?php } ?>
          </select>
        </div>
      </div>
      <div class="filter">
        <label for="intensity">Intensity</label>
        <div class="select">
          <select name="intensity" id="intensity">
            <option value=0 <?php echo (!$search_r || $search_r && $_GET['intensity'] === '0') ? 'selected' : '' ?>>All
            </option>
            <?php foreach($intensities as $intensity){ ?>
            <option value="<?php echo $intensity->slug; ?>"
              <?php echo $search_r && $intensity->slug === $_GET['intensity'] ? 'selected' : ''; ?>>
              <?php echo $intensity->name; ?></option>
            <?php } ?>
          </select>
        </div>
      </div>
      <div class="filter">
        <label for="level">Level</label>
        <div class="select">
          <select name="level" id="level">
            <option value=0 <?php echo (!$search_r || $search_r && $_GET['level'] === '0') ? 'selected' : '' ?>>All
            </option>
            <?php foreach($levels as $level){ ?>
            <option value="<?php echo $level->slug; ?>"
              <?php echo $search_r && $level->slug === $_GET['level'] ? 'selected' : ''; ?>><?php echo $level->name; ?>
            </option>
            <?php } ?>
          </select>
        </div>
      </div>
      <div class="filter">
        <label for="duration">Duration</label>
        <div class="select">
          <select name="duration" id="duration">
            <option value=0 <?php echo (!$search_r || $search_r && $_GET['duration'] === '0') ? 'selected' : '' ?>>All
            </option>
            <?php foreach($durations as $duration){ ?>
            <option value="<?php echo $duration->slug; ?>"
              <?php echo $search_r && $duration->slug === $_GET['duration'] ? 'selected' : ''; ?>>
              <?php echo $duration->name; ?>
            </option>
            <?php } ?>
          </select>
        </div>
      </div>
    </div>
  </form>
</div>
<?php

	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}

// https://studio.meghancurrieyoga.com/catalog/search?category_id=96862
// http://lseducation.local/?s=&author=&intensity=meow&level=+&duration=+