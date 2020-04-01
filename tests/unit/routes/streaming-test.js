import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | streaming', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:streaming');
    assert.ok(route);
  });
});
