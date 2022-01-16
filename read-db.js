const Unserializer = require("./stencyl/decoder");
const log = require("electron-log");

const getUserData = async (source) => {
  try {
    const version = '1.1.0';
    const stencylString = source?.[2]?.value.replace('\u0001', '');
    let unserialized = Unserializer.decode(stencylString);
    console.log(`#Finished serializing with version: ${version}`);
    return { ...unserialized, version };
  } catch (err) {
    log.error('Error has occurred in: getUserData()', err);
    throw err;
  }
}

module.exports = getUserData;