const bubblesMap = {
  _11: "Call_Me_Bob",
  _6: "Sploosh_Sploosh",
  _3: "Wyoming_Blood",
  a11: "Call_Me_Ash",
  a7: "Sanic_Tools",
  a2: "Hammer_Hammer",
  b11: "Call_Me_Pope",
  b7: "Cookin_Roadkill",
  b3: "Molto_Loggo",
  c12: "Big_Game_Hunter",
  c8: "Grind_Time",
  c3: "Level_Up_Gift",
};

const starSignByIndexMap = {
  0: {
    name: "The_Buff_Guy",
    description: "+1%_Total_Damage +3_STR",
  },
  1: {
    name: "Flexo_Bendo",
    description: "+2%_Movement_Speed +3_AGI",
  },
  2: {
    name: "The_Book_Worm",
    description: "+1%_Class_EXP_Gain +3_WIS",
  },
  3: {
    name: "The_Fuzzy_Dice",
    description: "+3_Talent_Points +3_LUK",
  },
  4: {
    name: "Dwarfo_Beardus",
    description: "+5%_Mining_Efficency +20%_Multi-Ore_Chance",
  },
  5: {
    name: "Hipster_Logger",
    description: "+5%_Chop_Efficiency +20%_Multi-Log_Chance",
  },
  6: {
    name: "Pie_Seas",
    description: "+5%_Fishin_Efficency +20%_Multi-Fish_Odds",
  },
  7: {
    name: "Shoe_Fly",
    description: "+5%_Catch_Efficiency +20%_Multi-Bug_Chance",
  },
  8: {
    name: "Blue_Hedgehog",
    description: "+4%_Movement_Speed +0.0001%_Ring_Drop",
  },
  9: {
    name: "Gum_Drop",
    description: "+15%_to_get_a_Time Candy_when_claiming 8+_Hour_AFK_gains",
  },
  10: {
    name: "Activelius",
    description: "+15%_Class_EXP_when fighting_actively",
  },
  11: {
    name: "Pack_Mule",
    description: "+10%_Carry_Cap",
  },
  12: {
    name: "Ned_Kelly",
    description: "+6%_Defence +2_Weapon_Power",
  },
  13: {
    name: "Robinhood",
    description: "+4%_Accuracy +2%_Movement_Speed +1_Cant_Trade_GME",
  },
  14: {
    name: "Pirate_Booty",
    description: "+5%_Drop_Rate",
  },
  15: {
    name: "Muscle_Man",
    description: "+8_STR",
  },
  16: {
    name: "Fast_Frog",
    description: "+8_AGI",
  },
  17: {
    name: "Smart_Stooge",
    description: "+8_WIS",
  },
  18: {
    name: "Lucky_Larry",
    description: "+8_LUK",
  },
  19: {
    name: "Silly_Snoozer",
    description: "+2%_Fight_AFK_Gain",
  },
  20: {
    name: "The_Big_Comatose",
    description: "+2%_Skill_AFK_Gain",
  },
  21: {
    name: "Miniature_Game",
    description: "+30%_minigame_reward",
  },
  22: {
    name: "Mount_Eaterest",
    description: "+10%_chance_to_not consume_food +15%_All_Food_Effect",
  },
  23: {
    name: "Bob_Build_Guy",
    description: "+10%_Speed_in_Town Skills",
  },
  24: {
    name: "The_Big_Brain",
    description: "+3%_Class_EXP_gain",
  },
  25: {
    name: "The_OG_Skiller",
    description: "+5%_Carry_Cap +1%_Skill_AFK_gain +2%_All_Skill_Prowess",
  },
  26: {
    name: "Grim_Reaper",
    description: "+2%_Mob_Respawn_rate",
  },
  27: {
    name: "The_Fallen_Titan",
    description: "+3%_Boss_Damage +4%_Crit_Chance",
  },
  28: {
    name: "The_Forsaken",
    description: "-80%_Total_HP -50%_Defence +6%_Fight_AFK_Gain",
  },
  29: {
    name: "Mr_No_Sleep",
    description: "-6%_AFK_Gain +30%_Carry_Cap",
  },
  30: {
    name: "Sir_Savvy",
    description: "+3%_Skill_EXP_gain",
  },
  31: {
    name: "All_Rounder",
    description: "+4_All_Stats",
  },
  32: {
    name: "Fatty_Doodoo",
    description: "-3%_Movement_Speed +5%_Defence +2%_Total_Damage",
  },
  33: {
    name: "Chronus_Cosmos",
    description: "All_characters_can now_align_with_2 Star_Signs_at_once",
  },
};

