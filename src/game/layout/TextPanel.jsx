import React from 'react';
import PropTypes from 'prop-types';

class TextPanel extends React.PureComponent {
  getMessageLayout = (messages) =>
    messages.map((message) => <div key={message}>{message}</div>);

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
  messages: PropTypes.arrayOf(PropTypes.string),
};

TextPanel.defaultProps = {
  messages: [
    'aaaaaaaaa',
    'bbbbbbb',
    'cccccccccc',
    'ddddddddd',
    'eeeeeee',
    'fefffffffffff',
    'gffgggggggg',
    'hgghhhhhhhhhhhh',
    'iiiiiiiii',
    'jjjjjjjj',
    'jkkkkkkkk',
    'kklllllll',
    'mmmmmmmmm',
    'nnnnnnnn',
    'nkooooo',
    'ppppppppp',
    'qqqqqqq',
    'rrrrrrrrr',
    'srssssssss',
    'tttttttt',
    'utuuuuuuuuu',
  ],
};

export default TextPanel;
