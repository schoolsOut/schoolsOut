import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class IndexRoute extends Route {
  async beforeModel() {
    if (this.store.peekAll('type').content.length == 0) {
      const data = {data: []};

      let response = await fetch('/data/types.json');
      const types = await response.json();

      types.records.forEach(function(type) {
        data.data.pushObject({
          id: type.id,
          type: 'types',
          attributes: {
            name: type.fields.Name,
            'icon-url': type.fields.Icon[0].url
          },
          relationships: {
            resources: {
              data: type.fields.Resources.map(function(id) {
                return {
                  type: "resources",
                  id
                }
              })
            }
          }
        });
      });


      response = await fetch('/data/subjects.json');
      const subjects = await response.json();

      subjects.records.forEach(function(subject) {
        data.data.pushObject({
          id: subject.id,
          type: 'subjects',
          attributes: {
            name: subject.fields.Name,
            description: subject.fields.Description,
            color: subject.fields.RGB
          },
          relationships: {
            resources: {
              data: subject.fields.Resources.map(function(id) {
                return {
                  type: "resources",
                  id
                }
              })
            }
          }
        });
      });

      response = await fetch('/data/resources.json');
      const resources = await response.json();

      resources.records.forEach(function(resource) {
        const relationships = {};

        if (resource.fields.Type) {
          relationships.type = {
            data: {
              type: "types",
              id: resource.fields.Type[0]
            }
          }
        }

        if (resource.fields.Subject) {
          relationships.type = {
            data: {
              type: "subjects",
              id: resource.fields.Subject[0]
            }
          }
        }

        data.data.pushObject({
          id: resource.id,
          type: 'resources',
          attributes: {
            name: resource.fields.Name,
            url: resource.fields.Website,
            description: resource.fields.Description,
            age: resource.fields.Age,
            'has-app': resource.fields["App Available"] | false,
            'early-childhood': resource.fields['Early Childhood'] | false,
            elementary: resource.fields['Elementary'] | false,
            'middle-school': resource.fields['Middle School'] | false,
            'high-school': resource.fields['High School'] | false,
            'higher-ed': resource.fields['Higher Ed /Adult'] | false
          },
          relationships
        });
      });

      this.store.pushPayload(data);
    }
  }
}
