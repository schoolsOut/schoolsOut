import Model, { attr, belongsTo } from '@ember-data/model';

export default class ResourceModel extends Model {
  @attr('string') name;
  @attr('string') url;
  @attr('string') description;
  @attr('string') age;
  @attr('boolean') hasApp;
  @attr('boolean') earlyChildhood;
  @attr('boolean') elementary;
  @attr('boolean') middleSchool;
  @attr('boolean') highSchool;
  @attr('boolean') higherEd;

  @belongsTo('type') type;
  @belongsTo('subject') subject;
}
