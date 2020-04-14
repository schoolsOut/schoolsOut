import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const GENERAL_SUBJECT_ID = 'recLpIXhGuw2rp7gS';

export default class ResourcesController extends Controller {
  @service data;

  queryParams = [
    'subject',
    'search',
    { hasApp: 'app' },
    { earlyChildhood: 'early' },
    { elementary: 'elementary' },
    { middleSchool: 'middle' },
    { highSchool: 'high' },
    { higherEd: 'higher' },
    'page'
  ];
  @tracked subject = GENERAL_SUBJECT_ID;
  @tracked search = "";
  @tracked page = 1;

  @tracked hasApp = false;
  @tracked earlyChildhood = false;
  @tracked elementary = false;
  @tracked middleSchool = false;
  @tracked highSchool = false;
  @tracked higherEd = false;

  perPage=10;

  get filteredResources() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.resources.filter((resource) => {
      const isSubject = resource.belongsTo('subject').id() == this.subject;
      const matchesSearch = searchRegExp.exec(resource.name);

      let keep = isSubject && matchesSearch;

      ['hasApp', 'earlyChildhood', 'elementary', 'middleSchool', 'highSchool', 'higherEd'].forEach( key => {
        if (this[key]) {
          keep = keep && resource[key];
        }
      })

      return keep;
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
