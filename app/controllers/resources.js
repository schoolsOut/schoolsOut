import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const GENERAL_SUBJECT_ID = 'recLpIXhGuw2rp7gS';

export default class ResourcesController extends Controller {
  @service data;

  queryParams = ['subject'];
  @tracked subject = GENERAL_SUBJECT_ID;

  get filteredResources() {
    return this.data.resources.filterBy('subject.id', this.subject).sortBy('name');
  }

  @action
  setSubject(subject) {
    this.subject = subject ? subject.id : GENERAL_SUBJECT_ID;
  }
}
