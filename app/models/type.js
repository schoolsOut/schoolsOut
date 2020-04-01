import Model, { attr, hasMany } from '@ember-data/model';

export default class TypeModel extends Model {
  @attr('string') name;
  @attr('string') iconUrl;

  @hasMany('resource') resources;
}
