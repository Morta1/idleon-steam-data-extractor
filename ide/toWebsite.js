const {
  anvilProductionItems,
  bubblesMap,
  cardSetMap,
  filteredLootyItems,
  guildBonusesMap,
  keysMap,
  obolCharacterShapeMap,
  obolFamilyShapeMap,
  obolMap,
  prayersMap,
  shopMapping,
  skillIndexMap,
  starSignsIndicesMap,
  statuesMap,
  talentPagesMap,
  worldNpcMap
} = require('./maps');

const {
  bribes,
  cards,
  cauldrons,
  classes,
  constellations,
  items,
  maps,
  monsters,
  quests,
  shops,
  shrines,
  stamps,
  starSigns,
  starSignByIndexMap,
  talents,
  vials,
  achievements,
  carryBags,
  refinery,
  saltLicks,
  randomList, postOffice, statues
} = require('./maps/processed-maps');

const parseData = (data) => {
  try {
    // throw new Error('LOL');
    console.log('Started Parsing');
    if (!data) {
      return;
    }

    const final = {
      account: {},
      characters: [],
    };

    const fields = data?.save?.documentChange?.document?.fields;
    if (!fields) return {};
    const characterNames = data?.charNames;
    const guildInfo = data?.guildInfo;

    const account = buildAccountData(fields, characterNames);

    // Initialize characters' array
    const characters = Object.keys(characterNames).map((index) => ({
      name: characterNames[index],
    }));
    let charactersData = buildCharacterData(characters, fields, account);
    console.log('Finished building character data');

    let skills = charactersData?.map(({ name, skillsInfo }) => ({ name, skillsInfo }));
    let leaderboard = calculateLeaderboard(skills);
    charactersData = charactersData.map((character) => ({ ...character, skillsInfo: leaderboard[character?.name] }));
    const quests = mapAccountQuests(charactersData);
    charactersData = charactersData.map(({ quests, ...rest }) => rest);

    final.characters = charactersData;
    final.account = { ...account, quests };
    if (Object.keys(guildInfo).length > 0) {
      final.guild = buildGuildData(guildInfo, fields);
    }

    console.log('Finished Parsing');
    return final;
  } catch (err) {
    console.log("Error in parseData", err);
  }
};

const calculateLeaderboard = (characters) => {
  const leaderboardObject = characters.reduce((res, { name, skillsInfo }) => {
    for (const [skillName, skillLevel] of Object.entries(skillsInfo)) {
      if (!res[skillName]) {
        res[skillName] = { ...(res[skillName]), [name]: skillLevel }
      } else {
        const joined = { ...res[skillName], [name]: skillLevel };
        let lowestIndex = Object.keys(joined).length;
        res[skillName] = Object.entries(joined)
          .sort(([_, { level: aLevel }], [__, { level: bLevel }]) => bLevel - aLevel)
          .reduceRight((res, [charName, charSkillLevel]) => {
            return { ...res, [charName]: { ...charSkillLevel, rank: lowestIndex-- } };
          }, {});
      }
    }
    return res;
  }, {});
  return Object.entries(leaderboardObject)?.reduce((res, [skillName, characters]) => {
    const charsObjects = Object.entries(characters).reduce((response, [charName, charSkill]) => {
      return { ...response, [charName]: { [skillName]: charSkill } };
    }, {});
    return Object.entries(charsObjects).reduce((response, [charName, charSkill]) => {
      return { ...response, [charName]: { ...(res[charName] || {}), ...charSkill } };
    }, {});
  }, {})
}

