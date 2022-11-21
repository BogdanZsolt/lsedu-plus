import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import './main.scss';
import block from './block.json';

// Import the logo
import { ReactComponent as Logo } from '../../logo-01.svg';

registerBlockType( block.name, {
	icon: { src: Logo },
	edit() {
		const blockProps = useBlockProps( {
			className: classnames( 'lsedup-lesson-list__header' ),
		} );
		const TEMPLATE = [ [ 'lsedu-plus/lesson-list-header-title', {} ] ];

		// console.log( listTitle );

		return (
			<div { ...blockProps }>
				<InnerBlocks template={ TEMPLATE } orientation="vertical" />
			</div>
		);
	},
	save() {
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