const cardSetMap = {
  None: "None",
  "{%_EXP_if_below_Lv_50": { name: "Blunder_Hills", rawName: 'CardSet0', base: 8 },
  "{%_All_Food_Effect": { name: "Yum-Yum_Desert", rawName: 'CardSet1', base: 10 },
  "{%_Skill_Efficiency": { name: "Easy_Resources", rawName: 'CardSet2', base: 8 },
  "{%_Skill_EXP_Gain": { name: "Medium_Resources", rawName: 'CardSet3', base: 5 },
  "{%_DEF_and_ACC": { name: "Frostbite_Tundra", rawName: 'CardSet4', base: 5 },
  "{%_Skill_AFK_Gain_Rate": { name: "Hard_Resources", rawName: 'CardSet5', base: 4 },
  "{%_more_Dungeon_Credits": { name: "Dungeons", rawName: 'CardSet6', base: 5 },
  "{%_Dmg,_Drop,_and_EXP": { name: "Bosses_n_Nightmares", rawName: 'CardSet26', base: 6 },
  "{%_Drop_Rate": { name: "Events", rawName: 'CardSet25', base: 5 },
};

const skillIndexMap = {
  0: "character",
  1: "mining",
  2: "smithing",
  3: "chopping",
  4: "fishing",
  5: "alchemy",
  6: "catching",
  7: "trapping",
  8: "construction",
  9: "worship",
};

const anvilProductionItems = {
  0: "Thread",
  1: "Trusty_Nails",
  2: "Boring_Brick",
  3: "Chain_Link",
  4: "Leather_Hide",
  5: "Pinion_Spur",
  6: "Lugi_Bracket"
}

const guildBonusesMap = {
  0: "Guild_Gifts",
  1: "Stat_Runes",
  2: "Rucksack",
  3: "Power_of_Pow",
  4: "REM_Fighting",
  5: "Make_or_Break",
  6: "Multi_Tool",
  7: "Sleepy_Skiller",
  8: "Wait_A_Minute",
  9: "Bonus_GP_for_small_guilds",
  10: "Gold_Charm",
  11: "Star_Dazzle",
  12: "C2_Card_Spotter",
  13: "Bestone",
  14: "Wait_A_Minute",
  15: "Craps",
  16: "Anotha_One",
  17: "Wait_A_Minute",
};

