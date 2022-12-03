import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CategorySelect from './category-select';
import { FormTokenField } from '@wordpress/components';

const MAX_CATEGORIES_SUGGESTIONS = 20;

export default function QueryControls( {
	label,
	pluralLabel,
	categoriesList,
	selectedCategoryId,
	categorySuggestions,
	selectedCategories,
	onCategoryChange,
} ) {
	return [
		categoriesList && onCategoryChange && (
			<CategorySelect
				key="filter-controls-category-select"
				categoriesList={ categoriesList }
				label={ label }
				noOptionLabel={ __( 'All' ) }
				selectedCategoryId={ selectedCategoryId }
				onChange={ onCategoryChange }
			/>
		),
		categorySuggestions && onCategoryChange && (
			<FormTokenField
				key="filter-controls-categories-select"
				label={ pluralLabel }
				value={
					selectedCategories &&
					selectedCategories.map( ( item ) => ( {
						id: item.id,
						value: item.name || item.value,
					} ) )
				}
				suggestions={ Object.keys( categorySuggestions ) }
				onChange={ onCategoryChange }
				maxSuggestions={ MAX_CATEGORIES_SUGGESTIONS }
			/>
		),
	];
}
