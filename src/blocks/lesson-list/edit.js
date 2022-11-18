import { memo, useMemo, useState } from '@wordpress/element';
import {
	BlockControls,
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	Spinner,
	PanelBody,
	ToggleControl,
	QueryControls,
	RangeControl,
	ToolbarGroup,
	RadioControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { list, grid } from '@wordpress/icons';
import classnames from 'classnames';

import FilterControls from './filter-controls';

const TEMPLATE = [
	[ 'lsedu-plus/lesson-list-header', {} ],
	[ 'core/post-featured-image', { sizeSlug: 'videoPlaceholderImage' } ],
	[ 'lsedu-plus/lesson-title', { level: 4 } ],
];

// Edit

export default function Edit( props ) {
	const { clientId, attributes, setAttributes } = props;
	const {
		postType,
		isSlider,
		columns,
		order,
		orderBy,
		area,
		category,
		intensity,
		levels,
		durations,
		displayLayout,
		listTitle,
		listTitleType,
	} = attributes;

	const [ activeBlockContextId, setActiveBlockContextId ] = useState();

	const {
		posts,
		blocks,
		categoriesList,
		areasList,
		intensityList,
		levelsList,
		durationsList,
	} = useSelect(
		( select ) => {
			const { getEntityRecords } = select( coreStore );
			const { getBlocks } = select( blockEditorStore );
			const catId = [];
			if ( category && category.length > 0 ) {
				catId[ 0 ] = Number( category );
			}
			const areaId = [];
			if ( area && area.length > 0 ) {
				areaId[ 0 ] = Number( area );
			}
			const intensityId = [];
			if ( intensity && intensity.length > 0 ) {
				intensityId[ 0 ] = Number( intensity );
			}
			const levelIds =
				levels && levels.length > 0
					? levels.map( ( level ) => level.id )
					: [];
			const durationIds =
				durations && durations.length > 0
					? durations.map( ( duration ) => duration.id )
					: [];
			const query = {
				per_page: -1,
				_embed: true,
				order,
				orderby: orderBy,
				parent: 0,
				area: areaId,
				categories: catId,
				intensity: intensityId,
			};
			return {
				posts: getEntityRecords( 'postType', postType, query ),
				blocks: getBlocks( clientId ),
				categoriesList: getEntityRecords( 'taxonomy', 'category', {
					per_page: -1,
					context: 'view',
				} ),
				areasList: getEntityRecords( 'taxonomy', 'area', {
					per_page: -1,
					context: 'view',
				} ),
				intensityList: getEntityRecords( 'taxonomy', 'intensity', {
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
		},
		[
			order,
			orderBy,
			clientId,
			category,
			area,
			intensity,
			levels,
			durations,
		]
	);

	function PostTemplateBlockPreview( {
		blocks,
		blockContextId,
		isHidden,
		setActiveBlockContextId,
	} ) {
		const blockPreviewProps = useBlockPreview( {
			blocks,
			props: {
				className: classnames( {
					'wp-block-post': true,
				} ),
			},
		} );

		const handleOnClick = () => {
			setActiveBlockContextId( blockContextId );
		};

		const style = {
			display: isHidden ? 'none' : undefined,
		};

		return (
			<div
				{ ...blockPreviewProps }
				tabIndex={ 0 }
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
				role="button"
				onClick={ handleOnClick }
				onKeyPress={ handleOnClick }
				style={ style }
			/>
		);
	}

	const PostTemplateInnerBlocks = () => {
		const innerBlocksProps = useInnerBlocksProps(
			{
				className: classnames( {
					'wp-block-post': true,
				} ),
			},
			{ template: TEMPLATE },
			{ renderAppender: false }
		);
		return <div { ...innerBlocksProps } />;
	};

	const MemoizedPostTemplateBlockPreview = memo( PostTemplateBlockPreview );

	const blockContexts = useMemo(
		() =>
			posts?.map( ( post ) => ( {
				postType: post.type,
				postId: post.id,
			} ) ),
		[ posts ]
	);

	// const catSuggestions = {};
	// if ( categoriesList ) {
	// 	for ( let i = 0; i < categoriesList.length; i++ ) {
	// 		const cat = categoriesList[ i ];
	// 		catSuggestions[ cat.name ] = cat;
	// 	}
	// }

	const levelSuggestions = {};
	if ( levelsList ) {
		for ( let i = 0; i < levelsList.length; i++ ) {
			const level = levelsList[ i ];
			levelSuggestions[ level.name ] = level;
		}
	}

	const durationSuggestions = {};
	if ( durationsList ) {
		for ( let i = 0; i < durationsList.length; i++ ) {
			const duration = durationsList[ i ];
			durationSuggestions[ duration.name ] = duration;
		}
	}

	// const onCategoryChange = ( values ) => {
	// 	const hasNoSuggestions = values.some(
	// 		( value ) => typeof value === 'string' && ! catSuggestions[ value ]
	// 	);
	// 	if ( hasNoSuggestions ) return;

	// 	const updatedCats = values.map( ( token ) => {
	// 		return typeof token === 'string' ? catSuggestions[ token ] : token;
	// 	} );

	// 	setAttributes( { categories: updatedCats } );
	// };

	// const onAreaChange = ( values ) => {
	// 	const hasNoSuggestions = values.some(
	// 		( value ) => typeof value === 'string' && ! areaSuggestions[ value ]
	// 	);
	// 	if ( hasNoSuggestions ) return;

	// 	const updatedAreas = values.map( ( token ) => {
	// 		return typeof token === 'string' ? areaSuggestions[ token ] : token;
	// 	} );

	// 	setAttributes( { areas: updatedAreas } );
	// };

	const onIntensityChange = ( values ) => {
		const hasNoSuggestions = values.some(
			( value ) =>
				typeof value === 'string' && ! intensitySuggestions[ value ]
		);
		if ( hasNoSuggestions ) return;

		const updatedIntensities = values.map( ( token ) => {
			return typeof token === 'string'
				? intensitySuggestions[ token ]
				: token;
		} );

		setAttributes( { intensities: updatedIntensities } );
	};

	const onLevelChange = ( values ) => {
		const hasNoSuggestions = values.some(
			( value ) =>
				typeof value === 'string' && ! levelSuggestions[ value ]
		);
		if ( hasNoSuggestions ) return;

		const updatedLevels = values.map( ( token ) => {
			return typeof token === 'string'
				? levelSuggestions[ token ]
				: token;
		} );

		setAttributes( { levels: updatedLevels } );
	};

	const onDurationChange = ( values ) => {
		const hasNoSuggestions = values.some(
			( value ) =>
				typeof value === 'string' && ! durationSuggestions[ value ]
		);
		if ( hasNoSuggestions ) return;

		const updatedDurations = values.map( ( token ) => {
			return typeof token === 'string'
				? durationSuggestions[ token ]
				: token;
		} );

		setAttributes( { durations: updatedDurations } );
	};

	const blockProps = useBlockProps( {
		className: classnames( {
			swiper: isSlider,
			'lsedup-lesson-list': true,
			isSlider: isSlider,
			'is-flex-container': displayLayout === 'flex' && ! isSlider,
			[ `has-columns-${ columns }` ]:
				displayLayout === 'flex' || isSlider,
			'is-list-container': displayLayout === 'list',
		} ),
	} );

	if ( ! posts ) {
		return (
			<p { ...blockProps }>
				<Spinner />
			</p>
		);
	}

	if ( ! posts.length ) {
		return (
			<p { ...blockProps }>
				{ ' ' }
				{ __( 'No results found.', 'lsedu-plus' ) }
			</p>
		);
	}

	const layoutControls = [
		{
			icon: list,
			title: __( 'List view', 'lsedu-plus' ),
			onClick: () => setAttributes( { displayLayout: 'list' } ),
			isActive: displayLayout === 'list',
		},
		{
			icon: grid,
			title: __( 'Grid view', 'lsedu-plus' ),
			onClick: () => setAttributes( { displayLayout: 'flex' } ),
			isActive: displayLayout === 'flex',
		},
	];

	// console.log( listTitleType );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'lsedu-plus' ) }>
					<ToggleControl
						label={ __( 'Slider', 'lsedu-plus' ) }
						onChange={ () =>
							setAttributes( { isSlider: ! isSlider } )
						}
						help={
							isSlider
								? __( 'List slider on', 'lsedu-plus' )
								: __( 'List slider off', 'lsedu-plus' )
						}
						checked={ isSlider }
					/>
					{ displayLayout === 'flex' && ! isSlider && (
						<RangeControl
							label={ __( 'Columns', 'lsedu-plus' ) }
							min={ 2 }
							max={ 6 }
							onChange={ ( columns ) =>
								setAttributes( { columns } )
							}
							value={ columns }
						/>
					) }
					<QueryControls
						orderBy={ orderBy }
						onOrderByChange={ ( value ) => {
							setAttributes( { orderBy: value } );
						} }
						order={ order }
						onOrderChange={ ( value ) => {
							setAttributes( { order: value } );
						} }
					/>
				</PanelBody>
				<PanelBody>
					<RadioControl
						label={ __( 'Set Title', 'lsedu-plus' ) }
						help={ __( '', 'lsedu-plus' ) }
						selected={ listTitleType }
						options={ [
							{ label: 'Area', value: 'area' },
							{ label: 'Category', value: 'category' },
							{ label: 'Intensity', value: 'intensity' },
							{ label: 'Level', value: 'level' },
							{ label: 'Duration', value: 'duration' },
						] }
						onChange={ ( listTitleType ) =>
							setAttributes( { listTitleType } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Filters', 'ls-studio-blocks' ) }>
					<FilterControls
						label={ __( 'Area', 'lsedu-plus' ) }
						categoriesList={ areasList }
						selectedCategoryId={ area }
						onCategoryChange={ ( area ) =>
							setAttributes( { area } )
						}
					/>
					<FilterControls
						label={ __( 'Category', 'lsedu-plus' ) }
						categoriesList={ categoriesList }
						selectedCategoryId={ category }
						onCategoryChange={ ( category ) =>
							setAttributes( { category } )
						}
					/>
					<FilterControls
						label={ __( 'Intensity', 'lsedu-plus' ) }
						categoriesList={ intensityList }
						selectedCategoryId={ intensity }
						onCategoryChange={ ( intensity ) =>
							setAttributes( { intensity } )
						}
					/>
					<FilterControls
						pluralLabel={ __( 'Levels', 'lsedu-plus' ) }
						categorySuggestions={ levelSuggestions }
						selectedCategories={ levels }
						onCategoryChange={ onLevelChange }
					/>
					<FilterControls
						pluralLabel={ __( 'Durations', 'lsedu-plus' ) }
						categorySuggestions={ durationSuggestions }
						selectedCategories={ durations }
						onCategoryChange={ onDurationChange }
					/>
				</PanelBody>
			</InspectorControls>
			{ ! isSlider && (
				<BlockControls>
					<ToolbarGroup controls={ layoutControls } />
				</BlockControls>
			) }
			<div className="lsedup-lesson-list__container">
				<div className="lsedup-lesson-list__header">
					<RichText
						tagName="h2"
						value={ listTitle }
						withoutInteractiveFormatting={ true }
						onChange={ ( listTitle ) =>
							setAttributes( { listTitle } )
						}
						placeholder={ __( 'List Title', 'lsedu-plus' ) }
					/>
					{ /* <h2 className="lsedup-lesson-list__title">Lifedesign</h2> */ }
					<a className="lsedup-lesson-list__button" href="#">
						See All
					</a>
				</div>
				{ blockContexts && (
					<div { ...blockProps }>
						{ isSlider && (
							<>
								<div className="lsedup-lesson-list__prev"></div>
								<div className="lsedup-lesson-list__next"></div>
							</>
						) }
						{ blockContexts.map( ( blockContext ) => (
							<BlockContextProvider
								key={ blockContext.postId }
								value={ blockContext }
							>
								{ blockContext.postId ===
								( activeBlockContextId ||
									blockContexts[ 0 ]?.postId ) ? (
									<PostTemplateInnerBlocks />
								) : null }
								<MemoizedPostTemplateBlockPreview
									blocks={ blocks }
									blockContextId={ blockContext.postId }
									setActiveBlockContextId={
										setActiveBlockContextId
									}
									isHidden={
										blockContext.postId ===
										( activeBlockContextId ||
											blockContexts[ 0 ]?.postId )
									}
								/>
							</BlockContextProvider>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
