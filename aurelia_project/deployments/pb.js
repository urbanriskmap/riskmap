export default {
  name: 'petabencana',
  height_units: 'cm',
  supported_languages: [
    { key: 'en', name: 'English' },
    { key: 'id', name: 'Bahasa' }
  ],
  map: {
    'instance_regions': {
      'Bali': {
        'region': 'ID-BA',
        'bounds': { 'sw': [-8.85, 114.432], 'ne': [-8.062, 115.712] },
        'center': [-8.36973255954, 115.132168072]
      },
      'West Nusa Tenggara': {
        'region': 'ID-NB',
        'bounds': { 'sw': [-9.109, 115.821], 'ne': [-8.08, 119.346] },
        'center': [-8.60664308169, 117.508502604]
      },
      'Banten': {
        'region': 'ID-BT',
        'bounds': { 'sw': [-7.016, 105.1], 'ne': [-5.808, 106.78] },
        'center': [-6.4560436924, 106.109003345]
      },
      'Central Java': {
        'region': 'ID-JT',
        'bounds': { 'sw': [-8.212, 108.556], 'ne': [-5.726, 111.691] },
        'center': [-7.25948735657, 110.20004621]
      },
      'West Java': {
        'region': 'ID-JB',
        'bounds': { 'sw': [-7.821, 106.371], 'ne': [-5.915, 108.838] },
        'center': [-6.91984099888, 107.603019928]
      },
      'Central Kalimantan': {
        'region': 'ID-KT',
        'bounds': { 'sw': [-3.544, 110.733], 'ne': [0.795, 115.849] },
        'center': [-1.59986833375, 113.416768894]
      },
      'South Kalimantan': {
        'region': 'ID-KS',
        'bounds': { 'sw': [-4.943, 114.351], 'ne': [-1.302, 117.458] },
        'center': [-3.00041784628, 115.435540688]
      },
      'West Kalimantan': {
        'region': 'ID-KB',
        'bounds': { 'sw': [-3.068, 108.599], 'ne': [2.082, 114.207] },
        'center': [-0.0848925686634, 111.121996064]
      },
      'Central Sulawesi': {
        'region': 'ID-ST',
        'bounds': { 'sw': [-3.322, 119.422], 'ne': [1.374, 124.033] },
        'center': [-1.00566716709, 121.204195805]
      },
      'Gorontalo': {
        'region': 'ID-GO',
        'bounds': { 'sw': [0.306, 121.156], 'ne': [1.041, 123.552] },
        'center': [0.686199890399, 122.378574556]
      },
      'North Sulawesi': {
        'region': 'ID-SA',
        'bounds': { 'sw': [0.292, 123.112], 'ne': [5.566, 127.164] },
        'center': [1.26232917435, 124.523721467]
      },
      'South Sulawesi': {
        'region': 'ID-SN',
        'bounds': { 'sw': [-7.76, 117.038], 'ne': [-1.891, 122.222] },
        'center': [-3.70844057841, 120.173198612]
      },
      'Southeast Sulawesi': {
        'region': 'ID-SG',
        'bounds': { 'sw': [-6.213, 120.866], 'ne': [-2.77, 124.612] },
        'center': [-4.14210580132, 122.078902867]
      },
      'West Sulawesi': {
        'region': 'ID-SR',
        'bounds': { 'sw': [-3.571, 118.757], 'ne': [-0.861, 119.876] },
        'center': [-2.46403742395, 119.3428688]
      },
      'Aceh': {
        'region': 'ID-AC',
        'bounds': { 'sw': [1.976, 95.011], 'ne': [6.077, 98.286] },
        'center': [4.22568208825, 96.9100985353]
      },
      'Bengkulu': {
        'region': 'ID-BE',
        'bounds': { 'sw': [-5.514, 100.635], 'ne': [-2.277, 103.781] },
        'center': [-3.55942250949, 102.342881214]
      },
      'Jambi': {
        'region': 'ID-JA',
        'bounds': { 'sw': [-2.782, 101.123], 'ne': [-0.746, 104.491] },
        'center': [-1.697925239, 102.718958759]
      },
      'Lampung': {
        'region': 'ID-LA',
        'bounds': { 'sw': [-6.168, 103.593], 'ne': [-3.724, 105.916] },
        'center': [-4.91741365604, 105.020973741]
      },
      'Riau': {
        'region': 'ID-RI',
        'bounds': { 'sw': [-1.12, 100.025], 'ne': [2.883, 103.815] },
        'center': [0.509489372568, 101.817168906]
      },
      'West Sumatra': {
        'region': 'ID-SB',
        'bounds': { 'sw': [-3.349, 98.596], 'ne': [0.907, 101.886] },
        'center': [-0.841344968749, 100.464249647]
      },
      'South Sumatra': {
        'region': 'ID-SS',
        'bounds': { 'sw': [-4.924, 102.041], 'ne': [-1.627, 106.221] },
        'center': [-3.21342238304, 104.168798179]
      },
      'North Sumatra': {
        'region': 'ID-SU',
        'bounds': { 'sw': [-0.639, 97.058], 'ne': [4.302, 100.571] },
        'center': [2.19265505812, 99.0510137796]
      },
      'East Nusa Tenggara': {
        'region': 'ID-NT',
        'bounds': { 'sw': [-11.008, 118.927], 'ne': [-7.778, 125.193] },
        'center': [-9.26053073914, 122.179813719]
      },
      'Maluku': {
        'region': 'ID-MA',
        'bounds': { 'sw': [-8.345, 125.723], 'ne': [-2.725, 134.909] },
        'center': [-4.74070528384, 129.850905684]
      },
      'North Maluku': {
        'region': 'ID-MU',
        'bounds': { 'sw': [-2.477, 124.144], 'ne': [2.645, 129.657] },
        'center': [0.212859801992, 127.539815607]
      },
      'East Java': {
        'region': 'ID-JI',
        'bounds': { 'sw': [-8.781, 110.899], 'ne': [-5.043, 116.27] },
        'center': [-7.72095096893, 112.726913253]
      },
      'Bangka-Belitung Islands': {
        'region': 'ID-BB',
        'bounds': { 'sw': [-3.341, 105.108], 'ne': [-0.909, 109.389] },
        'center': [-2.42164574375, 106.574940677]
      },
      'Riau Islands': {
        'region': 'ID-KR',
        'bounds': { 'sw': [-0.87, 103.284], 'ne': [4.796, 109.168] },
        'center': [1.48126244893, 105.404211405]
      },
      'Papua': {
        'region': 'ID-PA',
        'bounds': { 'sw': [-9.127, 134.299], 'ne': [0.938, 141.02] },
        'center': [-4.65867452699, 138.695140787]
      },
      'West Papua': {
        'region': 'ID-PB',
        'bounds': { 'sw': [-4.315, 129.3], 'ne': [1.081, 135.258] },
        'center': [-2.04271934888, 132.972376543]
      },
      'East Kalimantan': {
        'region': 'ID-KI',
        'bounds': { 'sw': [-2.541, 113.836], 'ne': [2.569, 119.038] },
        'center': [0.453493733739, 116.459483436]
      },
      'North Kalimantan': {
        'region': 'ID-KU',
        'bounds': { 'sw': [1.114, 114.565], 'ne': [4.408, 117.991] },
        'center': [2.9182033782, 116.249394237]
      },
      'Special Region of Yogyakarta': {
        'region': 'ID-YO',
        'bounds': { 'sw': [-8.204, 110.003], 'ne': [-7.541, 110.839] },
        'center': [-7.89510163766, 110.445807952]
      },
      'Jakarta Special Capital Region': {
        'region': 'ID-JK',
        'bounds': { 'sw': [-6.374, 106.39], 'ne': [-5.202, 106.974] },
        'center': [-6.19875625864, 106.834075859]
      }
    },
    'default_region': {
      'region': 'java',
      'bounds': {
        'sw': [-11.0076711, 95.0107985], // [ymin , xmin]
        'ne': [6.076744, 141.0200345] // [ymax, xmax]
      },
      'center': [4.22568208825, 96.9100985353]
    },
    'region_center': [-2.465463549999999, 118.01541650000001],
    'start_city_center': [-6.1754, 106.8271],
    'starting_zoom': 6,
    'minimum_zoom': 5
  }
};
