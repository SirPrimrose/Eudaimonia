import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import firePreset from './presets/fire.json';

class ParticlesWrapper extends React.PureComponent {
  particlesInit = async (main) => {
    await loadFull(main);
  };

  render() {
    return (
      <Particles
        id="particles"
        init={this.particlesInit}
        options={firePreset}
      />
    );
  }
}

export default ParticlesWrapper;