const obolMap = {
  "ObolLocked1": "Locked",
  "ObolLocked2": "Locked",
  "ObolLocked3": "Locked",
  "ObolLocked4": "Locked",
  "Blank": "Empty",
  "ObolAmarokA": "Granite_Obol_of_Amarok's_Stare",
  "ObolBronze0": "Bronze_STR_Obol",
  "ObolBronze1": "Bronze_AGI_Obol",
  "ObolBronze2": "Bronze_WIS_Obol",
  "ObolBronze3": "Bronze_LUK_Obol",
  "ObolBronzeCard": "Bronze_Obol_of_Cards",
  "ObolBronzeCatching": "Bronze_Obol_of_Few_Flies",
  "ObolBronzeChoppin": "Bronze_Obol_of_Chippin_Chops",
  "ObolBronzeCons": "Bronze_Obol_of_Construction",
  "ObolBronzeDamage": "Bronze_Obol_of_Puny_Damage",
  "ObolBronzeDef": "Bronze_Obol_of_Defence",
  "ObolBronzeEXP": "Bronze_Obol_of_Experience",
  "ObolBronzeFishing": "Bronze_Obol_of_Finite_Fish",
  "ObolBronzeKill": "Bronze_Obol_of_Multikill",
  "ObolBronzeMining": "Bronze_Obol_of_Small_Swings",
  "ObolBronzePop": "Bronze_Obol_of_Pop",
  "ObolBronzeTrapping": "Bronze_Obol_of_Trapping",
  "ObolBronzeWorship": "Bronze_Obol_of_Worship",
  "ObolEfauntA": "Skeletal_Obol_of_Efaunt's_Gaze",
  "ObolGold0": "Gold_STR_Obol",
  "ObolGold1": "Gold_AGI_Obol",
  "ObolGold2": "Gold_WIS_Obol",
  "ObolGold3": "Gold_LUK_Obol",
  "ObolGoldCard": "Golden_Obol_of_Cards",
  "ObolGoldCatching": "Golden_Obol_of_Insane_Insects",
  "ObolGoldChoppin": "Golden_Obol_of_Huge_Hackin",
  "ObolGoldCons": "Golden_Obol_of_Construction",
  "ObolGoldDamage": "Golden_Obol_of_Big_Boy_Damage",
  "ObolGoldDef": "Golden_Obol_of_Defence",
  "ObolGoldEXP": "Golden_Obol_of_Experience",
  "ObolGoldFishing": "Golden_Obol_of_Crazy_Carp",
  "ObolGoldKill": "Golden_Obol_of_Ultrakill",
  "ObolGoldLuck": "Golden_Obol_of_Triple_Sixes",
  "ObolGoldMining": "Golden_Obol_of_Diligent_Digging",
  "ObolGoldMoney": "Golden_Obol_of_Plentiful_Riches",
  "ObolGoldPop": "Golden_Obol_of_Poppity_Pop",
  "ObolGoldTrapping": "Golden_Obol_of_Trapping",
  "ObolGoldWorship": "Golden_Obol_of_Worship",
  "ObolPink0": "Dementia_STR_Obol",
  "ObolPink1": "Dementia_AGI_Obol",
  "ObolPink2": "Dementia_WIS_Obol",
  "ObolPink3": "Dementia_LUK_Obol",
  "ObolPinkCard": "Dementia_Obol_of_Cards",
  "ObolPinkCatching": "Dementia_Obol_of_Idk_Yet",
  "ObolPinkChoppin": "Dementia_Obol_of_WOWOWOWWO",
  "ObolPinkCons": "Dementia_Obol_of_Construction",
  "ObolPinkDamage": "Dementia_Obol_of_Infinite_Damage",
  "ObolPinkDef": "Dementia_Obol_of_Defence",
  "ObolPinkEXP": "Dementia_Obol_of_Experience",
  "ObolPinkFishing": "Dementia_Obol_of_Monument_Marlins",
  "ObolPinkKill": "Dementia_Obol_of_Killionaire",
  "ObolPinkLuck": "Dementia_Obol_of_Infinisixes",
  "ObolPinkMining": "Dementia_Obol_of_Magisterial_Metals",
  "ObolPinkPop": "Dementia_Obol_of_Pop_Pop_Pop_Pop",
  "ObolPinkTrapping": "Dementia_Obol_of_Trapping",
  "ObolPinkWorship": "Dementia_Obol_of_Worship",
  "ObolPlatinum0": "Platinum_STR_Obol",
  "ObolPlatinum1": "Platinum_AGI_Obol",
  "ObolPlatinum2": "Platinum_WIS_Obol",
  "ObolPlatinum3": "Platinum_LUK_Obol",
  "ObolPlatinumCard": "Platinum_Obol_of_Cards",
  "ObolPlatinumCatching": "Platinum_Obol_of_Idk_Yet",
  "ObolPlatinumChoppin": "Platinum_Obol_of_Lumby_Loggo",
  "ObolPlatinumCons": "Platinum_Obol_of_Construction",
  "ObolPlatinumDamage": "Platinum_Obol_of_Lethal_Damage",
  "ObolPlatinumDef": "Platinum_Obol_of_Defense_with_an_S",
  "ObolPlatinumEXP": "Platinum_Obol_of_Experience",
  "ObolPlatinumFishing": "Platinum_Obol_of_Tremendous_Trout",
  "ObolPlatinumKill": "Platinum_Obol_of_Killimanjaro",
  "ObolPlatinumLuck": "Platinum_Obol_of_Yahtzee_Sixes",
  "ObolPlatinumMining": "Platinum_Obol_of_Dwarven_Delving",
  "ObolPlatinumPop": "Platinum_Obol_of_Poppity_Poppy",
  "ObolPlatinumSpeed": "Platinum_Obol_of_Blinding_Speed",
  "ObolPlatinumTrapping": "Platinum_Obol_of_Trapping",
  "ObolPlatinumWorship": "Platinum_Obol_of_Worship",
  "ObolSilver0": "Silver_STR_Obol",
  "ObolSilver1": "Silver_AGI_Obol",
  "ObolSilver2": "Silver_WIS_Obol",
  "ObolSilver3": "Silver_LUK_Obol",
  "ObolSilverCard": "Silver_Obol_of_Cards",
  "ObolSilverCatching": "Silver_Obol_of_Big_Bugs",
  "ObolSilverChoppin": "Silver_Obol_of_Big_Bark",
  "ObolSilverCons": "Silver_Obol_of_Construction",
  "ObolSilverDamage": "Silver_Obol_of_Little_Damage",
  "ObolSilverDef": "Silver_Obol_of_Defence",
  "ObolSilverEXP": "Silver_Obol_of_Experience",
  "ObolSilverFishing": "Silver_Obol_of_Puny_Pikes",
  "ObolSilverKill": "Silver_Obol_of_Megakill",
  "ObolSilverLuck": "Silver_Obol_of_Double_Sixes",
  "ObolSilverMining": "Silver_Obol_of_Moderate_Mining",
  "ObolSilverMoney": "Silver_Obol_of_Pocket_Change",
  "ObolSilverPop": "Silver_Obol_of_Pop_Pop",
  "ObolSilverTrapping": "Silver_Obol_of_Trapping",
  "ObolSilverWorship": "Silver_Obol_of_Worship"
}

