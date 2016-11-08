import DS from 'ember-data';

export default DS.Model.extend({
  location: DS.attr('string'),
  depth: DS.attr('number'),
  text: DS.attr('string')
});
