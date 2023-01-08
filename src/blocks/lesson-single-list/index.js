import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import block from './block.json';
import Edit from './edit';
import { ReactComponent as Logo } from '../../logo-01.svg';
import './main.scss';

registerBlockType(block.name, {
	icon: { src: Logo },
	edit: Edit,
});