const obolFamilyShapeMap = {
  0: {
    lvReq: 60,
    shape: 'Circle'
  },
  1: {
    lvReq: 250,
    shape: 'Circle'
  },
  2: {
    lvReq: 200,
    shape: 'Square'
  },
  3: {
    lvReq: 350,
    shape: 'Circle'
  },
  4: {
    lvReq: 100,
    shape: 'Circle'
  },
  5: {
    lvReq: 1250,
    shape: 'Circle'
  },
  6: {
    lvReq: 400,
    shape: 'Hexagon'
  },
  7: {
    lvReq: 650,
    shape: 'Sparkle'
  },
  8: {
    lvReq: 900,
    shape: 'Hexagon'
  },
  9: {
    lvReq: 1500,
    shape: 'Circle'
  },
  10: {
    lvReq: 1150,
    shape: 'Square'
  },
  11: {
    lvReq: 1200,
    shape: 'Sparkle'
  },
  12: {
    lvReq: 2500,
    shape: 'Sparkle'
  },
  13: {
    lvReq: 2000,
    shape: 'Square'
  },
  14: {
    lvReq: 2100,
    shape: 'Circle'
  },
  15: {
    lvReq: 3000,
    shape: 'Hexagon'
  },
  16: {
    lvReq: 5000,
    shape: 'Sparkle'
  },
  17: {
    lvReq: 1750,
    shape: 'Hexagon'
  },
  18: {
    lvReq: 400,
    shape: 'Circle'
  },
  19: {
    lvReq: 160,
    shape: 'Circle'
  },
  20: {
    lvReq: 875,
    shape: 'Circle'
  },
  21: {
    lvReq: 700,
    shape: 'Square'
  },
  22: {
    lvReq: 470,
    shape: 'Circle'
  },
  23: {
    lvReq: 80,
    shape: 'Circle'
  },
};

const obolCharacterShapeMap = {
  0: {
    lvReq: 32,
    shape: 'Square'
  },
  1: {
    lvReq: 1,
    shape: 'Circle'
  },
  2: {
    lvReq: 105,
    shape: 'Hexagon'
  },
  3: {
    lvReq: 40,
    shape: 'Circle'
  },
  4: {
    lvReq: 60,
    shape: 'Square'
  },
  5: {
    lvReq: 25,
    shape: 'Circle'
  },
  6: {
    lvReq: 130,
    shape: 'Circle'
  },
  7: {
    lvReq: 152,
    shape: 'Circle'
  },
  8: {
    lvReq: 48,
    shape: 'Circle'
  },
  9: {
    lvReq: 190,
    shape: 'Square'
  },
  10: {
    lvReq: 250,
    shape: 'Sparkle'
  },
  11: {
    lvReq: 140,
    shape: 'Square'
  },
  12: {
    lvReq: 210,
    shape: 'Circle'
  },
  13: {
    lvReq: 170,
    shape: 'Circle'
  },
  14: {
    lvReq: 112,
    shape: 'Circle'
  },
  15: {
    lvReq: 98,
    shape: 'Circle'
  },
  16: {
    lvReq: 70,
    shape: 'Circle'
  },
  17: {
    lvReq: 80,
    shape: 'Circle'
  },
  18: {
    lvReq: 120,
    shape: 'Square'
  },
  19: {
    lvReq: 180,
    shape: 'Hexagon'
  },
  20: {
    lvReq: 90,
    shape: 'Square'
  },
};

