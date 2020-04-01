import Model, { attr } from '@ember-data/model';

export default class VideoModel extends Model {
  @attr('string') title;
  @attr('string') rating;
  @attr('string') topic;
  @attr('string') summary;
  @attr('boolean') prime;
  @attr('boolean') apple;
  @attr('boolean') disney;
  @attr('boolean') googlePlay;
  @attr('boolean') netflix;
  @attr('boolean') youtube;
}