const buildAccountData = (fields, characterNames) => {
  console.log('Started building account data');
  const accountData = {};
  const cardsObject = JSON.parse(fields?.["Cards0"].stringValue);

  accountData.cards = Object.keys(cardsObject).reduce(
    (res, card) => {
      const cardDetails = cards?.[card];
      if (!cardDetails) return res;
      return {
        ...res,
        [cardDetails?.displayName]: {
          ...cardDetails,
          amount: cardsObject?.[card],
          stars: calculateStars(cardDetails?.perTier, cardsObject?.[card]),
        }
      }
    }, {});

  const obolsObject = fields?.ObolEqO1.arrayValue.values;
  const obolUpgradesObject = fields?.ObolEqO2;
  const obolsMapping = obolsObject.map(({ stringValue }, index) => ({
    displayName: obolMap[stringValue],
    shape: obolFamilyShapeMap[index],
    rawName: stringValue,
    ...(obolFamilyShapeMap[index] ? obolFamilyShapeMap[index] : {})
  }));

  accountData.obols = createObolsWithUpgrades(obolsMapping, obolUpgradesObject);

  const lootyObject = JSON.parse(fields.Cards1.stringValue);
  const allItems = JSON.parse(JSON.stringify(items)); // Deep clone
  lootyObject.forEach((lootyItemName) => {
    if (allItems?.[lootyItemName]?.displayName) {
      delete allItems?.[lootyItemName];
    }
  });

  accountData.missingLootyItems = Object.keys(allItems).reduce((res, key) => (!filteredLootyItems[key] ? [
    ...res,
    {
      name: allItems?.[key]?.displayName,
      rawName: key,
    }] : res), []);

  const stampsMapping = { 0: "combat", 1: "skills", 2: "misc" };
  const stampsObject = fields['StampLv']?.arrayValue.values?.reduce((result, item, index) => ({
    ...result,
    [stampsMapping?.[index]]: Object.keys(item.mapValue.fields).reduce((res, key) => (key !== 'length' ? [
        ...res,
        { level: parseFloat(item.mapValue.fields[key].integerValue) }
      ]
      : res), []),
  }), {});

  accountData.stamps = {
    combat: stampsObject.combat.map((item, index) => ({ ...stamps['combat'][index], ...item })),
    skills: stampsObject.skills.map((item, index) => ({ ...stamps['skills'][index], ...item })),
    misc: stampsObject.misc.map((item, index) => ({ ...stamps['misc'][index], ...item })),
  };

  const goldStatuesObject = JSON.parse(fields?.['StuG']?.stringValue || '[]');
  const goldStatues = goldStatuesObject.reduce((res, item, index) => (item === 1 ? {
    ...res,
    [index]: true
  } : res), {});
  const firstCharacterStatues = JSON.parse(fields['StatueLevels_0']?.stringValue);
  accountData.statues = Object.keys(goldStatues).map((statueIndex) => ({
    ...({ ...statuesMap?.[statueIndex], rawName: `StatueG${parseInt(statueIndex) + 1}` } || {}),
    level: firstCharacterStatues[statueIndex][0],
    ...(statues?.[statueIndex] || {})
  }));

  const moneyArr = ['MoneyBANK', 'Money_0', 'Money_1', 'Money_2', 'Money_3', 'Money_4', 'Money_5', 'Money_6', 'Money_7', 'Money_8'];
  const money = moneyArr.reduce((res, moneyInd) =>
    (res + (fields[moneyInd] ? parseInt(fields[moneyInd].integerValue) : 0)), 0);

  accountData.money = String(money).split(/(?=(?:..)*$)/);

  const inventoryArr = fields['ChestOrder'].arrayValue.values;
  const inventoryQuantityArr = fields['ChestQuantity'].arrayValue.values;
  accountData.inventory = getInventory(inventoryArr, inventoryQuantityArr, 'storage');

  const shrinesArray = JSON.parse(fields['Shrine']?.stringValue);
  const startingIndex = 18;
  accountData.shrines = shrinesArray.reduce((res, item, localIndex) => {
    const index = startingIndex + localIndex;
    const [shrineId, , , shrineLevel] = item;
    const { shrineName, desc, baseBonus, bonusPerLevel } = shrines[index];
    return shrineId !== 0 && shrineName !== 'Unknown' ? [...res, {
      shrineLevel,
      name: shrineName,
      rawName: `ConTowerB${index}`,
      bonus: baseBonus + (shrineLevel - 1) * bonusPerLevel,
      desc
    }] : res;
  }, [])

  const colosseumIndexMapping = { 1: true, 2: true, 3: true };
  const colosseumHighscoresArray = fields['FamValColosseumHighscores']?.arrayValue?.values;
  accountData.colosseumHighscores = colosseumHighscoresArray
    .filter((_, index) => colosseumIndexMapping[index])
    .map(({ doubleValue, integerValue }) => Math.floor(doubleValue) || Math.floor(integerValue));

  const minigameIndexMapping = { 0: 'chopping', 1: 'fishing', 2: 'catching', 3: 'mining' };
  const minigameHighscoresArray = fields['FamValMinigameHiscores']?.arrayValue?.values;
  accountData.minigameHighscores = minigameHighscoresArray
    .filter((_, index) => minigameIndexMapping[index])
    .map(({ integerValue }, index) => ({ minigame: minigameIndexMapping[index], score: integerValue }));

  accountData.worldTeleports = fields?.['CYWorldTeleports']?.integerValue;
  accountData.keys = fields?.['CYKeysAll']?.arrayValue.values.reduce((res, { integerValue }, index) => integerValue > 0 ? [...res, { amount: integerValue, ...keysMap[index] }] : res, []);
  accountData.colosseumTickets = fields?.['CYColosseumTickets']?.integerValue;
  accountData.obolFragments = fields?.['CYObolFragments']?.integerValue;
  accountData.silverPens = fields?.['CYSilverPens']?.integerValue;
  accountData.goldPens = fields?.['CYGoldPens']?.integerValue;
  accountData.gems = fields?.['GemsOwned']?.integerValue;
  accountData.deliveryBoxComplete = fields?.['DeliveryBoxComplete']?.integerValue;
  accountData.deliveryBoxStreak = fields?.['DeliveryBoxStreak']?.integerValue;
  accountData.deliveryBoxMisc = fields?.['DeliveryBoxMisc']?.integerValue;

  const shopStockArray = fields['ShopStock']?.arrayValue?.values;
  accountData.shopStock = shopStockArray?.reduce((res, shopObject, shopIndex) => {
    const realShopStock = shopObject?.mapValue?.fields;
    delete realShopStock.length;
    const shopName = shopMapping?.[shopIndex]?.name;
    const mapped = Object.values(realShopStock)?.reduce((res, item, itemIndex) => {
      const isIncluded = shopMapping?.[shopIndex]?.included?.[itemIndex];
      const amount = parseInt(item?.integerValue) || 0;
      return amount > 0 && isIncluded ? [...res, { amount: item?.integerValue, ...shops[shopName][itemIndex] }] : res;
    }, [])
    return [...res, mapped]
  }, []);

  // 0-3 cauldrons
  // 4 - vials
  accountData.alchemy = {};
  const cauldronsIndexMapping = { 0: "power", 1: "quicc", 2: "high-iq", 3: 'kazam' };
  const cauldronsTextMapping = { 0: "O", 1: "G", 2: "P", 3: 'Y' };
  const cauldronsInfoArray = fields?.CauldronInfo?.arrayValue?.values;
  accountData.alchemy.bubbles = cauldronsInfoArray?.reduce((res, { mapValue }, index) => (index <= 3 ? {
    ...res,
    [cauldronsIndexMapping?.[index]]: Object.keys(mapValue?.fields)?.reduce((res, key, bubbleIndex) => (
      key !== 'length' ? [
        ...res,
        {
          level: parseInt(mapValue?.fields?.[key]?.integerValue) || 0,
          rawName: `aUpgrades${cauldronsTextMapping[index]}${bubbleIndex}`,
          ...cauldrons[cauldronsIndexMapping?.[index]][key],
        }] : res), [])
  } : res), {});

  const vialsObject = fields?.CauldronInfo?.arrayValue?.values?.[4]?.mapValue?.fields;
  accountData.alchemy.vials = Object.keys(vialsObject).reduce((res, key, index) => {
    const vial = vials?.[index];
    return key !== 'length' ? [...res, {
      level: parseInt(vialsObject?.[key]?.integerValue) || 0,
      ...vial
    }] : res;
  }, []);

  // first 16 elements belong to cauldrons' levels
  // 4 * 4
  const rawCauldronsLevelsArray = fields?.['CauldUpgLVs']?.arrayValue.values;
  const cauldronsLevels = rawCauldronsLevelsArray.slice(0, 16);
  const cauldronsLevelsMapping = { 0: "power", 4: "quicc", 8: "high-iq", 12: 'kazam' };
  let cauldronsObject = {};
  const chunk = 4;
  for (let i = 0, j = cauldronsLevels.length; i < j; i += chunk) {
    const [speed, luck, cost, extra] = cauldronsLevels.slice(i, i + chunk);
    cauldronsObject[cauldronsLevelsMapping[i]] = {
      speed: parseInt(speed?.integerValue) || 0,
      luck: parseInt(luck?.integerValue) || 0,
      cost: parseInt(cost?.integerValue) || 0,
      extra: parseInt(extra?.integerValue) || 0
    };
  }
  accountData.alchemy.cauldrons = cauldronsObject;

  const bribesArray = fields?.['BribeStatus']?.arrayValue?.values;
  accountData.bribes = bribesArray?.reduce((res, { integerValue }, index) => {
    return integerValue !== -1 ? [...res, {
      done: integerValue === 1,
      ...(bribes?.[index] || [])
    }] : res;
  }, []);

  // const constellationsIndices = getConstellationsIndices(characterNames);
  const constellationsArray = JSON.parse(fields?.['SSprog']?.stringValue);
  accountData.constellations = constellationsArray?.reduce((res, constellation, index) => {
    const constellationInfo = constellations[index];
    const [completedChars, done] = constellation;
    const mapIndex = constellationInfo?.mapIndex;
    return mapIndex !== null ? [...res, {
      ...constellationInfo,
      location: maps[mapIndex],
      completedChars,
      done: !!done
    }] : res;
  }, []);

  const starSignsObject = JSON.parse(fields?.['StarSg']?.stringValue);
  const starSignsMapping = starSigns?.map((starSign) => {
    const { starName } = starSign;
    return {
      ...starSign,
      starName: `${starSignsIndicesMap?.[starName]} - ${starName}`,
      unlocked: !!starSignsObject?.[starName]
    }
  }, []);
  const sortAlphaNum = (a, b) => a.starName.localeCompare(b.starName, 'en', { numeric: true });
  const sortedSigns = starSignsMapping.sort(sortAlphaNum);
  const lastItem = sortedSigns.pop();
  sortedSigns.splice(21, 0, lastItem);

  accountData.starSigns = sortedSigns;

  // Achievements
  const achievementsRegistry = fields?.AchieveReg;
  const steamAchievements = fields?.SteamAchieve;
  accountData.achievements = achievements.map((achievement, index) => {
    const { steamIndex } = achievement;
    const completed = steamIndex ? steamAchievements?.[steamIndex] === -1 : achievementsRegistry?.[index] === -1;
    const currentQuantity = steamIndex ? steamAchievements?.[steamIndex] : achievementsRegistry?.[index];
    return { ...achievement, completed, ...(currentQuantity >= 0 ? { currentQuantity } : {}) }
  });

  // Refinery
  // 1 - inventory, 3 - redox salt
  // [refined, rank, unknown, on/off, auto-refined %]
  const refineryObject = fields?.Refinery;
  const refineryStorage = fields?.Refinery?.[1]?.reduce((res, saltName, index) => saltName !== 'Blank' ? [...res, {
    rawName: saltName,
    name: items[saltName]?.displayName,
    amount: fields?.Refinery?.[2]?.[index]
  }] : res, []);
  const powerCap = randomList[18]?.split(' ');
  const refinerySaltTaskLevel = fields?.Tasks?.[2]?.[2]?.[6];
  const salts = refineryObject?.slice(3, 3 + fields?.Refinery?.[0]?.[0]);
  const saltsArray = salts?.reduce((res, salt, index) => {
    const name = `Refinery${index + 1}`
    const [refined, rank, , active, autoRefinePercentage] = salt;
    const { saltName, cost } = refinery?.[name];
    const componentsWithTotalAmount = cost?.map((item) => {
      let amount = accountData?.inventory?.find((innerItem) => innerItem?.name === item?.name)?.amount;
      if (item?.rawName?.includes('Refinery')) {
        amount += refineryStorage?.find((innerItem) => innerItem?.name === item?.name)?.amount || 0
      }
      return {
        ...item,
        totalAmount: amount
      }
    })
    return [
      ...res,
      {
        saltName,
        cost: componentsWithTotalAmount,
        rawName: name,
        powerCap: parseFloat(powerCap?.[rank]),
        refined,
        rank,
        active,
        autoRefinePercentage
      }
    ];
  }, []);
  accountData.refinery = {
    salts: saltsArray,
    refinerySaltTaskLevel
  }

  accountData.bundles = Object.entries(fields?.BundlesReceived).reduce((res, [bundleName, owned]) => owned ? [...res, {
    name: bundleName,
    owned: !!owned
  }] : res, []).sort((a, b) => a?.name?.match(/_[a-z]/i)?.[0].localeCompare(b?.name?.match(/_[a-z]/i)?.[0]))

  accountData.saltLicks = fields?.SaltLick?.map((level, index) => ({
    ...saltLicks[index],
    level
  })).filter(({ level }) => level > 0);

  console.log('Finished building account data');
  return accountData;
};

