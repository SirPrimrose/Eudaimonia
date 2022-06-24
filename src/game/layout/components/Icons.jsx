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
  faGem,
  faChevronDown,
  faCircle,
  faCheck,
  faScaleBalanced,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STAT_IDS } from '../../data/stats';
import { SKILL_IDS } from '../../data/skills';
import { Box } from '@mui/material';

const getIconForSkillType = (skillId) => {
  switch (skillId) {
    case SKILL_IDS.COMBAT:
      return <FontAwesomeIcon icon={faHandFist} />;
    case SKILL_IDS.MINING:
      return <FontAwesomeIcon icon={faGem} />;
    case SKILL_IDS.WOODCUTTING:
      return <FontAwesomeIcon icon={faTree} />;
    case SKILL_IDS.FARMING:
      return <FontAwesomeIcon icon={faWheatAwn} />;
    case SKILL_IDS.FISHING:
      return <FontAwesomeIcon icon={faFish} />;
    case SKILL_IDS.SMITHING:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faChevronDown} size="lg" />
          <FontAwesomeIcon icon={faCircle} size="lg" />
        </span>
      );
    case SKILL_IDS.CRAFTING:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.COOKING:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.BREWING:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.ARTIFICE:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.ATHLETICS:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.CONSTRUCTION:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.RITUAL:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    case SKILL_IDS.ORDER:
      return <FontAwesomeIcon icon={faScaleBalanced} />;
    case SKILL_IDS.CHAOS:
      return <FontAwesomeIcon icon={faPersonRunning} />;
    /* Example for layering
    case SKILL_IDS.ORDER:
    return (
      <Box
        component="span"
        className="fa-layers fa-fw"
        sx={{ '--fa-inverse': (theme) => theme.palette.background.default }}
      >
        <FontAwesomeIcon icon={faCircle} transform="grow-3" />
        <FontAwesomeIcon icon={faChevronDown} transform="shrink-6" inverse />
      </Box>
    ); */
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