const filteredLootyItems = {
  'EquipmentShirts4': true,
  'EquipmentShirts6': true,
  'EquipmentShirts8': true,
  'EquipmentShirts9': true,
  'EquipmentShoes2': true,
  'EquipmentShoes6': true,
  'EquipmentShoes8': true,
  'EquipmentShoes10': true,
  'EquipmentShoes13': true,
  'EquipmentShoes11': true,
  'EquipmentShoes12': true,
  'EquipmentShoes14': true,
  "EquipmentPendant1": true,
  "EquipmentPendant2": true,
  "EquipmentPendant3": true,
  "EquipmentPendant4": true,
  "EquipmentPendant5": true,
  "EquipmentPendant6": true,
  "EquipmentPendant7": true,
  "EquipmentPendant8": true,
  "EquipmentPendant13": true,
  "EquipmentPendant15": true,
  "EquipmentPendant18": true,
  "EquipmentRings1": true,
  "EquipmentRings4": true,
  "EquipmentRings5": true,
  "EquipmentRings8": true,
  "EquipmentRings9": true,
  "EquipmentRings10": true,
  "EquipmentRingsFishing1": true,
  "EquipmentRingsFishing2": true,
  "EquipmentRingsFishing3": true,
  "EquipmentHatsBeg1": true,
  "EquipmentHats10": true,
  "EquipmentHats23": true,
  "EquipmentHats24": true,
  "EquipmentHats27": true,
  "EquipmentWeapons1": true,
  "EquipmentWeapons2": true,
  "EquipmentWands3": true,
  "EquipmentWands4": true,
  "TestObj2": true,
  "TestObj3": true,
  "TestObj4": true,
  "TestObj5": true,
  "TestObj8": true,
  "TestObj14": true,
  "TestObj15": true,
  "TestObj16": true,
  "EquipmentPants7": true,
  "EquipmentPants8": true,
  "EquipmentPants9": true,
  "EquipmentPants11": true,
  "EquipmentPants12": true,
  "EquipmentPants13": true,
  "EquipmentPants14": true,
  'Blank': true,
  'LockedInvSpace': true,
  'FillerMaterial': true,
  'Fish5': true,
  'Fish6': true,
  'Fish7': true,
  'Fish8': true,
  'EquipmentSmithingTabs5': true,
  'EquipmentSmithingTabs6': true,
  'EquipmentSmithingTabs7': true,
  'EquipmentSmithingTabs8': true,
  'StampA22': true,
  'StampA25': true,
  'StampA29': true,
  'StampA30': true,
  'StampA31': true,
  'StampA32': true,
  'StampA33': true,
  'StampA34': true,
  'StampA35': true,
  'CraftMat11': true,
  'CraftMat12': true,
  'CraftMat13': true,
  'CraftMat14': true,
  'CraftMat15': true,
  'CraftMat16': true,
  'CraftMat17': true,
  'GemQ1': true,
  'GemQ2': true,
  'GemQ3': true,
  'GemQ4': true,
  'GemQ5': true,
  'GemQ6': true,
  'GemQ7': true,
  'GemQ8': true,
  'EquipmentHats35': true,
  'EquipmentHats38': true,
  'EquipmentHats46': true,
  'EquipmentHats47': true,
  'EquipmentHats48': true,
  'EquipmentHats49': true,
  'EquipmentHats50': true,
  'CardPack1': true,
  'CardPack2': true,
  'CardPack3': true,
  'InvBag21': true,
  'InvBag22': true,
  'InvBag23': true,
  'InvBag24': true,
  'InvBag25': true,
  'InvBag26': true,
  'InvStorage31': true,
  'InvStorage32': true,
  'InvStorage33': true,
  'InvStorage34': true,
  'InvStorage35': true,
  'InvStorage36': true,
  'InvStorage37': true,
  'InvStorage38': true,
  'InvStorage39': true,
  'InvStorage40': true,
  'InvStorage41': true,
  'InvStorage42': true,
  "COIN": true,
  "EXP": true,
  'Dreadlo': true,
  'Godshard': true,
  'DreadloBar': true,
  'GodshardBar': true,
  'AlienTree': true,
  "TestObj18": true,
  "TestObj9": true,
  "TestObj10": true,
  "EquipmentShirts7": true,
  'EquipmentRingsChat2': true,
  'EquipmentRingsChat3': true,
  'EquipmentRingsChat4': true,
  'EquipmentRingsChat5': true,
  'EquipmentRingsChat6': true,
  'EquipmentRingsChat8': true,
  'EquipmentRingsChat9': true,
  'EquipmentTools8': true,
  'EquipmentTools9': true,
  "EquipmentToolsHatchet6": true,
  "EquipmentToolsHatchet8": true,
  "EquipmentToolsHatchet9": true,
  "EquipmentToolsHatchet10": true,
  "Quest8": true,
  "ClassSwap": true,
  "ResetBox": true,
  "Ht": true,
  'StonePremRestore': true,
  'SmithingRecipes3': true,
  'SmithingRecipes4': true,
  'EquipmentSmithingTabs4': true,
  'Quest28': true,
  'TrapBoxSet6': true,
  'NPCtoken8"': true,
  'StampB28': true,
  'StampB29': true,
  'StampB32': true,
  'StampB33': true,
  'StampB35': true,
  'StampC4': true,
  'StampC5': true,
  'StampC10': true,
  'StampC11': true,
  'StampC12': true,
  'ExpSmith1': true,
  'StonePremSTR': true,
  'StonePremAGI': true,
  'StonePremWIS': true,
  'StonePremLUK': true,
  'GemP1': true,
  'GemP9': true,
  'GemP10': true,
  'GemP11': true,
  'GemP12': true,
  'GemP13': true,
  'GemP14': true,
  'GemP15': true,
  'GemQ9': true,
  'EquipmentHats57': true,
  'EquipmentHats45': true,
  'EquipmentHats43': true,
  'EquipmentHats37': true,
  'EquipmentHats40': true,
  'EquipmentHats36': true,
  'EquipmentHats33': true,
  'EquipmentHats32': true,
  'EquipmentHats31': true,
  'EquipmentHats34': true,
  'CardsC13': true,
  'CardsC14': true,
  'CardsC15': true,
  'CardsD12': true,
  'CardsD13': true,
  'Trophy4': true,
  'Trophy7': true,
  'Line8': true,
  'Line9': true,
  'Line11': true,
  'Line12': true,
  'Line13': true,
  'Line14': true,
  'Weight4': true,
  'Weight7': true,
  'Weight9': true,
  'Weight13': true,
  'Weight14': true,
  'StampsA22': true,
  'StampsA25': true,
  'TalentPoint1': true,
  'TalentPoint4': true,
  'TalentPoint5': true,
  'TalentPoint6': true,
  'DoubleAFKtix': true,
  'ObolFrag': true,
  'StampC14': true,
  'StampC15': true,
  'DeliveryBox': true,
  'StampC16': true,
  'StampC17': true,
  'StampC18': true,
  'StampC8': true,
  'DungWeaponBow1': true,
  'DungWeaponWand1': true,
  'DungWeaponSword1': true,
  'FishingRod1': true,
  'CatchingNet1': true,
};

