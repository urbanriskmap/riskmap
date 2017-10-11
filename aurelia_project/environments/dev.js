export default {
  debug: true,
  testing: true,
  report_timeperiod: 604800,
  //deployment specific env params
  riskmap_us: {
    title: 'RiskMap.us',
    supported_languages: [
      {key: 'en', name: 'English'},
      {key: 'es', name: 'Espaniol'}
    ],
    default_language: 'en',
    tile_layer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNqMnFraWVzYzAyd24ycXRqMmpvbmhyZ2QifQ.xc_v7umok760t2q6NZK1RA',
    data_server: 'https://data-dev.riskmap.us/',
    app: 'https://broward-dev.riskmap.us/',
    deep_links: [
      {name: 'facebook', link: 'http://m.me/CognicityDev_us'},
      //TODO after the twitter dev bot is registered
      {name: 'twitter', link: 'https://twitter.com/messages/compose?recipient_id=905602080252977152&welcome_message_id=905919155492331523&text=/flood'}/*,
      //Disable telegram button for US deployment
      {name: 'telegram', link: 'https://telegram.me/CognicityUS_bot'}*/
    ]
  },
  petabencana: {
    title: 'Petabencana.id',
    supported_languages: [
      {key: 'en', name: 'English'},
      {key: 'id', name: 'Bahasa'}
    ],
    default_language: 'en',
    tile_layer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhbTFraDAwNHIyeWw1ZDB6Y2hhbTYifQ.tpgt1PB5lkJ-wITS02c96Q',
    data_server: 'https://data-dev.petabencana.id/',
    app: 'https://dev.petabencana.id/',
    deep_links: [
      {name: 'facebook', link: 'https://www.facebook.com/petabencana.id/'},
      {name: 'twitter', link: 'https://twitter.com/intent/tweet?text=Report+flood&via=petabencana'}, //TODO : fill after twitter DM bot is created for Petabencana.
      {name: 'telegram', link: 'https://telegram.me/CognicityDevBot'}
    ]
  },
  riskmap_in: {
    title: 'RiskMap.in',
    supported_languages: [
      {key: 'en', name: 'English'},
      {key: 'tm', name: 'Tamil'},
      {key: 'ka', name: 'Kannada'},
      {key: 'mh', name: 'Marathi'}
    ],
    default_language: 'en',
    tile_layer: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNqMnFraWVzYzAyd24ycXRqMmpvbmhyZ2QifQ.xc_v7umok760t2q6NZK1RA',
    data_server: 'https://data-dev.riskmap.in/',
    app: 'https://dev.riskmap.in/',
    deep_links: [
      {name: 'facebook', link: 'http://m.me/CognicityDev_india'},
      {name: 'twitter', link: 'https://twitter.com/intent/tweet?text=Report+flood&via=CognicityDev_IN'},
      {name: 'telegram', link: 'https://telegram.me/CognicityIN_bot'}
    ]
  }
};
