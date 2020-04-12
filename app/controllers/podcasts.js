import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PodcastsController extends Controller {
  @service data;

  queryParams = ['search', 'page'];
  @tracked search = "";
  @tracked page = 1;

  perPage=10;

  get filteredPodcasts() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.podcasts.filter(podcast => {
      const matchesSearch = searchRegExp.exec(podcast.name);

      return matchesSearch;
    }).sortBy('name');
  }

  get podcastsToShow() {
    const start = (this.page - 1) * this.perPage;
    const end = start + this.perPage;

    return this.filteredPodcasts.slice(start, end)
  }

  get totalPages() {
    return Math.ceil( this.filteredPodcasts.length / this.perPage );
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
