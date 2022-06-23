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
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STAT_IDS } from '../../data/stats';
import { SKILL_IDS } from '../../data/skills';

const getIconForSkillType = (skillId) => {
  switch (skillId) {
    case SKILL_IDS.AGILITY:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.WOODCUTTING:
      return <FontAwesomeIcon icon={faTree} />;
    case SKILL_IDS.FARMING:
      return <FontAwesomeIcon icon={faWheatAwn} />;
    case SKILL_IDS.COMBAT:
      return <FontAwesomeIcon icon={faHandFist} />;
    case SKILL_IDS.FISHING:
      return <FontAwesomeIcon icon={faFish} />;
    default:
      return <FontAwesomeIcon icon={faTriangleCircleSquare} />;
  }
};

const getIconForStatType = (statId) => {
  switch (statId) {
    case STAT_IDS.HEALTH:
      return <FontAwesomeIcon icon={faHeart} />;
    case STAT_IDS.MAGIC:
      return <FontAwesomeIcon icon={faPlay} rotation={90} />;
    case STAT_IDS.WANDER_TIME:
      return <FontAwesomeIcon icon={faBolt} />;
    default:
      return <FontAwesomeIcon icon={faTriangleCircleSquare} />;
  }
};

export { getIconForSkillType, getIconForStatType };
