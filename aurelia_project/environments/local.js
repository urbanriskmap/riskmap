export default {
  debug: true,
  testing: true,
  enable_test_cardid: true,

  //deployment specific env params
  petabencana: {
    supported_languages: ['en', 'id'],
    default_language: 'en',
    tile_layer: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}',
    data_server: 'http://localhost:8001/',
    app: 'http://localhost:9000/'
  },
  riskmap: {
    supported_languages: ['en', 'tm'],
    default_language: 'en',
    tile_layer: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}',
    data_server: 'http://localhost:8001/',
    app: 'http://localhost:9000/'
  }
};