const statuesMap = {
  0: { name: "Power_Statue", rawName: "Statue1" },
  1: { name: "Speed_Statue", rawName: "Statue2" },
  2: { name: "Mining_Statue", rawName: "Statue3" },
  3: { name: "Feasty_Statue", rawName: "Statue4" },
  4: { name: "Health_Statue", rawName: "Statue5" },
  5: { name: "Kachow_Statue", rawName: "Statue6" },
  6: { name: "Lumberbob_Statue", rawName: "Statue7" },
  7: { name: "Thicc_Skin_Statue", rawName: "Statue8" },
  8: { name: "Oceanman_Statue", rawName: "Statue9" },
  9: { name: "Ol_Reliable_Statue", rawName: "Statue10" },
  10: { name: "Exp_Book_Statue", rawName: "Statue11" },
  11: { name: "Anvil_Statue", rawName: "Statue12" },
  12: { name: "Cauldron_Statue", rawName: "Statue13" },
  13: { name: "Beholder_Statue", rawName: "Statue14" },
  14: { name: "Bullseye_Statue", rawName: "Statue15" },
  15: { name: "Box_Statue", rawName: "Statue16" },
  16: { name: "Twosoul_Statue", rawName: "Statue17" },
  17: { name: "EhExPee_Statue", rawName: "Statue18" }
}

const talentPagesMap = {
  "Beginner": ["Beginner"],
  "Journeyman": ["Beginner", "Journeyman"],
  "Maestro": ["Beginner", "Journeyman", "Maestro"],
  "Warrior": ["Rage Basics", "Warrior"],
  "Barbarian": ["Rage_Basics", "Warrior", "Barbarian"],
  "Squire": ["Rage_Basics", "Warrior", "Squire"],
  "Archer": ["Calm_Basics", "Archer"],
  "Bowman": ["Calm_Basics", "Archer", "Bowman"],
  "Hunter": ["Calm_Basics", "Archer", "Hunter"],
  "Mage": ["Savvy_Basics", "Mage"],
  "Shaman": ["Savvy_Basics", "Mage", "Shaman"],
  "Wizard": ["Savvy_Basics", "Mage", "Wizard"]
};

const keysMap = {
  0: { name: "Forest_Villa_Key", rawName: 'Key1' },
  1: { name: "Efaunt's_Tomb_Key", rawName: 'Key2' },
  2: { name: "Chizoar's_Cavern_Key", rawName: 'Key3' }
}

const prayersMap = {
  0: { name: 'Big_Brain_Time', rawName: 'Prayer0' },
  1: { name: 'Skilled_Dimwit', rawName: 'Prayer1' },
  2: { name: 'Unending_Energy', rawName: 'Prayer2' },
  3: { name: 'Shiny_Snitch', rawName: 'Prayer3' },
  4: { name: 'Zerg_Rushogen', rawName: 'Prayer4' },
  5: { name: 'Tachion_of_the_Titans', rawName: 'Prayer5' },
  6: { name: 'Balance_of_Precision', rawName: 'Prayer6' },
  7: { name: 'Midas_Minded', rawName: 'Prayer7' },
  8: { name: 'Jawbreaker', rawName: 'Prayer8' },
  9: { name: 'The_Royal_Sampler', rawName: 'Prayer9' },
  10: { name: 'Antifun_Spirit', rawName: 'Prayer10' },
  11: { name: 'Distillarge', rawName: 'Prayer11' },
  12: { name: 'Ruck_Sack', rawName: 'Prayer12' },
  13: { name: 'Balance_of_Pain', rawName: 'Prayer13' },
  14: { name: 'Balance_of_Aggression', rawName: 'Prayer14' },
  15: { name: 'Unknown', rawName: 'Prayer15' },
  16: { name: 'Unknown', rawName: 'Prayer16' },
  17: { name: 'Unknown', rawName: 'Prayer17' },
  18: { name: 'Unknown', rawName: 'Prayer18' },
  19: { name: 'Unknown', rawName: 'Prayer19' },
  20: { name: 'Unknown', rawName: 'Prayer20' },
  21: { name: 'Unknown', rawName: 'Prayer21' },
  22: { name: 'Unknown', rawName: 'Prayer22' },
  23: { name: 'Unknown', rawName: 'Prayer23' },
  24: { name: 'Unknown', rawName: 'Prayer24' },
}

