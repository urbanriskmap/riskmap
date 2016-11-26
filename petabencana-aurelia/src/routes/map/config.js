var config = {
  "routes":{
    "map/jakarta": "jbd",
    "map/surabaya": "sby",
    "map/bandung": "bdg",
    "default/java": "java"
  },

  "instance_regions":
    {
      "jbd":{
        "bounds": {
          "sw":[-6.5, 106.75],
          "ne":[-6, 106.8]
        },
        "layers": []
      },
      "sby":{
        "bounds": null,
        "layers": []
      },
      "bdg":{
        "bounds": null,
        "layers": []
      },
      "java":{
        "bounds": {
          "sw":[-8, 107],
          "ne":[-7, 113]
        }
      }
    }
}

module.exports = config;
