export default {
  name: 'riskmap_in',
  height_units: 'cm',
  supported_languages: [
    {key: 'en', name: 'English'},
    // {key: 'kn', name: 'Kannada'},
    // {key: 'mr', name: 'Marathi'},
    {key: 'ta', name: 'Tamil'}
  ],
  map: {
    'instance_regions': {
      // 'mumbai': {
      //   'region': 'mum',
      //   'bounds': { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
      //     'sw': [18.8600, 72.7036],
      //     'ne': [19.2975, 73.0953]
      //   }
      // },
      // 'bangalore': {
      //   'region': 'blr',
      //   'bounds': { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
      //     'sw': [12.7626, 77.3649],
      //     'ne': [13.2001, 77.8663]
      //   }
      // },
      'chennai': {
        'region': 'chn',
        'bounds': { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
          'sw': [12.6884, 79.9248],
          'ne': [13.3766, 80.5413]
        }
      }
    },
    'default_region': {
      'region': 'chn',
      'bounds': {
        'sw': [12.6884, 79.9248],
        'ne': [13.3766, 80.5413]
      }
    },
    'region_center': [13.017163, 80.185031],
    'start_city_center': [13.017163, 80.185031],
    'starting_zoom': 10,
    'minimum_zoom': 10
  }
};
