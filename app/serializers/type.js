import ApplicationSerializer from './application';

export default class TypeSerializer extends ApplicationSerializer {
  normalize(modelClass, payload) {
    const normalized = {
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

    return super.normalize(modelClass, normalized);
  }
}
