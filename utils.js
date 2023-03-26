const level = require('level')
const { promises: asyncFs } = require("fs");

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

module.exports = {
  createReadStream,
  writeToFile,
  readJson,
}