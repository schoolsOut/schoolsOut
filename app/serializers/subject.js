import ApplicationSerializer from './application';

export default class SubjectSerializer extends ApplicationSerializer {
  normalize(modelClass, payload) {
    const normalized = {
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
    };

    return super.normalize(modelClass, normalized);
  }
}
