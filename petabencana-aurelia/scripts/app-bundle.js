define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Petabencana.id';

      config.map([{ route: 'map', moduleId: 'routes/map/map' }, { route: 'map/:city', moduleId: 'routes/map/map' }, { route: 'cards/:id', moduleId: 'routes/cards/cards' }]);
      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'i18next-xhr-backend'], function (exports, _environment, _i18nextXhrBackend) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.use.plugin('aurelia-i18n', function (instance) {
      instance.i18next.use(_i18nextXhrBackend2.default);
      return instance.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json'
        },
        lng: 'en',
        attributes: ['t', 'i18n'],
        fallbackLng: 'id',
        debug: true
      });
    });

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/depth-slider/depth-slider',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DepthSlider = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DepthSlider = exports.DepthSlider = (_dec = (0, _aureliaFramework.customElement)('depth-slider'), _dec(_class = function DepthSlider() {
    _classCallCheck(this, DepthSlider);
  }) || _class);
});
define('components/text-box/text-box',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DescriptionBox = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var DescriptionBox = exports.DescriptionBox = (_dec = (0, _aureliaFramework.customElement)('description-box'), _dec2 = (0, _aureliaFramework.observable)({ changeHandler: 'textChanged' }), _dec(_class = (_class2 = function () {
    function DescriptionBox() {
      _classCallCheck(this, DescriptionBox);

      _initDefineProp(this, 'exportText', _descriptor, this);

      _initDefineProp(this, 'inputText', _descriptor2, this);

      this.charLength = 0;
    }

    DescriptionBox.prototype.clearHint = function clearHint() {
      if (this.charLength === 0) {
        this.inputText = '';
      }
    };

    DescriptionBox.prototype.textChanged = function textChanged() {
      this.charLength = this.inputText.length;
      this.exportText = this.inputText;
    };

    return DescriptionBox;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'exportText', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'inputText', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
      return 'Enter text here...';
    }
  })), _class2)) || _class);
});
define('routes/cards/cards',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-i18n', 'jquery'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaI18n, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cards = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Cards = exports.Cards = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaI18n.I18N), _dec(_class = function () {
    function Cards(ea, i18n) {
      _classCallCheck(this, Cards);

      this.ea = ea;
      this.i18n = i18n;
    }

    Cards.prototype.configureRouter = function configureRouter(config, router) {
      config.title = this.i18n.tr('page_title');
      config.map([{ route: '', redirect: 'location' }, { route: 'location', moduleId: './location/location', settings: { title: this.i18n.tr('location_title'), cardNo: 1, msgName: 'changedLocation' } }, { route: 'depth', moduleId: './depth/depth', settings: { title: this.i18n.tr('depth_title'), cardNo: 2, msgName: 'changedDepth' } }, { route: 'photo', moduleId: './photo/photo', settings: { title: this.i18n.tr('photo_title'), cardNo: 3, msgName: 'changedPhoto' } }, { route: 'description', moduleId: './description/description', settings: { title: this.i18n.tr('description_title'), cardNo: 4, msgName: 'changedDescription' } }, { route: 'review', moduleId: './review/review', settings: { title: this.i18n.tr('review_title'), cardNo: 5, msgName: 'changedInputs' } }, { route: 'terms', moduleId: './terms/terms', settings: { title: this.i18n.tr('terms_title'), cardNo: 6 } }, { route: 'thanks', moduleId: './thanks/thanks', settings: { title: this.i18n.tr('thanks_title'), cardNo: 7 } }]);
      this.router = router;
    };

    Cards.prototype.activate = function activate(params) {
      this.id = params.id;
    };

    Cards.prototype.attached = function attached() {
      var _this = this;

      this.ccHeight = (0, _jquery2.default)(window).height() - ((0, _jquery2.default)('#cardTitle').height() + (0, _jquery2.default)('#cardNavigation').height());
      this.totalCards = this.router.routes.length - 1;
      this.tabCount = [];
      for (var i = 0; i < this.totalCards - 2; i += 1) {
        this.tabCount[i] = i;
      }
      this.ea.subscribe(this.router.routes[1].settings.msgName, function (msg) {
        _this.router.routes[1].settings.input = msg;
        _this.router.routes[5].settings.location = msg;
      });
      this.ea.subscribe(this.router.routes[2].settings.msgName, function (msg) {
        _this.router.routes[2].settings.input = msg;
        _this.router.routes[5].settings.depth = msg;
      });
      this.ea.subscribe(this.router.routes[3].settings.msgName, function (msg) {
        _this.router.routes[3].settings.input = msg;
        _this.router.routes[5].settings.photo = msg;
      });
      this.ea.subscribe(this.router.routes[4].settings.msgName, function (msg) {
        _this.router.routes[4].settings.input = msg;
        _this.router.routes[5].settings.description = msg;
      });
    };

    Cards.prototype.nextCard = function nextCard() {
      if (this.cardNo < this.totalCards) {
        this.count = 1;
        this.router.navigate(this.router.routes[this.cardNo].route);
      }
    };

    Cards.prototype.prevCard = function prevCard() {
      if (this.cardNo > 1) {
        this.count = -1;
        this.router.navigate(this.router.routes[this.cardNo].route);
      }
    };

    _createClass(Cards, [{
      key: 'count',
      get: function get() {
        this.cardNo = this.router.currentInstruction.config.settings.cardNo;
        return this.cardNo;
      },
      set: function set(val) {
        this.cardNo = this.count + val;
      }
    }, {
      key: 'titleString',
      get: function get() {
        return this.router.currentInstruction.config.settings.title;
      }
    }, {
      key: 'nextDisabled',
      get: function get() {
        return this.cardNo >= this.totalCards - 2;
      }
    }, {
      key: 'prevDisabled',
      get: function get() {
        return this.cardNo === 1 || this.cardNo === 7;
      }
    }]);

    return Cards;
  }()) || _class);
});
define('routes/map/config',["module"], function (module) {
  "use strict";

  var config = {
    "instance_regions": {
      "jakarta": {
        "name": "Jakarta",
        "region": "jbd",
        "bounds": {
          "sw": [-6.733, 106.480],
          "ne": [-5.880, 107.175]
        },
        "layers": []
      },
      "surbaya": {
        "name": "Surbaya",
        "region": "sby",
        "bounds": {
          "sw": [-7.5499, 112.3975],
          "ne": [-7.0143, 113.0318]
        },
        "layers": null
      },
      "bandung": {
        "name": "Bandung",
        "region": "bdg",
        "bounds": {
          "sw": [-7.165, 107.369],
          "ne": [-6.668, 107.931]
        },
        "layers": []
      }
    }
  };

  module.exports = config;
});
define('routes/map/data',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Data = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var client = new _aureliaFetchClient.HttpClient();

  var Data = exports.Data = function () {
    function Data() {
      _classCallCheck(this, Data);
    }

    Data.prototype.getData = function getData(city_name) {
      return new Promise(function (resolve, reject) {
        client.fetch('/package.json').then(function (response) {
          return response.json();
        }).then(function (data) {
          resolve(city_name + '_');
        }).catch(function (err) {
          return reject(err);
        });
      });
    };

    return Data;
  }();
});
define('routes/map/layers',['exports', './data'], function (exports, _data) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Layers = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Layers = exports.Layers = function () {
    function Layers() {
      _classCallCheck(this, Layers);

      this.data = new _data.Data();
      this.layers_key;
    }

    Layers.prototype.getReports = function getReports(city_name) {
      this.data.getData(city_name).then(function (data) {
        return alert(data);
      });
    };

    return Layers;
  }();
});
define('routes/map/map',['exports', 'aurelia-framework', './config', './layers', 'jquery'], function (exports, _aureliaFramework, _config, _layers, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Map = undefined;

  var config = _interopRequireWildcard(_config);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DEFAULT_CITY = 'jakarta';
  var START_POINT = [-7, 109];

  var Map = exports.Map = function () {
    function Map() {
      _classCallCheck(this, Map);

      this.config = config;
      this.layers = new _layers.Layers();
      this.layers.getReports('jakarta');
      this.city_regions = [];
      for (var city_region in this.config.instance_regions) {
        this.city_regions.push(city_region);
      }
    }

    Map.prototype.parseMapCity = function parseMapCity(city) {
      if (city in this.config.instance_regions) {
        this.city_name = city;
        return this.config.instance_regions[city];
      } else {
        this.city_name = DEFAULT_CITY;
        return this.config.instance_regions[DEFAULT_CITY];
      }
    };

    Map.prototype.changeCity = function changeCity(city_name) {
      var stateObj = { map: "city" };
      this.city = this.parseMapCity(city_name);
      this.map.flyToBounds([this.city.bounds.sw, this.city.bounds.ne], 20);
      history.pushState(stateObj, "page 2", '#/map/' + this.city_name);
      (0, _jquery2.default)('#optionsPane').animate({
        'left': -300 + 'px'
      }, 200);
    };

    Map.prototype.activate = function activate(params) {
      this.city_name = params.city;
    };

    Map.prototype.attached = function attached() {
      this.map = L.map('map').setView(START_POINT, 8);
      var Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
        ext: 'png'
      }).addTo(this.map);

      L.Control.Options = L.Control.extend({
        onAdd: function onAdd(map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          container.style.backgroundColor = 'white';
          container.style.backgroundImage = 'url(assets/icons/options.svg)';
          container.style.backgroundSize = '26px 26px';
          container.style.width = '26px';
          container.style.height = '26px';
          container.onclick = function () {
            (0, _jquery2.default)('#optionsPane').show();
            (0, _jquery2.default)('#optionsPane').animate({
              'left': 0 + 'px'
            }, 200);
          };
          return container;
        }
      });
      L.control.options = function (opts) {
        return new L.Control.Options(opts);
      };
      L.control.options({ position: 'topleft' }).addTo(this.map);

      this.changeCity(this.city_name);
    };

    return Map;
  }();
});
define('routes/cards/depth/depth',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'jquery'], function (exports, _aureliaFramework, _aureliaEventAggregator, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Depth = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Depth = exports.Depth = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Depth(ea) {
      _classCallCheck(this, Depth);

      Depth.ea = ea;
      if (/Mobi/.test(navigator.userAgent)) {
        Depth.isMobile = true;
      } else {
        Depth.isMobile = false;
      }
    }

    Depth.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        Depth.depthVal = routerConfig.settings.input;
      }
      Depth.msgName = routerConfig.settings.msgName;
    };

    Depth.prototype.attached = function attached() {
      var imgHeightCm = 200;
      var refHeightPx = (0, _jquery2.default)('#imgWrapper').height();
      if (Depth.depthVal) {
        (0, _jquery2.default)('#floodZone').css({
          'height': Depth.depthVal * refHeightPx / imgHeightCm + 'px'
        });
      }
      var fillHeight = (0, _jquery2.default)('#floodZone').height();
      (0, _jquery2.default)('#sliderZone').css({
        'bottom': fillHeight * 100 / refHeightPx + '%'
      });
      var heightInCm = Math.round(fillHeight * imgHeightCm / refHeightPx);
      Depth.depthVal = heightInCm;
      Depth.ea.publish(Depth.msgName, Depth.depthVal);
      var sliderActive = false;
      (0, _jquery2.default)('#sliderZone').on('touchstart mousedown', function (e) {
        sliderActive = true;
        var startPos;
        if (Depth.isMobile) {
          startPos = e.originalEvent.touches[0].pageY;
        } else {
          startPos = e.clientY;
        }
        (0, _jquery2.default)('#depthWrapper').on('touchmove mousemove', function (e) {
          var dragPos;
          if (Depth.isMobile) {
            e.preventDefault();
            dragPos = e.originalEvent.touches[0].pageY;
          } else {
            dragPos = e.clientY;
          }
          heightInCm = Math.round((fillHeight + startPos - dragPos) * imgHeightCm / refHeightPx);
          if (sliderActive && heightInCm > 0 && heightInCm <= imgHeightCm) {
            Depth.depthVal = heightInCm;
            Depth.ea.publish(Depth.msgName, Depth.depthVal);
            (0, _jquery2.default)('#floodZone').css({
              'height': fillHeight + startPos - dragPos + 'px'
            });
            (0, _jquery2.default)('#sliderZone').css({
              'bottom': (fillHeight + startPos - dragPos) * 100 / refHeightPx + '%'
            });
          }
        });
      });
      (0, _jquery2.default)(window).on('touchend mouseup', function () {
        if (sliderActive) {
          sliderActive = false;
          fillHeight = (0, _jquery2.default)('#floodZone').height();
        }
      });
    };

    _createClass(Depth, [{
      key: 'waterDepth',
      get: function get() {
        return Depth.depthVal;
      }
    }]);

    return Depth;
  }()) || _class);
});
define('routes/cards/description/description',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Description = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Description = exports.Description = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Description(ea) {
      _classCallCheck(this, Description);

      this.ea = ea;
      this.descripText = "Tell us more...";
      this.textLength = 0;
    }

    Description.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        this.descripText = routerConfig.settings.input;
        this.textLength = this.descripText.length;
      }
      this.msgName = routerConfig.settings.msgName;
    };

    Description.prototype.clearHint = function clearHint() {
      if (this.textLength === 0) {
        this.descripText = "";
      }
    };

    Description.prototype.charCount = function charCount() {
      this.textLength = this.descripText.length;
      this.ea.publish(this.msgName, this.descripText);
    };

    return Description;
  }()) || _class);
});
define('routes/cards/errorCard/errorCard',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ErrorCard = exports.ErrorCard = function ErrorCard() {
    _classCallCheck(this, ErrorCard);
  };
});
define('routes/cards/location/location',['exports', 'leaflet', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _leaflet, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Location = undefined;

  var L = _interopRequireWildcard(_leaflet);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Location = exports.Location = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Location(ea) {
      _classCallCheck(this, Location);

      Location.ea = ea;
      Location.inputs = { markerLocation: null, gpsLocation: null, accuracy: null };
    }

    Location.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        Location.inputs = routerConfig.settings.input;
      }

      Location.msgName = routerConfig.settings.msgName;
    };

    Location.prototype.attached = function attached() {
      var cardMap = L.map('mapWrapper');
      L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
      }).addTo(cardMap);

      L.Control.GeoLocate = L.Control.extend({
        onAdd: function onAdd(map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          container.style.backgroundColor = 'white';
          container.style.backgroundImage = 'url(assets/icons/geolocate.svg)';
          container.style.backgroundSize = '30px 30px';
          container.style.width = '30px';
          container.style.height = '30px';
          container.onclick = function () {
            if (Location.inputs.gpsLocation) {
              cardMap.flyTo(Location.inputs.gpsLocation, 16);
            }
          };
          return container;
        }
      });
      L.control.geoLocate = function (opts) {
        return new L.Control.GeoLocate(opts);
      };

      if (Location.inputs.markerLocation) {
        cardMap.setView(Location.inputs.markerLocation, 16);

        if (Location.inputs.gpsLocation) {
          L.control.geoLocate({ position: 'bottomright' }).addTo(cardMap);
          L.circle(Location.inputs.gpsLocation, {
            weight: 0,
            fillColor: '#31aade',
            fillOpacity: 0.15,
            radius: Location.inputs.accuracy / 2
          }).addTo(cardMap);
          L.circleMarker(Location.inputs.gpsLocation, {
            color: 'white',
            weight: 1,
            fillColor: '#31aade',
            fillOpacity: 1,
            radius: 8
          }).addTo(cardMap);
        }
      } else {
        cardMap.locate({
          setView: false
        });
        cardMap.on('locationfound', function (e) {
          cardMap.setView(e.latlng, 16);
          L.control.geoLocate({ position: 'bottomright' }).addTo(cardMap);
          L.circle(e.latlng, {
            weight: 0,
            fillColor: '#31aade',
            fillOpacity: 0.15,
            radius: e.accuracy / 2
          }).addTo(cardMap);
          L.circleMarker(e.latlng, {
            color: 'white',
            weight: 1,
            fillColor: '#31aade',
            fillOpacity: 1,
            radius: 8
          }).addTo(cardMap);
          Location.inputs = { markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy };
          Location.ea.publish(Location.msgName, Location.inputs);
        });

        cardMap.on('locationerror', function () {
          cardMap.setView([-6.2, 106.83], 16);
          Location.inputs.markerLocation = cardMap.getCenter();
          Location.ea.publish(Location.msgName, Location.inputs);
        });
      }

      cardMap.on('moveend', function () {
        if (cardMap) {
          Location.inputs.markerLocation = cardMap.getCenter();
          Location.ea.publish(Location.msgName, Location.inputs);
        }
      });
    };

    return Location;
  }()) || _class);
});
define('routes/cards/photo/photo',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'jquery'], function (exports, _aureliaFramework, _aureliaEventAggregator, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Photo = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Photo = exports.Photo = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Photo(ea) {
      _classCallCheck(this, Photo);

      this.ea = ea;
      this.helpText = "Click to upload";
    }

    Photo.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        this.selectedPhoto = routerConfig.settings.input;
        this.haveImg = true;
      }
      this.msgName = routerConfig.settings.msgName;
    };

    Photo.prototype.attached = function attached() {
      if (this.haveImg) {
        this.drawImage();
      }
    };

    Photo.prototype.sendClick = function sendClick() {
      (0, _jquery2.default)('#photoCapture').trigger('click');
    };

    Photo.prototype.drawImage = function drawImage() {
      var _this = this;

      if (this.selectedPhoto[0]) {
        (function () {
          _this.ea.publish(_this.msgName, _this.selectedPhoto);
          var wrapper = _this.preview;
          wrapper.width = (0, _jquery2.default)('#camera').width();
          wrapper.height = (0, _jquery2.default)('#camera').height();
          var reader = new FileReader();
          reader.onload = function (e) {
            var reviewImg = new Image();
            reviewImg.onload = function () {
              var imgW = void 0;
              var imgH = void 0;
              var trlX = 0;
              var trlY = 0;
              if (reviewImg.width >= reviewImg.height) {
                imgH = wrapper.height;
                imgW = Math.round(reviewImg.width * imgH / reviewImg.height);
                trlX = Math.round((wrapper.width - imgW) / 2);
              } else {
                imgW = wrapper.width;
                imgH = Math.round(reviewImg.height * imgW / reviewImg.width);
                trlY = Math.round((wrapper.height - imgH) / 2);
              }
              var cntxt = wrapper.getContext('2d');
              cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
            };
            reviewImg.src = e.target.result;
          };
          reader.readAsDataURL(_this.selectedPhoto[0]);
          _this.helpText = "Click to change";
        })();
      }
    };

    return Photo;
  }()) || _class);
});
define('routes/cards/review/review',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Review = exports.Review = function () {
    function Review() {
      _classCallCheck(this, Review);

      if (/Mobi/.test(navigator.userAgent)) {
        Review.isMobile = true;
      } else {
        Review.isMobile = false;
      }
    }

    Review.prototype.activate = function activate(params, routerConfig) {
      Review.termsLink = routerConfig.navModel.router.routes[6].route;
      Review.thanksLink = routerConfig.navModel.router.routes[7].route;
      Review.router = routerConfig.navModel.router;
      if (routerConfig.settings.depth) {
        this.selDepth = routerConfig.settings.depth + "cm";
      } else {
        this.selDepth = "Not selected";
      }
      if (routerConfig.settings.photo) {
        this.selPhoto = routerConfig.settings.photo;
      }
      if (routerConfig.settings.description) {
        this.selDescription = routerConfig.settings.description;
      } else {
        this.selDescription = "No description provided";
      }
    };

    Review.prototype.attached = function attached() {
      if (this.selPhoto) {
        this.drawImage();
      }
      var slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
          slideThreshold = 0.9,
          slideTranslate = 0,
          slidePressed = false;
      $('#submitKnob').on('touchstart mousedown', function (e) {
        var slideStartPos;
        if (Review.isMobile) {
          slideStartPos = e.originalEvent.touches[0].pageX;
        } else {
          slideStartPos = e.clientX;
        }
        slidePressed = true;
        $('#reviewWrapper').on('touchmove mousemove', function (e) {
          var slideDragPos;
          if (Review.isMobile) {
            e.preventDefault();
            slideDragPos = e.originalEvent.touches[0].pageX;
          } else {
            slideDragPos = e.clientX;
          }
          slideTranslate = slideDragPos - slideStartPos;
          if (slidePressed && slideTranslate >= 0 && slideTranslate < slideRange) {
            $('#submitKnob').css({
              'left': slideTranslate + 'px'
            });
            $('#submitSlider').css({
              'background-color': 'rgba(31, 73, 99, ' + slideTranslate / (slideThreshold * slideRange) + ')'
            });
            if (slideTranslate >= slideThreshold * slideRange) {
              Review.router.navigate(Review.thanksLink);
            }
          }
        });
        $(window).on('touchend mouseup', function () {
          if (slidePressed && slideTranslate < slideThreshold * slideRange) {
            slidePressed = false;
            $('#submitKnob').animate({
              'left': 0 + 'px'
            }, 50);
            $('#submitSlider').css({
              'background-color': 'transparent'
            });
          }
        });
      });
    };

    Review.prototype.readTerms = function readTerms() {
      Review.router.navigate(Review.termsLink);
    };

    Review.prototype.drawImage = function drawImage() {
      var _this = this;

      if (this.selPhoto) {
        (function () {
          var wrapper = _this.preview;
          wrapper.width = $('#camera').width();
          wrapper.height = $('#camera').height();
          var reader = new FileReader();
          reader.onload = function (e) {
            var reviewImg = new Image();
            reviewImg.onload = function () {
              var imgW = void 0;
              var imgH = void 0;
              var trlX = 0;
              var trlY = 0;
              if (reviewImg.width >= reviewImg.height) {
                imgH = wrapper.height;
                imgW = Math.round(reviewImg.width * imgH / reviewImg.height);
                trlX = Math.round((wrapper.width - imgW) / 2);
              } else {
                imgW = wrapper.width;
                imgH = Math.round(reviewImg.height * imgW / reviewImg.width);
                trlY = Math.round((wrapper.height - imgH) / 2);
              }
              var cntxt = wrapper.getContext('2d');
              cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
            };
            reviewImg.src = e.target.result;
          };
          reader.readAsDataURL(_this.selPhoto[0]);
        })();
      }
    };

    return Review;
  }();
});
define('routes/cards/terms/terms',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Terms = exports.Terms = function Terms() {
    _classCallCheck(this, Terms);
  };
});
define('routes/cards/thanks/thanks',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Thanks = exports.Thanks = function () {
    function Thanks() {
      _classCallCheck(this, Thanks);
    }

    Thanks.prototype.attached = function attached() {
      window.setTimeout(function () {
        window.location.replace('/#/map');
      }, 2500);
    };

    return Thanks;
  }();
});
define('aurelia-templating-resources/compose',['exports', 'aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-pal'], function (exports, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaTemplating, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Compose = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var Compose = exports.Compose = (_dec = (0, _aureliaTemplating.customElement)('compose'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue), _dec(_class = (0, _aureliaTemplating.noView)(_class = _dec2(_class = (_class2 = function () {
    function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
      

      _initDefineProp(this, 'model', _descriptor, this);

      _initDefineProp(this, 'view', _descriptor2, this);

      _initDefineProp(this, 'viewModel', _descriptor3, this);

      this.element = element;
      this.container = container;
      this.compositionEngine = compositionEngine;
      this.viewSlot = viewSlot;
      this.viewResources = viewResources;
      this.taskQueue = taskQueue;
      this.currentController = null;
      this.currentViewModel = null;
    }

    Compose.prototype.created = function created(owningView) {
      this.owningView = owningView;
    };

    Compose.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      processInstruction(this, createInstruction(this, {
        view: this.view,
        viewModel: this.viewModel,
        model: this.model
      }));
    };

    Compose.prototype.unbind = function unbind(bindingContext, overrideContext) {
      this.bindingContext = null;
      this.overrideContext = null;
      var returnToCache = true;
      var skipAnimation = true;
      this.viewSlot.removeAll(returnToCache, skipAnimation);
    };

    Compose.prototype.modelChanged = function modelChanged(newValue, oldValue) {
      var _this = this;

      if (this.currentInstruction) {
        this.currentInstruction.model = newValue;
        return;
      }

      this.taskQueue.queueMicroTask(function () {
        if (_this.currentInstruction) {
          _this.currentInstruction.model = newValue;
          return;
        }

        var vm = _this.currentViewModel;

        if (vm && typeof vm.activate === 'function') {
          vm.activate(newValue);
        }
      });
    };

    Compose.prototype.viewChanged = function viewChanged(newValue, oldValue) {
      var _this2 = this;

      var instruction = createInstruction(this, {
        view: newValue,
        viewModel: this.currentViewModel || this.viewModel,
        model: this.model
      });

      if (this.currentInstruction) {
        this.currentInstruction = instruction;
        return;
      }

      this.currentInstruction = instruction;
      this.taskQueue.queueMicroTask(function () {
        return processInstruction(_this2, _this2.currentInstruction);
      });
    };

    Compose.prototype.viewModelChanged = function viewModelChanged(newValue, oldValue) {
      var _this3 = this;

      var instruction = createInstruction(this, {
        viewModel: newValue,
        view: this.view,
        model: this.model
      });

      if (this.currentInstruction) {
        this.currentInstruction = instruction;
        return;
      }

      this.currentInstruction = instruction;
      this.taskQueue.queueMicroTask(function () {
        return processInstruction(_this3, _this3.currentInstruction);
      });
    };

    return Compose;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'view', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'viewModel', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);


  function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
      bindingContext: composer.bindingContext,
      overrideContext: composer.overrideContext,
      owningView: composer.owningView,
      container: composer.container,
      viewSlot: composer.viewSlot,
      viewResources: composer.viewResources,
      currentController: composer.currentController,
      host: composer.element
    });
  }

  function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(function (controller) {
      composer.currentController = controller;
      composer.currentViewModel = controller ? controller.viewModel : null;
    });
  }
});
define('aurelia-templating-resources/if',['exports', 'aurelia-templating', 'aurelia-dependency-injection'], function (exports, _aureliaTemplating, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.If = undefined;

  

  var _dec, _dec2, _class;

  var If = exports.If = (_dec = (0, _aureliaTemplating.customAttribute)('if'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function () {
    function If(viewFactory, viewSlot) {
      

      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.showing = false;
      this.view = null;
      this.bindingContext = null;
      this.overrideContext = null;
    }

    If.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      this.valueChanged(this.value);
    };

    If.prototype.valueChanged = function valueChanged(newValue) {
      var _this = this;

      if (this.__queuedChanges) {
        this.__queuedChanges.push(newValue);
        return;
      }

      var maybePromise = this._runValueChanged(newValue);
      if (maybePromise instanceof Promise) {
        (function () {
          var queuedChanges = _this.__queuedChanges = [];

          var runQueuedChanges = function runQueuedChanges() {
            if (!queuedChanges.length) {
              _this.__queuedChanges = undefined;
              return;
            }

            var nextPromise = _this._runValueChanged(queuedChanges.shift()) || Promise.resolve();
            nextPromise.then(runQueuedChanges);
          };

          maybePromise.then(runQueuedChanges);
        })();
      }
    };

    If.prototype._runValueChanged = function _runValueChanged(newValue) {
      var _this2 = this;

      if (!newValue) {
        var viewOrPromise = void 0;
        if (this.view !== null && this.showing) {
          viewOrPromise = this.viewSlot.remove(this.view);
          if (viewOrPromise instanceof Promise) {
            viewOrPromise.then(function () {
              return _this2.view.unbind();
            });
          } else {
            this.view.unbind();
          }
        }

        this.showing = false;
        return viewOrPromise;
      }

      if (this.view === null) {
        this.view = this.viewFactory.create();
      }

      if (!this.view.isBound) {
        this.view.bind(this.bindingContext, this.overrideContext);
      }

      if (!this.showing) {
        this.showing = true;
        return this.viewSlot.add(this.view);
      }

      return undefined;
    };

    If.prototype.unbind = function unbind() {
      if (this.view === null) {
        return;
      }

      this.view.unbind();

      if (!this.viewFactory.isCaching) {
        return;
      }

      if (this.showing) {
        this.showing = false;
        this.viewSlot.remove(this.view, true, true);
      }
      this.view.returnToCache();
      this.view = null;
    };

    return If;
  }()) || _class) || _class) || _class);
});
define('aurelia-templating-resources/with',['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-binding'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.With = undefined;

  

  var _dec, _dec2, _class;

  var With = exports.With = (_dec = (0, _aureliaTemplating.customAttribute)('with'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function () {
    function With(viewFactory, viewSlot) {
      

      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.parentOverrideContext = null;
      this.view = null;
    }

    With.prototype.bind = function bind(bindingContext, overrideContext) {
      this.parentOverrideContext = overrideContext;
      this.valueChanged(this.value);
    };

    With.prototype.valueChanged = function valueChanged(newValue) {
      var overrideContext = (0, _aureliaBinding.createOverrideContext)(newValue, this.parentOverrideContext);
      if (!this.view) {
        this.view = this.viewFactory.create();
        this.view.bind(newValue, overrideContext);
        this.viewSlot.add(this.view);
      } else {
        this.view.bind(newValue, overrideContext);
      }
    };

    With.prototype.unbind = function unbind() {
      this.parentOverrideContext = null;

      if (this.view) {
        this.view.unbind();
      }
    };

    return With;
  }()) || _class) || _class) || _class);
});
define('aurelia-templating-resources/repeat',['exports', 'aurelia-dependency-injection', 'aurelia-binding', 'aurelia-templating', './repeat-strategy-locator', './repeat-utilities', './analyze-view-factory', './abstract-repeater'], function (exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaTemplating, _repeatStrategyLocator, _repeatUtilities, _analyzeViewFactory, _abstractRepeater) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Repeat = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var Repeat = exports.Repeat = (_dec = (0, _aureliaTemplating.customAttribute)('repeat'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaBinding.ObserverLocator, _repeatStrategyLocator.RepeatStrategyLocator), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = (_class2 = function (_AbstractRepeater) {
    _inherits(Repeat, _AbstractRepeater);

    function Repeat(viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator) {
      

      var _this = _possibleConstructorReturn(this, _AbstractRepeater.call(this, {
        local: 'item',
        viewsRequireLifecycle: (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory)
      }));

      _initDefineProp(_this, 'items', _descriptor, _this);

      _initDefineProp(_this, 'local', _descriptor2, _this);

      _initDefineProp(_this, 'key', _descriptor3, _this);

      _initDefineProp(_this, 'value', _descriptor4, _this);

      _this.viewFactory = viewFactory;
      _this.instruction = instruction;
      _this.viewSlot = viewSlot;
      _this.lookupFunctions = viewResources.lookupFunctions;
      _this.observerLocator = observerLocator;
      _this.key = 'key';
      _this.value = 'value';
      _this.strategyLocator = strategyLocator;
      _this.ignoreMutation = false;
      _this.sourceExpression = (0, _repeatUtilities.getItemsSourceExpression)(_this.instruction, 'repeat.for');
      _this.isOneTime = (0, _repeatUtilities.isOneTime)(_this.sourceExpression);
      _this.viewsRequireLifecycle = (0, _analyzeViewFactory.viewsRequireLifecycle)(viewFactory);
      return _this;
    }

    Repeat.prototype.call = function call(context, changes) {
      this[context](this.items, changes);
    };

    Repeat.prototype.bind = function bind(bindingContext, overrideContext) {
      this.scope = { bindingContext: bindingContext, overrideContext: overrideContext };
      this.matcherBinding = this._captureAndRemoveMatcherBinding();
      this.itemsChanged();
    };

    Repeat.prototype.unbind = function unbind() {
      this.scope = null;
      this.items = null;
      this.matcherBinding = null;
      this.viewSlot.removeAll(true);
      this._unsubscribeCollection();
    };

    Repeat.prototype._unsubscribeCollection = function _unsubscribeCollection() {
      if (this.collectionObserver) {
        this.collectionObserver.unsubscribe(this.callContext, this);
        this.collectionObserver = null;
        this.callContext = null;
      }
    };

    Repeat.prototype.itemsChanged = function itemsChanged() {
      this._unsubscribeCollection();

      if (!this.scope) {
        return;
      }

      var items = this.items;
      this.strategy = this.strategyLocator.getStrategy(items);
      if (!this.strategy) {
        throw new Error('Value for \'' + this.sourceExpression + '\' is non-repeatable');
      }

      if (!this.isOneTime && !this._observeInnerCollection()) {
        this._observeCollection();
      }
      this.strategy.instanceChanged(this, items);
    };

    Repeat.prototype._getInnerCollection = function _getInnerCollection() {
      var expression = (0, _repeatUtilities.unwrapExpression)(this.sourceExpression);
      if (!expression) {
        return null;
      }
      return expression.evaluate(this.scope, null);
    };

    Repeat.prototype.handleCollectionMutated = function handleCollectionMutated(collection, changes) {
      if (!this.collectionObserver) {
        return;
      }
      this.strategy.instanceMutated(this, collection, changes);
    };

    Repeat.prototype.handleInnerCollectionMutated = function handleInnerCollectionMutated(collection, changes) {
      var _this2 = this;

      if (!this.collectionObserver) {
        return;
      }

      if (this.ignoreMutation) {
        return;
      }
      this.ignoreMutation = true;
      var newItems = this.sourceExpression.evaluate(this.scope, this.lookupFunctions);
      this.observerLocator.taskQueue.queueMicroTask(function () {
        return _this2.ignoreMutation = false;
      });

      if (newItems === this.items) {
        this.itemsChanged();
      } else {
        this.items = newItems;
      }
    };

    Repeat.prototype._observeInnerCollection = function _observeInnerCollection() {
      var items = this._getInnerCollection();
      var strategy = this.strategyLocator.getStrategy(items);
      if (!strategy) {
        return false;
      }
      this.collectionObserver = strategy.getCollectionObserver(this.observerLocator, items);
      if (!this.collectionObserver) {
        return false;
      }
      this.callContext = 'handleInnerCollectionMutated';
      this.collectionObserver.subscribe(this.callContext, this);
      return true;
    };

    Repeat.prototype._observeCollection = function _observeCollection() {
      var items = this.items;
      this.collectionObserver = this.strategy.getCollectionObserver(this.observerLocator, items);
      if (this.collectionObserver) {
        this.callContext = 'handleCollectionMutated';
        this.collectionObserver.subscribe(this.callContext, this);
      }
    };

    Repeat.prototype._captureAndRemoveMatcherBinding = function _captureAndRemoveMatcherBinding() {
      if (this.viewFactory.viewFactory) {
        var instructions = this.viewFactory.viewFactory.instructions;
        var instructionIds = Object.keys(instructions);
        for (var i = 0; i < instructionIds.length; i++) {
          var expressions = instructions[instructionIds[i]].expressions;
          if (expressions) {
            for (var ii = 0; i < expressions.length; i++) {
              if (expressions[ii].targetProperty === 'matcher') {
                var matcherBinding = expressions[ii];
                expressions.splice(ii, 1);
                return matcherBinding;
              }
            }
          }
        }
      }

      return undefined;
    };

    Repeat.prototype.viewCount = function viewCount() {
      return this.viewSlot.children.length;
    };

    Repeat.prototype.views = function views() {
      return this.viewSlot.children;
    };

    Repeat.prototype.view = function view(index) {
      return this.viewSlot.children[index];
    };

    Repeat.prototype.matcher = function matcher() {
      return this.matcherBinding ? this.matcherBinding.sourceExpression.evaluate(this.scope, this.matcherBinding.lookupFunctions) : null;
    };

    Repeat.prototype.addView = function addView(bindingContext, overrideContext) {
      var view = this.viewFactory.create();
      view.bind(bindingContext, overrideContext);
      this.viewSlot.add(view);
    };

    Repeat.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      var view = this.viewFactory.create();
      view.bind(bindingContext, overrideContext);
      this.viewSlot.insert(index, view);
    };

    Repeat.prototype.moveView = function moveView(sourceIndex, targetIndex) {
      this.viewSlot.move(sourceIndex, targetIndex);
    };

    Repeat.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
      return this.viewSlot.removeAll(returnToCache, skipAnimation);
    };

    Repeat.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
      return this.viewSlot.removeMany(viewsToRemove, returnToCache, skipAnimation);
    };

    Repeat.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
      return this.viewSlot.removeAt(index, returnToCache, skipAnimation);
    };

    Repeat.prototype.updateBindings = function updateBindings(view) {
      var j = view.bindings.length;
      while (j--) {
        (0, _repeatUtilities.updateOneTimeBinding)(view.bindings[j]);
      }
      j = view.controllers.length;
      while (j--) {
        var k = view.controllers[j].boundProperties.length;
        while (k--) {
          var binding = view.controllers[j].boundProperties[k].binding;
          (0, _repeatUtilities.updateOneTimeBinding)(binding);
        }
      }
    };

    return Repeat;
  }(_abstractRepeater.AbstractRepeater), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'items', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'local', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'key', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});
