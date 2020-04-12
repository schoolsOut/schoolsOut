import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StreamingController extends Controller {
  @service data;

  queryParams = ['search', 'page'];
  @tracked search = "";
  @tracked page = 1;

  perPage=10;

  get filteredVideos() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.videos.filter((video) => {
      const matchesSearch = searchRegExp.exec(video.title);

      return matchesSearch;
    }).sortBy('title');
  }

  get videosToShow() {
    const start = (this.page - 1) * this.perPage + 1;
    const end = start + this.perPage;

    return this.filteredVideos.slice(start, end)
  }

  get totalPages() {
    return Math.ceil( this.filteredVideos.length / this.perPage );
  }

  @action
  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  @action
  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
    }
  }
}
