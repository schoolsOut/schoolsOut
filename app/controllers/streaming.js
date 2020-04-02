import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StreamingController extends Controller {
  @service data;

  @tracked
  videos = this.data.videos.sortBy('title');
}
