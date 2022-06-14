// @author Joshua Primm
import _ from 'lodash';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './CircularDisplay.scss';

// Uncomment below function if not using lodash
/* function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
} */

function CircularDisplay(props) {
  const { children } = props;
  const graph = useRef(null);

  const [, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const debouncedHandleResize = _.debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 5);

    const ciclegraph = graph.current;
    const circleElements = ciclegraph.childNodes;

    let angle = 360 - 90;
    const dangle = 360 / circleElements.length;

    for (let i = 0; i < circleElements.length; i++) {
      const circle = circleElements[i];
      circle.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${
        ciclegraph.clientWidth / 2
      }px) rotate(-${angle}deg)`;
      angle += dangle;
    }

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  return (
    <div className="ciclegraph" ref={graph}>
      {children}
    </div>
  );
}

CircularDisplay.propTypes = {
  children: PropTypes.node,
};

CircularDisplay.defaultProps = {
  children: null,
};

export default CircularDisplay;
