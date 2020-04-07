import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StreamingController extends Controller {
  @service data;

  queryParams = ['search'];
  @tracked search = "";

  get videos() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.videos.filter((video) => {
      const matchesSearch = searchRegExp.exec(video.title);

      return matchesSearch;
    }).sortBy('title');
  }

  // @tracked
  // videos = this.data.videos.sortBy('title');
}
