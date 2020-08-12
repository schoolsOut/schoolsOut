import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service data;
  @service metrics;
  @service router

  constructor() {
    super(...arguments);

    let router = this.router;
    router.on('routeDidChange', () => {
      const page = router.currentURL;
      const title = router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }

  async beforeModel() {
    return this.data.loadSettingsTask.perform();
  }
}
