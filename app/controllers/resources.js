import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const GENERAL_SUBJECT_ID = 'recLpIXhGuw2rp7gS';

export default class ResourcesController extends Controller {
  @service data;

  queryParams = ['subject', 'search'];
  @tracked subject = GENERAL_SUBJECT_ID;
  @tracked search = "";

  get filteredResources() {
    const searchRegExp = new RegExp(this.search, "i");
    return this.data.resources.filter((resource) => {
      const isSubject = resource.belongsTo('subject').id() == this.subject;
      const matchesSearch = searchRegExp.exec(resource.name);

      return isSubject && matchesSearch;
    }).sortBy('name');
  }

  @action
  setSubject(subject) {
    this.subject = subject ? subject.id : GENERAL_SUBJECT_ID;
  }

  @action
  setSearch(term) {
    this.search = term;
  }
}
