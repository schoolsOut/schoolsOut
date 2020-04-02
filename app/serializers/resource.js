import ApplicationSerializer from './application';

export default class ResourceSerializer extends ApplicationSerializer {
  normalize(modelClass, payload) {
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

    const normalized = {
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
    };

    return super.normalize(modelClass, normalized);
  }
}
