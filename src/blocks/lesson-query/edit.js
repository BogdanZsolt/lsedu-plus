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
import FilterControls from '../tools/filter-controls';
import { usePostTypes } from '../tools/utils';

const TEMPLATE = [
	['lsedu-plus/lesson-list-header', {}],
	['lsedu-plus/lesson-list', {}],
];

// Edit

export default function Edit(props) {
	const { attributes, setAttributes, context } = props;
	const { postType, orderBy, order, inherit, setTaxonomy } = attributes;
	const { postTypesTaxonomiesMap, postTypesSelectOptions } = usePostTypes();

	const { taxList } = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			return {
				taxList: getEntityRecords('taxonomy', setTaxonomy.taxType, {
					per_page: -1,
					context: 'view',
				}),
			};
		},
		[setTaxonomy]
	);

	const blockProps = useBlockProps({
		className: classnames('lsedup-lesson-list__container'),
	});

	const taxonomyTypesSelectOptions = () =>
		(postTypesTaxonomiesMap[postType] || []).map(
			(tax) => ({
				label: tax,
				value: tax,
			}),
			[postTypesTaxonomiesMap]
		);

	const onTaxTypeChange = (value) => {
		const tempObj = { ...setTaxonomy };
		tempObj.taxType = value;
		setAttributes({ setTaxonomy: tempObj });
	};

	const onTaxChange = (value) => {
		const tempObj = { ...setTaxonomy };
		tempObj.taxSelect = value;
		setAttributes({ setTaxonomy: tempObj });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'lsedu-plus')}>
					<ToggleControl
						label={__('Inherit query from template', 'lsedu-plus')}
						help={__(
							'Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently.'
						)}
						checked={inherit}
						onChange={(value) =>
							setAttributes({ inherit: !!value })
						}
					/>
					{!inherit && (
						<>
							{postTypesSelectOptions && (
								<SelectControl
									label={__('Post type', 'lsedu-plus')}
									value={postType}
									options={postTypesSelectOptions}
									onChange={(postType) =>
										setAttributes({ postType })
									}
									help={__(
										'WordPress contains different types of content and they are divided into collections called “Post types”. By default there are a few different ones such as blog posts and pages, but plugins could add more.',
										'lsedu-plus'
									)}
								/>
							)}
							<QueryControls
								orderBy={orderBy}
								onOrderByChange={(orderBy) => {
									setAttributes({ orderBy });
								}}
								order={order}
								onOrderChange={(order) => {
									setAttributes({ order });
								}}
							/>
						</>
					)}
				</PanelBody>
				{!inherit && (
					<PanelBody title={__('Filters', 'ls-studio-blocks')}>
						{postTypesTaxonomiesMap && (
							<SelectControl
								label={__('Taxonomy', 'lsedu-plus')}
								options={taxonomyTypesSelectOptions()}
								value={setTaxonomy.taxType}
								onChange={onTaxTypeChange}
								help={__(
									'WordPress contains different types of content and they are divided into collections called “Post types”. By default there are a few different ones such as blog posts and pages, but plugins could add more.',
									'lsedu-plus'
								)}
							/>
						)}
						{taxList && (
							<FilterControls
								label={setTaxonomy.taxType}
								categoriesList={taxList}
								selectedCategoryId={setTaxonomy.taxSelect}
								onCategoryChange={onTaxChange}
							/>
						)}
					</PanelBody>
				)}
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks template={TEMPLATE} orientation="horizontal" />
			</div>
		</>
	);
}