define('aurelia-templating-resources/repeat-strategy-locator',['exports', './null-repeat-strategy', './array-repeat-strategy', './map-repeat-strategy', './set-repeat-strategy', './number-repeat-strategy'], function (exports, _nullRepeatStrategy, _arrayRepeatStrategy, _mapRepeatStrategy, _setRepeatStrategy, _numberRepeatStrategy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RepeatStrategyLocator = undefined;

  

  var RepeatStrategyLocator = exports.RepeatStrategyLocator = function () {
    function RepeatStrategyLocator() {
      

      this.matchers = [];
      this.strategies = [];

      this.addStrategy(function (items) {
        return items === null || items === undefined;
      }, new _nullRepeatStrategy.NullRepeatStrategy());
      this.addStrategy(function (items) {
        return items instanceof Array;
      }, new _arrayRepeatStrategy.ArrayRepeatStrategy());
      this.addStrategy(function (items) {
        return items instanceof Map;
      }, new _mapRepeatStrategy.MapRepeatStrategy());
      this.addStrategy(function (items) {
        return items instanceof Set;
      }, new _setRepeatStrategy.SetRepeatStrategy());
      this.addStrategy(function (items) {
        return typeof items === 'number';
      }, new _numberRepeatStrategy.NumberRepeatStrategy());
    }

    RepeatStrategyLocator.prototype.addStrategy = function addStrategy(matcher, strategy) {
      this.matchers.push(matcher);
      this.strategies.push(strategy);
    };

    RepeatStrategyLocator.prototype.getStrategy = function getStrategy(items) {
      var matchers = this.matchers;

      for (var i = 0, ii = matchers.length; i < ii; ++i) {
        if (matchers[i](items)) {
          return this.strategies[i];
        }
      }

      return null;
    };

    return RepeatStrategyLocator;
  }();
});
define('aurelia-templating-resources/null-repeat-strategy',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var NullRepeatStrategy = exports.NullRepeatStrategy = function () {
    function NullRepeatStrategy() {
      
    }

    NullRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      repeat.removeAllViews(true);
    };

    NullRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {};

    return NullRepeatStrategy;
  }();
});
define('aurelia-templating-resources/array-repeat-strategy',['exports', './repeat-utilities', 'aurelia-binding'], function (exports, _repeatUtilities, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ArrayRepeatStrategy = undefined;

  

  var ArrayRepeatStrategy = exports.ArrayRepeatStrategy = function () {
    function ArrayRepeatStrategy() {
      
    }

    ArrayRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getArrayObserver(items);
    };

    ArrayRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;

      var itemsLength = items.length;

      if (!items || itemsLength === 0) {
        repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
        return;
      }

      var children = repeat.views();
      var viewsLength = children.length;

      if (viewsLength === 0) {
        this._standardProcessInstanceChanged(repeat, items);
        return;
      }

      if (repeat.viewsRequireLifecycle) {
        (function () {
          var childrenSnapshot = children.slice(0);
          var itemNameInBindingContext = repeat.local;
          var matcher = repeat.matcher();

          var itemsPreviouslyInViews = [];
          var viewsToRemove = [];

          for (var index = 0; index < viewsLength; index++) {
            var view = childrenSnapshot[index];
            var oldItem = view.bindingContext[itemNameInBindingContext];

            if ((0, _repeatUtilities.indexOf)(items, oldItem, matcher) === -1) {
              viewsToRemove.push(view);
            } else {
              itemsPreviouslyInViews.push(oldItem);
            }
          }

          var updateViews = void 0;
          var removePromise = void 0;

          if (itemsPreviouslyInViews.length > 0) {
            removePromise = repeat.removeViews(viewsToRemove, true, !repeat.viewsRequireLifecycle);
            updateViews = function updateViews() {
              for (var _index = 0; _index < itemsLength; _index++) {
                var item = items[_index];
                var indexOfView = (0, _repeatUtilities.indexOf)(itemsPreviouslyInViews, item, matcher, _index);
                var _view = void 0;

                if (indexOfView === -1) {
                  var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_index], _index, itemsLength);
                  repeat.insertView(_index, overrideContext.bindingContext, overrideContext);

                  itemsPreviouslyInViews.splice(_index, 0, undefined);
                } else if (indexOfView === _index) {
                  _view = children[indexOfView];
                  itemsPreviouslyInViews[indexOfView] = undefined;
                } else {
                  _view = children[indexOfView];
                  repeat.moveView(indexOfView, _index);
                  itemsPreviouslyInViews.splice(indexOfView, 1);
                  itemsPreviouslyInViews.splice(_index, 0, undefined);
                }

                if (_view) {
                  (0, _repeatUtilities.updateOverrideContext)(_view.overrideContext, _index, itemsLength);
                }
              }

              _this._inPlaceProcessItems(repeat, items);
            };
          } else {
            removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
            updateViews = function updateViews() {
              return _this._standardProcessInstanceChanged(repeat, items);
            };
          }

          if (removePromise instanceof Promise) {
            removePromise.then(updateViews);
          } else {
            updateViews();
          }
        })();
      } else {
        this._inPlaceProcessItems(repeat, items);
      }
    };

    ArrayRepeatStrategy.prototype._standardProcessInstanceChanged = function _standardProcessInstanceChanged(repeat, items) {
      for (var i = 0, ii = items.length; i < ii; i++) {
        var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[i], i, ii);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
    };

    ArrayRepeatStrategy.prototype._inPlaceProcessItems = function _inPlaceProcessItems(repeat, items) {
      var itemsLength = items.length;
      var viewsLength = repeat.viewCount();

      while (viewsLength > itemsLength) {
        viewsLength--;
        repeat.removeView(viewsLength, true, !repeat.viewsRequireLifecycle);
      }

      var local = repeat.local;

      for (var i = 0; i < viewsLength; i++) {
        var view = repeat.view(i);
        var last = i === itemsLength - 1;
        var middle = i !== 0 && !last;

        if (view.bindingContext[local] === items[i] && view.overrideContext.$middle === middle && view.overrideContext.$last === last) {
          continue;
        }

        view.bindingContext[local] = items[i];
        view.overrideContext.$middle = middle;
        view.overrideContext.$last = last;
        repeat.updateBindings(view);
      }

      for (var _i = viewsLength; _i < itemsLength; _i++) {
        var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, items[_i], _i, itemsLength);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }
    };

    ArrayRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, array, splices) {
      var _this2 = this;

      if (repeat.__queuedSplices) {
        for (var i = 0, ii = splices.length; i < ii; ++i) {
          var _splices$i = splices[i];
          var index = _splices$i.index;
          var removed = _splices$i.removed;
          var addedCount = _splices$i.addedCount;

          (0, _aureliaBinding.mergeSplice)(repeat.__queuedSplices, index, removed, addedCount);
        }

        repeat.__array = array.slice(0);
        return;
      }

      var maybePromise = this._runSplices(repeat, array.slice(0), splices);
      if (maybePromise instanceof Promise) {
        (function () {
          var queuedSplices = repeat.__queuedSplices = [];

          var runQueuedSplices = function runQueuedSplices() {
            if (!queuedSplices.length) {
              repeat.__queuedSplices = undefined;
              repeat.__array = undefined;
              return;
            }

            var nextPromise = _this2._runSplices(repeat, repeat.__array, queuedSplices) || Promise.resolve();
            queuedSplices = repeat.__queuedSplices = [];
            nextPromise.then(runQueuedSplices);
          };

          maybePromise.then(runQueuedSplices);
        })();
      }
    };

    ArrayRepeatStrategy.prototype._runSplices = function _runSplices(repeat, array, splices) {
      var _this3 = this;

      var removeDelta = 0;
      var rmPromises = [];

      for (var i = 0, ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var removed = splice.removed;

        for (var j = 0, jj = removed.length; j < jj; ++j) {
          var viewOrPromise = repeat.removeView(splice.index + removeDelta + rmPromises.length, true);
          if (viewOrPromise instanceof Promise) {
            rmPromises.push(viewOrPromise);
          }
        }
        removeDelta -= splice.addedCount;
      }

      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function () {
          var spliceIndexLow = _this3._handleAddedSplices(repeat, array, splices);
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), spliceIndexLow);
        });
      }

      var spliceIndexLow = this._handleAddedSplices(repeat, array, splices);
      (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), spliceIndexLow);

      return undefined;
    };

    ArrayRepeatStrategy.prototype._handleAddedSplices = function _handleAddedSplices(repeat, array, splices) {
      var spliceIndex = void 0;
      var spliceIndexLow = void 0;
      var arrayLength = array.length;
      for (var i = 0, ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var addIndex = spliceIndex = splice.index;
        var end = splice.index + splice.addedCount;

        if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
          spliceIndexLow = spliceIndex;
        }

        for (; addIndex < end; ++addIndex) {
          var overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, array[addIndex], addIndex, arrayLength);
          repeat.insertView(addIndex, overrideContext.bindingContext, overrideContext);
        }
      }

      return spliceIndexLow;
    };

    return ArrayRepeatStrategy;
  }();
});
define('aurelia-templating-resources/repeat-utilities',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.updateOverrideContexts = updateOverrideContexts;
  exports.createFullOverrideContext = createFullOverrideContext;
  exports.updateOverrideContext = updateOverrideContext;
  exports.getItemsSourceExpression = getItemsSourceExpression;
  exports.unwrapExpression = unwrapExpression;
  exports.isOneTime = isOneTime;
  exports.updateOneTimeBinding = updateOneTimeBinding;
  exports.indexOf = indexOf;


  var oneTime = _aureliaBinding.bindingMode.oneTime;

  function updateOverrideContexts(views, startIndex) {
    var length = views.length;

    if (startIndex > 0) {
      startIndex = startIndex - 1;
    }

    for (; startIndex < length; ++startIndex) {
      updateOverrideContext(views[startIndex].overrideContext, startIndex, length);
    }
  }

  function createFullOverrideContext(repeat, data, index, length, key) {
    var bindingContext = {};
    var overrideContext = (0, _aureliaBinding.createOverrideContext)(bindingContext, repeat.scope.overrideContext);

    if (typeof key !== 'undefined') {
      bindingContext[repeat.key] = key;
      bindingContext[repeat.value] = data;
    } else {
      bindingContext[repeat.local] = data;
    }
    updateOverrideContext(overrideContext, index, length);
    return overrideContext;
  }

  function updateOverrideContext(overrideContext, index, length) {
    var first = index === 0;
    var last = index === length - 1;
    var even = index % 2 === 0;

    overrideContext.$index = index;
    overrideContext.$first = first;
    overrideContext.$last = last;
    overrideContext.$middle = !(first || last);
    overrideContext.$odd = !even;
    overrideContext.$even = even;
  }

  function getItemsSourceExpression(instruction, attrName) {
    return instruction.behaviorInstructions.filter(function (bi) {
      return bi.originalAttrName === attrName;
    })[0].attributes.items.sourceExpression;
  }

  function unwrapExpression(expression) {
    var unwrapped = false;
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      expression = expression.expression;
    }
    while (expression instanceof _aureliaBinding.ValueConverter) {
      expression = expression.expression;
      unwrapped = true;
    }
    return unwrapped ? expression : null;
  }

  function isOneTime(expression) {
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      if (expression.name === 'oneTime') {
        return true;
      }
      expression = expression.expression;
    }
    return false;
  }

  function updateOneTimeBinding(binding) {
    if (binding.call && binding.mode === oneTime) {
      binding.call(_aureliaBinding.sourceContext);
    } else if (binding.updateOneTimeBindings) {
      binding.updateOneTimeBindings();
    }
  }

  function indexOf(array, item, matcher, startIndex) {
    if (!matcher) {
      return array.indexOf(item);
    }
    var length = array.length;
    for (var index = startIndex || 0; index < length; index++) {
      if (matcher(array[index], item)) {
        return index;
      }
    }
    return -1;
  }
});
define('aurelia-templating-resources/map-repeat-strategy',['exports', './repeat-utilities'], function (exports, _repeatUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MapRepeatStrategy = undefined;

  

  var MapRepeatStrategy = exports.MapRepeatStrategy = function () {
    function MapRepeatStrategy() {
      
    }

    MapRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getMapObserver(items);
    };

    MapRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;

      var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
      if (removePromise instanceof Promise) {
        removePromise.then(function () {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };

    MapRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var index = 0;
      var overrideContext = void 0;

      items.forEach(function (value, key) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, index, items.size, key);
        repeat.addView(overrideContext.bindingContext, overrideContext);
        ++index;
      });
    };

    MapRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, map, records) {
      var key = void 0;
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var removeIndex = void 0;
      var record = void 0;
      var rmPromises = [];
      var viewOrPromise = void 0;

      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        key = record.key;
        switch (record.type) {
          case 'update':
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, map.get(key), removeIndex, map.size, key);
            repeat.insertView(removeIndex, overrideContext.bindingContext, overrideContext);
            break;
          case 'add':
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, map.get(key), map.size - 1, map.size, key);
            repeat.insertView(map.size - 1, overrideContext.bindingContext, overrideContext);
            break;
          case 'delete':
            if (record.oldValue === undefined) {
              return;
            }
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
            break;
          default:
            continue;
        }
      }

      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function () {
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
        });
      } else {
        (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
      }
    };

    MapRepeatStrategy.prototype._getViewIndexByKey = function _getViewIndexByKey(repeat, key) {
      var i = void 0;
      var ii = void 0;
      var child = void 0;

      for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
        child = repeat.view(i);
        if (child.bindingContext[repeat.key] === key) {
          return i;
        }
      }

      return undefined;
    };

    return MapRepeatStrategy;
  }();
});
define('aurelia-templating-resources/set-repeat-strategy',['exports', './repeat-utilities'], function (exports, _repeatUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SetRepeatStrategy = undefined;

  

  var SetRepeatStrategy = exports.SetRepeatStrategy = function () {
    function SetRepeatStrategy() {
      
    }

    SetRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getSetObserver(items);
    };

    SetRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;

      var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
      if (removePromise instanceof Promise) {
        removePromise.then(function () {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };

    SetRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var index = 0;
      var overrideContext = void 0;

      items.forEach(function (value) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, index, items.size);
        repeat.addView(overrideContext.bindingContext, overrideContext);
        ++index;
      });
    };

    SetRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, set, records) {
      var value = void 0;
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var removeIndex = void 0;
      var record = void 0;
      var rmPromises = [];
      var viewOrPromise = void 0;

      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        value = record.value;
        switch (record.type) {
          case 'add':
            overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, value, set.size - 1, set.size);
            repeat.insertView(set.size - 1, overrideContext.bindingContext, overrideContext);
            break;
          case 'delete':
            removeIndex = this._getViewIndexByValue(repeat, value);
            viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
            break;
          default:
            continue;
        }
      }

      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function () {
          (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
        });
      } else {
        (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
      }
    };

    SetRepeatStrategy.prototype._getViewIndexByValue = function _getViewIndexByValue(repeat, value) {
      var i = void 0;
      var ii = void 0;
      var child = void 0;

      for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
        child = repeat.view(i);
        if (child.bindingContext[repeat.local] === value) {
          return i;
        }
      }

      return undefined;
    };

    return SetRepeatStrategy;
  }();
});
define('aurelia-templating-resources/number-repeat-strategy',['exports', './repeat-utilities'], function (exports, _repeatUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NumberRepeatStrategy = undefined;

  

  var NumberRepeatStrategy = exports.NumberRepeatStrategy = function () {
    function NumberRepeatStrategy() {
      
    }

    NumberRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver() {
      return null;
    };

    NumberRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, value) {
      var _this = this;

      var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
      if (removePromise instanceof Promise) {
        removePromise.then(function () {
          return _this._standardProcessItems(repeat, value);
        });
        return;
      }
      this._standardProcessItems(repeat, value);
    };

    NumberRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, value) {
      var childrenLength = repeat.viewCount();
      var i = void 0;
      var ii = void 0;
      var overrideContext = void 0;
      var viewsToRemove = void 0;

      value = Math.floor(value);
      viewsToRemove = childrenLength - value;

      if (viewsToRemove > 0) {
        if (viewsToRemove > childrenLength) {
          viewsToRemove = childrenLength;
        }

        for (i = 0, ii = viewsToRemove; i < ii; ++i) {
          repeat.removeView(childrenLength - (i + 1), true, !repeat.viewsRequireLifecycle);
        }

        return;
      }

      for (i = childrenLength, ii = value; i < ii; ++i) {
        overrideContext = (0, _repeatUtilities.createFullOverrideContext)(repeat, i, i, ii);
        repeat.addView(overrideContext.bindingContext, overrideContext);
      }

      (0, _repeatUtilities.updateOverrideContexts)(repeat.views(), 0);
    };

    return NumberRepeatStrategy;
  }();
});
define('aurelia-templating-resources/analyze-view-factory',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.viewsRequireLifecycle = viewsRequireLifecycle;
  var lifecycleOptionalBehaviors = exports.lifecycleOptionalBehaviors = ['focus', 'if', 'repeat', 'show', 'with'];

  function behaviorRequiresLifecycle(instruction) {
    var t = instruction.type;
    var name = t.elementName !== null ? t.elementName : t.attributeName;
    return lifecycleOptionalBehaviors.indexOf(name) === -1 && (t.handlesAttached || t.handlesBind || t.handlesCreated || t.handlesDetached || t.handlesUnbind) || t.viewFactory && viewsRequireLifecycle(t.viewFactory) || instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }

  function targetRequiresLifecycle(instruction) {
    var behaviors = instruction.behaviorInstructions;
    if (behaviors) {
      var i = behaviors.length;
      while (i--) {
        if (behaviorRequiresLifecycle(behaviors[i])) {
          return true;
        }
      }
    }

    return instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }

  function viewsRequireLifecycle(viewFactory) {
    if ('_viewsRequireLifecycle' in viewFactory) {
      return viewFactory._viewsRequireLifecycle;
    }

    viewFactory._viewsRequireLifecycle = false;

    if (viewFactory.viewFactory) {
      viewFactory._viewsRequireLifecycle = viewsRequireLifecycle(viewFactory.viewFactory);
      return viewFactory._viewsRequireLifecycle;
    }

    if (viewFactory.template.querySelector('.au-animate')) {
      viewFactory._viewsRequireLifecycle = true;
      return true;
    }

    for (var id in viewFactory.instructions) {
      if (targetRequiresLifecycle(viewFactory.instructions[id])) {
        viewFactory._viewsRequireLifecycle = true;
        return true;
      }
    }

    viewFactory._viewsRequireLifecycle = false;
    return false;
  }
});
define('aurelia-templating-resources/abstract-repeater',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var AbstractRepeater = exports.AbstractRepeater = function () {
    function AbstractRepeater(options) {
      

      Object.assign(this, {
        local: 'items',
        viewsRequireLifecycle: true
      }, options);
    }

    AbstractRepeater.prototype.viewCount = function viewCount() {
      throw new Error('subclass must implement `viewCount`');
    };

    AbstractRepeater.prototype.views = function views() {
      throw new Error('subclass must implement `views`');
    };

    AbstractRepeater.prototype.view = function view(index) {
      throw new Error('subclass must implement `view`');
    };

    AbstractRepeater.prototype.matcher = function matcher() {
      throw new Error('subclass must implement `matcher`');
    };

    AbstractRepeater.prototype.addView = function addView(bindingContext, overrideContext) {
      throw new Error('subclass must implement `addView`');
    };

    AbstractRepeater.prototype.insertView = function insertView(index, bindingContext, overrideContext) {
      throw new Error('subclass must implement `insertView`');
    };

    AbstractRepeater.prototype.moveView = function moveView(sourceIndex, targetIndex) {
      throw new Error('subclass must implement `moveView`');
    };

    AbstractRepeater.prototype.removeAllViews = function removeAllViews(returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeAllViews`');
    };

    AbstractRepeater.prototype.removeViews = function removeViews(viewsToRemove, returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeView`');
    };

    AbstractRepeater.prototype.removeView = function removeView(index, returnToCache, skipAnimation) {
      throw new Error('subclass must implement `removeView`');
    };

    AbstractRepeater.prototype.updateBindings = function updateBindings(view) {
      throw new Error('subclass must implement `updateBindings`');
    };

    return AbstractRepeater;
  }();
});
define('aurelia-templating-resources/show',['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal', './aurelia-hide-style'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal, _aureliaHideStyle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Show = undefined;

  

  var _dec, _dec2, _class;

  var Show = exports.Show = (_dec = (0, _aureliaTemplating.customAttribute)('show'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator, _aureliaDependencyInjection.Optional.of(_aureliaPal.DOM.boundary, true)), _dec(_class = _dec2(_class = function () {
    function Show(element, animator, domBoundary) {
      

      this.element = element;
      this.animator = animator;
      this.domBoundary = domBoundary;
    }

    Show.prototype.created = function created() {
      (0, _aureliaHideStyle.injectAureliaHideStyleAtBoundary)(this.domBoundary);
    };

    Show.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.removeClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      } else {
        this.animator.addClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      }
    };

    Show.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };

    return Show;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/aurelia-hide-style',['exports', 'aurelia-pal'], function (exports, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.aureliaHideClassName = undefined;
  exports.injectAureliaHideStyleAtHead = injectAureliaHideStyleAtHead;
  exports.injectAureliaHideStyleAtBoundary = injectAureliaHideStyleAtBoundary;
  var aureliaHideClassName = exports.aureliaHideClassName = 'aurelia-hide';

  var aureliaHideClass = '.' + aureliaHideClassName + ' { display:none !important; }';

  function injectAureliaHideStyleAtHead() {
    _aureliaPal.DOM.injectStyles(aureliaHideClass);
  }

  function injectAureliaHideStyleAtBoundary(domBoundary) {
    if (_aureliaPal.FEATURE.shadowDOM && domBoundary && !domBoundary.hasAureliaHideStyle) {
      domBoundary.hasAureliaHideStyle = true;
      _aureliaPal.DOM.injectStyles(aureliaHideClass, domBoundary);
    }
  }
});
define('aurelia-templating-resources/hide',['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-pal', './aurelia-hide-style'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal, _aureliaHideStyle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Hide = undefined;

  

  var _dec, _dec2, _class;

  var Hide = exports.Hide = (_dec = (0, _aureliaTemplating.customAttribute)('hide'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTemplating.Animator, _aureliaDependencyInjection.Optional.of(_aureliaPal.DOM.boundary, true)), _dec(_class = _dec2(_class = function () {
    function Hide(element, animator, domBoundary) {
      

      this.element = element;
      this.animator = animator;
      this.domBoundary = domBoundary;
    }

    Hide.prototype.created = function created() {
      (0, _aureliaHideStyle.injectAureliaHideStyleAtBoundary)(this.domBoundary);
    };

    Hide.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.addClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      } else {
        this.animator.removeClass(this.element, _aureliaHideStyle.aureliaHideClassName);
      }
    };

    Hide.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };

    return Hide;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/sanitize-html',['exports', 'aurelia-binding', 'aurelia-dependency-injection', './html-sanitizer'], function (exports, _aureliaBinding, _aureliaDependencyInjection, _htmlSanitizer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SanitizeHTMLValueConverter = undefined;

  

  var _dec, _dec2, _class;

  var SanitizeHTMLValueConverter = exports.SanitizeHTMLValueConverter = (_dec = (0, _aureliaBinding.valueConverter)('sanitizeHTML'), _dec2 = (0, _aureliaDependencyInjection.inject)(_htmlSanitizer.HTMLSanitizer), _dec(_class = _dec2(_class = function () {
    function SanitizeHTMLValueConverter(sanitizer) {
      

      this.sanitizer = sanitizer;
    }

    SanitizeHTMLValueConverter.prototype.toView = function toView(untrustedMarkup) {
      if (untrustedMarkup === null || untrustedMarkup === undefined) {
        return null;
      }

      return this.sanitizer.sanitize(untrustedMarkup);
    };

    return SanitizeHTMLValueConverter;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/html-sanitizer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  var HTMLSanitizer = exports.HTMLSanitizer = function () {
    function HTMLSanitizer() {
      
    }

    HTMLSanitizer.prototype.sanitize = function sanitize(input) {
      return input.replace(SCRIPT_REGEX, '');
    };

    return HTMLSanitizer;
  }();
});
define('aurelia-templating-resources/replaceable',['exports', 'aurelia-dependency-injection', 'aurelia-templating'], function (exports, _aureliaDependencyInjection, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Replaceable = undefined;

  

  var _dec, _dec2, _class;

  var Replaceable = exports.Replaceable = (_dec = (0, _aureliaTemplating.customAttribute)('replaceable'), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot), _dec(_class = (0, _aureliaTemplating.templateController)(_class = _dec2(_class = function () {
    function Replaceable(viewFactory, viewSlot) {
      

      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.view = null;
    }

    Replaceable.prototype.bind = function bind(bindingContext, overrideContext) {
      if (this.view === null) {
        this.view = this.viewFactory.create();
        this.viewSlot.add(this.view);
      }

      this.view.bind(bindingContext, overrideContext);
    };

    Replaceable.prototype.unbind = function unbind() {
      this.view.unbind();
    };

    return Replaceable;
  }()) || _class) || _class) || _class);
});
define('aurelia-templating-resources/focus',['exports', 'aurelia-templating', 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-pal'], function (exports, _aureliaTemplating, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Focus = undefined;

  

  var _dec, _dec2, _class;

  var Focus = exports.Focus = (_dec = (0, _aureliaTemplating.customAttribute)('focus', _aureliaBinding.bindingMode.twoWay), _dec2 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element, _aureliaTaskQueue.TaskQueue), _dec(_class = _dec2(_class = function () {
    function Focus(element, taskQueue) {
      var _this = this;

      

      this.element = element;
      this.taskQueue = taskQueue;
      this.isAttached = false;
      this.needsApply = false;

      this.focusListener = function (e) {
        _this.value = true;
      };
      this.blurListener = function (e) {
        if (_aureliaPal.DOM.activeElement !== _this.element) {
          _this.value = false;
        }
      };
    }

    Focus.prototype.valueChanged = function valueChanged(newValue) {
      if (this.isAttached) {
        this._apply();
      } else {
        this.needsApply = true;
      }
    };

    Focus.prototype._apply = function _apply() {
      var _this2 = this;

      if (this.value) {
        this.taskQueue.queueMicroTask(function () {
          if (_this2.value) {
            _this2.element.focus();
          }
        });
      } else {
        this.element.blur();
      }
    };

    Focus.prototype.attached = function attached() {
      this.isAttached = true;
      if (this.needsApply) {
        this.needsApply = false;
        this._apply();
      }
      this.element.addEventListener('focus', this.focusListener);
      this.element.addEventListener('blur', this.blurListener);
    };

    Focus.prototype.detached = function detached() {
      this.isAttached = false;
      this.element.removeEventListener('focus', this.focusListener);
      this.element.removeEventListener('blur', this.blurListener);
    };

    return Focus;
  }()) || _class) || _class);
});
define('aurelia-templating-resources/css-resource',['exports', 'aurelia-templating', 'aurelia-loader', 'aurelia-dependency-injection', 'aurelia-path', 'aurelia-pal'], function (exports, _aureliaTemplating, _aureliaLoader, _aureliaDependencyInjection, _aureliaPath, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._createCSSResource = _createCSSResource;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  

  var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;

  function fixupCSSUrls(address, css) {
    if (typeof css !== 'string') {
      throw new Error('Failed loading required CSS file: ' + address);
    }
    return css.replace(cssUrlMatcher, function (match, p1) {
      var quote = p1.charAt(0);
      if (quote === '\'' || quote === '"') {
        p1 = p1.substr(1, p1.length - 2);
      }
      return 'url(\'' + (0, _aureliaPath.relativeToFile)(p1, address) + '\')';
    });
  }

  var CSSResource = function () {
    function CSSResource(address) {
      

      this.address = address;
      this._scoped = null;
      this._global = false;
      this._alreadyGloballyInjected = false;
    }

    CSSResource.prototype.initialize = function initialize(container, target) {
      this._scoped = new target(this);
    };

    CSSResource.prototype.register = function register(registry, name) {
      if (name === 'scoped') {
        registry.registerViewEngineHooks(this._scoped);
      } else {
        this._global = true;
      }
    };

    CSSResource.prototype.load = function load(container) {
      var _this = this;

      return container.get(_aureliaLoader.Loader).loadText(this.address).catch(function (err) {
        return null;
      }).then(function (text) {
        text = fixupCSSUrls(_this.address, text);
        _this._scoped.css = text;
        if (_this._global) {
          _this._alreadyGloballyInjected = true;
          _aureliaPal.DOM.injectStyles(text);
        }
      });
    };

    return CSSResource;
  }();

  var CSSViewEngineHooks = function () {
    function CSSViewEngineHooks(owner) {
      

      this.owner = owner;
      this.css = null;
    }

    CSSViewEngineHooks.prototype.beforeCompile = function beforeCompile(content, resources, instruction) {
      if (instruction.targetShadowDOM) {
        _aureliaPal.DOM.injectStyles(this.css, content, true);
      } else if (_aureliaPal.FEATURE.scopedCSS) {
        var styleNode = _aureliaPal.DOM.injectStyles(this.css, content, true);
        styleNode.setAttribute('scoped', 'scoped');
      } else if (!this.owner._alreadyGloballyInjected) {
        _aureliaPal.DOM.injectStyles(this.css);
        this.owner._alreadyGloballyInjected = true;
      }
    };

    return CSSViewEngineHooks;
  }();

  function _createCSSResource(address) {
    var _dec, _class;

    var ViewCSS = (_dec = (0, _aureliaTemplating.resource)(new CSSResource(address)), _dec(_class = function (_CSSViewEngineHooks) {
      _inherits(ViewCSS, _CSSViewEngineHooks);

      function ViewCSS() {
        

        return _possibleConstructorReturn(this, _CSSViewEngineHooks.apply(this, arguments));
      }

      return ViewCSS;
    }(CSSViewEngineHooks)) || _class);

    return ViewCSS;
  }
});
define('aurelia-templating-resources/attr-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttrBindingBehavior = undefined;

  

  var AttrBindingBehavior = exports.AttrBindingBehavior = function () {
    function AttrBindingBehavior() {
      
    }

    AttrBindingBehavior.prototype.bind = function bind(binding, source) {
      binding.targetObserver = new _aureliaBinding.DataAttributeObserver(binding.target, binding.targetProperty);
    };

    AttrBindingBehavior.prototype.unbind = function unbind(binding, source) {};

    return AttrBindingBehavior;
  }();
});
define('aurelia-templating-resources/binding-mode-behaviors',['exports', 'aurelia-binding', 'aurelia-metadata'], function (exports, _aureliaBinding, _aureliaMetadata) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TwoWayBindingBehavior = exports.OneWayBindingBehavior = exports.OneTimeBindingBehavior = undefined;

  

  var _dec, _class, _dec2, _class2, _dec3, _class3;

  var modeBindingBehavior = {
    bind: function bind(binding, source, lookupFunctions) {
      binding.originalMode = binding.mode;
      binding.mode = this.mode;
    },
    unbind: function unbind(binding, source) {
      binding.mode = binding.originalMode;
      binding.originalMode = null;
    }
  };

  var OneTimeBindingBehavior = exports.OneTimeBindingBehavior = (_dec = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec(_class = function OneTimeBindingBehavior() {
    

    this.mode = _aureliaBinding.bindingMode.oneTime;
  }) || _class);
  var OneWayBindingBehavior = exports.OneWayBindingBehavior = (_dec2 = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec2(_class2 = function OneWayBindingBehavior() {
    

    this.mode = _aureliaBinding.bindingMode.oneWay;
  }) || _class2);
  var TwoWayBindingBehavior = exports.TwoWayBindingBehavior = (_dec3 = (0, _aureliaMetadata.mixin)(modeBindingBehavior), _dec3(_class3 = function TwoWayBindingBehavior() {
    

    this.mode = _aureliaBinding.bindingMode.twoWay;
  }) || _class3);
});
define('aurelia-templating-resources/throttle-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ThrottleBindingBehavior = undefined;

  

  function throttle(newValue) {
    var _this = this;

    var state = this.throttleState;
    var elapsed = +new Date() - state.last;
    if (elapsed >= state.delay) {
      clearTimeout(state.timeoutId);
      state.timeoutId = null;
      state.last = +new Date();
      this.throttledMethod(newValue);
      return;
    }
    state.newValue = newValue;
    if (state.timeoutId === null) {
      state.timeoutId = setTimeout(function () {
        state.timeoutId = null;
        state.last = +new Date();
        _this.throttledMethod(state.newValue);
      }, state.delay - elapsed);
    }
  }

  var ThrottleBindingBehavior = exports.ThrottleBindingBehavior = function () {
    function ThrottleBindingBehavior() {
      
    }

    ThrottleBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];

      var methodToThrottle = 'updateTarget';
      if (binding.callSource) {
        methodToThrottle = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
          methodToThrottle = 'updateSource';
        }

      binding.throttledMethod = binding[methodToThrottle];
      binding.throttledMethod.originalName = methodToThrottle;

      binding[methodToThrottle] = throttle;

      binding.throttleState = {
        delay: delay,
        last: 0,
        timeoutId: null
      };
    };

    ThrottleBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.throttledMethod.originalName;
      binding[methodToRestore] = binding.throttledMethod;
      binding.throttledMethod = null;
      clearTimeout(binding.throttleState.timeoutId);
      binding.throttleState = null;
    };

    return ThrottleBindingBehavior;
  }();
});
define('aurelia-templating-resources/debounce-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DebounceBindingBehavior = undefined;

  

  function debounce(newValue) {
    var _this = this;

    var state = this.debounceState;
    if (state.immediate) {
      state.immediate = false;
      this.debouncedMethod(newValue);
      return;
    }
    clearTimeout(state.timeoutId);
    state.timeoutId = setTimeout(function () {
      return _this.debouncedMethod(newValue);
    }, state.delay);
  }

  var DebounceBindingBehavior = exports.DebounceBindingBehavior = function () {
    function DebounceBindingBehavior() {
      
    }

    DebounceBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];

      var methodToDebounce = 'updateTarget';
      if (binding.callSource) {
        methodToDebounce = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
          methodToDebounce = 'updateSource';
        }

      binding.debouncedMethod = binding[methodToDebounce];
      binding.debouncedMethod.originalName = methodToDebounce;

      binding[methodToDebounce] = debounce;

      binding.debounceState = {
        delay: delay,
        timeoutId: null,
        immediate: methodToDebounce === 'updateTarget' };
    };

    DebounceBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.debouncedMethod.originalName;
      binding[methodToRestore] = binding.debouncedMethod;
      binding.debouncedMethod = null;
      clearTimeout(binding.debounceState.timeoutId);
      binding.debounceState = null;
    };

    return DebounceBindingBehavior;
  }();
});
define('aurelia-templating-resources/signal-binding-behavior',['exports', './binding-signaler'], function (exports, _bindingSignaler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SignalBindingBehavior = undefined;

  

  var SignalBindingBehavior = exports.SignalBindingBehavior = function () {
    SignalBindingBehavior.inject = function inject() {
      return [_bindingSignaler.BindingSignaler];
    };

    function SignalBindingBehavior(bindingSignaler) {
      

      this.signals = bindingSignaler.signals;
    }

    SignalBindingBehavior.prototype.bind = function bind(binding, source) {
      if (!binding.updateTarget) {
        throw new Error('Only property bindings and string interpolation bindings can be signaled.  Trigger, delegate and call bindings cannot be signaled.');
      }
      if (arguments.length === 3) {
        var name = arguments[2];
        var bindings = this.signals[name] || (this.signals[name] = []);
        bindings.push(binding);
        binding.signalName = name;
      } else if (arguments.length > 3) {
        var names = Array.prototype.slice.call(arguments, 2);
        var i = names.length;
        while (i--) {
          var _name = names[i];
          var _bindings = this.signals[_name] || (this.signals[_name] = []);
          _bindings.push(binding);
        }
        binding.signalName = names;
      } else {
        throw new Error('Signal name is required.');
      }
    };

    SignalBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var name = binding.signalName;
      binding.signalName = null;
      if (Array.isArray(name)) {
        var names = name;
        var i = names.length;
        while (i--) {
          var n = names[i];
          var bindings = this.signals[n];
          bindings.splice(bindings.indexOf(binding), 1);
        }
      } else {
        var _bindings2 = this.signals[name];
        _bindings2.splice(_bindings2.indexOf(binding), 1);
      }
    };

    return SignalBindingBehavior;
  }();
});
define('aurelia-templating-resources/binding-signaler',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BindingSignaler = undefined;

  

  var BindingSignaler = exports.BindingSignaler = function () {
    function BindingSignaler() {
      

      this.signals = {};
    }

    BindingSignaler.prototype.signal = function signal(name) {
      var bindings = this.signals[name];
      if (!bindings) {
        return;
      }
      var i = bindings.length;
      while (i--) {
        bindings[i].call(_aureliaBinding.sourceContext);
      }
    };

    return BindingSignaler;
  }();
});
define('aurelia-templating-resources/update-trigger-binding-behavior',['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpdateTriggerBindingBehavior = undefined;

  

  var _class, _temp;

  var eventNamesRequired = 'The updateTrigger binding behavior requires at least one event name argument: eg <input value.bind="firstName & updateTrigger:\'blur\'">';
  var notApplicableMessage = 'The updateTrigger binding behavior can only be applied to two-way bindings on input/select elements.';

  var UpdateTriggerBindingBehavior = exports.UpdateTriggerBindingBehavior = (_temp = _class = function () {
    function UpdateTriggerBindingBehavior(eventManager) {
      

      this.eventManager = eventManager;
    }

    UpdateTriggerBindingBehavior.prototype.bind = function bind(binding, source) {
      for (var _len = arguments.length, events = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        events[_key - 2] = arguments[_key];
      }

      if (events.length === 0) {
        throw new Error(eventNamesRequired);
      }
      if (binding.mode !== _aureliaBinding.bindingMode.twoWay) {
        throw new Error(notApplicableMessage);
      }

      var targetObserver = binding.observerLocator.getObserver(binding.target, binding.targetProperty);
      if (!targetObserver.handler) {
        throw new Error(notApplicableMessage);
      }
      binding.targetObserver = targetObserver;

      targetObserver.originalHandler = binding.targetObserver.handler;

      var handler = this.eventManager.createElementHandler(events);
      targetObserver.handler = handler;
    };

    UpdateTriggerBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.targetObserver.handler = binding.targetObserver.originalHandler;
      binding.targetObserver.originalHandler = null;
    };

    return UpdateTriggerBindingBehavior;
  }(), _class.inject = [_aureliaBinding.EventManager], _temp);
});
define('aurelia-templating-resources/html-resource-plugin',['exports', 'aurelia-templating', './dynamic-element'], function (exports, _aureliaTemplating, _dynamicElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getElementName = getElementName;
  exports.configure = configure;
  function getElementName(address) {
    return (/([^\/^\?]+)\.html/i.exec(address)[1].toLowerCase()
    );
  }

  function configure(config) {
    var viewEngine = config.container.get(_aureliaTemplating.ViewEngine);
    var loader = config.aurelia.loader;

    viewEngine.addResourcePlugin('.html', {
      'fetch': function fetch(address) {
        return loader.loadTemplate(address).then(function (registryEntry) {
          var _ref;

          var bindable = registryEntry.template.getAttribute('bindable');
          var elementName = getElementName(address);

          if (bindable) {
            bindable = bindable.split(',').map(function (x) {
              return x.trim();
            });
            registryEntry.template.removeAttribute('bindable');
          } else {
            bindable = [];
          }

          return _ref = {}, _ref[elementName] = (0, _dynamicElement._createDynamicElement)(elementName, address, bindable), _ref;
        });
      }
    });
  }
});
define('aurelia-templating-resources/dynamic-element',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._createDynamicElement = _createDynamicElement;

  

  function _createDynamicElement(name, viewUrl, bindableNames) {
    var _dec, _dec2, _class;

    var DynamicElement = (_dec = (0, _aureliaTemplating.customElement)(name), _dec2 = (0, _aureliaTemplating.useView)(viewUrl), _dec(_class = _dec2(_class = function () {
      function DynamicElement() {
        
      }

      DynamicElement.prototype.bind = function bind(bindingContext) {
        this.$parent = bindingContext;
      };

      return DynamicElement;
    }()) || _class) || _class);

    for (var i = 0, ii = bindableNames.length; i < ii; ++i) {
      (0, _aureliaTemplating.bindable)(bindableNames[i])(DynamicElement);
    }
    return DynamicElement;
  }
});
define('aurelia-i18n/i18n',['exports', 'i18next', 'aurelia-pal', 'aurelia-event-aggregator', 'aurelia-templating-resources'], function (exports, _i18next, _aureliaPal, _aureliaEventAggregator, _aureliaTemplatingResources) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.I18N = undefined;

  var _i18next2 = _interopRequireDefault(_i18next);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  

  var _class, _temp;

  var I18N = exports.I18N = (_temp = _class = function () {
    function I18N(ea, signaler) {
      var _this = this;

      

      this.globalVars = {};
      this.params = {};
      this.i18nextDefered = {
        resolve: null,
        promise: null
      };

      this.i18next = _i18next2.default;
      this.ea = ea;
      this.Intl = window.Intl;
      this.signaler = signaler;
      this.i18nextDefered.promise = new Promise(function (resolve) {
        return _this.i18nextDefered.resolve = resolve;
      });
    }

    I18N.prototype.setup = function setup(options) {
      var _this2 = this;

      var defaultOptions = {
        compatibilityAPI: 'v1',
        compatibilityJSON: 'v1',
        lng: 'en',
        attributes: ['t', 'i18n'],
        fallbackLng: 'en',
        debug: false
      };

      _i18next2.default.init(options || defaultOptions, function (err, t) {
        if (_i18next2.default.options.attributes instanceof String) {
          _i18next2.default.options.attributes = [_i18next2.default.options.attributes];
        }

        _this2.i18nextDefered.resolve(_this2.i18next);
      });

      return this.i18nextDefered.promise;
    };

    I18N.prototype.i18nextReady = function i18nextReady() {
      return this.i18nextDefered.promise;
    };

    I18N.prototype.setLocale = function setLocale(locale) {
      var _this3 = this;

      return new Promise(function (resolve) {
        var oldLocale = _this3.getLocale();
        _this3.i18next.changeLanguage(locale, function (err, tr) {
          _this3.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
          _this3.signaler.signal('aurelia-translation-signal');
          resolve(tr);
        });
      });
    };

    I18N.prototype.getLocale = function getLocale() {
      return this.i18next.language;
    };

    I18N.prototype.nf = function nf(options, locales) {
      return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
    };

    I18N.prototype.uf = function uf(number, locale) {
      var nf = this.nf({}, locale || this.getLocale());
      var comparer = nf.format(10000 / 3);

      var thousandSeparator = comparer[1];
      var decimalSeparator = comparer[5];

      var result = number.replace(thousandSeparator, '').replace(/[^\d.,-]/g, '').replace(decimalSeparator, '.');

      return Number(result);
    };

    I18N.prototype.df = function df(options, locales) {
      return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
    };

    I18N.prototype.tr = function tr(key, options) {
      var fullOptions = this.globalVars;

      if (options !== undefined) {
        fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
      }

      return this.i18next.t(key, fullOptions);
    };

    I18N.prototype.registerGlobalVariable = function registerGlobalVariable(key, value) {
      this.globalVars[key] = value;
    };

    I18N.prototype.unregisterGlobalVariable = function unregisterGlobalVariable(key) {
      delete this.globalVars[key];
    };

    I18N.prototype.updateTranslations = function updateTranslations(el) {
      if (!el || !el.querySelectorAll) {
        return;
      }

      var i = void 0;
      var l = void 0;

      var selector = [].concat(this.i18next.options.attributes);
      for (i = 0, l = selector.length; i < l; i++) {
        selector[i] = '[' + selector[i] + ']';
      }selector = selector.join(',');

      var nodes = el.querySelectorAll(selector);
      for (i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        var keys = void 0;

        for (var i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
          keys = node.getAttribute(this.i18next.options.attributes[i2]);
          if (keys) break;
        }

        if (!keys) continue;

        this.updateValue(node, keys);
      }
    };

    I18N.prototype.updateValue = function updateValue(node, value, params) {
      if (value === null || value === undefined) {
        return;
      }

      var keys = value.split(';');
      var i = keys.length;

      while (i--) {
        var key = keys[i];

        var re = /\[([a-z\-]*)\]/ig;

        var m = void 0;
        var attr = 'text';

        if (node.nodeName === 'IMG') attr = 'src';

        while ((m = re.exec(key)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }
          if (m) {
            key = key.replace(m[0], '');
            attr = m[1];
          }
        }

        if (!node._textContent) node._textContent = node.textContent;
        if (!node._innerHTML) node._innerHTML = node.innerHTML;

        attr = attr.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });

        switch (attr) {
          case 'text':
            var newChild = _aureliaPal.DOM.createTextNode(this.tr(key, params));
            if (node._newChild) {
              node.removeChild(node._newChild);
            }

            node._newChild = newChild;
            while (node.firstChild) {
              node.removeChild(node.firstChild);
            }
            node.appendChild(node._newChild);
            break;
          case 'prepend':
            var prependParser = _aureliaPal.DOM.createElement('div');
            prependParser.innerHTML = this.tr(key, params);
            for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
              if (node.childNodes[ni]._prepended) {
                node.removeChild(node.childNodes[ni]);
              }
            }

            for (var pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
              prependParser.childNodes[pi]._prepended = true;
              if (node.firstChild) {
                node.insertBefore(prependParser.childNodes[pi], node.firstChild);
              } else {
                node.appendChild(prependParser.childNodes[pi]);
              }
            }
            break;
          case 'append':
            var appendParser = _aureliaPal.DOM.createElement('div');
            appendParser.innerHTML = this.tr(key, params);
            for (var _ni = node.childNodes.length - 1; _ni >= 0; _ni--) {
              if (node.childNodes[_ni]._appended) {
                node.removeChild(node.childNodes[_ni]);
              }
            }

            while (appendParser.firstChild) {
              appendParser.firstChild._appended = true;
              node.appendChild(appendParser.firstChild);
            }
            break;
          case 'html':
            node.innerHTML = this.tr(key, params);
            break;
          default:
            if (node.au && node.au.controller && node.au.controller.viewModel && node.au.controller.viewModel[attr]) {
              node.au.controller.viewModel[attr] = this.tr(key, params);
            } else {
              node.setAttribute(attr, this.tr(key, params));
            }

            break;
        }
      }
    };

    return I18N;
  }(), _class.inject = [_aureliaEventAggregator.EventAggregator, _aureliaTemplatingResources.BindingSignaler], _temp);
});
define('aurelia-i18n/relativeTime',['exports', './i18n', './defaultTranslations/relative.time', 'aurelia-event-aggregator'], function (exports, _i18n, _relative, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RelativeTime = undefined;

  

  var RelativeTime = exports.RelativeTime = function () {
    RelativeTime.inject = function inject() {
      return [_i18n.I18N, _aureliaEventAggregator.EventAggregator];
    };

    function RelativeTime(i18n, ea) {
      var _this = this;

      

      this.service = i18n;
      this.ea = ea;

      this.service.i18nextReady().then(function () {
        _this.setup();
      });
      this.ea.subscribe('i18n:locale:changed', function (locales) {
        _this.setup(locales);
      });
    }

    RelativeTime.prototype.setup = function setup(locales) {
      var trans = _relative.translations.default || _relative.translations;
      var key = locales && locales.newValue ? locales.newValue : this.service.getLocale();
      var fallbackLng = this.service.i18next.fallbackLng;
      var index = 0;

      if ((index = key.indexOf('-')) >= 0) {
        var baseLocale = key.substring(0, index);

        if (trans[baseLocale]) {
          this.addTranslationResource(baseLocale, trans[baseLocale].translation);
        }
      }

      if (trans[key]) {
        this.addTranslationResource(key, trans[key].translation);
      }
      if (trans[fallbackLng]) {
        this.addTranslationResource(key, trans[fallbackLng].translation);
      }
    };

    RelativeTime.prototype.addTranslationResource = function addTranslationResource(key, translation) {
      var options = this.service.i18next.options;

      if (options.interpolation && options.interpolation.prefix !== '__' || options.interpolation.suffix !== '__') {
        for (var subkey in translation) {
          translation[subkey] = translation[subkey].replace('__count__', options.interpolation.prefix + 'count' + options.interpolation.suffix);
        }
      }

      this.service.i18next.addResources(key, options.defaultNS, translation);
    };

    RelativeTime.prototype.getRelativeTime = function getRelativeTime(time) {
      var now = new Date();
      var diff = now.getTime() - time.getTime();

      var timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
      if (!timeDiff) {
        timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, 'hour', 3600000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, 'minute', 60000);
              if (!timeDiff) {
                timeDiff = this.getTimeDiffDescription(diff, 'second', 1000);
                if (!timeDiff) {
                  timeDiff = this.service.tr('now');
                }
              }
            }
          }
        }
      }

      return timeDiff;
    };

    RelativeTime.prototype.getTimeDiffDescription = function getTimeDiffDescription(diff, unit, timeDivisor) {
      var unitAmount = (diff / timeDivisor).toFixed(0);
      if (unitAmount > 0) {
        return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
      } else if (unitAmount < 0) {
        var abs = Math.abs(unitAmount);
        return this.service.tr(unit, { count: abs, context: 'in' });
      }

      return null;
    };

    return RelativeTime;
  }();
});
define('aurelia-i18n/defaultTranslations/relative.time',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var translations = exports.translations = {
    ar: {
      translation: {
        'now': 'الآن',
        'second_ago': 'منذ __count__ ثانية',
        'second_ago_plural': 'منذ __count__ ثواني',
        'second_in': 'في __count__ ثانية',
        'second_in_plural': 'في __count__ ثواني',
        'minute_ago': 'منذ __count__ دقيقة',
        'minute_ago_plural': 'منذ __count__ دقائق',
        'minute_in': 'في __count__ دقيقة',
        'minute_in_plural': 'في __count__ دقائق',
        'hour_ago': 'منذ __count__ ساعة',
        'hour_ago_plural': 'منذ __count__ ساعات',
        'hour_in': 'في __count__ ساعة',
        'hour_in_plural': 'في __count__ ساعات',
        'day_ago': 'منذ __count__ يوم',
        'day_ago_plural': 'منذ __count__ أيام',
        'day_in': 'في __count__ يوم',
        'day_in_plural': 'في __count__ أيام'
      }
    },
    en: {
      translation: {
        'now': 'just now',
        'second_ago': '__count__ second ago',
        'second_ago_plural': '__count__ seconds ago',
        'second_in': 'in __count__ second',
        'second_in_plural': 'in __count__ seconds',
        'minute_ago': '__count__ minute ago',
        'minute_ago_plural': '__count__ minutes ago',
        'minute_in': 'in __count__ minute',
        'minute_in_plural': 'in __count__ minutes',
        'hour_ago': '__count__ hour ago',
        'hour_ago_plural': '__count__ hours ago',
        'hour_in': 'in __count__ hour',
        'hour_in_plural': 'in __count__ hours',
        'day_ago': '__count__ day ago',
        'day_ago_plural': '__count__ days ago',
        'day_in': 'in __count__ day',
        'day_in_plural': 'in __count__ days',
        'month_ago': '__count__ month ago',
        'month_ago_plural': '__count__ months ago',
        'month_in': 'in __count__ month',
        'month_in_plural': 'in __count__ months',
        'year_ago': '__count__ year ago',
        'year_ago_plural': '__count__ years ago',
        'year_in': 'in __count__ year',
        'year_in_plural': 'in __count__ years'
      }
    },
    it: {
      translation: {
        'now': 'adesso',
        'second_ago': '__count__ secondo fa',
        'second_ago_plural': '__count__ secondi fa',
        'second_in': 'in __count__ secondo',
        'second_in_plural': 'in __count__ secondi',
        'minute_ago': '__count__ minuto fa',
        'minute_ago_plural': '__count__ minuti fa',
        'minute_in': 'in __count__ minuto',
        'minute_in_plural': 'in __count__ minuti',
        'hour_ago': '__count__ ora fa',
        'hour_ago_plural': '__count__ ore fa',
        'hour_in': 'in __count__ ora',
        'hour_in_plural': 'in __count__ ore',
        'day_ago': '__count__ giorno fa',
        'day_ago_plural': '__count__ giorni fa',
        'day_in': 'in __count__ giorno',
        'day_in_plural': 'in __count__ giorni',
        'month_ago': '__count__ mese fa',
        'month_ago_plural': '__count__ mesi fa',
        'month_in': 'in __count__ mese',
        'month_in_plural': 'in __count__ mesi',
        'year_ago': '__count__ anno fa',
        'year_ago_plural': '__count__ anni fa',
        'year_in': 'in __count__ anno',
        'year_in_plural': 'in __count__ anni'
      }
    },
    de: {
      translation: {
        'now': 'jetzt gerade',
        'second_ago': 'vor __count__ Sekunde',
        'second_ago_plural': 'vor __count__ Sekunden',
        'second_in': 'in __count__ Sekunde',
        'second_in_plural': 'in __count__ Sekunden',
        'minute_ago': 'vor __count__ Minute',
        'minute_ago_plural': 'vor __count__ Minuten',
        'minute_in': 'in __count__ Minute',
        'minute_in_plural': 'in __count__ Minuten',
        'hour_ago': 'vor __count__ Stunde',
        'hour_ago_plural': 'vor __count__ Stunden',
        'hour_in': 'in __count__ Stunde',
        'hour_in_plural': 'in __count__ Stunden',
        'day_ago': 'vor __count__ Tag',
        'day_ago_plural': 'vor __count__ Tagen',
        'day_in': 'in __count__ Tag',
        'day_in_plural': 'in __count__ Tagen',
        'month_ago': 'vor __count__ Monat',
        'month_ago_plural': 'vor __count__ Monaten',
        'month_in': 'in __count__ Monat',
        'month_in_plural': 'in __count__ Monaten',
        'year_ago': 'vor __count__ Jahr',
        'year_ago_plural': 'vor __count__ Jahren',
        'year_in': 'in __count__ Jahr',
        'year_in_plural': 'in __count__ Jahren'
      }
    },
    nl: {
      translation: {
        'now': 'zonet',
        'second_ago': '__count__ seconde geleden',
        'second_ago_plural': '__count__ seconden geleden',
        'second_in': 'in __count__ seconde',
        'second_in_plural': 'in __count__ seconden',
        'minute_ago': '__count__ minuut geleden',
        'minute_ago_plural': '__count__ minuten geleden',
        'minute_in': 'in __count__ minuut',
        'minute_in_plural': 'in __count__ minuten',
        'hour_ago': '__count__ uur geleden',
        'hour_ago_plural': '__count__ uren geleden',
        'hour_in': 'in __count__ uur',
        'hour_in_plural': 'in __count__ uren',
        'day_ago': '__count__ dag geleden',
        'day_ago_plural': '__count__ dagen geleden',
        'day_in': 'in __count__ dag',
        'day_in_plural': 'in __count__ dagen',
        'month_ago': '__count__ maand geleden',
        'month_ago_plural': '__count__ maanden geleden',
        'month_in': 'in __count__ maand',
        'month_in_plural': 'in __count__ maanden',
        'year_ago': '__count__ jaar geleden',
        'year_ago_plural': '__count__ jaren geleden',
        'year_in': 'in __count__ jaar',
        'year_in_plural': 'in __count__ jaren'
      }
    },
    fr: {
      translation: {
        'now': 'maintenant',
        'second_ago': '__count__ seconde plus tôt',
        'second_ago_plural': '__count__ secondes plus tôt',
        'second_in': 'en __count__ seconde',
        'second_in_plural': 'en __count__ secondes',
        'minute_ago': '__count__ minute plus tôt',
        'minute_ago_plural': '__count__ minutes plus tôt',
        'minute_in': 'en __count__ minute',
        'minute_in_plural': 'en __count__ minutes',
        'hour_ago': '__count__ heure plus tôt',
        'hour_ago_plural': '__count__ heures plus tôt',
        'hour_in': 'en __count__ heure',
        'hour_in_plural': 'en __count__ heures',
        'day_ago': '__count__ jour plus tôt',
        'day_ago_plural': '__count__ jours plus tôt',
        'day_in': 'en __count__ jour',
        'day_in_plural': 'en __count__ jours'
      }
    },
    th: {
      translation: {
        'now': 'เมื่อกี้',
        'second_ago': '__count__ วินาที ที่ผ่านมา',
        'second_ago_plural': '__count__ วินาที ที่ผ่านมา',
        'second_in': 'อีก __count__ วินาที',
        'second_in_plural': 'อีก __count__ วินาที',
        'minute_ago': '__count__ นาที ที่ผ่านมา',
        'minute_ago_plural': '__count__ นาที ที่ผ่านมา',
        'minute_in': 'อีก __count__ นาที',
        'minute_in_plural': 'อีก __count__ นาที',
        'hour_ago': '__count__ ชั่วโมง ที่ผ่านมา',
        'hour_ago_plural': '__count__ ชั่วโมง ที่ผ่านมา',
        'hour_in': 'อีก __count__ ชั่วโมง',
        'hour_in_plural': 'อีก __count__ ชั่วโมง',
        'day_ago': '__count__ วัน ที่ผ่านมา',
        'day_ago_plural': '__count__ วัน ที่ผ่านมา',
        'day_in': 'อีก __count__ วัน',
        'day_in_plural': 'อีก __count__ วัน'
      }
    },
    sv: {
      translation: {
        'now': 'just nu',
        'second_ago': '__count__ sekund sedan',
        'second_ago_plural': '__count__ sekunder sedan',
        'second_in': 'om __count__ sekund',
        'second_in_plural': 'om __count__ sekunder',
        'minute_ago': '__count__ minut sedan',
        'minute_ago_plural': '__count__ minuter sedan',
        'minute_in': 'om __count__ minut',
        'minute_in_plural': 'om __count__ minuter',
        'hour_ago': '__count__ timme sedan',
        'hour_ago_plural': '__count__ timmar sedan',
        'hour_in': 'om __count__ timme',
        'hour_in_plural': 'om __count__ timmar',
        'day_ago': '__count__ dag sedan',
        'day_ago_plural': '__count__ dagar sedan',
        'day_in': 'om __count__ dag',
        'day_in_plural': 'om __count__ dagar'
      }
    },
    da: {
      translation: {
        'now': 'lige nu',
        'second_ago': '__count__ sekunder siden',
        'second_ago_plural': '__count__ sekunder siden',
        'second_in': 'om __count__ sekund',
        'second_in_plural': 'om __count__ sekunder',
        'minute_ago': '__count__ minut siden',
        'minute_ago_plural': '__count__ minutter siden',
        'minute_in': 'om __count__ minut',
        'minute_in_plural': 'om __count__ minutter',
        'hour_ago': '__count__ time siden',
        'hour_ago_plural': '__count__ timer siden',
        'hour_in': 'om __count__ time',
        'hour_in_plural': 'om __count__ timer',
        'day_ago': '__count__ dag siden',
        'day_ago_plural': '__count__ dage siden',
        'day_in': 'om __count__ dag',
        'day_in_plural': 'om __count__ dage'
      }
    },
    no: {
      translation: {
        'now': 'akkurat nå',
        'second_ago': '__count__ sekund siden',
        'second_ago_plural': '__count__ sekunder siden',
        'second_in': 'om __count__ sekund',
        'second_in_plural': 'om __count__ sekunder',
        'minute_ago': '__count__ minutt siden',
        'minute_ago_plural': '__count__ minutter siden',
        'minute_in': 'om __count__ minutt',
        'minute_in_plural': 'om __count__ minutter',
        'hour_ago': '__count__ time siden',
        'hour_ago_plural': '__count__ timer siden',
        'hour_in': 'om __count__ time',
        'hour_in_plural': 'om __count__ timer',
        'day_ago': '__count__ dag siden',
        'day_ago_plural': '__count__ dager siden',
        'day_in': 'om __count__ dag',
        'day_in_plural': 'om __count__ dager'
      }
    },
    jp: {
      translation: {
        'now': 'たった今',
        'second_ago': '__count__ 秒前',
        'second_ago_plural': '__count__ 秒前',
        'second_in': 'あと __count__ 秒',
        'second_in_plural': 'あと __count__ 秒',
        'minute_ago': '__count__ 分前',
        'minute_ago_plural': '__count__ 分前',
        'minute_in': 'あと __count__ 分',
        'minute_in_plural': 'あと __count__ 分',
        'hour_ago': '__count__ 時間前',
        'hour_ago_plural': '__count__ 時間前',
        'hour_in': 'あと __count__ 時間',
        'hour_in_plural': 'あと __count__ 時間',
        'day_ago': '__count__ 日間前',
        'day_ago_plural': '__count__ 日間前',
        'day_in': 'あと __count__ 日間',
        'day_in_plural': 'あと __count__ 日間'
      }
    },
    pt: {
      translation: {
        'now': 'neste exato momento',
        'second_ago': '__count__ segundo atrás',
        'second_ago_plural': '__count__ segundos atrás',
        'second_in': 'em __count__ segundo',
        'second_in_plural': 'em __count__ segundos',
        'minute_ago': '__count__ minuto atrás',
        'minute_ago_plural': '__count__ minutos atrás',
        'minute_in': 'em __count__ minuto',
        'minute_in_plural': 'em __count__ minutos',
        'hour_ago': '__count__ hora atrás',
        'hour_ago_plural': '__count__ horas atrás',
        'hour_in': 'em __count__ hora',
        'hour_in_plural': 'em __count__ horas',
        'day_ago': '__count__ dia atrás',
        'day_ago_plural': '__count__ dias atrás',
        'day_in': 'em __count__ dia',
        'day_in_plural': 'em __count__ dias',
        'month_ago': '__count__ mês atrás',
        'month_ago_plural': '__count__ meses atrás',
        'month_in': 'em __count__ mês',
        'month_in_plural': 'em __count__ meses',
        'year_ago': '__count__ ano atrás',
        'year_ago_plural': '__count__ anos atrás',
        'year_in': 'em __count__ ano',
        'year_in_plural': 'em __count__ anos'
      }
    },
    zh: {
      translation: {
        'now': '刚才',
        'second_ago': '__count__ 秒钟前',
        'second_ago_plural': '__count__ 秒钟前',
        'second_in': '__count__ 秒内',
        'second_in_plural': '__count__ 秒内',
        'minute_ago': '__count__ 分钟前',
        'minute_ago_plural': '__count__ 分钟前',
        'minute_in': '__count__ 分钟内',
        'minute_in_plural': '__count__ 分钟内',
        'hour_ago': '__count__ 小时前',
        'hour_ago_plural': '__count__ 小时前',
        'hour_in': '__count__ 小时内',
        'hour_in_plural': '__count__ 小时内',
        'day_ago': '__count__ 天前',
        'day_ago_plural': '__count__ 天前',
        'day_in': '__count__ 天内',
        'day_in_plural': '__count__ 天内',
        'month_ago': '__count__ 月前',
        'month_ago_plural': '__count__ 月前',
        'month_in': '__count__ 月内',
        'month_in_plural': '__count__ 月内',
        'year_ago': '__count__ 年前',
        'year_ago_plural': '__count__ 年前',
        'year_in': '__count__ 年内',
        'year_in_plural': '__count__ 年内'
      }
    },
    'zh-CN': {
      translation: {
        'now': '刚才',
        'second_ago': '__count__ 秒钟前',
        'second_ago_plural': '__count__ 秒钟前',
        'second_in': '__count__ 秒内',
        'second_in_plural': '__count__ 秒内',
        'minute_ago': '__count__ 分钟前',
        'minute_ago_plural': '__count__ 分钟前',
        'minute_in': '__count__ 分钟内',
        'minute_in_plural': '__count__ 分钟内',
        'hour_ago': '__count__ 小时前',
        'hour_ago_plural': '__count__ 小时前',
        'hour_in': '__count__ 小时内',
        'hour_in_plural': '__count__ 小时内',
        'day_ago': '__count__ 天前',
        'day_ago_plural': '__count__ 天前',
        'day_in': '__count__ 天内',
        'day_in_plural': '__count__ 天内',
        'month_ago': '__count__ 月前',
        'month_ago_plural': '__count__ 月前',
        'month_in': '__count__ 月内',
        'month_in_plural': '__count__ 月内',
        'year_ago': '__count__ 年前',
        'year_ago_plural': '__count__ 年前',
        'year_in': '__count__ 年内',
        'year_in_plural': '__count__ 年内'
      }
    },
    'zh-HK': {
      translation: {
        'now': '剛才',
        'second_ago': '__count__ 秒鐘前',
        'second_ago_plural': '__count__ 秒鐘前',
        'second_in': '__count__ 秒內',
        'second_in_plural': '__count__ 秒內',
        'minute_ago': '__count__ 分鐘前',
        'minute_ago_plural': '__count__ 分鐘前',
        'minute_in': '__count__ 分鐘內',
        'minute_in_plural': '__count__ 分鐘內',
        'hour_ago': '__count__ 小時前',
        'hour_ago_plural': '__count__ 小時前',
        'hour_in': '__count__ 小時內',
        'hour_in_plural': '__count__ 小時內',
        'day_ago': '__count__ 天前',
        'day_ago_plural': '__count__ 天前',
        'day_in': '__count__ 天內',
        'day_in_plural': '__count__ 天內',
        'month_ago': '__count__ 月前',
        'month_ago_plural': '__count__ 月前',
        'month_in': '__count__ 月內',
        'month_in_plural': '__count__ 月內',
        'year_ago': '__count__ 年前',
        'year_ago_plural': '__count__ 年前',
        'year_in': '__count__ 年內',
        'year_in_plural': '__count__ 年內'
      }
    },
    'zh-TW': {
      translation: {
        'now': '剛才',
        'second_ago': '__count__ 秒鐘前',
        'second_ago_plural': '__count__ 秒鐘前',
        'second_in': '__count__ 秒內',
        'second_in_plural': '__count__ 秒內',
        'minute_ago': '__count__ 分鐘前',
        'minute_ago_plural': '__count__ 分鐘前',
        'minute_in': '__count__ 分鐘內',
        'minute_in_plural': '__count__ 分鐘內',
        'hour_ago': '__count__ 小時前',
        'hour_ago_plural': '__count__ 小時前',
        'hour_in': '__count__ 小時內',
        'hour_in_plural': '__count__ 小時內',
        'day_ago': '__count__ 天前',
        'day_ago_plural': '__count__ 天前',
        'day_in': '__count__ 天內',
        'day_in_plural': '__count__ 天內',
        'month_ago': '__count__ 月前',
        'month_ago_plural': '__count__ 月前',
        'month_in': '__count__ 月內',
        'month_in_plural': '__count__ 月內',
        'year_ago': '__count__ 年前',
        'year_ago_plural': '__count__ 年前',
        'year_in': '__count__ 年內',
        'year_in_plural': '__count__ 年內'
      }
    }
  };
});
define('aurelia-i18n/df',['exports', 'aurelia-logging', './i18n', 'aurelia-templating-resources', 'aurelia-binding'], function (exports, _aureliaLogging, _i18n, _aureliaTemplatingResources, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DfBindingBehavior = exports.DfValueConverter = undefined;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  

  var DfValueConverter = exports.DfValueConverter = function () {
    DfValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };

    function DfValueConverter(i18n) {
      

      this.service = i18n;
    }

    DfValueConverter.prototype.toView = function toView(value, dfOrOptions, locale, df) {
      if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
        return value;
      }

      if (dfOrOptions && typeof dfOrOptions.format === 'function') {
        return dfOrOptions.format(value);
      } else if (df) {
        var i18nLogger = LogManager.getLogger('i18n');
        i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]');
      } else {
        df = this.service.df(dfOrOptions, locale || this.service.getLocale());
      }

      if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
        value = new Date(value);
      }

      return df.format(value);
    };

    return DfValueConverter;
  }();

  var DfBindingBehavior = exports.DfBindingBehavior = function () {
    DfBindingBehavior.inject = function inject() {
      return [_aureliaTemplatingResources.SignalBindingBehavior];
    };

    function DfBindingBehavior(signalBindingBehavior) {
      

      this.signalBindingBehavior = signalBindingBehavior;
    }

    DfBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

      var sourceExpression = binding.sourceExpression;

      if (sourceExpression.rewritten) {
        return;
      }
      sourceExpression.rewritten = true;

      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'df', sourceExpression.args, [expression].concat(sourceExpression.args));
    };

    DfBindingBehavior.prototype.unbind = function unbind(binding, source) {
      this.signalBindingBehavior.unbind(binding, source);
    };

    return DfBindingBehavior;
  }();
});
define('aurelia-i18n/nf',['exports', 'aurelia-logging', './i18n', 'aurelia-templating-resources', 'aurelia-binding'], function (exports, _aureliaLogging, _i18n, _aureliaTemplatingResources, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NfBindingBehavior = exports.NfValueConverter = undefined;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  

  var NfValueConverter = exports.NfValueConverter = function () {
    NfValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };

    function NfValueConverter(i18n) {
      

      this.service = i18n;
    }

    NfValueConverter.prototype.toView = function toView(value, nfOrOptions, locale, nf) {
      if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
        return value;
      }

      if (nfOrOptions && typeof nfOrOptions.format === 'function') {
        return nfOrOptions.format(value);
      } else if (nf) {
        var i18nLogger = LogManager.getLogger('i18n');
        i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
      } else {
        nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
      }

      return nf.format(value);
    };

    return NfValueConverter;
  }();

  var NfBindingBehavior = exports.NfBindingBehavior = function () {
    NfBindingBehavior.inject = function inject() {
      return [_aureliaTemplatingResources.SignalBindingBehavior];
    };

    function NfBindingBehavior(signalBindingBehavior) {
      

      this.signalBindingBehavior = signalBindingBehavior;
    }

    NfBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

      var sourceExpression = binding.sourceExpression;

      if (sourceExpression.rewritten) {
        return;
      }
      sourceExpression.rewritten = true;

      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'nf', sourceExpression.args, [expression].concat(sourceExpression.args));
    };

    NfBindingBehavior.prototype.unbind = function unbind(binding, source) {
      this.signalBindingBehavior.unbind(binding, source);
    };

    return NfBindingBehavior;
  }();
});
define('aurelia-i18n/rt',['exports', './relativeTime'], function (exports, _relativeTime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RtValueConverter = undefined;

  

  var RtValueConverter = exports.RtValueConverter = function () {
    RtValueConverter.inject = function inject() {
      return [_relativeTime.RelativeTime];
    };

    function RtValueConverter(relativeTime) {
      

      this.service = relativeTime;
    }

    RtValueConverter.prototype.toView = function toView(value) {
      if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
        return value;
      }

      if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
        value = new Date(value);
      }

      return this.service.getRelativeTime(value);
    };

    return RtValueConverter;
  }();
});
define('aurelia-i18n/t',['exports', './i18n', 'aurelia-event-aggregator', 'aurelia-templating', 'aurelia-templating-resources', 'aurelia-binding', './utils'], function (exports, _i18n, _aureliaEventAggregator, _aureliaTemplating, _aureliaTemplatingResources, _aureliaBinding, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TBindingBehavior = exports.TCustomAttribute = exports.TParamsCustomAttribute = exports.TValueConverter = undefined;

  var _dec, _class, _class2, _temp, _dec2, _class3, _class4, _temp2, _class5, _temp3;

  

  var TValueConverter = exports.TValueConverter = function () {
    TValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };

    function TValueConverter(i18n) {
      

      this.service = i18n;
    }

    TValueConverter.prototype.toView = function toView(value, options) {
      return this.service.tr(value, options);
    };

    return TValueConverter;
  }();

  var TParamsCustomAttribute = exports.TParamsCustomAttribute = (_dec = (0, _aureliaTemplating.customAttribute)('t-params'), _dec(_class = (_temp = _class2 = function () {
    function TParamsCustomAttribute(element) {
      

      this.element = element;
    }

    TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

    return TParamsCustomAttribute;
  }(), _class2.inject = [Element], _temp)) || _class);
  var TCustomAttribute = exports.TCustomAttribute = (_dec2 = (0, _aureliaTemplating.customAttribute)('t'), _dec2(_class3 = (_temp2 = _class4 = function () {
    function TCustomAttribute(element, i18n, ea, tparams) {
      

      this.element = element;
      this.service = i18n;
      this.ea = ea;
      this.lazyParams = tparams;
    }

    TCustomAttribute.prototype.bind = function bind() {
      var _this = this;

      this.params = this.lazyParams();

      if (this.params) {
        this.params.valueChanged = function (newParams, oldParams) {
          _this.paramsChanged(_this.value, newParams, oldParams);
        };
      }

      var p = this.params !== null ? this.params.value : undefined;
      this.subscription = this.ea.subscribe('i18n:locale:changed', function () {
        _this.service.updateValue(_this.element, _this.value, _this.params !== null ? _this.params.value : undefined);
      });

      this.service.updateValue(this.element, this.value, p);
    };

    TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
      this.service.updateValue(this.element, newValue, newParams);
    };

    TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
      var p = this.params !== null ? this.params.value : undefined;
      this.service.updateValue(this.element, newValue, p);
    };

    TCustomAttribute.prototype.unbind = function unbind() {
      if (this.subscription) {
        this.subscription.dispose();
      }
    };

    return TCustomAttribute;
  }(), _class4.inject = [Element, _i18n.I18N, _aureliaEventAggregator.EventAggregator, _utils.LazyOptional.of(TParamsCustomAttribute)], _temp2)) || _class3);
  var TBindingBehavior = exports.TBindingBehavior = (_temp3 = _class5 = function () {
    function TBindingBehavior(signalBindingBehavior) {
      

      this.signalBindingBehavior = signalBindingBehavior;
    }

    TBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

      var sourceExpression = binding.sourceExpression;

      if (sourceExpression.rewritten) {
        return;
      }
      sourceExpression.rewritten = true;

      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
    };

    TBindingBehavior.prototype.unbind = function unbind(binding, source) {
      this.signalBindingBehavior.unbind(binding, source);
    };

    return TBindingBehavior;
  }(), _class5.inject = [_aureliaTemplatingResources.SignalBindingBehavior], _temp3);
});
define('aurelia-i18n/utils',['exports', 'aurelia-dependency-injection'], function (exports, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LazyOptional = exports.assignObjectToKeys = exports.extend = undefined;

  

  var _dec, _class;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var extend = exports.extend = function extend(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }

    return destination;
  };

  var assignObjectToKeys = exports.assignObjectToKeys = function assignObjectToKeys(root, obj) {
    if (obj === undefined || obj === null) {
      return obj;
    }

    var opts = {};

    Object.keys(obj).map(function (key) {
      if (_typeof(obj[key]) === 'object') {
        extend(opts, assignObjectToKeys(key, obj[key]));
      } else {
        opts[root !== '' ? root + '.' + key : key] = obj[key];
      }
    });

    return opts;
  };

  var LazyOptional = exports.LazyOptional = (_dec = (0, _aureliaDependencyInjection.resolver)(), _dec(_class = function () {
    function LazyOptional(key) {
      

      this.key = key;
    }

    LazyOptional.prototype.get = function get(container) {
      var _this = this;

      return function () {
        if (container.hasResolver(_this.key, false)) {
          return container.get(_this.key);
        }
        return null;
      };
    };

    LazyOptional.of = function of(key) {
      return new LazyOptional(key);
    };

    return LazyOptional;
  }()) || _class);
});
define('aurelia-i18n/base-i18n',['exports', './i18n', 'aurelia-event-aggregator'], function (exports, _i18n, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BaseI18N = undefined;

  

  var _class, _temp;

  var BaseI18N = exports.BaseI18N = (_temp = _class = function () {
    function BaseI18N(i18n, element, ea) {
      var _this = this;

      

      this.i18n = i18n;
      this.element = element;

      this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function () {
        _this.i18n.updateTranslations(_this.element);
      });
    }

    BaseI18N.prototype.attached = function attached() {
      this.i18n.updateTranslations(this.element);
    };

    BaseI18N.prototype.detached = function detached() {
      this.__i18nDisposer.dispose();
    };

    return BaseI18N;
  }(), _class.inject = [_i18n.I18N, Element, _aureliaEventAggregator.EventAggregator], _temp);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n    <router-view class=\"col-md-8\"></router-view>\n  </div>\n</template>\n"; });
