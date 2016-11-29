// PetaBencana.id Map configuration file, for CogniCity data
// https://github.com/urbanriskmap/urbanriskmap-meta/wiki/Bounding-Boxes-for-Target-Cities

var config = {
  "instance_regions":
    {
      "jakarta":{
        "name": "Jakarta",
        "region": "jbd",
        "bounds": {
          "sw":[-6.733, 106.480],
          "ne":[-5.880, 107.175]
        },
        "layers": []
      },
      "surbaya":{
        "name": "Surbaya",
        "region": "sby",
        "bounds": {
          "sw":[-7.5499, 112.3975],
          "ne":[-7.0143, 113.0318]
        },
        "layers": null
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
    }
};

module.exports = config;
