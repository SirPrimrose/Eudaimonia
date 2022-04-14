import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTextLogMessages } from '../../slice/textLogSlice';

class TextPanel extends React.PureComponent {
  getMessageLayout = (messages) =>
    messages.map((message) => <div key={message.id}>{message.text}</div>);

  render() {
    const { messages } = this.props;
    return (
      <div className="textPanel" style={{ height: '100%' }}>
        {this.getMessageLayout(messages)}
      </div>
    );
  }
}

TextPanel.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

TextPanel.defaultProps = {
  messages: [],
};

const mapStateToProps = (state) => ({
  messages: getTextLogMessages(state),
});

export default connect(mapStateToProps)(TextPanel);
