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

  @task
  *loadAllTask() {
    yield all([
      this.loadAndPushTask.perform('types', this.serializeType),
      this.loadAndPushTask.perform('subjects', this.serializeSubject),
      this.loadAndPushTask.perform('resources', this.serializeResource),
    ])
  }

  @task
  *loadAndPushTask(name, serializer) {
    let payload = yield this.fetchTask.perform(`/data/${name}.json`);
    let data = [];
    payload.records.forEach(record => {
      data.push(serializer(record));
    });
    this.store.pushPayload({ data });
    set(this, name, this.store.peekAll(singularize(name)));
  }

  @task
  *fetchTask(url) {
    let response = yield fetch(url);
    return response.json();
  }

  // TODO: Move to serializer normalizeReponse
  serializeType(payload) {
    return {
      id: payload.id,
      type: "types",
      attributes: {
        name: payload.fields.Name,
        "icon-url": payload.fields.Icon[0].url
      },
      relationships: {
        resources: {
          data: payload.fields.Resources.map(function(id) {
            return {
              type: "resources",
              id
            };
          })
        }
      }
    };
  }

  serializeSubject(payload) {
    return {
      id: payload.id,
      type: 'subjects',
      attributes: {
        name: payload.fields.Name,
        description: payload.fields.Description,
        color: payload.fields.RGB
      },
      relationships: {
        resources: {
          data: payload.fields.Resources.map(function(id) {
            return {
              type: "resources",
              id
            }
          })
        }
      }
    }
  }

  serializeResource(payload) {
    const relationships = {};

    if (payload.fields.Type) {
      relationships.type = {
        data: {
          type: "types",
          id: payload.fields.Type[0]
        }
      }
    }

    if (payload.fields.Subject) {
      relationships.type = {
        data: {
          type: "subjects",
          id: payload.fields.Subject[0]
        }
      }
    }

    return {
      id: payload.id,
      type: 'resources',
      attributes: {
        name: payload.fields.Name,
        url: payload.fields.Website,
        description: payload.fields.Description,
        age: payload.fields.Age,
        'has-app': payload.fields["App Available"] | false,
        'early-childhood': payload.fields['Early Childhood'] | false,
        elementary: payload.fields['Elementary'] | false,
        'middle-school': payload.fields['Middle School'] | false,
        'high-school': payload.fields['High School'] | false,
        'higher-ed': payload.fields['Higher Ed /Adult'] | false
      },
      relationships
    }
  }
}
