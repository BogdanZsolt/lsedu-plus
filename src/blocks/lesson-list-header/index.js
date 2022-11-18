import { registerBlockType } from '@wordpress/blocks';
import './main.scss';
import block from './block.json';

// Import the logo
import { ReactComponent as Logo } from '../../logo-01.svg';

registerBlockType( block.name, {
	icon: { src: Logo },
	edit( { attributes, setAttributes, context } ) {
		const { title, link } = attributes;
		const { postId, postType, listTitleType } = context;
		console.log( context );
		return <h2>Hello</h2>;
	},
} );
