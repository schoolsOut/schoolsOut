import ApplicationSerializer from './application';

export default class VideoSerializer extends ApplicationSerializer {
  normalize(modelClass, payload) {
    const normalized = {
      id: payload.id,
      type: 'videos',
      attributes: {
        name: payload.fields.Name,
        title: payload.fields.Title,
        rating: payload.fields.Rating,
        topic: payload.fields.Topic,
        summary: payload.fields.Summary,
        prime: payload.fields.Prime | false,
        apple: payload.fields.Apple | false,
        disney: payload.fields['Disney+'] | false,
        'google-play': payload.fields['Google Play'] | false,
        netflix: payload.fields.Netflix | false,
        youtube: payload.fields.Youtube | false
      },
      relationships: {}
    };

    return super.normalize(modelClass, normalized);
  }
}