const buildCharacterData = (characters, fields, account) => {
  console.log('Started building character data');
  return characters.map((character, index) => {
    const extendedChar = {};
    const classObject = fields?.[`CharacterClass_${index}`];
    extendedChar.class =
      classes[parseInt(classObject?.doubleValue || classObject?.integerValue)];
    extendedChar.afkTarget = monsters?.[fields?.[`AFKtarget_${index}`]?.stringValue]?.Name;


    // stats
    const statsArray = fields[`PVStatList_${index}`]?.arrayValue?.values;
    extendedChar.level = parseInt(statsArray[4]?.integerValue);
    extendedChar.stats = {
      strength: parseInt(statsArray[0]?.integerValue),
      agility: parseInt(statsArray[1]?.integerValue),
      wisdom: parseInt(statsArray[2]?.integerValue),
      luck: parseInt(statsArray[3]?.integerValue),
    };

    extendedChar.currentMap =
      maps?.[parseInt(fields?.[`CurrentMap_${index}`]?.integerValue)];

    // inventory bags used
    const rawInvBagsUsed = JSON.parse(
      fields?.[`InvBagsUsed_${index}`]?.stringValue
    );
    const bags = Object.keys(rawInvBagsUsed);
    extendedChar.invBagsUsed = bags?.map((bag) => ({
      id: bag,
      name: items[`InvBag${parseInt(bag) < 100 ? parseInt(bag) + 1 : bag}`]?.displayName,
      rawName: `InvBag${parseInt(bag) < 100 ? parseInt(bag) + 1 : bag}`
    })).filter(bag => bag.name);
    const carryCapacityObject = JSON.parse(fields[`MaxCarryCap_${index}`].stringValue);
    extendedChar.carryCapBags = Object.keys(carryCapacityObject).map((bagName) => (carryBags?.[bagName]?.[carryCapacityObject[bagName]])).filter(bag => bag)

    // equipment indices (0 = armor, 1 = tools, 2 = food)
    const equipmentMapping = { 0: "armor", 1: "tools", 2: "food" };
    const equippableNames = fields[
      `EquipOrder_${index}`
      ]?.arrayValue?.values?.reduce(
      (result, item, index) => ({
        ...result,
        [equipmentMapping?.[index]]: item?.mapValue.fields,
      }), {});
    const equipapbleAmount = fields[`EquipQTY_${index}`]?.arrayValue?.values?.reduce((result, item, index) => ({
      ...result,
      [equipmentMapping?.[index]]: item?.mapValue?.fields,
    }), {});

    const equipmentStoneData = JSON.parse(fields[`EMm0_${index}`].stringValue);
    extendedChar.equipment = createItemsWithUpgrades(equippableNames.armor, equipmentStoneData);
    const toolsStoneData = JSON.parse(fields[`EMm1_${index}`].stringValue);
    extendedChar.tools = createItemsWithUpgrades(equippableNames.tools, toolsStoneData);
    extendedChar.food = Array.from(Object.values(equippableNames.food)).reduce((res, { stringValue }, index) =>
      stringValue
        ? [...res, {
          name: items?.[stringValue]?.displayName,
          rawName: stringValue,
          amount: parseInt(equipapbleAmount.food[index]?.integerValue || equipapbleAmount.food[index]?.stringValue),
        }] : res, []);

    const inventoryArr = fields[`InventoryOrder_${index}`].arrayValue.values;
    const inventoryQuantityArr = fields[`ItemQTY_${index}`].arrayValue.values;
    extendedChar.inventory = getInventory(inventoryArr, inventoryQuantityArr, character.name);


    // star signs
    const starSignsObject = fields?.[`PVtStarSign_${index}`]?.stringValue;
    extendedChar.starSigns = starSignsObject
      .split(",")
      .map((starSign) => starSignByIndexMap?.[starSign])
      .filter(item => item);

    // equipped bubbles
    const cauldronBubbles = JSON.parse(fields?.CauldronBubbles?.stringValue);
    extendedChar.equippedBubbles = cauldronBubbles?.[index].reduce(
      (res, bubbleInd) => (bubbleInd ? [...res, bubblesMap?.[bubbleInd]] : res), []);

    // crafting material in production
    const anvilCraftsMapping =
      fields[`AnvilPAselect_${index}`]?.arrayValue?.values;
    const selectedProducts = anvilCraftsMapping
      .sort((a, b) => a?.integerValue - b?.integerValue)
      .map(({ integerValue }) => anvilProductionItems[integerValue]);
    extendedChar.anvil = {
      selected: selectedProducts,
    };

    const levelsRaw = fields?.[`Exp0_${index}`];
    const levelsReqRaw = fields?.[`ExpReq0_${index}`];
    const skillsInfoObject = fields?.[`Lv0_${index}`];

    extendedChar.skillsInfo = skillsInfoObject.reduce(
      (res, level, index) =>
        level !== "-1" && level !== -1 ? {
          ...res,
          [skillIndexMap[index]]: { level, exp: parseFloat(levelsRaw[index]), expReq: parseFloat(levelsReqRaw[index]) },
        } : res, {});

    const cardSet = JSON.parse(fields?.[`CSetEq_${index}`]?.stringValue);
    const equippedCards = fields?.[`CardEquip_${index}`]?.arrayValue?.values
      .map(({ stringValue }) => ({
        cardName: cards?.[stringValue]?.displayName,
        stars: account?.cards?.[cards?.[stringValue]?.displayName]?.stars,
        ...cards?.[stringValue]
      }))
      .filter((_, ind) => ind < 8); //cardEquipMap
    const cardsSetObject = cardSetMap[Object.keys(cardSet)?.[0]] || {};
    extendedChar.cards = {
      cardSet: {
        ...cardsSetObject,
        stars: calculateCardSetStars(cardsSetObject, Object.values(cardSet)?.[0])
      },
      equippedCards,
    };

    // printer
    const fieldsPrint = JSON.parse(fields.Print.stringValue);
    const printData = fieldsPrint.slice(5, fieldsPrint.length); // REMOVE 5 '0' ELEMENTS
    // There are 14 items per character
    // Every 2 items represent an item and it's value in the printer.
    // The first 5 pairs represent the stored samples in the printer.
    // The last 2 pairs represent the samples in production.
    const chunk = 14;
    const relevantPrinterData = printData.slice(
      index * chunk,
      index * chunk + chunk
    );
    extendedChar.printer = relevantPrinterData.reduce(
      (result, printItem, sampleIndex, array) => {
        if (sampleIndex % 2 === 0) {
          const sample = array
            .slice(sampleIndex, sampleIndex + 2)
            .map((item, sampleIndex) => sampleIndex === 0 ? items?.[item]?.displayName : item);
          if (sampleIndex < 10) {
            result.stored.push({ item: sample[0], value: sample[1] });
          } else {
            result.selected.push({ item: sample[0], value: sample[1] });
          }
        }
        return result;
      },
      { stored: [], selected: [] }
    );

    const obolObject = fields[`ObolEqO0_${index}`].arrayValue.values;
    const obols = obolObject.map(({ stringValue }, index) => ({
      index: calculateWeirdObolIndex(index),
      displayName: obolMap[stringValue],
      rawName: stringValue,
      ...(obolCharacterShapeMap[index] ? obolCharacterShapeMap[index] : {})
    }));
    const obolUpgradesObject = fields[`ObolEqO1_${index}`];
    const sortedObols = obols.sort((a, b) => a.index - b.index)
    extendedChar.obols = createObolsWithUpgrades(sortedObols, obolUpgradesObject);

    const talentsObject = JSON.parse(fields[`SL_${index}`].stringValue);
    const maxTalentsObject = JSON.parse(fields[`SM_${index}`].stringValue);
    const pages = talentPagesMap?.[extendedChar?.class];
    extendedChar.talents = createTalentPage(extendedChar?.class, pages, talentsObject, maxTalentsObject);
    extendedChar.starTalents = createTalentPage(extendedChar?.class, ["Special Talent 1", "Special Talent 2"], talentsObject, maxTalentsObject, true);

    const prayersArray = JSON.parse(fields[`Prayers_${index}`]?.stringValue);
    extendedChar.prayers = prayersArray.reduce((res, prayerIndex) => (prayerIndex >= 0 ? [...res, { ...prayersMap?.[prayerIndex] }] : res), []);

    // 0 - current worship charge rate
    const playerStuffArray = JSON.parse(fields[`PlayerStuff_${index}`]?.stringValue);

    extendedChar.worshipCharge = Math.round(playerStuffArray?.[0]);

    // 3 - critter name
    const trapsArray = JSON.parse(fields[`PldTraps_${index}`]?.stringValue);
    extendedChar.traps = trapsArray?.reduce((res, critterInfo) => {
      const [critterId, , timeElapsed, critterName, , , trapTime] = critterInfo;
      if (critterId === -1 && critterId === '-1') return res;
      const timeLeft = trapTime - timeElapsed;
      const hours = parseInt(timeLeft / 3600);
      const minutes = parseInt(timeLeft % 60);
      return critterName ? [...res, {
        name: items[critterName]?.displayName,
        rawName: critterName,
        timeLeft: `${hours}h${minutes > 0 ? minutes + 'm' : ''}`
      }] : res;
    }, []);

    const quests = JSON.parse(fields?.[`QuestComplete_${index}`].stringValue);
    extendedChar.quests = Object.keys(quests).reduce((res, key) => {
      let [npcName, questIndex] = key.split(/([0-9]+)/);
      if (npcName === 'Fishpaste') {
        npcName = 'Fishpaste97'
        questIndex = questIndex?.split('97')?.[1];
      }
      return { ...res, [npcName]: { ...(res?.[npcName] || {}), [questIndex]: quests[key] } }
    }, {});

    const postOfficeObject = fields?.[`PostOfficeInfo_${index}`];
    let totalPointsSpent = 0;
    const boxes = postOffice?.map((box, index) => {
      const points = postOfficeObject?.[index]?.[0];
      totalPointsSpent += points;
      return { ...box, level: points || 0 }
    });

    extendedChar.postOffice = {
      boxes,
      unspentPoints: (account?.deliveryBoxComplete + account?.deliveryBoxStreak + account?.deliveryBoxMisc - totalPointsSpent) || 0
    }

    return {
      ...character,
      ...extendedChar,
    };
  });
};

