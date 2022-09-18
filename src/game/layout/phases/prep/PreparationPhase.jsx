import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VerticalTabs from '../../../../shared/VerticalTabs';
import PREP_TAB_COMPONENTS from './PrepTabs';
import { getPrepTabs } from '../../../../slice/gameSlice';

class PreparationPhase extends React.PureComponent {
  constructor(props) {
    super(props);
    const { prepTabs } = this.props;

    this.state = {
      activeTabs: this.getActiveTabs(prepTabs),
    };
  }

  componentDidUpdate(prevProps) {
    const { prepTabs } = this.props;
    if (prepTabs !== prevProps.prepTabs) {
      this.setState(() => ({
        activeTabs: this.getActiveTabs(prepTabs),
      }));
    }
  }

  getActiveTabs = (prepTabs) =>
    Object.values(prepTabs)
      .filter((pt) => pt.isActive)
      .map((pt) => PREP_TAB_COMPONENTS[pt.id]);

  render() {
    const { activeTabs } = this.state;
    // TODO: Update layout to match design...
    // TODO: Side menu showing different prep phase locations
    // TODO: "Campfire" for spending Soul on permanent upgrades
    // TODO: "Town" for getting quests
    // TODO: "Monuments" for spending items gained from travelling
    return <VerticalTabs tabs={activeTabs} />;
  }
}

PreparationPhase.propTypes = {
  prepTabs: PropTypes.objectOf(
    PropTypes.shape({
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  prepTabs: getPrepTabs(state),
});

export default connect(mapStateToProps)(PreparationPhase);
