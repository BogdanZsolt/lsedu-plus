import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';
import block from './block.json';
import { ReactComponent as Logo } from '../../logo-01.svg';
import './main.scss';

registerBlockType(block.name, {
	icon: { src: Logo },
	edit: Edit,
	save: save,
});
