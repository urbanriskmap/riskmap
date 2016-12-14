// PetaBencana.id Map configuration file, for CogniCity data
// https://github.com/urbanriskmap/urbanriskmap-meta/wiki/Bounding-Boxes-for-Target-Cities

var config = {
  "instance_regions":
  {
    "jakarta": {
      "region": "jbd",
      "bounds": {
        "sw":[-6.733, 106.480],
        "ne":[-5.880, 107.175]
      }
    },
    "surabaya": {
      "region": "sby",
      "bounds": {
        "sw":[-7.5499, 112.3975],
        "ne":[-7.0143, 113.0318]
      }
    },
    "bandung": {
      "region": "bdg",
      "bounds": {
        "sw":[-7.165, 107.369],
        "ne":[-6.668, 107.931]
      }
    }
  },
  "default_region":
  {
    "region": "java",
    "bounds": {
      "sw":[-10.293, 104.677],
      "ne":[-3.974, 115.290]
    }
  },
  "data_server" : "https://data-dev.petabencana.id/"
};

module.exports = config;
