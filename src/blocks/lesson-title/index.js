import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';
import Edit from './edit';
import block from './block.json';

// Import the logo
import { ReactComponent as Logo } from '../../logo-01.svg';

registerBlockType( block.name, {
	icon: { src: Logo },
	edit: Edit,
	save: () => {
		return null;
	},
} );
