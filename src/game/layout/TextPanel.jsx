import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Stack, Typography } from '@mui/material';
import { getTextLogMessages } from '../../slice/textLogSlice';

class TextPanel extends React.PureComponent {
  getMessageLayout = (messages) =>
    messages.map((message) => (
      <Typography
        variant="body2"
        className="message"
        key={message.listId}
        pb={1}
      >
        {message.text}
      </Typography>
    ));

  render() {
    const { messages } = this.props;
    return (
      <Container className="textPanel" disableGutters sx={{ p: 1 }}>
        <Stack direction="column-reverse">
          {this.getMessageLayout(messages)}
        </Stack>
      </Container>
    );
  }
}

TextPanel.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      listId: PropTypes.string.isRequired,
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
