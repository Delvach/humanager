import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HumansVisualizerComponent from '../../visualizations/Humans';

import {
  setVisualContainerSizeAction,
  toggleVisualizationResizeAction
} from '../../../actions/navigation';

class VisualizationWrapper extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      ...props,
      height: 100,
      width: 100,
      initialized: false
    };
  }

  componentDidMount() {
    this.storeDimensions();
  }

  componentDidUpdate() {
    if (this.props.triggerResize) {
      this.props.toggleVisualizationResizeAction(false);
    }
    this.storeDimensions();
  }

  visualizationDimensionsMatchStore(height = null, width = null) {
    if (height === null || width === null) return false;
    return height === this.props.currHeight && width === this.props.currWidth;
  }

  // TODO: This should be handled by a saga that debounces it;
  // otherwise resize event that may trigger this behavior will need to debounce it
  storeDimensions() {
    this.updateStoreWithVisualizationDimensions(
      this.refs.humansVisual.clientHeight,
      this.refs.humansVisual.clientWidth
    );
  }

  updateStoreWithVisualizationDimensions(height = null, width = null) {
    console.log(height, width);
    if (height === null || width === null) return;
    if (!this.visualizationDimensionsMatchStore(height, width)) {
      this.props.setContainerSize({
        height,
        width
      });
    }
  }

  render() {
    return (
      <div
        ref="humansVisual"
        style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
      >
        <HumansVisualizerComponent
          height={this.props.currHeight}
          width={this.props.currWidth}
        />
      </div>
    );
  }
}

VisualizationWrapper.propTypes = {
  currHeight: PropTypes.number,
  currWidth: PropTypes.number
};

VisualizationWrapper.defaultProps = {
  currHeight: 100,
  currWidth: 100
};

const mapStateToProps = ({ navigation, visualizations }) => ({
  currHeight: visualizations.height,
  currWidth: visualizations.width,
  triggerResize: navigation.triggerVisualizationResize
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setContainerSize: setVisualContainerSizeAction,
      toggleVisualizationResizeAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationWrapper);
