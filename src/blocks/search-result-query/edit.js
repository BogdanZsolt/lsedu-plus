import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, QueryControls, SelectControl } from '@wordpress/components';
import classnames from 'classnames';
import { usePostTypes } from '../tools/utils';

const TEMPLATE = [['lsedu-plus/search-result-list', {}]];

// Edit

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { postType, orderBy, order } = attributes;
	const { postTypesSelectOptions } = usePostTypes();

	const blockProps = useBlockProps({
		className: classnames('lsedup-search-result-list__container'),
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'lsedu-plus')}>
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
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks template={TEMPLATE} orientation="horizontal" />
			</div>
		</>
	);
}
