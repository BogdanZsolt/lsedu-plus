import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps, InspectorControls} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, ColorPalette } from '@wordpress/components'
import block from './block.json';
import { ReactComponent as Logo } from '../../logo-01.svg'
import './main.css';

registerBlockType(block.name, {
  icon: { src: Logo },
  edit({ attributes, setAttributes }){
    const { content, underline_color } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Colors', 'lsedu-plus')}>
            <ColorPalette
              colors={[
                { name: 'Red', color: '#f87171' },
                { name: 'Indigo', color: '#818cf8' }
              ]}
              value={ underline_color }
              onChange={ (newVal) => setAttributes({underline_color: newVal})}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <RichText
            className="fancy-header"
            tagName="h2"
            placeholder={__("Enter Heading", "lsedu-plus")}
            value={content}
            onChange={(newVal) => setAttributes({ content: newVal })}
            allowedFormats={["core/bold", "core/italic"]}
          />
        </div>
      </>
    );
  },
  save({ attributes }) {
    const { content, underline_color } = attributes;
    const blockProps = useBlockProps.save({
      className: "fancy-header",
      style: {
        'background-image': `
          linear-gradient(transparent, transparent),
          linear-gradient(${underline_color}, ${underline_color})
        `
      }
    });

    return (
      <RichText.Content {...blockProps} tagName="h2" value={content} />
    );
  }
});

