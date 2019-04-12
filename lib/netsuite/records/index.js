'use strict';

/**
 * NetSuite Records
 * @return {Records}
 */
var Records = module.exports = {};

Records.RecordRef = require('./recordRef');
Records.TransferOrder = require('./transferOrder');
Records.InitializeFulfillment = require('./initializeFulfillment');
Records.BuildFulfillment = require('./buildFulfillment');