const mapAccountQuests = (characters) => {
  const questsKeys = Object.keys(quests);
  let mappedQuests = questsKeys?.reduce((res, npcName) => {
    const npcQuests = cloneObject(quests[npcName]);
    const worldName = worldNpcMap?.[npcName]?.world;
    const npcIndex = worldNpcMap?.[npcName]?.index;
    if (!worldName) return res;
    for (let i = 0; i < characters?.length; i++) {
      const rawQuest = cloneObject(characters?.[i]?.quests?.[npcName]) || {};
      const questIndices = Object.keys(rawQuest);
      let skip = false;
      for (let j = 0; j < questIndices?.length; j++) {
        const questIndex = questIndices[j];
        const questStatus = rawQuest[questIndex];
        if (!npcQuests[questIndex]) continue;
        if (npcQuests?.[questIndex - 1] && (!skip && (questStatus === 0 || questStatus === -1) || questStatus === 1)) {
          npcQuests[questIndex - 1].progress = npcQuests[questIndex - 1]?.progress?.filter(({ charIndex }) => charIndex !== i);
        }
        if (questStatus === 1) { // completed
          npcQuests[questIndex].completed = [...(npcQuests[questIndex]?.completed || []), {
            charIndex: i,
            status: questStatus
          }];
          npcQuests[questIndex].progress = [...(npcQuests[questIndex]?.progress || []), {
            charIndex: i,
            status: questStatus
          }];
        } else if (!skip && (questStatus === 0 || questStatus === -1)) {
          npcQuests[questIndex].progress = [...(npcQuests[questIndex]?.progress || []), {
            charIndex: i,
            status: questStatus
          }]
          skip = true;
        }
      }
    }
    return {
      ...res,
      [worldName]: [
        ...(res?.[worldName] || []),
        {
          name: npcName,
          index: npcIndex,
          npcQuests: Object.values(npcQuests)
        }
      ]
    };
  }, {});
  for (const mappedQuest in mappedQuests) {
    let val = mappedQuests[mappedQuest];
    val?.sort((a, b) => a?.index - b?.index);
  }
  return mappedQuests;
};

