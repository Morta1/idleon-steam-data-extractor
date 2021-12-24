const { set, isEmpty } = require('lodash');

const serialize = (object) => {
  const root = object;
  const playerDatabase = object?.PlayerDATABASE;
  let fields = {}, charNames = {};
  for (const [key, value] of Object.entries(root)) {
    if (key === 'Cards') {
      if (value?.[0]) set(fields, 'Cards0.stringValue', JSON.stringify(value[0]));
      if (value?.[1]) set(fields, 'Cards1.stringValue', JSON.stringify(value[1]));
    }
    if (key === 'ObolEquippedOrder') {
      if (value?.[1]) set(fields, 'ObolEqO1.arrayValue.values', toArray(value[1], 'stringValue'));
    }
    if (key === 'ObolEquippedMap') {
      if (value?.[1]) set(fields, 'ObolEqO2', value[1]);
    }
    if (key === 'StampLevel') {
      if (value) set(fields, 'StampLv.arrayValue.values', arrayToArray(value, 'mapValue.fields', 'integerValue'));
    }
    if (key === 'StatueG') {
      if (value) set(fields, 'StuG.stringValue', JSON.stringify(value));
    }
    if (key === 'MoneyBANK') {
      if (value) set(fields, 'MoneyBANK.integerValue', value);
    }
    if (key === 'ChestOrder') {
      if (value) set(fields, 'ChestOrder.arrayValue.values', toArray(value, 'stringValue'));
    }
    if (key === 'ChestQuantity') {
      if (value) set(fields, 'ChestQuantity.arrayValue.values', toArray(value, 'integerValue'));
    }
    if (key === 'ShrineInfo') {
      if (value) set(fields, 'Shrine.stringValue', JSON.stringify(value));
    }
    if (key === 'FamilyValuesMap') {
      if (value?.['ColosseumHighscores']) set(fields, 'FamValColosseumHighscores.arrayValue.values', toArray(value?.['ColosseumHighscores'], 'integerValue'));
      if (value?.['MinigameHiscores']) set(fields, 'FamValMinigameHiscores.arrayValue.values', toArray(value?.['MinigameHiscores'], 'integerValue'));
    }
    if (key === 'CurrenciesOwned') {
      if (value?.['WorldTeleports']) set(fields, 'CYWorldTeleports.integerValue', value?.['WorldTeleports']);
      if (value?.['KeysAll']) set(fields, 'CYKeysAll.arrayValue.values', toArray(value?.['KeysAll'], 'integerValue'));
      if (value?.['ColosseumTickets']) set(fields, 'CYColosseumTickets.integerValue', value?.['ColosseumTickets']);
      if (value?.['ObolFragments']) set(fields, 'CYObolFragments.integerValue', value?.['ObolFragments']);
      if (value?.['SilverPens']) set(fields, 'CYSilverPens.integerValue', value?.['SilverPens']);
      if (value?.['GoldPens']) set(fields, 'CYGoldPens.integerValue', value?.['GoldPens']);
      if (value?.['DeliveryBoxComplete']) set(fields, 'DeliveryBoxComplete.integerValue', value?.['DeliveryBoxComplete']);
      if (value?.['DeliveryBoxStreak']) set(fields, 'DeliveryBoxStreak.integerValue', value?.['DeliveryBoxStreak']);
      if (value?.['DeliveryBoxMisc']) set(fields, 'DeliveryBoxMisc.integerValue', value?.['DeliveryBoxMisc']);
    }
    if (key === 'GemsOwned') {
      if (value) set(fields, 'GemsOwned.integerValue', value);
    }
    if (key === 'ShopStock') {
      if (value) set(fields, 'ShopStock.arrayValue.values', arrayToArray(value, 'mapValue.fields', 'integerValue'));
    }
    if (key === 'CauldronInfo') {
      if (value) set(fields, 'CauldronInfo.arrayValue.values', arrayToArray(value, 'mapValue.fields', 'integerValue', {
        start: 0,
        end: 4
      }));
      if (value) {
        // CauldUpgLVs is in the 8th slot
        const baseArray = value[8].map((array) => toArray(array.map(([_, level]) => level), 'integerValue'));
        const resultArray = baseArray.reduce((res, array) => ([...res, ...array]), []);
        set(fields, 'CauldUpgLVs.arrayValue.values', resultArray)
      }
    }
    if (key === 'CauldronBubbles') {
      if (value) set(fields, 'CauldronBubbles.stringValue', JSON.stringify(value));
    }
    if (key === 'BribeStatus') {
      if (value) set(fields, 'BribeStatus.arrayValue.values', toArray(value, 'integerValue'));
    }
    if (key === 'StarSignProg') {
      if (value) set(fields, 'SSprog.stringValue', JSON.stringify(value));
    }
    if (key === 'StarSignsUnlocked') {
      if (value) set(fields, 'StarSg.stringValue', JSON.stringify(value));
    }
    if (key === 'Printer') {
      if (value) set(fields, `Print.stringValue`, JSON.stringify(value));
    }
    if (key === 'AchieveReg') {
      if (value) set(fields, `AchieveReg`, value);
    }
    if (key === 'SteamAchieve') {
      if (value) set(fields, `SteamAchieve`, value);
    }
    if (key === 'Refinery') {
      if (value) set(fields, `Refinery`, value);
    }
    if (key === 'Tasks') {
      if (value) set(fields, `Tasks`, value);
    }
    if (key === 'BundlesReceived') {
      if (value) set(fields, `BundlesReceived`, value);
    }
    if (key === 'SaltLick') {
      if (value) set(fields, `SaltLick`, value);
    }
  }

  let charIndex = 0;
  for (const [charName, charData] of Object.entries(playerDatabase)) {
    set(charNames, charIndex, charName);
    for (const [key, value] of Object.entries(charData)) {
      if (key === "CharacterClass") {
        if (value) set(fields, `CharacterClass_${charIndex}.integerValue`, value);
      }
      if (key === "AFKtarget") {
        if (value) set(fields, `AFKtarget_${charIndex}.stringValue`, value);
      }
      if (key === "CurrentMap") {
        if (value) set(fields, `CurrentMap_${charIndex}.integerValue`, value);
      }
      if (key === "InvBagsUsed") {
        if (value) set(fields, `InvBagsUsed_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === "EquipmentOrder") {
        if (value) set(fields, `EquipOrder_${charIndex}.arrayValue.values`, arrayToArray(value, 'mapValue.fields', 'stringValue'));
      }
      if (key === "EquipmentQuantity") {
        if (value) set(fields, `EquipQTY_${charIndex}.arrayValue.values`, arrayToArray(value, 'mapValue.fields', 'stringValue'));
      }
      if (key === "EquipmentMap") {
        if (value?.[0]) set(fields, `EMm0_${charIndex}.stringValue`, JSON.stringify(toIndexedObject(value?.[0], null, true)));
        if (value?.[1]) set(fields, `EMm1_${charIndex}.stringValue`, JSON.stringify(toIndexedObject(value?.[1], null, true)));
      }
      if (key === "InventoryOrder") {
        if (value) set(fields, `InventoryOrder_${charIndex}.arrayValue.values`, toArray(value, 'stringValue'));
      }
      if (key === "ItemQuantity") {
        if (value) set(fields, `ItemQTY_${charIndex}.arrayValue.values`, toArray(value, 'integerValue'));
      }
      if (key === "PersonalValuesMap") {
        if (value?.['StatList']) set(fields, `PVStatList_${charIndex}.arrayValue.values`, toArray(value?.['StatList'], 'integerValue'));
        if (value?.['StarSign']) set(fields, `PVtStarSign_${charIndex}.stringValue`, value?.['StarSign']);
      }
      if (key === 'AnvilPAselect') {
        if (value) set(fields, `AnvilPAselect_${charIndex}.arrayValue.values`, toArray(value, 'integerValue'));
      }
      if (key === 'CSetEq') {
        if (value) set(fields, `CSetEq_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === 'CardEquip') {
        if (value) set(fields, `CardEquip_${charIndex}.arrayValue.values`, toArray(value, 'stringValue'));
      }
      if (key === 'ObolEquippedOrder') {
        if (value) set(fields, `ObolEqO0_${charIndex}.arrayValue.values`, toArray(value, 'stringValue'));
      }
      if (key === 'ObolEquippedMap') {
        if (value) set(fields, `ObolEqO1_${charIndex}`, value);
      }
      if (key === 'SkillLevels') {
        if (value) set(fields, `SL_${charIndex}.stringValue`, JSON.stringify(value.reduce((res, item, index) => (item > 0 ? {
          ...res,
          [index]: item
        } : res), {})));
      }
      if (key === 'SkillLevelsMAX') {
        if (value) set(fields, `SM_${charIndex}.stringValue`, JSON.stringify(value.reduce((res, item, index) => (item > 0 ? {
          ...res,
          [index]: item
        } : res), {})));
      }
      if (key === 'Prayers') {
        if (value) set(fields, `Prayers_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === 'PlayerStuff') {
        if (value) set(fields, `PlayerStuff_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === 'PldTraps') {
        if (value) set(fields, `PldTraps_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === 'QuestComplete') {
        if (value) set(fields, `QuestComplete_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === 'StatueLevels') {
        if (value) set(fields, `StatueLevels_0.stringValue`, JSON.stringify(value));
      }
      if (key === 'MaxCarryCap') {
        if (value) set(fields, `MaxCarryCap_${charIndex}.stringValue`, JSON.stringify(value));
      }
      if (key === 'Lv0') {
        if (value) set(fields, `Lv0_${charIndex}`, value);
      }
      if (key === 'Exp0') {
        if (value) set(fields, `Exp0_${charIndex}`, value);
      }
      if (key === 'ExpReq0') {
        if (value) set(fields, `ExpReq0_${charIndex}`, value);
      }
      if (key === 'Money') {
        if (value) set(fields, `Money_${charIndex}.integerValue`, value);
      }
      if (key === 'PostOfficeInfo') {
        if (value) set(fields, `PostOfficeInfo_${charIndex}`, value);
      }
    }
    charIndex++;
  }

  return {
    charNames,
    guildInfo: {},
    save: {
      documentChange: {
        document: {
          fields
        }
      }
    }
  }
}

const arrayToArray = (array, key, type, indexes) => {
  return array?.reduce((res, arrayItem, index) => {
    let object = {};
    if (indexes && (index < indexes?.start || index > indexes?.end)) {
      return res;
    }
    const indexedObject = toIndexedObject(arrayItem, type);
    set(object, key, indexedObject);
    return [...res, object];
  }, [])
}

const toArray = (array, key) => {
  return array?.map((item) => {
    return { [key]: item }
  })
}

const toIndexedObject = (array, key, removeEmpty) => {
  return array?.reduce((res, item, index) => {
    const object = key ? { [key]: item } : { ...item };
    if (removeEmpty && isEmpty(item)) {
      return res;
    }
    return {
      ...res,
      [index]: object
    }
  }, {})
}

module.exports = {
  serialize
}