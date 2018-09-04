import React from 'react';
import PropTypes from 'prop-types';

export const Logo = ({ fill1, fill2, height, width, marginRight }) => {
  return (
    <div style={{ height, width, display: 'inline-block', marginRight }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54">
        <defs>
          <style>{`.cls-1{fill:${fill1};}.cls-2{fill:${fill2};}`}</style>
        </defs>
        <title>logo</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <circle className="cls-1" cx="27" cy="27" r="27" />
            <path
              className="cls-2"
              d="M38.11,22.86a12,12,0,1,0-22.22,0A12,12,0,0,0,12,45.06V34.67a6,6,0,0,1,12,0V45.06a12.29,12.29,0,0,0,3-2.46,12.29,12.29,0,0,0,3,2.46V34.67a6,6,0,0,1,12,0V45.06a12,12,0,0,0-3.89-22.2ZM27,26.73A12,12,0,0,0,21,23V18.33a6,6,0,0,1,12,0V23A12,12,0,0,0,27,26.73Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

Logo.propTypes = {
  fill1: PropTypes.string,
  fill2: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  marginRight: PropTypes.number
};

Logo.defaultProps = {
  fill1: '#5d00b5',
  fill2: '#7971d0',
  height: 32,
  width: 32,
  marginRight: 10
};

export default Logo;
