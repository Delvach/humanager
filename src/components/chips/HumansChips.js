import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const HumansChips = ({ humans, memberIds }) => {
  const chips = humans.filter(({ id }) => memberIds.indexOf(id) > -1);

  return (
    <div>
      {chips.map(({ name, id, avatar }) => (
        <Chip
          key={`chip-${id}`}
          label={name}
          avatar={<Avatar src={avatar} />}
        />
      ))}
    </div>
  );
};

HumansChips.propTypes = {
  humans: PropTypes.array,
  memberIds: PropTypes.array
};

HumansChips.defaultProps = {
  humans: [],
  memberIds: []
};

const mapStateToProps = ({ humans }) => ({ humans });

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumansChips);
