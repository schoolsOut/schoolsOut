import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | live-classes', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:live-classes');
    assert.ok(route);
  });
});
