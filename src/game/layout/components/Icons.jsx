import React from 'react';
import {
  faFish,
  faHandFist,
  faHeart,
  faPersonRunning,
  faPlay,
  faTree,
  faTriangleCircleSquare,
  faWheatAwn,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STAT_NAMES } from '../../data/stats';
import { SKILL_NAMES } from '../../data/skills';

const getIconForSkillType = (skillName) => {
  switch (skillName) {
    case SKILL_NAMES.AGILITY:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_NAMES.WOODCUTTING:
      return <FontAwesomeIcon icon={faTree} />;
    case SKILL_NAMES.FARMING:
      return <FontAwesomeIcon icon={faWheatAwn} />;
    case SKILL_NAMES.COMBAT:
      return <FontAwesomeIcon icon={faHandFist} />;
    case SKILL_NAMES.FISHING:
      return <FontAwesomeIcon icon={faFish} />;
    default:
      return <FontAwesomeIcon icon={faTriangleCircleSquare} />;
  }
};

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