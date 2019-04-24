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
  this.location = null;
  this.transferLocation = null;
  this.items = [];
  this.customSourceID = null;

};

util.inherits(TransferOrder, BaseObject);

/**
 * @override
 */
TransferOrder.prototype.getAttributes = function() {
  var attrs = {
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

/**
 * @override
 */
TransferOrder.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  xml.push(`<tranInvt:tranId>${this.tranId}</tranInvt:tranId>`);
  xml.push(`<tranInvt:tranDate>${this.tranDate}</tranInvt:tranDate>`);
  xml.push(`<tranInvt:orderStatus>_pendingFulfillment</tranInvt:orderStatus>`);
  xml.push(`<tranInvt:subsidiary internalId="${this.subsidiary}" xsi:type="platformCore:RecordRef"/>`);
  xml.push(`<tranInvt:location internalId="${this.location}" xsi:type="platformCore:RecordRef"/>`);
  xml.push(`<tranInvt:transferLocation internalId="${this.transferLocation}" xsi:type="platformCore:RecordRef"/>`);
  xml.push('<tranInvt:itemList replaceAll="true">')

  for(let i = 0; i < this.items.length; i++){
    const item = this.items[i];
    xml.push('<tranInvt:item>');
    xml.push('<tranInvt:quantity>1</tranInvt:quantity>');
    xml.push(`<tranInvt:item externalId="${item}" xsi:type="platformCore:RecordRef"/>`);
    xml.push('</tranInvt:item>');
  }
  xml.push('</tranInvt:itemList>');

  //custom source id for Event System
  xml.push(`<tranInvt:customFieldList>`);
  xml.push(`<platformCore:customField xsi:type="platformCore:StringCustomFieldRef" scriptId="custbody_mo_event_system_source_id" internalId="925">`);
  xml.push(`<platformCore:value>${this.customSourceID}</platformCore:value>`);
  xml.push(`</platformCore:customField>`);
  xml.push(`<platformCore:customField xsi:type="platformCore:BooleanCustomFieldRef" scriptId="custbody_confirmed_mercedes" internalId="664">`);
  xml.push(`<platformCore:value>true</platformCore:value>`);
  xml.push(`</platformCore:customField>`);
  xml.push(`</tranInvt:customFieldList>`);
  
  // if (this.columns) {
  //   xml.push('<listRel:columns>');
  //   xml.push(this.columns.getXml());
  //   xml.push('</listRel:columns>');
  // }

  return xml.join('');
};
