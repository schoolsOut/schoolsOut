import ApplicationSerializer from './application';

export default class PodcastSerializer extends ApplicationSerializer {
  normalize(modelClass, payload) {
    const relationships = {};

    const normalized = {
      id: payload.id,
      type: 'podcasts',
      attributes: {
        name: payload.fields.Name,
        link: payload.fields.Link,
        description: payload.fields.Description
      },
      relationships
    };

    return super.normalize(modelClass, normalized);
  }
}
