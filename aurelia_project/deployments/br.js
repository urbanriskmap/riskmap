export default {
  name: 'riskmap_us',
  height_units: 'in',
  supported_languages: [
    {key: 'en', name: 'English'},
    {key: 'es', name: 'Espaniol'}
  ],
  map: {
    'instance_regions': {
      'broward': {
        'region': 'brw',
        'bounds': {
          'sw': [25.83, -80.80],
          'ne': [26.44, -79.60]
        }
      }
    },
    'default_region': {
      'region': 'south_east_florida',
      'bounds': {
        'sw': [25.35, -81.73], //old coordinates 25.948143, -80.477974
        'ne': [26.95, -78.45] //old coordinates 26.372556, -80.056669
      }
    },
    'region_center': [26.138301, -80.199261],
    'start_city_center': [26.138301, -80.199261],
    'starting_zoom': 8,
    'minimum_zoom': 11
  }
};
