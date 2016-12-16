export class Reportcard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  constructor() {
    this.location = {markerLocation: null, gpsLocation: null, accuracy: null};
    this.depth = null;
    this.photo = {file: null, rotation: 0};
    this.description = {hint: "Enter description here...", value: null};
  }
}
