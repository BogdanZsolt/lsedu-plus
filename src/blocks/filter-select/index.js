import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { ReactComponent as Logo } from "../../logo-01.svg";
import block from "./block.json";
import "./main.scss";

registerBlockType(block.name, {
  icon: { src: Logo },
  edit({ attributes, setAttributes }) {
		const {hidingFilterToolbar} = attributes;
    const blockProps = useBlockProps();

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("general", "lsedu-plus")}>
            <ToggleControl
							label={__("Hiding Select Filter")}
							help={
								hidingFilterToolbar ?
								__('Hiding select filter toolbar', 'lsedu-plus') :
								__('Showing select filter toolbar', 'lsedu-plus')
							}
							checked={hidingFilterToolbar}
							onChange={hidingFilterToolbar => setAttributes({ hidingFilterToolbar })}
						/>
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div id="filter-container" className="filter-container">
            <div className="filter">
              <label for="area">Area</label>
              <div className="select">
                <select id="area">
                  <option value="all">All</option>
                  <option value="lifedesign">Lifedesign</option>
                  <option value="holistic_health">Holistic health</option>
                  <option value="earthpuzzle">Earthpuzzle</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <label for="category">Category</label>
              <div className="select">
                <select id="category">
                  <option value="all">All</option>
                  <option value="new_classes">New Classes</option>
                  <option value="metamorphosis">Metamorphosis</option>
                  <option value="programs">Programs</option>
                  <option value="workshops">Workshops</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <label for="author">Author</label>
              <div className="select">
                <select name="author" id="author">
                  <option value="all">All</option>
                  <option value="petra">Petra</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <label for="intensity">Intensity</label>
              <div className="select">
                <select name="intensity" id="intensity">
                  <option value="all">All</option>
                  <option value="flaming_hot">Flaming Hot</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="relaxing">Relaxing</option>
                  <option value="spicy">Spicy</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <label for="level">Level</label>
              <div className="select">
                <select name="level" id="level">
                  <option value="all">All</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advenced">Advenced</option>
                  <option value="for_all_level">For All Levels</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <label for="duration">Duration</label>
              <div className="select">
                <select name="duration" id="duration">
                  <option value="all">All</option>
                  <option value="10_to_20_mins">10 to 20 mins</option>
                  <option value="20_to_30_mins">20 to 30 mins</option>
                  <option value="30_to_45_mins">30 to 45 mins</option>
                  <option value="45_to_60_mins">45 to 60 mins</option>
                  <option value="60_to_90_mins">60 to 90 mins</option>
                  <option value="over_90_mins">Over 90 mins</option>
                  <option value="up_to_10_mins">Up to 10 mins</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
});
