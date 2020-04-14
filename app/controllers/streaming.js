import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StreamingController extends Controller {
  @service data;

  queryParams = [
    'search',
    'page',
    'prime',
    'apple',
    'disney',
    { googlePlay: 'google' },
    'netflix',
    'youtube'
  ];
  @tracked search = "";
  @tracked page = 1;

  @tracked prime = false;
  @tracked apple = false;
  @tracked disney = false;
  @tracked googlePlay = false;
  @tracked netflix = false;
  @tracked youtube = false;

  perPage=10;

  get filteredVideos() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.videos.filter( video => {
      const matchesSearch = searchRegExp.exec(video.title);

      let keep = matchesSearch;
      ['prime', 'apple', 'disney', 'googlePlay', 'netflix', 'youtube'].forEach( key => {
        if (this[key]) {
          keep = keep && video[key];
        }
      })
      return keep;
    }).sortBy('title');
  }

  get videosToShow() {
    const start = (this.page - 1) * this.perPage;
    const end = start + this.perPage;

    return this.filteredVideos.slice(start, end)
  }

  get totalPages() {
    return Math.ceil( this.filteredVideos.length / this.perPage );
  }

  @action
  setSearch(term) {
    this.search = term;
    this.page = 1;
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
