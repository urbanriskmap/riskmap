export default {
  name: 'riskmap',
  map: {
    "instance_regions": {
      "chennai": {
        "region": "chn",
        "bounds": { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
          "sw":[ 12.6884, 79.9248],
          "ne":[ 13.3766, 80.5413]
        }
      }
    },
    "default_region": {
      "region": "chn",
      "bounds": {
        "sw":[ 12.6884, 79.9248],
        "ne":[ 13.3766, 80.5413]
      }
    },
    "region_center": [13.017163, 80.185031],
    "start_city_center": [13.017163, 80.185031]
  }
};