const buildGuildData = (guildInfo, fields) => {
  console.log('Started building guild data');
  const guildData = {};
  const totalMembers = Object.keys(guildInfo);
  guildData.name = fields?.['OptLacc']?.arrayValue?.values?.[37]?.stringValue;
  guildData.iconId = fields?.['OptLacc']?.arrayValue?.values?.[38].integerValue;
  guildData.members = Object.keys(guildInfo).map((memberInfo, index) => {
    const {
      a: name,
      // b: unknown,
      c: className,
      d: level,
      e: guildPoints,
      f: wantedPerk,
      g: rank,
    } = guildInfo[memberInfo];
    return {
      name,
      className: classes[className],
      level,
      guildPoints,
      wantedPerk: guildBonusesMap[wantedPerk],
      rank,
      accountId: totalMembers[index],
    };
  });

  const guildBonusesObject = JSON.parse(fields?.Guild?.stringValue);
  guildData.bonuses = guildBonusesObject[0].map((bonus, index) => ({
    name: guildBonusesMap[index],
    rawName: `Gbonus${index}`,
    level: bonus,
  }));
  console.log('Finished building guild data');
  return guildData;
};

const createTalentPage = (className, pages, talentsObject, maxTalentsObject, mergeArray) => {
  return pages.reduce((res, className, index) => {
    const orderedTalents = Object.entries(talents?.[className])?.map(([talentId, talentDetails]) => ({
      talentId: talentDetails.skillIndex,
      ...talentDetails,
      level: talentsObject[talentDetails.skillIndex],
      maxLevel: maxTalentsObject[talentDetails.skillIndex],
    }));
    if (mergeArray) {
      return {
        ...res,
        orderedTalents: [...(res?.orderedTalents || []), ...orderedTalents]
      }
    }
    return {
      ...res,
      [index]: { name: className, orderedTalents }
    }
  }, {})
}

