export default {
  debug: true,
  testing: false,
  enable_test_cardid: true,

  //deployment specific env params
  petabencana: {
    supported_languages: ['en', 'id'],
    default_language: 'en',
    tile_layer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhbTFraDAwNHIyeWw1ZDB6Y2hhbTYifQ.tpgt1PB5lkJ-wITS02c96Q',
    data_server: 'https://data-dev.petabencana.id/',
    app: 'https://dev.petabencana.id/'
  },
  riskmap: {
    supported_languages: ['en', 'tm'],
    default_language: 'en',
    tile_layer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNqMnFraWVzYzAyd24ycXRqMmpvbmhyZ2QifQ.xc_v7umok760t2q6NZK1RA',
    data_server: 'https://data-dev.riskmap.in/',
    app: 'https://dev.riskmap.in/'
  }
};
