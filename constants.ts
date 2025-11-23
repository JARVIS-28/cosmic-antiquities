import { MuseumCollection } from './types';

export const COLLECTIONS: MuseumCollection[] = [
  {
    id: 'lost_missions',
    label: 'Lost Missions',
    query: 'spacecraft crash site debris',
    description: 'The final resting places of human ambition. Probes that went silent, crash sites on alien worlds, and the remnants of exploration.'
  },
  {
    id: 'planetary_ghosts',
    label: 'Planetary Ghosts',
    query: 'planetary nebula',
    description: 'The glowing shrouds of dying stars. Ethereal structures that mark the end of stellar life cycles.'
  },
  {
    id: 'ancient_light',
    label: 'Ancient Light',
    query: 'deep field galaxies',
    description: 'Photons that have traveled for billions of years. A glimpse into the primordial universe.'
  },
  {
    id: 'human_debris',
    label: 'Orbital Artifacts',
    query: 'space station history',
    description: 'Documentation of our early permanent presence in the void.'
  }
];