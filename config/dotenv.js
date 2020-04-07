/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    clientAllowedKeys: ['ASSETS_STAGING_AWS_KEY','ASSETS_STAGING_AWS_SECRET','ASSETS_STAGING_BUCKET','ASSETS_STAGING_REGION','ASSETS_PRODUCTION_AWS_KEY','ASSETS_PRODUCTION_AWS_SECRET','ASSETS_PRODUCTION_BUCKET','ASSETS_PRODUCTION_REGION'],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env')
  }
};
