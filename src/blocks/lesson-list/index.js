import { registerBlockType } from '@wordpress/blocks';
import './main.scss';
import Edit from './edit';
import Save from './save';
import block from './block.json';

import { ReactComponent as Logo } from '../../logo-01.svg';

registerBlockType( block.name, {
	icon: { src: Logo },
	edit: Edit,
	save: Save,
} );
