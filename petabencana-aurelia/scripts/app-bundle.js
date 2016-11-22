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
      config.map([{ route: ['', 'maps'], moduleId: 'routes/maps/maps' }, { route: 'cards/:id', moduleId: 'routes/cards/cards' }]);

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
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

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
define('components/slider/slider',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DepthSlider = undefined;

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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var DepthSlider = exports.DepthSlider = (_dec = (0, _aureliaFramework.customElement)('depth-slider'), _dec(_class = (_class2 = function () {
    function DepthSlider() {
      _classCallCheck(this, DepthSlider);

      _initDefineProp(this, 'name', _descriptor, this);
    }

    DepthSlider.prototype.updateContent = function updateContent() {
      alert('User: ' + this.name + ' entered ' + this.val);
    };

    return DepthSlider;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'name', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
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
define('routes/cards/cards',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cards = undefined;

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

  var Cards = exports.Cards = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    Cards.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Flood report';
      config.map([{ route: '', redirect: 'location' }, { route: 'location', moduleId: './location/location', settings: { title: 'Select location', cardNo: 1, msgName: 'changedLocation' } }, { route: 'depth', moduleId: './depth/depth', settings: { title: 'Report water depth', cardNo: 2, msgName: 'changedDepth' } }, { route: 'photo', moduleId: './photo/photo', settings: { title: 'Upload a photo', cardNo: 3, msgName: 'changedPhoto' } }, { route: 'description', moduleId: './description/description', settings: { title: 'Describe the event', cardNo: 4, msgName: 'changedDescription' } }, { route: 'review', moduleId: './review/review', settings: { title: 'Review & submit', cardNo: 5, msgName: 'getInputs' } }]);
      this.router = router;
    };

    function Cards(ea) {
      _classCallCheck(this, Cards);

      this.ea = ea;
    }

    Cards.prototype.activate = function activate(params) {
      this.id = params.id;
    };

    Cards.prototype.attached = function attached() {
      var _this = this;

      this.totalCards = this.router.routes.length - 1;
      this.inputs = [];

      var _loop = function _loop(i) {
        _this.inputs[i] = { card: i, type: _this.router.routes[i + 1].route };
        _this.ea.subscribe(_this.router.routes[i + 1].settings.msgName, function (msg) {
          _this.userInputs = { index: i, value: msg };
          _this.router.routes[i + 1].settings.input = msg;
        });
      };

      for (var i = 0; i < this.totalCards; i += 1) {
        _loop(i);
      }
    };

    Cards.prototype.nextCard = function nextCard() {
      if (this.count < this.totalCards) {
        this.count = 1;
        this.router.navigate(this.router.routes[this.count].route);
      }
    };

    Cards.prototype.prevCard = function prevCard() {
      if (this.count > 1) {
        this.count = -1;
        this.router.navigate(this.router.routes[this.count].route);
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
      key: 'cardTitle',
      get: function get() {
        return this.router.currentInstruction.config.settings.title;
      }
    }, {
      key: 'nextDisabled',
      get: function get() {
        if (this.cardNo === 1) {
          return !this.inputs[0].value;
        } else {
          return this.cardNo === this.totalCards;
        }
      }
    }, {
      key: 'prevDisabled',
      get: function get() {
        return this.cardNo === 1;
      }
    }, {
      key: 'userInputs',
      get: function get() {
        return this.inputs;
      },
      set: function set(val) {
        this.inputs[val.index].value = val.value;
      }
    }]);

    return Cards;
  }()) || _class);
});
define('routes/maps/maps',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Maps = exports.Maps = function () {
    function Maps() {
      _classCallCheck(this, Maps);
    }

    Maps.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Flood map';
      config.map([{ route: '', redirect: 'maps/jakarta' }, { route: 'jakarta', moduleId: './jakarta/jakarta' }, { route: 'surbaya', moduleId: './surbaya/surbaya' }]);
      this.router = router;
    };

    return Maps;
  }();
});
define('routes/cards/depth/depth',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Depth = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Depth = exports.Depth = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Depth(ea) {
      _classCallCheck(this, Depth);

      this.ea = ea;
      this.depthVal = 40;
    }

    Depth.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        this.depthVal = routerConfig.settings.input;
      }
      this.msgName = routerConfig.settings.msgName;
    };

    Depth.prototype.updateVal = function updateVal() {
      this.ea.publish(this.msgName, this.depthVal);
    };

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
      this.ea.publish('updateText', this.descripText);
      this.textLength = this.descripText.length;
      this.ea.publish(this.msgName, this.descripText);
    };

    return Description;
  }()) || _class);
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
    }

    Location.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        this.userLocation = routerConfig.settings.input;
      }
      Location.msgName = routerConfig.settings.msgName;
    };

    Location.prototype.attached = function attached() {
      var cardMap = L.map('mapWrapper');
      var markerIcon = L.icon({
        iconUrl: 'assets/svg/marker-03.svg',
        iconSize: [60, 60],
        iconAnchor: [30, 60]
      });
      var marker = void 0;
      L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
      }).addTo(cardMap);
      if (this.userLocation) {
        cardMap.setView(this.userLocation, 12);
        marker = L.marker(this.userLocation, { icon: markerIcon }).addTo(cardMap);
        Location.ea.publish(Location.msgName, this.userLocation);
      } else {
        cardMap.locate({
          setView: true,
          zoom: 12
        });
        cardMap.on('locationfound', function (e) {
          L.circle(cardMap.getCenter(), {
            weight: 0,
            fillColor: 'green',
            fillOpacity: 0.15,
            radius: e.accuracy / 2
          }).addTo(cardMap);
          L.circleMarker(cardMap.getCenter(), {
            color: 'white',
            weight: 1,
            fillColor: 'green',
            fillOpacity: 1,
            radius: 8
          }).addTo(cardMap);
          marker = L.marker(cardMap.getCenter(), { icon: markerIcon }).addTo(cardMap);
          Location.ea.publish(Location.msgName, cardMap.getCenter());
        });
        cardMap.on('locationerror', function () {
          cardMap.setView([-6.2, 106.83], 10);
          Location.ea.publish(Location.msgName, cardMap.getCenter());
        });
      }
      cardMap.on('moveend', function () {
        if (cardMap && marker) {
          cardMap.removeLayer(marker);
          marker = L.marker(cardMap.getCenter(), { icon: markerIcon }).addTo(cardMap);
          Location.ea.publish(Location.msgName, cardMap.getCenter());
        }
      });
    };

    return Location;
  }()) || _class);
});
define('routes/cards/photo/photo',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Photo = undefined;

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
    }

    Photo.prototype.activate = function activate(params, routerConfig) {
      if (routerConfig.settings.input) {
        this.selectedPhoto = routerConfig.settings.input;
        this.haveImg = true;
      }
      this.msgName = routerConfig.settings.msgName;
      this.w = 300;
      this.h = 300;
    };

    Photo.prototype.attached = function attached() {
      if (this.haveImg) {
        this.drawImage();
      }
    };

    Photo.prototype.drawImage = function drawImage() {
      this.ea.publish(this.msgName, this.selectedPhoto);
      var wrapper = this.preview;
      var phW = this.w;
      var phH = this.h;
      var reader = new FileReader();
      reader.onload = function (e) {
        var reviewImg = new Image();
        reviewImg.onload = function () {
          var cntxt = wrapper.getContext('2d');
          cntxt.drawImage(reviewImg, 0, 0, phW, phH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.selectedPhoto[0]);
    };

    return Photo;
  }()) || _class);
});
define('routes/cards/review/review',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Depth = exports.Depth = function Depth() {
    _classCallCheck(this, Depth);

    this.someName = 'Ignore, for test';
  };
});
define('routes/maps/jakarta/jakarta',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Jakarta = exports.Jakarta = function Jakarta() {
    _classCallCheck(this, Jakarta);
  };
});
define('routes/maps/surbaya/surbaya',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Surbaya = exports.Surbaya = function Surbaya() {
    _classCallCheck(this, Surbaya);
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n    <router-view class=\"col-md-8\"></router-view>\n  </div>\n</template>\n"; });
define('text!routes/cards/cards.css', ['module'], function(module) { module.exports = "\n#cardTitle {\n  margin: 0px;\n  padding: 4px 0px;\n  width: 100%;\n  height: 40px; /* height + padding-top + padding-bottom = 48px */\n  border: 1px;\n  font-family: \"Roboto\", Open Sans;\n  font-weight: 600;\n  color: #fff;\n  text-align: center;\n  font-size: 16px;\n  background-color: #424242;\n}\n\n#titleText {\n  margin: 0px;\n  padding: 0px;\n}\n\n#tabRow {\n  position: relative;\n  margin: 0px;\n  padding: 0px;\n  text-align: center;\n}\n\n.tabButtons {\n  margin: 0px 2px;\n  padding: 0px;\n  width: 18%;\n  height: 5px;\n  border: none;\n  background-color: #31aade;\n}\n\n.tabButtons:disabled {\n  opacity: 0.25;\n}\n\n#cardContent {\n  position: relative;\n  width: 100%;\n  height: 380px;\n  text-align: center;\n  z-index: 3;\n  background-color: #808080;\n}\n\n.navBtn {\n  position: relative;\n  color: #ffffff;\n  width: 49.3%;\n  height: 50px;\n  font-size: 12px;\n  font-family: \"Roboto\", Open Sans;\n  background: #424242;\n  border: none;\n  outline: none;\n  z-index: 3;\n}\n\n.navBtn:disabled {\n  color: #808080;\n  text-decoration: none;\n  z-index: 3;\n}\n\n.navBtn:active {\n  background: #5e5e5e;\n  text-decoration: none;\n  z-index: 3;\n}\n\n#cardNavigation{\n  align-content: center;\n}\n"; });
define('text!components/slider/slider.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"background-color: red; border: 1px solid black;\" click.delegate=\"updateContent()\">\n    <input type=\"text\" value.bind=\"val\">\n  </div>\n</template>\n"; });
define('text!routes/cards/description/description.css', ['module'], function(module) { module.exports = "#description{\n  position: relative;\n  margin: auto;\n  height: 75%;\n  border: 1px;\n  font-family: \"Roboto\", Open Sans;\n  font-weight: 600;\n  color: #fff;\n  text-align: center;\n  font-size: 16px;\n  border-color:#f05022;\n  padding-top: 2px;\n}\n\n#textarea{\n  resize: none;\n  width: 85%;\n  height: 75%;\n  margin:\n  resize: none;\n  border-radius: 5px;\n  border-width: .5px;\n  border-color: #fff;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);\n  background-color: #424242;\n  border-style: solid;\n  margin: 30px 0 10px 0;\n}\n\n\n#textmessage{\n  width: 90%;\n  float: right;\n  color: #000;\n  border-color: blue;\n  margin: 0px 20px 10px 0px;\n  font-weight: 100;\n  font-size: 14px;\n}\n"; });
define('text!components/text-box/text-box.html', ['module'], function(module) { module.exports = "<template>\n  <textarea value.bind=\"inputText\" click.trigger=\"clearHint()\"></textarea>\n  <p>${charLength}/140</p>\n</template>\n"; });
define('text!routes/cards/location/location.css', ['module'], function(module) { module.exports = "#mapWrapper{\n  width:100%;\n  height:100%;\n}\n"; });
define('text!routes/cards/cards.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./cards.css\"></require>\n  <div id=\"cardTitle\">\n    <p id=\"titleText\">${cardTitle}</p>\n    <div id=\"tabRow\">\n      <button repeat.for=\"i of userInputs\" class=\"tabButtons\" disabled.bind=\"!(i.card<count)\"></button>\n    </div>\n  </div>\n\n  <div id=\"cardContent\">\n    <router-view></router-view>\n  </div>\n\n  <div id=\"cardNavigation\">\n      <button href=\"#\" click.trigger=\"prevCard()\" disabled.bind=\"prevDisabled\" class=\"navBtn\">PREV</button>\n      <button click.trigger=\"nextCard()\" disabled.bind=\"nextDisabled\" class=\"navBtn\">NEXT</button>\n  </div>\n  <!--Temporary params for development-->\n  <p>OTL id: ${id}, card number: ${count}</p>\n  <ul>\n   <li repeat.for=\"input of userInputs\">\n     <p>${input.card}, ${input.type}: ${input.value}</p>\n   </li>\n </ul>\n</template>\n"; });
define('text!routes/cards/photo/photo.css', ['module'], function(module) { module.exports = "#camera {\n  background-image: url('/cork.png')\n  background-color: #f05022;\n  border: 10px;}\n"; });
define('text!routes/maps/maps.html', ['module'], function(module) { module.exports = "<template>\n  <div id=\"navPanel\" style=\"width: 100%; height: 80px; border: 1px solid red;\">\n    <p>Navigation buttons, menus</p>\n  </div>\n\n  <div id=\"mapPanel\" style=\"width: 100%; height: 400px; border: 1px solid blue;\">\n    <p>Map loads here</p>\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!routes/cards/depth/depth.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <input type=\"range\" min=\"0\" max=\"200\" value.bind=\"depthVal\" change.trigger=\"updateVal()\">\n    <p>Water depth: ${depthVal}cm</p>\n  </div>\n</template>\n"; });
define('text!routes/cards/description/description.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./description.css\"></require>\n  <div id=\"description\">\n    <textarea id=\"textarea\" rows=\"6\" value.bind=\"descripText\" keyup.trigger=\"charCount()\" click.trigger=\"clearHint()\">Some text</textarea>\n    <div id=\"textmessage\">\n      <p>${textLength}/140</p>\n    </div>\n  </div>\n</template>\n"; });
define('text!routes/cards/location/location.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"leaflet/leaflet.css\"></require>\n  <require from=\"./location.css\"></require><!--place / access as per appropriate file structure-->\n  <div id=\"mapWrapper\" ref=\"mapContainer\">\n  </div>\n</template>\n"; });
define('text!routes/maps/jakarta/jakarta.html', ['module'], function(module) { module.exports = "<template>\n  <p>Jakarta map layers</p>\n</template>\n"; });
define('text!routes/maps/surbaya/surbaya.html', ['module'], function(module) { module.exports = "<template>\n  <p>Surbaya map layers</p>\n</template>\n"; });
define('text!routes/cards/review/review.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../../components/text-box/text-box\"></require>\n  <div>\n    <description-box exportText.bind=\"someName\"></description-box>\n    <p>Summary card here</p>\n  </div>\n</template>\n"; });
define('text!routes/cards/photo/photo.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./photo.css\"></require>\n  <canvas id=\"camera\" width.bind=\"w\" height.bind=\"h\" ref=\"preview\">\n  </canvas>\n  <br><br>\n  <input id=\"photo\" ref=\"photoCapture\" type=\"file\" accept=\"image/*\" capture=\"camera\" change.delegate=\"drawImage()\" files.bind=\"selectedPhoto\">\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map