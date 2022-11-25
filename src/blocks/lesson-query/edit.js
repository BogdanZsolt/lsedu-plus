import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	QueryControls,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import classnames from 'classnames';
import FilterControls from './filter-controls';

const TEMPLATE = [
	[ 'lsedu-plus/lesson-list-header', {} ],
	[ 'lsedu-plus/lesson-list', {} ],
];

// Edit

export default function Edit( props ) {
	const { attributes, setAttributes, context } = props;
	const { orderBy, order, taxonomyList, inherit } = attributes;
	const { postId } = context;

	// console.log( inherit );

	const {
		categoriesList,
		areasList,
		intensitiesList,
		levelsList,
		durationsList,
	} = useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );
		return {
			categoriesList: getEntityRecords( 'taxonomy', 'category', {
				per_page: -1,
				context: 'view',
			} ),
			areasList: getEntityRecords( 'taxonomy', 'area', {
				per_page: -1,
				context: 'view',
			} ),
			intensitiesList: getEntityRecords( 'taxonomy', 'intensity', {
				per_page: -1,
				context: 'view',
			} ),
			levelsList: getEntityRecords( 'taxonomy', 'level', {
				per_page: -1,
				context: 'view',
			} ),
			durationsList: getEntityRecords( 'taxonomy', 'duration', {
				per_page: -1,
				context: 'view',
			} ),
		};
	}, [] );

	const blockProps = useBlockProps( {
		className: classnames( 'lsedup-lesson-list__container' ),
	} );

	// const onTaxTypeChange = ( value ) => {
	// 	const tempObj = { ...taxonomyList };
	// 	tempObj.taxType = value;
	// 	setAttributes( { taxonomyList: tempObj } );
	// };

	const onAreaChange = ( value ) => {
		const tempObj = { ...taxonomyList };
		tempObj.area = value;
		setAttributes( { taxonomyList: tempObj } );
	};

	// const onCategoryChange = ( value ) => {
	// 	const tempObj = { ...taxonomyList };
	// 	tempObj.category = value;
	// 	setAttributes( { taxonomyList: tempObj } );
	// };

	// const onIntensityChange = ( value ) => {
	// 	const tempObj = { ...taxonomyList };
	// 	tempObj.intensity = value;
	// 	setAttributes( { taxonomyList: tempObj } );
	// };

	// const onLevelChange = ( value ) => {
	// 	const tempObj = { ...taxonomyList };
	// 	tempObj.level = value;
	// 	setAttributes( { taxonomyList: tempObj } );
	// };

	// const onDurationChange = ( value ) => {
	// 	const tempObj = { ...taxonomyList };
	// 	tempObj.duration = value;
	// 	setAttributes( { taxonomyList: tempObj } );
	// };

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'lsedu-plus' ) }>
					<QueryControls
						orderBy={ orderBy }
						onOrderByChange={ ( orderBy ) => {
							setAttributes( { orderBy } );
						} }
						order={ order }
						onOrderChange={ ( order ) => {
							setAttributes( { order } );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Filters', 'ls-studio-blocks' ) }>
					<ToggleControl
						label={ __(
							'Inherit query from template',
							'lsedu-plus'
						) }
						help={ __(
							'Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently.'
						) }
						checked={ inherit }
						onChange={ ( value ) =>
							setAttributes( { inherit: !! value } )
						}
					/>
					{ /* <SelectControl
						label={ __( 'Set Title', 'lsedu-plus' ) }
						value={ taxonomyList.taxType }
						options={ [
							{ label: __( 'none', 'lsedu-plus' ), value: '' },
							{
								label: __( 'Area', 'lsedu-plus' ),
								value: 'area',
							},
							{
								label: __( 'Category', 'lsedu-plus' ),
								value: 'category',
							},
							{
								label: __( 'Intensity', 'lsedu-plus' ),
								value: 'intensity',
							},
							{
								label: __( 'Level', 'lsedu-plus' ),
								value: 'level',
							},
							{
								label: __( 'Duration', 'lsedu-plus' ),
								value: 'duration',
							},
						] }
						onChange={ onTaxTypeChange }
					/> */ }
					<FilterControls
						label={ __( 'Area', 'lsedu-plus' ) }
						categoriesList={ areasList }
						selectedCategoryId={ taxonomyList.area }
						onCategoryChange={ onAreaChange }
					/>
					{ /* <FilterControls
						label={ __( 'Category', 'lsedu-plus' ) }
						categoriesList={ categoriesList }
						selectedCategoryId={ taxonomyList.category }
						onCategoryChange={ onCategoryChange }
					/>
					<FilterControls
						label={ __( 'Intensity', 'lsedu-plus' ) }
						categoriesList={ intensitiesList }
						selectedCategoryId={ taxonomyList.intensity }
						onCategoryChange={ onIntensityChange }
					/>
					<FilterControls
						label={ __( 'Level', 'lsedu-plus' ) }
						categoriesList={ levelsList }
						selectedCategoryId={ taxonomyList.level }
						onCategoryChange={ onLevelChange }
					/>
					<FilterControls
						label={ __( 'Duration', 'lsedu-plus' ) }
						categoriesList={ durationsList }
						selectedCategoryId={ taxonomyList.duration }
						onCategoryChange={ onDurationChange }
					/> */ }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks template={ TEMPLATE } orientation="horizontal" />
			</div>
		</>
	);
}
