import Service from '@ember/service';
import { all } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';
import { singularize } from 'ember-inflector';

export default class DataService extends Service {
  @service store;

  @tracked types = [];
  @tracked subjects = [];
  @tracked resources = [];
  @tracked videos = [];

  @task
  *loadAllTask() {
    yield all([
      this.loadAndPushTask.perform('types'),
      this.loadAndPushTask.perform('subjects'),
      this.loadAndPushTask.perform('resources'),
    ])
  }

  @task
  *loadVideosTask() {
    yield this.loadAndPushTask.perform('videos');
  }

  @task
  *loadPodcastsTask() {
    yield this.loadAndPushTask.perform('podcasts');
  }

  @task
  *loadSettingsTask() {
    this.settings = {}
    const payload = yield this.fetchTask.perform(`https://schoolsout-indefinitely.s3-us-west-2.amazonaws.com/data/settings.json`);
    payload.forEach(record => {
      this.settings[record.fields['Data Tag']] = record.fields.Content;
    });
  }

  @task
  *loadAndPushTask(name) {
    let payload = yield this.fetchTask.perform(`https://schoolsout-indefinitely.s3-us-west-2.amazonaws.com/data/${name}.json`);
    let data = [];
    payload.forEach(record => {
      record.type = name;
      data.push(record);
    });
    this.store.pushPayload({ data });
    set(this, name, this.store.peekAll(singularize(name)));
  }

  @task
  *fetchTask(url) {
    let response = yield fetch(url);
    return response.json();
  }

  resourcesWithSubjectId(subjectId) {
    return this.resources.filter(function(resource) {
      return resource.subject.id === subjectId;
    })
  }
}
