const level = require('level')
const { promises: asyncFs } = require("fs");
let db;

const getDbInstance = (dbPath) => {
  if (db) {
    return db;
  }
  db = level(dbPath);
  return db;
}

const createReadStream = async (dbPath, option = {}) => {
  let array = [];
  try {
    const dbInstance = level(dbPath);
    const readStream = dbInstance.createReadStream(option)
    for await (const data of readStream) {
      array.push(data)
    }
    await dbInstance.close();
    return array
  } catch (error) {
    console.error(error)
    return null;
  }
}

const writeToFile = async (name, data) => {
  try {
    await asyncFs.writeFile(name, JSON.stringify(data), 'utf-8');
    console.log(`Successfully created: ${name}`)
  } catch (err) {
    console.error(`Error occurred while creating ${name}`, err);
  }
}
const readJson = async () => {
  const data = await asyncFs.readFile('data/stencyl.json', "binary");
  return JSON.parse(data);
}

const rootKeys = {
  PlayerDATABASE: true,
  GetPlayersUsernames: true,
  CauldronInfo: true,
  StarSignsUnlocked: true,
  Cards: true,
  StampLevel: true,
  StatueG: true,
  InvStorageUsed: true,
  CogOrder: true,
  CogMap: true,
  ObolEquippedOrder: true,
  MoneyBANK: true,
  ChestOrder: true,
  ChestQuantity: true,
  ShrineInfo: true,
  WorldTeleports: true,
  KeysAll: true,
  ColosseumTickets: true,
  ObolFragments: true,
  SilverPens: true,
  GoldPens: true,
  GemsOwned: true,
  ShopStock: true,
  BribeStatus: true,
  StarSignProg: true,
  CauldronBubbles: true,
  FamilyValuesMap: true,
  CurrenciesOwned: true,
  Printer: true,
  SteamAchieve: true,
  AchieveReg: true,
  Refinery: true,
  Tasks: true,
  BundlesReceived: true,
  SaltLick: true
}

const characterKeys = {
  CharacterClass: true,
  AFKtarget: true,
  PersonalValuesMap: true,
  Lv0: true,
  MaxCarryCap: true,
  StatueLevels: true,
  AnvilPAselect: true,
  CSetEq: true,
  CardEquip: true,
  ObolEquippedMap: true,
  ObolEquippedOrder: true,
  SkillLevels: true,
  SkillLevelsMAX: true,
  CurrentMap: true,
  InvBagsUsed: true,
  EquipmentOrder: true,
  EquipmentQuantity: true,
  EquipmentMap: true,
  InventoryOrder: true,
  ItemQuantity: true,
  Prayers: true,
  PlayerStuff: true,
  PldTraps: true,
  QuestComplete: true,
  Money: true,
  Exp0: true,
  ExpReq0: true,
  PostOfficeInfo: true,
  KillsLeft2Advance: true
}

const filterObjectKeys = (object) => {
  return Object.entries(object).reduce((res, [key, value]) => {
    if (rootKeys[key] || characterKeys[key]) {
      res[key] = value
    }
    return res;
  }, {});
}

module.exports = {
  createReadStream,
  writeToFile,
  readJson,
  filterObjectKeys,
  rootKeys,
  characterKeys
}