define('text!routes/cards/cards.css', ['module'], function(module) { module.exports = "\n@media screen and (min-width: 320px) {\n  #cardWrapper{\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n\n  #cardTitle {\n    position: relative;\n    margin: 0px;\n    padding: 0px;\n    width: 100%;\n    height: 50px; /* height + padding-top + padding-bottom = 50px */\n    font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n    color: #fff;\n    text-align: center;\n    font-size: 16px;\n    background-color: #424242;\n  }\n\n  #titleText {\n    position: relative;\n    margin: 0px;\n    padding: 12px 0px 0px 0px;\n  }\n\n  #tabRow {\n    position: relative;\n    margin: 12px 0 0 0;\n    padding: 0px;\n    text-align: center;\n  }\n\n  .tabButtons {\n    margin: 0px;\n    padding: 0px;\n    width: 20%;\n    height: 5px;\n    border: none;\n    background-color: #31aade;\n    float: left;\n  }\n\n  .tabButtons:disabled {\n    opacity: 0.25;\n  }\n\n  #cardContent {\n    position: relative;\n    width: 100%;\n    height: 380px; /*Change on the fly*/\n    text-align: center;\n    z-index: 3;\n    background-color: #808080;\n  }\n\n  #cardNavigation {\n    align-content: center;\n    margin: 0px;\n    padding: 0px;\n    background-color: #808080;\n    height: 50px;\n  }\n\n  .navBtn {\n    position: relative;\n    color: #ffffff;\n    width: 50%;\n    height: 50px;\n    font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n    font-size: 16px;\n    line-height: 50px;\n    background: #424242;\n    border: none;\n    outline: none;\n    z-index: 3;\n    margin: 0px;\n    padding: 0px;\n    float: left;\n  }\n\n  #prv {\n    border-right: 1px solid #808080;\n  }\n\n  #nxt {\n    border-left: 1px solid #808080;\n  }\n\n  .navBtn:disabled {\n    color: #5e5e5e;\n  }\n\n  .navBtn:active {\n    background: #5e5e5e;\n    transform: translateY(1px);\n  }\n}\n\n@media screen and (min-width: 600px) {\n  /* For desktop: */\n  #cardWrapper {\n    width: 500px;\n    height: 100%;\n    margin: auto;\n    position: relative;\n    /*top: 50%;\n    transform: translateY(25%);*/\n  }\n}\n\n@media screen and (min-width: 1200px) {\n  /* For desktop: */\n  #cardWrapper {\n    width: 800px;\n    height: 100%;\n    margin: auto;\n    position: relative;\n    /*top: 50%;\n    transform: translateY(-50%);*/\n    overflow: hidden;\n  }\n}\n"; });
define('text!components/depth-slider/depth-slider.html', ['module'], function(module) { module.exports = "<template>\n  \n</template>\n"; });
define('text!routes/cards/depth/depth.css', ['module'], function(module) { module.exports = "#depthWrapper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  z-index: 9;\n}\n#imgWrapper {\n  position: relative;\n  width: 300px;\n  /*TODO check for the responsive design mode*/\n  height: 300px;\n  /* width = height */\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin: 0px;\n  padding: 0px;\n  z-index: 1;\n}\n#bgImage {\n  margin: 0px;\n  padding: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n}\n#floodZone {\n  position: absolute;\n  width: 94%;\n  height: 20%;\n  left: 0px;\n  bottom: 0px;\n  border: none;\n  border-top: 2px dashed white;\n  background: linear-gradient(rgba(49, 170, 222, 0.6), rgba(49, 170, 222, 0));\n  z-index: 3;\n}\n#sliderZone {\n  position: absolute;\n  width: 100%;\n  height: 36px;\n  padding: 0px;\n  transform: translateY(50%);\n  z-index: 10;\n}\n#knobWrapper {\n  position: absolute;\n  width: 36px;\n  height: 36px;\n  right: 0px;\n  margin: 0px auto;\n  padding: 0px;\n  background-color: rgba(49, 170, 222, 0.4);\n  border-radius: 18px;\n  z-index: 7;\n}\n#knob {\n  position: relative;\n  width: 18px;\n  height: 18px;\n  margin: 0px auto;\n  padding: 0px;\n  top: 50%;\n  transform: translateY(-50%);\n  background-color: #31aade;\n  border: 2px solid white;\n  border-radius: 11px;\n  /* add border to width/2 */\n  z-index: 8;\n}\n#depthText {\n  position: relative;\n  right: 0px;\n  margin: 0px;\n  padding: 10px;\n  font-family: \"Roboto\", Open Sans;\n  font-weight: 100;\n  font-size: 14px;\n  color: #fff;\n}\n"; });
define('text!routes/map/map.css', ['module'], function(module) { module.exports = "body {\n    padding: 0;\n    margin: 0;\n}\n\nhtml, body, #map {\n    height: 100vh;\n    width: 100vw;\n}\n\n#optionsPane {\n  display: none;\n  position: absolute;\n  width: 300px;\n  height: 100%;\n  left: -300px;\n  margin: 0px;\n  padding: 0px;\n  background-color: white;\n  z-index: 1001; /* Leaflet options control z-index: 1000 (default) */\n}\n\n#nav {\n  position: relative;\n  width: 100%;\n  height: 90px;\n  margin: 0px;\n  padding: 4px 0px;\n  background-color: #808080;\n  font-family: \"Roboto-Medium\", \"Roboto\", Open Sans;\n  font-size: 16px;\n  color: white;\n}\n\n#nav p {\n  margin-left: 8px;\n}\n\n#cityOptions {\n  width: 150px;\n  height: 32px;\n  margin-left: 8px;\n  border: none;\n  background-color: white;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  font-size: 12px;\n  color: #808080;\n  text-transform: capitalize;\n  outline: none;\n}\n"; });
define('text!components/text-box/text-box.html', ['module'], function(module) { module.exports = "<template>\n  <textarea value.bind=\"inputText\" click.trigger=\"clearHint()\"></textarea>\n  <p>${charLength}/140</p>\n</template>\n"; });
define('text!routes/cards/depth/depth.css', ['module'], function(module) { module.exports = "#depthWrapper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  z-index: 9;\n}\n#imgWrapper {\n  position: relative;\n  width: 300px;\n  /*TODO check for the responsive design mode*/\n  height: 300px;\n  /* width = height */\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin: 0px;\n  padding: 0px;\n  z-index: 1;\n}\n#bgImage {\n  margin: 0px;\n  padding: 0px;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n}\n#floodZone {\n  position: absolute;\n  width: 94%;\n  height: 20%;\n  left: 0px;\n  bottom: 0px;\n  border: none;\n  border-top: 2px dashed white;\n  background: linear-gradient(rgba(49, 170, 222, 0.6), rgba(49, 170, 222, 0));\n  z-index: 3;\n}\n#sliderZone {\n  position: absolute;\n  width: 100%;\n  height: 36px;\n  padding: 0px;\n  transform: translateY(50%);\n  z-index: 10;\n}\n#knobWrapper {\n  position: absolute;\n  width: 36px;\n  height: 36px;\n  right: 0px;\n  margin: 0px auto;\n  padding: 0px;\n  background-color: rgba(49, 170, 222, 0.4);\n  border-radius: 18px;\n  z-index: 7;\n}\n#knob {\n  position: relative;\n  width: 18px;\n  height: 18px;\n  margin: 0px auto;\n  padding: 0px;\n  top: 50%;\n  transform: translateY(-50%);\n  background-color: #31aade;\n  border: 2px solid white;\n  border-radius: 11px;\n  /* add border to width/2 */\n  z-index: 8;\n}\n#depthText {\n  position: relative;\n  right: 0px;\n  margin: 0px;\n  padding: 10px;\n  font-family: \"Roboto\", Open Sans;\n  font-weight: 100;\n  font-size: 14px;\n  color: #fff;\n}\n"; });
define('text!routes/cards/cards.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./cards.css\"></require>\n  <div id=\"cardWrapper\">\n    <div id=\"cardTitle\">\n      <p id=\"titleText\">${titleString}</p>\n      <div id=\"tabRow\">\n        <button repeat.for=\"i of tabCount\" class=\"tabButtons\" disabled.bind=\"!(i < count)\"></button>\n      </div>\n    </div>\n    <div id=\"cardContent\" style=\"height: ${ccHeight}px; margin:0px; padding:0px;\">\n      <router-view></router-view>\n    </div>\n    <div id=\"cardNavigation\">\n      <button id=\"prv\" click.trigger=\"prevCard()\" disabled.bind=\"prevDisabled\" class=\"navBtn\">&#10094; PREV</button>\n      <button id=\"nxt\" click.trigger=\"nextCard()\" disabled.bind=\"nextDisabled\" class=\"navBtn\">NEXT &#10095;</button>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/description/description.css', ['module'], function(module) { module.exports = "#descriptionWrapper {\n  position: relative;\n  margin: 0px auto;\n  height: 75%;\n}\n\n#textarea {\n  position: relative;\n  width: 85%;\n  height: 80%;\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  color: #fff;\n  border: none;\n  border-bottom: 3px solid #31aade;\n  font-size: 14px;\n  resize: none;\n  background-color: #808080;\n  margin: 30px auto 10px auto;\n  padding: 10px;\n  outline: none;\n}\n\n#textarea:focus {\n  box-shadow: inset 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n}\n\n#textmessage {\n  font-family: \"Roboto-Light\", \"Roboto\", Open Sans;\n  color: #000;\n  margin: 0px;\n  font-size: 14px;\n}\n\n#textmessage p {\n  margin: 0px;\n  padding: 0px;\n}\n"; });
define('text!routes/map/map.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"leaflet/leaflet.css\"></require>\n  <require from=\"./map.css\"></require><!--place / access as per appropriate file structure-->\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />\n  <div id=\"optionsPane\">\n    <div id=\"nav\">\n      <p>Choose a city</p>\n      <select value.bind=\"city_name\" change.delegate=changeCity(opts.value) ref=\"opts\" id=\"cityOptions\">\n        <option repeat.for=\"city_region of city_regions\" class=\"selOptions\">${city_region}</option>\n      </select>\n    </div>\n  </div>\n  <div id=\"map\"></div>\n</template>\n"; });
define('text!routes/cards/errorCard/errorCard.css', ['module'], function(module) { module.exports = "#thanksText {\n  position: absolute;\n  width: 75%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #fff;\n  text-align: center;\n  font-size: 14px;\n  font-family: 'Roboto-Regular', 'Helvetica Neue', sans-serif;\n}\n\n#thanksBold {\n  color: white;\n  font-size: 21px;\n  font-family: 'Roboto-Medium', 'Helvetica Neue', sans-serif;\n}\n\n#petalogo{\n  position: relative;\n  padding: 5px 30px 5px 30px;\n  width:60%;\n  left: 50%;\n  transform: translateX(-50%);\n  position:absolute; top:10px;\n  border: none;\n  border-bottom: 1px solid #2f2f2f\n}\n\n#URLlogo{\n  padding: 5px 30px 5px 30px;\n  position: relative;\n  width:70%;\n  left: 50%;\n  transform: translate(-50%,-50%);\n  position:absolute; bottom:0;\n  border: none;\n  border-top: 1px solid #2f2f2f\n}\n"; });
define('text!routes/cards/depth/depth.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./depth.css\"></require>\n  <div id=\"depthWrapper\">\n    <div id=\"imgWrapper\">\n      <img id=\"bgImage\" ref=\"bgImage\" src=\"assets/graphics/heightReference.svg\">\n      <div id=\"floodZone\" ref=\"floodZone\">\n      </div>\n      <div id=\"sliderZone\" ref=\"sliderZone\">\n        <div id=\"knobWrapper\">\n          <div id=\"knob\">\n          </div>\n        </div>\n      </div>\n      <div id=\"depthText\" textcontent=\"${waterDepth}cm\">\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/location/location.css', ['module'], function(module) { module.exports = "#locationWrapper {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n\n#mapWrapper {\n  position: relative;\n  width:100%;\n  height:100%;\n  z-index: 1;\n}\n\n#mapMarker {\n  position: absolute;\n  width: 48px;\n  height: 48px;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -100%);\n  z-index: 100;\n}\n"; });
define('text!routes/cards/description/description.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./description.css\"></require>\n  <div id=\"descriptionWrapper\">\n    <textarea id=\"textarea\" value.bind=\"descripText\" keyup.trigger=\"charCount()\" click.trigger=\"clearHint()\"></textarea>\n    <div id=\"textmessage\">\n      <p>${textLength}/140</p>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/photo/photo.css', ['module'], function(module) { module.exports = "#photoWrapper {\n  position: absolute;\n  width: 200px;\n  height: 230px;\n  margin: 0px;\n  padding: 0px;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n#previewWrapper {\n  position: relative;\n  width: 140px;\n  height: 140px;\n  margin: 0px auto;\n  border: 4px solid rgba(255, 255, 255, 0.4);\n}\n\n#cameraIcon {\n  width: 100%;\n  height: 100%;\n  opacity: 0.4;\n  z-index: 2;\n}\n\n#camera {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  z-index: 3;\n}\n\n#helpTextWrapper {\n  position: relative;\n  margin: 12px auto 0 auto;\n  width: 148px;\n  height: 36px;\n}\n\n#photoButton {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  background-color: #424242;\n  border: none;\n  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n  font-family: 'Roboto-Light', 'Roboto', sans-serif;\n  font-size: 14px;\n  line-height: 36px;\n  color: #fff;\n  outline: none;\n}\n\n#photoButton:active {\n  background-color: #5e5e5e;\n  transform: translateY(1px);\n  box-shadow: 2px 3px 8px 0px rgba(0, 0, 0, 0.4);\n}\n"; });
define('text!routes/cards/errorCard/errorCard.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./errorCard.css\"></require>\n\n  <div id=\"petalogo\" class=\"cardInner\">\n    <img src=\"assets/icons/Peta_logo.svg\">\n  </div>\n    <div id=\"thanksText\">\n      <p id=\"thanksBold\">Thank you!</p>\n      <br>\n      <p>Your Report has been submitted,\n        and will be added to the map</p>\n        <br>\n        <p> Redirecting to PetaBencana.id</p>\n    </div>\n    <div id=\"URLlogo\" class=\"cardInner\">\n      <img src=\"assets/icons/URL_logo.svg\">\n    </div>\n\n</template>\n"; });
define('text!routes/cards/review/review.css', ['module'], function(module) { module.exports = "@media screen and (min-width: 300px)\n{\n  #summaryCard {\n    height: 200px;\n  }\n}\n\n@media screen and (min-width: 600px)\n{\n  /* For tablets: */\n  #summaryCard {\n    height: 350px;\n  }\n}\n\n#reviewWrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n}\n\n#summaryCard {\n  position: absolute;\n  width: 80%;\n  background-color: #424242;\n  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n  left: 50%;\n  top: 30%;\n  transform: translate(-50%, -50%);\n}\n\n#summaryPhoto {\n  position: relative;\n  width: 45%;\n  height: 100%;\n  /*border: 1px solid red;*/ /* for test*/\n  margin: 0px;\n  overflow: hidden;\n  display: flex;\n  float: left;\n}\n\n#camera {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  z-index: 3;\n}\n\n#img {\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  opacity: 0.4;\n}\n\n#summaryTextWrapper {\n  position: relative;\n  width: 55%;\n  height: 100%;\n  margin: 10px 0 0 0;\n  text-align: left;\n  font-size: 14px;\n  line-height: 18px;\n  float: left;\n}\n\n#floodH {\n  color: #31aade;\n  font-family: 'Roboto-Medium', 'Roboto', sans-serif;\n  margin: 0px 10px;\n}\n#comment {\n  color: #fff;\n  font-family: 'Roboto-Light', 'Roboto', sans-serif;\n  margin: 4px 10px;\n}\n\n#reviewSubmit {\n  position: absolute;\n  left: 50%;\n  bottom: 36px;\n  transform: translateX(-50%);\n  width: 80%; /* width of nav buttons + margin */\n  padding: 0px;\n}\n\n#termsConditions {\n  width: 100%;\n  margin: 0px;\n  color: #fff;\n  font-family: 'Roboto-Light', 'Roboto', sans-serif;\n  font-size: 14px;\n}\n\n#termsConditions a {\n  cursor: pointer;\n  color: white;\n  font-family: 'Roboto-Medium', 'Roboto', sans-serif;\n}\n\n#submitSlider {\n  position: relative;\n  width: 75%;\n  height: 36px;\n  margin: 0px auto;\n  padding: 3px;\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 6px;\n  box-shadow: inset 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n  z-index: 3;\n}\n\n#submitKnob {\n  position: relative;\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: 6px;\n  background-color: #31aade;\n  outline: none;\n  color: white;\n  font-size: 30px;\n  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.4);\n  float: left;\n  z-index: 2;\n}\n\n#submitKnob:active {\n  background-color: #31aade;\n}\n\n#submitRef1 {\n  margin: 0px 6px;\n  padding: 0px;\n  color: white;\n  font-size: 30px;\n  opacity: 0.4;\n  z-index: 1;\n  float: left;\n}\n\n#submitRef2 {\n  margin: 0px;\n  padding: 0px;\n  color: white;\n  font-size: 14px;\n  line-height: 36px;\n  font-family: 'Roboto-Light', 'Roboto', Open-sans;\n  opacity: 0.4;\n  z-index: 1;\n  float: left;\n}\n"; });
define('text!routes/cards/location/location.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"leaflet/leaflet.css\"></require>\n  <require from=\"./location.css\"></require><!--place / access as per appropriate file structure-->\n  <div id=\"locationWrapper\">\n    <div id=\"mapWrapper\">\n    </div>\n    <div id=\"mapMarker\">\n      <img src=\"assets/icons/marker-04.svg\" width=\"48\" height=\"48\" style=\"margin: 0px;\" draggable=\"false\">\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/terms/terms.css', ['module'], function(module) { module.exports = "#TandCWrapper {\n  position: relative;\n  width: 80%;\n  height: 80%;\n  margin: auto;\n  padding: 9px;\n  overflow: scroll;\n  color: #fff;\n  text-align: justify;\n  font-size: 14px;\n  font-family: 'Roboto-Regular', 'Helvetica Neue', sans-serif;\n  border:none;\n  border-bottom: 2px solid #31aade;\n  top: 10%;\n  transform: translateY(5%);\n}\n\n#TandCWrapper .headers {\n  text-align: left;\n  font-family: 'Roboto-Medium', 'Helvetica Neue', sans-serif;\n}\n"; });
define('text!routes/cards/photo/photo.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./photo.css\"></require>\n  <div id=\"photoWrapper\">\n    <div id=\"previewWrapper\" click.delegate=\"sendClick()\">\n      <canvas id=\"camera\" ref=\"preview\">\n      </canvas>\n      <img id=\"cameraIcon\" src=\"assets/graphics/image_flood.svg\">\n    </div>\n    <div id=\"helpTextWrapper\">\n      <button id=\"photoButton\" click.delegate=\"sendClick()\">${helpText}</button>\n    </div>\n  </div>\n  <div id=\"ghostButton\" style=\"display: none\">\n    <input id=\"photoCapture\" type=\"file\" accept=\"image/*\" change.delegate=\"drawImage()\" files.bind=\"selectedPhoto\">\n  </div>\n</template>\n"; });
define('text!routes/cards/thanks/thanks.css', ['module'], function(module) { module.exports = "#thanksText {\n  position: absolute;\n  width: 75%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #fff;\n  text-align: center;\n  font-size: 14px;\n  font-family: 'Roboto-Regular', 'Helvetica Neue', sans-serif;\n}\n\n#thanksBold {\n  color: white;\n  font-size: 21px;\n  font-family: 'Roboto-Medium', 'Helvetica Neue', sans-serif;\n}\n\n#petalogo{\n  position: relative;\n  padding: 5px 30px 5px 30px;\n  width:60%;\n  left: 50%;\n  transform: translateX(-50%);\n  position:absolute; top:10px;\n  border: none;\n  border-bottom: 1px solid #2f2f2f\n}\n\n#URLlogo{\n  padding: 5px 30px 5px 30px;\n  position: relative;\n  width:70%;\n  left: 50%;\n  transform: translate(-50%,-50%);\n  position:absolute; bottom:0;\n  border: none;\n  border-top: 1px solid #2f2f2f\n}\n"; });
define('text!routes/cards/review/review.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./review.css\"></require>\n  <div id=\"reviewWrapper\">\n    <div id=\"summaryCard\">\n      <div id=\"summaryPhoto\">\n        <canvas id=\"camera\" ref=\"preview\">\n        </canvas>\n        <img id=\"img\" src=\"assets/graphics/image_flood.svg\">\n      </div>\n      <div id=\"summaryTextWrapper\">\n        <p id=\"floodH\">Water depth: ${selDepth}</p>\n        <p id=\"comment\">${selDescription}</p>\n      </div>\n    </div>\n    <div id=\"reviewSubmit\">\n      <div id=\"termsConditions\">\n        <p>By submitting this report, you are agreeing to the<br><a click.delegate=\"readTerms()\"><u>Terms &amp; Conditions</u></a></p>\n      </div>\n      <div id=\"submitSlider\">\n        <button id=\"submitKnob\"></button>\n        <p id=\"submitRef1\">&#10217;&#10217;&#10217;</p>\n        <p id=\"submitRef2\">Swipe to submit</p>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/terms/terms.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./terms.css\"></require>\n\n    <div id=\"TandCWrapper\">\n      <p>These terms and conditions outline the rules and regulations for the use of  Urban Risk Lab's Website. <br>\n        <br><p>Urban Risk Lab is located at:\n          <br><address>\n            Urban Risk Lab, IDC, 235 Massachussets Ave , <br>\n            Cambridge, MA 02139<br>\n            United States<br>\n          </address>\n          <br>By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Urban Risk Lab's website if you do not accept all of the terms and conditions stated on this page.</p>\n          <br><p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: \"Client\", “You” and “Your” refers to you, the person accessing this website and accepting the Company’s terms and conditions. \"The Company\", “Ourselves”, “We”, “Our” and \"Us\", refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law of United States. Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>\n          <br>\n          <p class=\"headers\">Cookies</p>\n          <p>We employ the use of cookies. By using <a href=\"http://petabencana.id\" onclick=\"__gaTracker('send', 'event', 'outbound-article', 'http://petabencana.id', 'Urban Risk Lab');\" title=\"Urban Risk Lab\">Urban Risk Lab</a>'s website you consent to the use of cookies in accordance with Urban Risk Lab’s privacy policy.</p>\n          <p>Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies.</p>\n          <br>\n          <p class=\"headers\">License</p>\n          <p>Unless otherwise stated, Urban Risk Lab and/or it’s licensors own the intellectual property rights for all material on Urban Risk Lab All intellectual property rights are reserved. You may view and/or print pages from http://petabencana.id for your own personal use subject to restrictions set in these terms and conditions.</p>\n          <p>You must not:</p>\n          <ul>\n            <li>Republish material from http://petabencana.id</li>\n            <li>Sell, rent or sub-license material from http://petabencana.id</li>\n            <li>Reproduce, duplicate or copy material from http://petabencana.id</li>\n          </ul>\n          <p>Redistribute content from Urban Risk Lab (unless content is specifically made for redistribution).</p>\n          <br>\n          <p class=\"headers\">User Comments</p>\n          <ol>\n            <li>This Agreement shall begin on the date hereof.</li>\n            <li>Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data ('Comments') in areas of the website. Urban Risk Lab does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of Urban Risk Lab, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws Urban Risk Lab shall not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</li>\n            <li>Urban Risk Lab reserves the right to monitor all Comments and to remove any Comments which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.</li>\n            <li>You warrant and represent that:\n              <ol>\n                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>\n                <li>The Comments do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary right of any third party;</li>\n                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material or material which is an invasion of privacy</li>\n                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>\n              </ol>\n            </li>\n            <li>You hereby grant to <strong>Urban Risk Lab</strong> a non-exclusive royalty-free license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</li>\n          </ol>\n          <br>\n          <p class=\"headers\">Hyperlinking to our Content</p>\n          <ol>\n            <li>The following organizations may link to our Web site without prior written approval:\n              <ul>\n                <li>Government agencies;</li>\n                <li>Search engines;</li>\n                <li>News organizations;</li>\n                <li>Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses; and</li>\n                <li>Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>\n              </ul>\n            </li>\n          </ol>\n          <ol start=\"2\">\n            <li>These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</li>\n            <li>We may consider and approve in our sole discretion other link requests from the following types of organizations:\n              <ul>\n                <li>commonly-known consumer and/or business information sources such as Chambers of Commerce, American Automobile Association, AARP and Consumers Union;</li>\n                <li>dot.com community sites;</li>\n                <li>associations or other groups representing charities, including charity giving sites,</li>\n                <li>online directory distributors;</li>\n                <li>internet portals;</li>\n                <li>accounting, law and consulting firms whose primary clients are businesses; and</li>\n                <li>educational institutions and trade associations.</li>\n              </ul>\n            </li>\n          </ol>\n          <br>\n          <p>We will approve link requests from these organizations if we determine that: (a) the link would not reflect unfavorably on us or our accredited businesses (for example, trade associations or other organizations representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed to link); (b)the organization does not have an unsatisfactory record with us; (c) the benefit to us from the visibility associated with the hyperlink outweighs the absence of Urban Risk Lab; and (d) where the link is in the context of general resource information or is otherwise consistent with editorial content in a newsletter or similar product furthering the mission of the organization.</p>\n          <p>These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services; and (c) fits within the context of the linking party's site.</p>\n          <p>If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must notify us by sending an e-mail to <a href=\"mailto:floodreport@petabencana.org\" title=\"send an email to floodreport@petabencana.org\">floodreport@petabencana.org</a>. Please include your name, your organization name, contact information (such as a phone number and/or e-mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link. Allow 2-3 weeks for a response.</p>\n          <br>\n          <p>Approved organizations may hyperlink to our Web site as follows:</p>\n          <ul>\n            <li>By use of our corporate name; or</li>\n            <li>By use of the uniform resource locator (Web address) being linked to; or</li>\n            <li>By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party's site.</li>\n          </ul>\n          <p>No use of (cname)’s logo or other artwork will be allowed for linking absent a trademark license agreement.</p>\n          <br>\n          <p class=\"headers\">Iframes</p>\n          <p>Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.</p>\n          <br>\n          <p class=\"headers\">Content Liability</p>\n          <p>We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>\n          <br>\n          <p class=\"headers\">Reservation of Rights</p>\n          <p>We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</p>\n          <br>\n          <p class=\"headers\">Removal of links from our website</p>\n          <p>If you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.</p>\n          <p>Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date.</p>\n          <br>\n          <p class=\"headers\">Disclaimer</p>\n          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:</p>\n          <ol>\n            <li>limit or exclude our or your liability for death or personal injury resulting from negligence;</li>\n            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>\n            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>\n            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>\n          </ol>\n          <p>The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.</p>\n          <p>To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>\n        </div>\n\n</template>\n"; });
define('text!routes/cards/thanks/thanks.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./thanks.css\"></require>\n\n  <div id=\"petalogo\" class=\"cardInner\">\n    <img src=\"assets/icons/Peta_logo.svg\">\n  </div>\n\n  <div id=\"thanksText\">\n    <p id=\"thanksBold\">Thank you!</p>\n    <br>\n    <p>Your Report has been submitted,\n      and will be added to the map</p>\n      <br>\n      <p> Redirecting to PetaBencana.id</p>\n  </div>\n\n  <div id=\"URLlogo\" class=\"cardInner\">\n    <img src=\"assets/icons/URL_logo.svg\">\n  </div>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map