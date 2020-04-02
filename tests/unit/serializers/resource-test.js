import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | resource', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('resource');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('resource', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