const shopMapping = {
  0: {
    included: {
      0: true, 1: true, 4: true, 5: true, 6: true, 7: true, 13: true, 18: true, 23: true, 24: true
    }, name: 'Blunder_Hills'
  },
  1: {
    included: {
      0: true, 3: true, 4: true, 8: true, 9: true, 12: true, 13: true
    }, name: 'Encroaching_Forest_Villas'
  },
  2: {
    included: {
      0: true, 1: true, 2: true, 3: true, 4: true, 8: true, 9: true, 10: true, 11: true, 17: true, 18: true
    }, name: 'YumYum_Grotto'
  },
  3: {
    included: {
      12: true
    }, name: 'Faraway_Piers'
  },
  4: {
    included: {
      0: true, 1: true, 2: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 18: true, 19: true
    }, name: 'Frostbite_Towndra'
  }
};

const worldNpcMap = {
  "Scripticus": {
    "world": "Blunder_Hills",
    index: 0
  },
  "Glumlee": {
    "world": "Blunder_Hills",
    index: 1
  },
  "Krunk": {
    "world": "Blunder_Hills",
    index: 2
  },
  "Mutton": {
    "world": "Blunder_Hills",
    index: 3
  },
  "Woodsman": {
    "world": "Blunder_Hills",
    index: 4
  },
  "Hamish": {
    "world": "Blunder_Hills",
    index: 5
  },
  "Toadstall": {
    "world": "Blunder_Hills",
    index: 5
  },
  "Picnic_Stowaway": {
    "world": "Blunder_Hills",
    index: 6
  },
  "Typhoon": {
    "world": "Blunder_Hills",
    index: 7
  },
  "Sprout": {
    "world": "Blunder_Hills",
    index: 8
  },
  "Dazey": {
    "world": "Blunder_Hills",
    index: 9
  },
  "Telescope": {
    "world": "Blunder_Hills",
    index: 10
  },
  "Stiltzcho": {
    "world": "Blunder_Hills",
    index: 11
  },
  "Funguy": {
    "world": "Blunder_Hills",
    index: 12
  },
  "Tiki_Chief": {
    "world": "Blunder_Hills",
    index: 13
  },
  "Dog_Bone": {
    "world": "Blunder_Hills",
    index: 14
  },
  "Papua_Piggea": {
    "world": "Blunder_Hills",
    index: 15
  },
  "TP_Pete": {
    "world": "Blunder_Hills",
    index: 16
  },
  "Meel": {
    "world": "Blunder_Hills",
    index: 17
  },
  "Town_Marble": {
    "world": ""
  },
  "Mr_Pigibank": {
    "world": ""
  },
  "Secretkeeper": {
    "world": ""
  },
  "Promotheus": {
    "world": ""
  },
  "Bushlyte": {
    "world": ""
  },
  "Rocklyte": {
    "world": ""
  },
  "Cowbo_Jones": {
    "world": "Yum-Yum_Desert",
    index: 0
  },
  "Fishpaste97": {
    "world": "Yum-Yum_Desert",
    index: 1
  },
  "Scubidew": {
    "world": "Yum-Yum_Desert",
    index: 2
  },
  "Whattso": {
    "world": "Yum-Yum_Desert",
    index: 3
  },
  "Bandit_Bob": {
    "world": "Yum-Yum_Desert",
    index: 4
  },
  "Carpetiem": {
    "world": "Yum-Yum_Desert",
    index: 5
  },
  "Centurion": {
    "world": "Yum-Yum_Desert",
    index: 6
  },
  "Goldric": {
    "world": "Yum-Yum_Desert",
    index: 7
  },
  "Snake_Jar": {
    "world": "Yum-Yum_Desert",
    index: 8
  },
  "XxX_Cattleprod_XxX": {
    "world": "Yum-Yum_Desert",
    index: 9
  },
  "Loominadi": {
    "world": "Yum-Yum_Desert",
    index: 10
  },
  "Wellington": {
    "world": "Yum-Yum_Desert",
    index: 11
  },
  "Djonnut": {
    "world": "Yum-Yum_Desert",
    index: 12
  },
  "Walupiggy": {
    "world": "Yum-Yum_Desert",
    index: 13
  },
  "Gangster_Gus": {
    "world": "Yum-Yum_Desert",
    index: 14
  },
  "Builder_Bird": {
    "world": ""
  },
  "Speccius": {
    "world": ""
  },
  "Postboy_Pablob": {
    "world": ""
  },
  "Desert_Davey": {
    "world": ""
  },
  "Giftmas_Blobulyte": {
    "world": ""
  },
  "Loveulyte": {
    "world": ""
  },
  "Constructor_Crow": {
    "world": ""
  },
  "Iceland_Irwin": {
    "world": ""
  },
  "Egggulyte": {
    "world": ""
  },
  "Hoggindaz": {
    "world": "Frostbite_Tundra",
    index: 0
  },
  "Worldo": {
    "world": "Frostbite_Tundra",
    index: 0
  },
  "Lord_of_the_Hunt": {
    "world": "Frostbite_Tundra",
    index: 1
  },
  "Lonely_Hunter": {
    "world": "Frostbite_Tundra",
    index: 2
  },
  "Snouts": {
    "world": "Frostbite_Tundra",
    index: 3
  },
  "Shuvelle": {
    "world": "Frostbite_Tundra",
    index: 4
  },
  "Yondergreen": {
    "world": "Frostbite_Tundra",
    index: 5
  },
  "Crystalswine": {
    "world": "Frostbite_Tundra",
    index: 6
  },
  "Bill_Brr": {
    "world": "Frostbite_Tundra",
    index: 7
  },
  "Bellows": {
    "world": "Frostbite_Tundra",
    index: 8
  },
  "Cactolyte": {
    "world": ""
  },
  "Coastiolyte": {
    "world": ""
  },
};

