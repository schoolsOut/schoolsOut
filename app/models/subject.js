import Model, { attr, hasMany } from '@ember-data/model';

export default class SubjectModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @attr('string') color;

  @hasMany('resource') resources;
}
