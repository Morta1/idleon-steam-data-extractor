const Unserializer = require("./stencyl/decoder");
const { filterObjectKeys } = require("./utils");
const { serialize } = require("./ide");
const { toWebsite } = require("./ide/toWebsite");
const log = require("electron-log");

const getUserData = async (source) => {
  try {
    const version = '1.0.8';
    const stencylString = source?.[2]?.value.replace('\u0001', '');
    let unserialized = Unserializer.decode(stencylString);
    unserialized = filterObjectKeys({ ...unserialized });
    let playerDATABASE = {};
    for (const [characterName, value] of Object.entries(unserialized?.PlayerDATABASE)) {
      playerDATABASE[characterName] = filterObjectKeys(value);
    }
    unserialized['PlayerDATABASE'] = playerDATABASE;
    const ideSerialized = serialize(unserialized);
    const websiteSerialized = toWebsite(ideSerialized);
    console.log(`#Finished serializing with version: ${version}`);
    return { ...websiteSerialized, version };
  } catch (err) {
    log.error('Error has occurred in: getUserData()', err);
  }
}

module.exports = getUserData;