const calculateWeirdObolIndex = (index) => {
  switch (index) {
    case 12:
      return 13;
    case 13:
      return 14;
    case 14:
      return 12;
    case 17:
      return 15;

    case 15:
      return 17;
    case 16:
      return 19;
    case 18:
      return 16;
    case 19:
      return 18;
    default:
      return index;
  }
}

const calculateCardSetStars = (card, bonus) => {
  if (!card || !bonus) return null;
  if (card.base === bonus) {
    return 0;
  } else if (bonus >= card.base * 4) {
    return 3;
  } else if (bonus >= card.base * 3) {
    return 2;
  } else if (bonus >= card.base * 2) {
    return 1;
  }
  return null;
};

const getInventory = (inventoryArr, inventoryQuantityArr, owner) => {
  return inventoryArr.reduce((res, { stringValue }, index) => (stringValue !== 'LockedInvSpace' && stringValue !== 'Blank' ? [
    ...res, {
      owner,
      name: items?.[stringValue]?.displayName,
      rawName: stringValue,
      amount: parseInt(inventoryQuantityArr?.[index].integerValue),
    }
  ] : res), []);
};

const calculateStars = (tierReq, amountOfCards) => {
  // 1 star - base, 2 stars - base * 3, 3 stars - base * 5
  if (amountOfCards < tierReq) {
    return 0;
  } else if (amountOfCards > Math.ceil(tierReq * Math.pow(3, 2))) {
    return 3;
  } else if (amountOfCards > Math.ceil(tierReq * Math.pow(2, 2))) {
    return 2;
  } else if (amountOfCards >= Math.ceil(tierReq * Math.pow(1, 2))) {
    return 1;
  }
  return null;
};

