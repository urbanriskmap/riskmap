// PetaBencana.id Map configuration file, for CogniCity data
// https://github.com/urbanriskmap/urbanriskmap-meta/wiki/Bounding-Boxes-for-Target-Cities

var config = {
  "instance_regions":
    {
      "jakarta": {
        "name": "Jakarta",
        "region": "jbd",
        "bounds": {
          "sw":[-6.733, 106.480],
          "ne":[-5.880, 107.175]
        },
        "layers": [
          {
            "name": "Reports",
            "url": "https://raw.githubusercontent.com/ojha-url/URL_Internal/master/Test_jakarta.json",
            "icon": "reportIcon"
          },
          {
            "name": "Pumps",
            "url": "https://petajakarta.org/banjir/data/api/v2/infrastructure/pumps",
            "icon": "pumpIcon"
          },
          {
            "name": "Flood gates",
            "url": "https://petajakarta.org/banjir/data/api/v2/infrastructure/floodgates",
            "icon": "gateIcon"
          }
        ]
      },
      "surabaya":{
        "name": "Surabaya",
        "region": "sby",
        "bounds": {
          "sw":[-7.5499, 112.3975],
          "ne":[-7.0143, 113.0318]
        },
        "layers": []
      },
      "bandung":{
        "name": "Bandung",
        "region": "bdg",
        "bounds": {
          "sw":[-7.165, 107.369],
          "ne":[-6.668, 107.931]
        },
        "layers": []
      }
    },
    "map_icons": {
      "pumpIcon": {
        "iconUrl": 'assets/icons/pumpIcon.svg',
        "iconSize": [30, 30],
        "iconAnchor": [10, -5]
      },
      "reportIcon": {
        "iconUrl": 'assets/icons/floodIcon.svg',
        "iconSize": [25, 25],
        "iconAnchor": [10, -5]
      },
      "gateIcon": {
        "iconUrl": 'assets/icons/gateIcon.svg',
        "iconSize": [25, 25],
        "iconAnchor": [10, -5],
      }
    }
};

module.exports = config;
