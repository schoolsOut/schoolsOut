import Route from '@ember/routing/route';

export default class StreamingRoute extends Route {
  async beforeModel() {
    if (this.store.peekAll('video').content.length == 0) {
      const data = {data: []};

      let response = await fetch('/data/streaming.json');
      const videos = await response.json();

      videos.records.forEach(function(video) {
        data.data.pushObject({
          id: video.id,
          type: 'videos',
          attributes: {
            name: video.fields.Name,
            title: video.fields.Title,
            rating: video.fields.Rating,
            topic: video.fields.Topic,
            summary: video.fields.Summary,
            prime: video.fields.Prime | false,
            apple: video.fields.Apple | false,
            disney: video.fields['Disney+'] | false,
            'google-play': video.fields['Google Play'] | false,
            netflix: video.fields.Netflix | false,
            youtube: video.fields.Youtube | false
          },
          relationships: {}
        });
      });

      this.store.pushPayload(data);
    }
  }
}
