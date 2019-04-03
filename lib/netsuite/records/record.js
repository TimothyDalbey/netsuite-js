'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/recordref.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {TransferOrder}
 */
var TransferOrder = module.exports = function TransferOrder() {
  BaseObject.call(this);

  /**
   * @member {String|Number}
   */
  this.internalId = null;

  /**
   * @member {String|Number}
   */
  this.externalId = null;

  /**
   * @member {String|Number}
   */
  this.tranId = '';

  /**
   * @member {Date}
   */
  this.tranDate = null;

  
  this.subsidiary = null;
  // this.location = null;
  // this.transferLocation = null;

};

util.inherits(TransferOrder, BaseObject);

/**
 * @override
 */
TransferOrder.prototype.getAttributes = function() {
  var attrs = {
    type: this.type,
    'xsi:type': 'tranInvt:TransferOrder'
  };

  if (this.internalId) {
    attrs.internalId = this.internalId;
  }

  if (this.externalId) {
    attrs.externalId = this.externalId;
  }

  return attrs;
};

/**
 * @override
 */
TransferOrder.prototype.getUnserializablePropertyNames = function() {
  return ['internalId', 'externalId', 'type'];
};

/**
 * @override
 */
TransferOrder.prototype.getSOAPType = function() {
  // Always baseRef
  return 'record';
};
