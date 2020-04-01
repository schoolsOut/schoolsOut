import Model, { attr } from '@ember-data/model';

export default class SubjectModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @attr('string') color;
}
