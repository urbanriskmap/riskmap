export default {
  name: 'petabencana',
  height_units: 'cm',
  supported_languages: [
    {key: 'en', name: 'English'},
    {key: 'id', name: 'Bahasa'}
  ],
  map: {
    'instance_regions': {
      'jakarta': {
        'region': 'jbd',
        'bounds': {
          'sw': [-6.733, 106.480],
          'ne': [-5.880, 107.175]
        }
      },
      'Samarang': {
        'region': 'jbd',
        'bounds': {
          'sw': [-6.733, 106.480],
          'ne': [-5.880, 107.175]
        }
      },
      'Semarang': {
        'region': 'srg',
        'bounds': {
          'sw': [-7.33525, 110.057],
          'ne': [-6.72701, 110.715]
        }
      },
      'bandung': {
        'region': 'bdg',
        'bounds': {
          'sw': [-7.165, 107.369],
          'ne': [-6.668, 107.931]
        }
      }
    },
    'default_region': {
      'region': 'java',
      'bounds': {
        'sw': [-10.293, 104.677],
        'ne': [-3.974, 115.290]
      }
    },
    'region_center': [-7, 110],
    'start_city_center': [-6.1754, 106.8271],
    'starting_zoom': 8,
    'minimum_zoom': 8
  }
};
