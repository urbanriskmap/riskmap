
export class Map {
  activate(params, navigationInstruction){
    this.route = navigationInstruction.route;
 }

  attached(){
    alert(this.route);
    let map = L.map('map');
    let Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(map);
    map.locate({setView: true, maxZoom: 16});
  }
}