const createObolsWithUpgrades = (charItems, stoneData) => {
  return charItems.reduce((res, item, itemIndex) => {
    const { rawName } = item;
    if (rawName === 'Blank') return [...res, item];
    const stoneResult = addStoneDataToEquip(items?.[rawName], stoneData[itemIndex]);
    return rawName ? [...res, {
      ...(rawName === 'Blank' ? {} : { ...item, ...items?.[rawName], ...stoneResult })
    }] : res
  }, []);
}

const createItemsWithUpgrades = (charItems, stoneData) => {
  return Array.from(Object.values(charItems)).reduce((res, { stringValue }, itemIndex) => {
    const stoneResult = addStoneDataToEquip(items?.[stringValue], stoneData[itemIndex]);
    return stringValue ? [...res, {
      name: items?.[stringValue]?.displayName, rawName: stringValue,
      ...(stringValue === 'Blank' ? {} : { ...items?.[stringValue], ...stoneResult })
    }] : res
  }, []);
}

const addStoneDataToEquip = (baseItem, stoneData) => {
  if (!baseItem || !stoneData) return {};
  return Object.keys(stoneData)?.reduce((res, statName) => {
    if (statName === 'UQ1txt' || statName === 'UQ2txt') {
      return { ...res, [statName]: baseItem?.[statName] || stoneData?.[statName] };
    }
    const baseItemStat = baseItem?.[statName];
    const stoneStat = stoneData?.[statName];
    let sum = baseItemStat;
    if (stoneStat) {
      sum = (baseItemStat || 0) + stoneStat;
      return { ...res, [statName]: parseFloat(sum) };
    }
    return { ...res, [statName]: parseFloat(baseItemStat) };
  }, {});
}

const cloneObject = (data) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    return data;
  }
}

module.exports = { toWebsite: parseData };