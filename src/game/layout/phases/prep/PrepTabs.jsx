import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCity,
  faFire,
  faSkull,
  faTowerObservation,
} from '@fortawesome/free-solid-svg-icons';
import { PREP_TAB_IDS } from '../../../data/prepTabs';
import CampfireTab from './CampfireTab';
import DeathTab from './DeathTab';

const PREP_TAB_COMPONENTS = {
  [PREP_TAB_IDS.LIFE_SUMMARY]: {
    label: 'Life Summary',
    icon: <FontAwesomeIcon icon={faSkull} />,
    component: <DeathTab />,
  },
  [PREP_TAB_IDS.SOUL_UPGRADES]: {
    label: 'Campfire',
    icon: <FontAwesomeIcon icon={faFire} />,
    component: <CampfireTab />,
  },
  [PREP_TAB_IDS.RESOURCE_UPGRADES]: {
    label: 'Town',
    icon: <FontAwesomeIcon icon={faCity} />,
    component: <DeathTab />,
  },
  [PREP_TAB_IDS.EPIC_UPGRADES]: {
    label: 'Monuments',
    icon: <FontAwesomeIcon icon={faTowerObservation} />,
    component: <DeathTab />,
  },
};

export default PREP_TAB_COMPONENTS;