const starSignsIndicesMap = {
  "The_Book_Worm": "1",
  "The_Buff_Guy": "1a",
  "The_Fuzzy_Dice": "1b",
  "Flexo_Bendo": "2",
  "Dwarfo_Beardus": "3",
  "Hipster_Logger": "4",
  "Pie_Seas": "4a",
  "Miniature_Game": "4b",
  "Shoe_Fly": "4c",
  "Pack_Mule": "5",
  "Pirate_Booty": "6",
  "All_Rounder": "7",
  "Muscle_Man": "7a",
  "Fast_Frog": "7b",
  "Smart_Stooge": "7c",
  "Lucky_Larry": "7d",
  "Fatty_Doodoo": "8",
  "Robinhood": "9",
  "Blue_Hedgehog": "9a",
  "Ned_Kelly": "10",
  "The_Fallen_Titan": "10a",
  "Chronus_Cosmos": "CR",
  "Activelius": "11",
  "Gum_Drop": "11a",
  "Mount_Eaterest": "12",
  "Bob_Build_Guy": "13",
  "The_Big_Comatose": "14",
  "Sir_Savvy": "14a",
  "Silly_Snoozer": "15",
  "The_Big_Brain": "15a",
  "Grim_Reaper": "16",
  "The_Forsaken": "16a",
  "The_OG_Skiller": "17",
  "Mr_No_Sleep": "18",
  "All_Rounderi":"1",
  "Centaurii":"2",
  "Murmollio":"3",
  "Strandissi":"4",
  "Agitagi":"4B",
  "Wispommo":"5",
  "Lukiris":"5B",
  "Pokaminni":"6",
  "Gor_Bowzor":"7",
  "Hydron_Cosmos":"8",
  "Trapezoidburg":"8B",
  "Sawsaw_Salala":"9",
  "Preys_Bea":"9B",
  "Cullingo":"10",
  "Gum_Drop_Major":"10B",
  "Grim_Reaper_Major":"11",
  "Sir_Savvy_Major":"12",
  "The_Bulwark":"13",
  "Big_Brain_Major":"14",
  "The_Fiesty":"15",
  "The_Overachiever":"15B",
  "Comatose_Major":"16",
  "S._Snoozer_Major":"17",
  // "Unknown":"18",
  // "Unknown":"19",
  // "Unknown":"19B",
  // "Unknown":"20",
  // "Unknown":"21",
  // "Unknown":"22",
  // "Unknown":"23",
}

module.exports = {
  starSignsIndicesMap,
  worldNpcMap,
  shopMapping,
  prayersMap,
  keysMap,
  talentPagesMap,
  starSignByIndexMap,
  bubblesMap,
  cardSetMap,
  skillIndexMap,
  guildBonusesMap,
  obolMap,
  obolFamilyShapeMap,
  obolCharacterShapeMap,
  filteredLootyItems,
  anvilProductionItems,
  statuesMap
};
