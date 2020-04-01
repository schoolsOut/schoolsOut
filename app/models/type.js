import Model, { attr } from '@ember-data/model';

export default class TypeModel extends Model {
  @attr('string') name;
  @attr('string') iconUrl;
}
