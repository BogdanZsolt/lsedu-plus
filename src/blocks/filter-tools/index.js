import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from '@wordpress/components'
import { __ } from "@wordpress/i18n";
import { ReactComponent as Logo } from "../../logo-01.svg";
import block from "./block.json";
import "./main.scss";

registerBlockType(block.name, {
  icon: { src: Logo },
  edit({ attributes, setAttributes }) {
    const { showFiltersToolbar, bgColor, textColor } = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("General", "lsedu-plus")}>
            <ToggleControl
              label={__("Show Filter Button", "lsedu-plus")}
              help={
                showFiltersToolbar
                  ? __("Show Filters Button", "lsedu-plus")
                  : __("Hiding Filters Button", "lsedu-plus")
              }
              checked={showFiltersToolbar}
              onChange={(showFiltersToolbar) =>
                setAttributes({ showFiltersToolbar })
              }
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          {showFiltersToolbar && (
            <a className="filter-button open-select" type="button">
              {__("Filters", "lsedu-plus")}
            </a>
          )}
        </div>
      </>
    );
  },
});
