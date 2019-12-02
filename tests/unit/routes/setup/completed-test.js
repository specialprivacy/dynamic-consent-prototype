import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | setup/completed', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:setup/completed');
    assert.ok(route);
  });
});
