import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('setup', function() {
    this.route('notifications');
    this.route('completed');
    this.route('consents');
  });
  this.route('map');
  this.route('dashboard', function() {
    this.route('categories');
    this.route('locations');
    this.route('overview');
  });
});

export default Router;
