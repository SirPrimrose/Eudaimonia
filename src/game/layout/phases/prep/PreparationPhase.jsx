import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCity,
  faFire,
  faSkull,
  faTowerObservation,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Stack } from '@mui/material';
import VerticalTabs from '../../../../shared/VerticalTabs';
import DeathTab from './DeathTab';
import CampfireTab from './CampfireTab';

const tabs = [
  {
    label: 'Life Summary',
    icon: <FontAwesomeIcon icon={faSkull} />,
    component: <DeathTab />,
  },
  {
    label: 'Campfire',
    icon: <FontAwesomeIcon icon={faFire} />,
    component: <CampfireTab />,
  },
  {
    label: 'Town',
    icon: <FontAwesomeIcon icon={faCity} />,
    component: <DeathTab />,
  },
  {
    label: 'Monuments',
    icon: <FontAwesomeIcon icon={faTowerObservation} />,
    component: <DeathTab />,
  },
];

class PreparationPhase extends React.PureComponent {
  render() {
    // TODO: Update layout to match design...
    // TODO: Side menu showing different prep phase locations
    // TODO: "Campfire" for spending Soul on permanent upgrades
    // TODO: "Town" for getting quests
    // TODO: "Monuments" for spending items gained from travelling
    return <VerticalTabs tabs={tabs} />;
  }
}

export default PreparationPhase;
