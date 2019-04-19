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
var BuildFulfillment = module.exports = function BuildFulfillment() {
  BaseObject.call(this);

  this.internalId = null;
  this.externalId = null;
  this.createdDate = null;
  this.lastModifiedDate = null;
  this.shipGroup = null;
  this.address = null;
  this.shipIsResidential = null;
  this.tranDate = null;
  this.tranId = null;
  this.items = null;
  this.postPeriod = null;
  this.trackingNumbers = null;

};

util.inherits(BuildFulfillment, BaseObject);

/**
 * @override
 */
BuildFulfillment.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'tranSales:ItemFulfillment'
  };

  if (this.externalId) {
    attrs.externalId = this.externalId;
  }

  return attrs;
};

/**
 * @override
 */
BuildFulfillment.prototype.getUnserializablePropertyNames = function() {
  return ['internalId', 'externalId', 'type'];
};

/**
 * @override
 */
BuildFulfillment.prototype.getSOAPType = function() {
  // Always baseRef
  return 'record';
};

/**
 * @override
 */
BuildFulfillment.prototype.getXml = function() {
  // Need to override in a different way than parent `SearchRecord`
  var xml = [];

  xml.push(`<tranSales:createdDate>${this.createdDate}</tranSales:createdDate>`);
  xml.push(`<tranSales:lastModifiedDate>${this.lastModifiedDate}</tranSales:lastModifiedDate>`);
  xml.push(`<tranSales:createdFrom xsi:type="platformCore:RecordRef" internalId="${this.internalId}"/>`);
  xml.push(`<tranSales:createdFromShipGroup>${this.shipGroup}</tranSales:createdFromShipGroup>`);
  xml.push(`<tranSales:shippingAddress>`);
  xml.push(`<platformCommon:country>${this.address.country}</platformCommon:country>`);
  xml.push(`<platformCommon:addressee>${this.address.addressee}</platformCommon:addressee>`);
  xml.push(`<platformCommon:addrPhone>${this.address.addrPhone}</platformCommon:addrPhone>`);
  xml.push(`<platformCommon:addr1>${this.address.addr1}</platformCommon:addr1>`);
  xml.push(`<platformCommon:city>${this.address.city}</platformCommon:city>`);
  xml.push(`<platformCommon:state>${this.address.state}</platformCommon:state>`);
  xml.push(`<platformCommon:zip>${this.address.zip}</platformCommon:zip>`);
  xml.push(`<platformCommon:addrText>${this.address.addrText}</platformCommon:addrText>`);
  xml.push(`<platformCommon:override>${this.address.override}</platformCommon:override>`);
  xml.push(`</tranSales:shippingAddress>`);
  xml.push(`<tranSales:shipIsResidential>${this.shipIsResidential}</tranSales:shipIsResidential>`);
  xml.push(`<tranSales:shipStatus>_shipped</tranSales:shipStatus>`);
  xml.push(`<tranSales:tranDate>${this.tranDate}</tranSales:tranDate>`);
  xml.push(`<tranSales:tranId>${this.tranId}</tranSales:tranId>`);
  xml.push(`<tranSales:itemList replaceAll="false">`)

  // Bring it to one level array
  const items = [].concat.apply([], this.items);
  items.forEach((item) =>{
    xml.push(`<tranSales:item>`);
    xml.push(`<tranSales:item internalId="${item.item.$attributes.internalId}">`);
    xml.push(`</tranSales:item>`);
    xml.push(`<tranSales:itemReceive>${item.itemReceive}</tranSales:itemReceive>`);
    xml.push(`<tranSales:itemIsFulfilled>true</tranSales:itemIsFulfilled>`);
    xml.push(`<tranSales:orderLine>${item.orderLine}</tranSales:orderLine>`);
    xml.push(`<tranSales:itemName>${item.itemName}</tranSales:itemName>`);
    xml.push(`<tranSales:onHand>${item.onHand}</tranSales:onHand>`);
    xml.push(`<tranSales:quantity>1</tranSales:quantity>`);
    xml.push(`<tranSales:binNumbers>DB_NY_Returns</tranSales:binNumbers>`);
    xml.push(`<tranSales:orderLine>${item.orderLine}</tranSales:orderLine>`);
    xml.push(`<tranSales:quantityRemaining>${item.quantityRemaining}</tranSales:quantityRemaining>`);
    xml.push(`</tranSales:item>`);
  });

  xml.push(`</tranSales:itemList>`);
  xml.push(`<tranSales:postingPeriod internalId="${this.postPeriod.$attributes.internalId}" xsi:type="platformCore:RecordRef"/>`)
  xml.push(`<tranSales:packageList replaceAll="false">`);
  xml.push(`<tranSales:package>`);
  xml.push(`<tranSales:packageTrackingNumber>${this.trackingNumbers}</tranSales:packageTrackingNumber>`);
  xml.push(`<tranSales:packageWeight>1</tranSales:packageWeight>`);
  xml.push(`</tranSales:package>`);
  xml.push(`</tranSales:packageList>`);
  xml.push(`<tranSales:packageFedExList>`);
  xml.push(`<tranSales:packageFedEx>`);
  xml.push(`<tranSales:packageTrackingNumberFedEx>${this.trackingNumbers}</tranSales:packageTrackingNumberFedEx>`);
  xml.push(`<tranSales:packageWeightFedEx>1</tranSales:packageWeightFedEx>`);
  xml.push(`</tranSales:packageFedEx>`);
  xml.push(`</tranSales:packageFedExList>`);
  xml.push(`<tranSales:packageUpsList>`);
  xml.push(`<tranSales:packageUps>`);
  xml.push(`<tranSales:packageTrackingNumberUps>${this.trackingNumbers}s</tranSales:packageTrackingNumberUps>`);
  xml.push(`<tranSales:packageWeightUps>1</tranSales:packageWeightUps>`);
  xml.push(`</tranSales:packageUps>`);
  xml.push(`</tranSales:packageUpsList>`);

  // if (this.columns) {
  //   xml.push('<listRel:columns>');
  //   xml.push(this.columns.getXml());
  //   xml.push('</listRel:columns>');
  // }

  return xml.join('');
};
