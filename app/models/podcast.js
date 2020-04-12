import Model, { attr } from '@ember-data/model';

export default class PodcastModel extends Model {
  @attr('string') name;
  @attr('string') link;
  @attr('string') description;
}
