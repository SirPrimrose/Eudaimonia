import React from 'react';
import {
  faHeart,
  faPersonRunning,
  faPlay,
  faTriangleCircleSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STAT_NAMES } from './stats';

const getIconForSkillType = () => <FontAwesomeIcon icon={faPersonRunning} />;

const getIconForHealType = (healType) => {
  switch (healType) {
    case STAT_NAMES.HEALTH:
      return <FontAwesomeIcon icon={faHeart} />;
    case STAT_NAMES.MAGIC:
      return <FontAwesomeIcon icon={faPlay} rotation={90} />;
    default:
      return <FontAwesomeIcon icon={faTriangleCircleSquare} />;
  }
};

export { getIconForSkillType, getIconForHealType };
