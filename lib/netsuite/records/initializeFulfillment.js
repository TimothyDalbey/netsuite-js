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
var InitializeFulfillment = module.exports = function InitializeFulfillment() {
  BaseObject.call(this);

  this.internalId = null;
  this.externalId = null;
  this.initializeTypeRecord = null;
  this.referenceType = null;

};

util.inherits(InitializeFulfillment, BaseObject);

/**
 * @override
 */
InitializeFulfillment.prototype.getAttributes = function() {
  var attrs = {
  };

  return attrs;
};

/**
 * @override
 */
InitializeFulfillment.prototype.getUnserializablePropertyNames = function() {
  return ['internalId', 'externalId', 'type'];
};

/**
 * @override
 */
InitializeFulfillment.prototype.getSOAPType = function() {
  // Always baseRef
  return 'initializeRecord';
};

/**
 * @override
 */
InitializeFulfillment.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  xml.push(`<platformCore:type>${this.typeRecord}</platformCore:type>`)
  xml.push(`<platformCore:reference internalId="${this.internalId}" type="${this.referenceType}"/>`);

  // if (this.columns) {
  //   xml.push('<listRel:columns>');
  //   xml.push(this.columns.getXml());
  //   xml.push('</listRel:columns>');
  // }

  return xml.join('');
};
