import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PodcastsRoute extends Route {
  @service data;

  async beforeModel() {
    return this.data.loadPodcastsTask.perform();
  }
}
