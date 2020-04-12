import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const GENERAL_SUBJECT_ID = 'recLpIXhGuw2rp7gS';

export default class ResourcesController extends Controller {
  @service data;

  queryParams = ['subject', 'search', 'page'];
  @tracked subject = GENERAL_SUBJECT_ID;
  @tracked search = "";
  @tracked page = 1;

  perPage=10;

  get filteredResources() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.resources.filter((resource) => {
      const isSubject = resource.belongsTo('subject').id() == this.subject;
      const matchesSearch = searchRegExp.exec(resource.name);

      return isSubject && matchesSearch;
    }).sortBy('name');
  }

  get resourcesToShow() {
    const start = (this.page - 1) * this.perPage;
    const end = start + this.perPage;

    return this.filteredResources.slice(start, end)
  }

  get totalPages() {
    return Math.ceil( this.filteredResources.length / this.perPage );
  }

  @action
  setSubject(subject) {
    this.page = 1;
    this.subject = subject ? subject.id : GENERAL_SUBJECT_ID;
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
