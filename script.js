// Code goes here
'use strict';
//the three different branches of writing code: model(engine), view(output), controller(cables)

/*
Qs:
When i have multiple loops, i get lots of "out of scope" or "already defined" warnings.

*/ 
//Jo's class example:
// function User(name, now) {
//   this.name = name;
//   this.isAdmin = false;
//   this.test = now;
// }

// let user = new User("Jack");

// function Rectangle (w, h) {
//   var width = w;
//   var height = h;
// }

// var my_square = new Rectangle(4, 4);


// function Square (x) {
//   return new Rectangle(x, x);
// }

/*
Notes:
Split all data into different character keys: i.e. raceTraits & subraceTraits.
So that you can create outputs that won't be refreshed when altering one of those data keys.

Object.getOwnPropertyNames(weapons["simple weapons"])
*/
var test = {strength: 0, dexterity: 1, constitution: 2}
var test2 = Object.assign(test)




// Character Object
var character = {
  xp: 8,
  level: 2,
  class: "None",
  race: "None",
  subrace: "None",
  alignment: "None", 
  profBonus: 2,
  rawAbilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  abilityScores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  abilityScoreModifiers: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  savingThrows: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  initiative: "None",
  size: "None",
  speed: "None",
  passivePerception: "None",
  languages: ["None"],
  raceTraits: [["None"]],
  subraceTraits: [["None"]],
  hitDice: "None",
  maxHp: "None",
  toolsProf: "None",
  weaponProf: [[""]],
  armorProf: [[""]],
  skillsProf: [""],
  skills: {
  	"Acrobatics": 0,
	"Animal Handling": 0,
	"Arcana": 0,
	"Athletics": 0,
	"Deception": 0,
	"History": 0,
	"Insight": 0,
	"Intimidation": 0,
	"Investigation": 0,
	"Medicine": 0,
	"Nature": 0,
	"Perception": 0,
	"Performance": 0,
	"Persuasion": 0,
	"Religion": 0,
	"Sleight of Hand": 0,
	"Stealth": 0,
	"Survival": 0,	
  },
};

var weapons = {
  "simple weapons": {
    "club": {damage: "1d4", damageType: "bludgeoning", weight: 2, cost: 0.1, properties: ["light"]},
    "dagger": {damage: "1d4", damageType: "piercing", weight: 1, cost: 2, properties: ["finess","light","thrown (range 20/60)"]},
    "greatclub": {damage: "1d8", damageType: "bludgeoning", weight: 10, cost: 0.2, properties: ["two-handed"]},
    "handaxe": {damage: "1d6", damageType: "slashing", weight: 2, cost: 5, properties: ["light","thrown (range 20/60)"]},
    "javelin": {damage: "1d6", damageType: "piercing", weight: 2, cost: 0.5, properties: ["thrown (range 30/120)"]},
    "light hammer": {damage: "1d4", damageType: "bludgeoning", weight: 2, cost: 2, properties: ["light","thrown (range 20/60)"]},
    "mace": {damage: "1d6", damageType: "bludgeoning", weight: 4, cost: 5, properties: null},
    "quarterstaff": {damage: "1d6", damageType: "bludgeoning", weight: 4, cost: 0.2, properties: ["versatile (1d8)"]},
    "sickle": {damage: "1d4", damageType: "slashing", weight: 2, cost: 1, properties: ["light"]},
    "spear": {damage: "1d6", damageType: "piercing", weight: 3, cost: 1, properties: ["thrown (range 20/60)", "versatile (1d8)"]},
    "light crossbow": {damage: "1d8", damageType: "piercing", weight: 5, cost: 25, properties: ["Ammunition (range 80/320)", "loading", "two-handed"]},
    "dart": {damage: "1d4", damageType: "piercing", weight: 0.25, cost: 0.05, properties: ["finesse", "thrown (range 20/60)"]},
    "shortbow": {damage: "1d6", damageType: "piercing", weight: 2, cost: 25, properties: ["Ammunition (range 80/320)", "two-handed"]},
    "sling": {damage: "1d4", damageType: "bludgeoning", weight: 0, cost: 0.1, properties: ["Ammunition (range 30/120)"]},
  },
  "martial weapons": {
    "battleaxe": {damage: "1d8", damageType: "slashing", weight: 4, cost: 10, properties: ["versatile (1d10)"]},
    "flail": {damage: "1d8", damageType: "bludgeoning", weight: 2, cost: 10, properties: null},
    "glaive": {damage: "1d10", damageType: "slashing", weight: 6, cost: 20, properties: ["heavy", "reach", "two-handed"]},
    "greataxe": {damage: "1d12", damageType: "slashing", weight: 7, cost: 30, properties: ["heavy", "two-handed"]},
    "greatsword": {damage: "2d6", damageType: "slashing", weight: 6, cost: 50, properties: ["heavy", "two-handed"]},
    "halberd": {damage: "1d10", damageType: "slashing", weight: 6, cost: 20, properties: ["heavy", "reach", "two-handed"]},
    "lance": {damage: "1d12", damageType: "piercing", weight: 6, cost: 10, properties: ["reach", "special"]},
    "longsword": {damage: "1d8", damageType: "slashing", weight: 3, cost: 15, properties: ["versatile (1d8)"]},
    "maul": {damage: "2d6", damageType: "bludgeoning", weight: 10, cost: 10, properties: ["heavy", "two-handed"]},
    "morningstar": {damage: "1d8", damageType: "piercing", weight: 4, cost: 15, properties: null},
    "pike": {damage: "1d10", damageType: "piercing", weight: 18, cost: 5, properties: ["heavy", "reach", "two-handed"]},
    "rapier": {damage: "1d8", damageType: "piercing", weight: 2, cost: 25, properties: ["finesse"]},
    "scimitar": {damage: "1d6", damageType: "slashing", weight: 3, cost: 25, properties: ["finesse", "light"]},
    "shortsword": {damage: "1d6", damageType: "piercing", weight: 2, cost: 10, properties: ["finesse", "light"]},
    "trident": {damage: "1d6", damageType: "piercing", weight: 4, cost: 5, properties: ["Thrown (range 20/60)", "versatile (1d8)"]},
    "war pick": {damage: "1d8", damageType: "piercing", weight: 2, cost: 5, properties: null},
    "warhammer": {damage: "1d8", damageType: "bludgeoning", weight: 2, cost: 15, properties: ["versatile (1d10)"]},
    "whip": {damage: "1d4", damageType: "slashing", weight: 3, cost: 2, properties: ["finesse", "reach"]},
    "blowgun": {damage: "1", damageType: "piercing", weight: 1, cost: 10, properties: ["Ammunition (range 25/100)", "loading"]},
    "hand crossbow": {damage: "1d6", damageType: "piercing", weight: 3, cost: 75, properties: ["Ammunition (range 30/120)", "light", "loading"]},
    "heavy crossbow": {damage: "1d10", damageType: "piercing", weight: 18, cost: 50, properties: ["Ammunition (range 100/400)", "heavy", "loading", "two-handed"]},
    "longbow": {damage: "1d8", damageType: "piercing", weight: 2, cost: 50, properties: ["Ammunition (range 150/600)", "heavy", "two-handed"]},
    "net": {damage: "0", damageType: null, weight: 3, cost: 1, properties: ["special, thrown (range 5/15)"]},
  }
}

var armor = {
  "light armor": {
    "padded": {ac: "11"+"dexMod", weight: 8, cost: 5, stealth: "disadvantage"},
    "leather": {ac: "11"+"dexMod", weight: 10, cost: 10},
    "studded leather": {ac: "12"+"dexMod", weight: 13, cost: 45}
  },
  "medium armor": {
    "hide": {ac: "12"+"dexMod(max2)", weight: 12, cost: 10},
    "chain shirt": {ac:"13"+"dexMod(max2)", weight: 20, cost: 50},
    "scale mail": {ac:"14"+"dexMod(max2)", weight: 45, cost: 50, stealth: "disadvantage"},
    "breastplate": {ac:"14"+"dexMod(max2)", weight: 20, cost: 400},
    "half plate": {ac:"15"+"dexMod(max2)", weight: 40, cost: 750, stealth: "disadvantage"}
  },
  "heavy armor": {
    "ring mail": {ac:"14", weight: 40, cost: 30, stealth: "disadvantage"},
    "chain mail": {ac:"16", weight: 55, cost: 75, stealth: "disadvantage", strength: 13},
    "splint": {ac:"17", weight: 60, cost: 200, stealth: "disadvantage", strength: 15},
    "plate": {ac:"18", weight: 65, cost: 1500, stealth: "disadvantage", strength: 15},
  },
  "shields":{
    "shield": {ac: 2, weight: 6, cost: 10}
  },
}

var skills = {
  "Acrobatics": "dexterity",
  "Animal Handling": "wisdom",
  "Arcana": "intelligence",
  "Athletics": "strength",
  "Deception": "charisma",
  "History": "intelligence",
  "Insight": "wisdom",
  "Intimidation": "charisma",
  "Investigation": "intelligence",
  "Medicine": "wisdom",
  "Nature": "intelligence",
  "Perception": "wisdom",
  "Performance": "charisma",
  "Persuasion": "charisma",
  "Religion": "intelligence",
  "Sleight of Hand": "dexterity",
  "Stealth": "dexterity",
  "Survival": "wisdom",
}

var races = {
  "None": {
    subrace: {"None": {},
    },
  },
  
  "Dragonborn": {
    size: "Medium",
    speed: "30ft",
    traits: [
      ["Draconic Ancestry",""],
      ["Breath Weapon",""],
      ["Damage Resistance",""],
    ],
    languages: ["Common", "Draconic"],
    increase: {strength:2, charisma:1,},
    subrace: {"None": {},
    },
  },
  
  "Dwarf": {
    size: "Medium",
    speed: "25ft",
    traits: [
        ["Darkvision", "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray."],
        ["Dwarven Resilience",  "You have advantage on saving throws against poison, and you have Resistance against poison damage."],
        ["Dwarven Combat Training", "You have proficiency with the Battleaxe, Handaxe, Light Hammer, and Warhammer.", "battleaxe", "handaxe", "light hammer", "warhammer",],
        ["Tool Proficiency", `You gain proficiency with the artisan’s tools of your choice: ${'<select id="dwarfTool" class="character-input" data-inputname="toolsProf"><option>None</option><option>smith’s tools</option><option>brewer’s supplies</option><option>mason’s tools</option></select>'}`,],
        ["Stonecunning", "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus."]
      ],
    languages: ["Common", "Dwarvish"],
    increase: {constitution:2,},
    subrace: {"None": {},
      "Hill": {
        traits: [["Dwarven Toughness", "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",]],
        increase: {wisdom:1,},
      },
      "Mountain": {
        traits: [["Dwarven Armor Training", "You have proficiency with light and medium armor.", "light armor", "medium armor"]],
        increase: {strength:2,},
      },
    },
  },
  "Elf": {
    size: "Medium",
    speed: "30ft",
    traits: [
      ["Darkvision","Accustomed to twilit forests and the night sky, you have superior vision in dark and dim Conditions. You can see in dim light within 60 feet of you as if it were bright light, and in Darkness as if it were dim light. You can’t discern color in Darkness, only shades of gray."],
      ["Keen Senses","You have proficiency in the Perception skill."],
      ["Fey Ancestry","You have advantage on saving throws against being Charmed, and magic can’t put you to sleep."],
      ["Trance","Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After Resting in this way, you gain the same benefit that a human does from 8 hours of sleep."]
    ],
    languages: ["Common", "Elvish"],
    increase: {dexterity:2,},
    subrace: {"None": {},
      "High": {
        traits: [
          ["Elf Weapon Training","You have proficiency with the Longsword, Shortsword, Shortbow, and Longbow."],
          ["Cantrip","You know one cantrip of your choice from the Wizard spell list. Intelligence is your spellcasting ability for it."],
          ["Extra Language","You can speak, read, and write one extra Language of your choice."],
        ]
      },
      "Wood": {
        traits: [
          ["Elf Weapon Training","You have proficiency with the longsword, shortsword, shortbow, and longbow."],
          ["Fleet of Foot","Your base walking speed increases to 35 feet."],
          ["Mask of the Wild","You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena."]
        ],
        increase: {wisdom: 1,},
      },
      "Dark": {
        traits: [
          ["Superior Darkvision","Your darkvision has a radius of 120feet."],
          ["Sunlight Sensitivity", "You have disadvantage on attack rolls and on Wisdom (Perception) check that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight."],
          ["Drow Magic","You know the <i>dancing lights</i> cantrip. When you reach 3rd level, you can cast <i>faerie fire</i> spell once per day with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells."],
          ["Drow Weapon Training","You have proficiency with rapiers, shortsword, and hand crossbows."]
        ],
        increase:{charisma:1,},
      },
    },
  },
  // halfelf: "",
  // halforc: "",
  "Halfling": {
    size: "Small",
    speed: "25ft",
    traits: [
        ["Lucky", "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll."],
        ["Brave", "You have advantage on saving throws against being frightened."],
        ["Halfling Nimbleness", "You can move through the space of any creature that is of a size larger than yours."],
      ],
    languages: ["Common", "Halfling"],
    increase: {dexterity:2,},
    subrace: {"None": {},
      "Lightfoot": {
        traits: [["Naturally Stealthy", "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.",]],
        increase: {charisma:1,},
      },
      "Stout": {
        traits: [["Stout Resilience", "You have advantage on saving throws against poison, and you have resistance against poison damage."]],
        increase: {constitution:1,},
      },
    },
  },
  "Human": {
    size: "Medium",
    speed: "30ft",
    traits: [
        ["Extra Language", `Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.
        ${'<input id="humanLanguage" class="character-input" data-inputname="languages" type="text" value="" placeholder="Type Language"></input>'}`],
      ],
    languages: ["Common",],
    increase: {strength:1, dexterity:1, constitution:1, intelligence:1, wisdom:1, charisma:1},
  },
  //!!!! add tool prof for rock gnomes, add cantrip from forest gnome
  "Gnome": {
    size: "Small",
    speed: "25ft",
    traits: [
        ["Darkvision", "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray."],
        ["Gnome Cunning", "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic."],
      ],
    languages: ["Common", "Gnomish"],
    increase: {intelligence:2,},
    subrace: {"None": {},
      "Forest": {
        traits: [
        	["Naturally Illusionist", "You know the <i>minor illusion</i> cantrip. lntelligence is your spellcasting ability for it."],
        	["Speak with Small Beasts", "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets."]
          ],
        increase: {dexterity:1,},
      },
      "Rock": {
        traits: [
        	["Artificer's Lore", "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply."],
        	["Tinker", `You have proficiency with ${'<span id="rockGnomeTool" class="character-input" data-inputname="toolsProf">artisan's tools (tinker's tools)</span>'}. Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, I hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time.<br />When you create a device, choose one of the following options:<br /><i>Clockwork Toy.</i> This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.<br /><i>Fire Starter.</i> The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.<br /><i>Music Box.</i> When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song's end or when it is closed.`]
          ],
        increase: {constitution:1,},
      },
    },
  },
  // tiefling: "",
};

var raceTraits

var alignment = ["None", "Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];

var classes = {
  None: {},
  Barbarian: {
    hitDice: 12,
    weapProf: ["simple weapons", "martial weapons"],
    armorProf: ["light armor", "medium armor", "shields"],
    savingThrows: ["strength", "constitution"],
    skills: {number: 2, list:["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"],}
  },
  Bard: {
    hitDice: 8,
    weapProf: ["simple weapons", "hand crossbow", "longsword", "rapier", "shortsword"],
    armorProf: ["light armor"],
    savingThrows: ["dexterity", "charisma"],
    skills: {number: 3, list: Object.keys(skills),}
  },
  Cleric: {
    hitDice: 8,
    weapProf: ["simple weapons"],
    armorProf: ["light armor", "medium armor", "shields"],
    savingThrows: ["wisdom", "charisma"],
    skills: {number: 2, list: ["History", "Insight", "Medicine", "Persuasion", "Religion"],}
  },
  Druid: {
    hitDice: 8,
    weapProf: ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"],
    armorProf: ["light armor (nonmetal)", "medium armor (nonmetal)", "shields (nonmetal)"],
    savingThrows: ["intelligence", "wisdom"],
    skills: {number: 2, list: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"],}
  },
  Fighter: {
    hitDice: 10,
    weapProf: ["simple weapons", "martial weapons"],
    armorProf: ["light armor", "medium armor", "heavy armor", "shields"],
    savingThrows: ["strength", "constitution"],
    skills: {number: 2, list: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],}
  },
  Monk: {
    hitDice: 8,
    weapProf: ["simple weapons", "shortsword"],
    armorProf: [],
    savingThrows: ["strength", "dexterity"],
    skills: {number: 2, list: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"],}
  },
  Paladin: {
    hitDice: 10,
    weapProf: ["simple weapons", "martial weapons"],
    armorProf: ["light armor", "medium armor", "heavy armor", "shields"],
    savingThrows: ["wisdom", "charisma"],
    skills: {number: 2, list: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"],}
  },
  Ranger: {
    hitDice: 10,
    weapProf: ["simple weapons", "martial weapons"],
    armorProf: ["light armor", "medium armor","shields"],
    savingThrows: ["strength", "dexterity"],
    skills: {number: 3, list: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"],}
  },
  Rogue: {
    hitDice: 8,
     weapProf: ["simple weapons", "hand crossbow", "longsword", "rapier", "shortsword"],
     armorProf: ["light armor"],
     savingThrows: ["strength", "dexterity"],
     skills: {number: 4, list: [" Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"],}
  },
  Sorcerer: {
    hitDice: 6,
     weapProf: ["dagger", "dart", "sling", "quarterstaff", "light crossbow"],
     armorProf: [],
     savingThrows: ["constitution", "charisma"],
     skills: {number: 2, list: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"],}
  },
  Warlock: {
    hitDice: 8,
     weapProf: ["simple weapons"],
     armorProf: ["light armor"],
     savingThrows: ["wisdom", "charisma"],
     skills: {number: 2, list: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"],}
  },
  Wizard: {
    hitDice: 6,
     weapProf: ["dagger", "dart", "sling", "quarterstaff", "light crossbow"],
     armorProf: [],
     savingThrows: ["intelligence", "wisdom"],
     skills: {number: 2, list: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"],}
  },
};






var initialAbilityScore = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};




//DnD xp table
var xpValues = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 335000
];

//DnD proficiency bonus table
var profBonusValues = [
  2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6
];

//find xp given level
function getXpFromLevel(level) {
  return xpValues[level - 1];
}

//find level given xp
function getLevelFromXp(xp) {
  var myCopy = [...xpValues];
  myCopy.reverse();

  var index = myCopy.findIndex(function(value, index) {
    if (xp >= value) {
      return true;
    }
  });

  var level = xpValues.length - index;

  return level;
}

//find proficiencyBonus given level
function getProfBonusFromLevel(level) {
  return profBonusValues[level - 1];
}

//find ability score modifier based on ability score
function getAbilityModifier(ability){
  return Math.floor((ability - 10)/2);
}



//set the character total ability scores
function getCharacterAbilityScores () {
  var keys = Object.keys(character.abilityScores); // ['strength', 'dexterity'...]
  for (let i = 0; i < keys.length; i++) {
    
    var key = keys[i]; // 'strength'
    
    var raceIncrease = character.race !== 'None' //check if race key "increase" exists and check if abilities inside "increase" exists
      ? races[character.race].increase[key] || 0 
      : 0;

    var subraceIncrease = character.subrace == 'None' ? 0 :
      races[character.race].subrace[character.subrace].increase === undefined ? 0 :
      races[character.race].subrace[character.subrace].increase[key] || 0;

    
    character.abilityScores[key] = character.rawAbilityScores[key] + raceIncrease + subraceIncrease;
    
    //and set ability score modifiers
    var n = getAbilityModifier(character.abilityScores[key]);
    character.abilityScoreModifiers[key] = (n<0?"":"+") + n;
  }
}
function getSavingThrows() {
  if (character.class !== "none") {
    var keys = Object.keys(character.savingThrows); // ['strength', 'dexterity'...]
    var profSaves = classes[character.class].savingThrows
    var mods = character.abilityScoreModifiers
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var save = profSaves.includes(key) ? character.profBonus : 0
      var n = String(parseInt(mods[key]) + save)
      character.savingThrows[key] = (n<0?"":"+") + n
    }
  }
}

function getInitiative() {
  character.initiative = character.abilityScoreModifiers.dexterity
}

function getSize() {
  character.size = character.race !== "None"
  ? races[character.race].size
  : "None";
}

function getSpeed() {
  character.speed = character.race !== "None"
  ? races[character.race].speed
  : "None";
}

function getPassivePerception() {
  character.passivePerception = character.class !== "None"
  ? 10 + character.skills["Perception"]
  : "None";
}

function getLanguages() {
  character.languages = character.race !== "None"
  ? races[character.race].languages.slice()
  : ["None"];
}

function getRaceTraits() {
  character.raceTraits = character.race !== "None"
  ?  races[character.race].traits.slice()
  : [["None","None"]];
}
// function getSubraceTraits() {
//   character.subraceTraits = character.race !== "None"
//   ?  races[character.race].subrace[character.subrace].traits
//   : [["None","None"]]
// }
function getSubraceTraits() {
  var subraceTraits = races[character.race].subrace[character.subrace].traits;
  if (subraceTraits !== undefined) {
    character.subraceTraits = subraceTraits.slice();
  }
  else {
    character.subraceTraits = [["None"]];
  }
}

function getHitDice() {
  character.hitDice = (character.class !== "None") ? classes[character.class].hitDice : "None";
}

function toSentence(arr) {
  return arr.slice(0, -2).join(', ') + 
    (arr.slice(0, -2).length ? ', ' : '') + 
    arr.slice(-2).join(' and ') +
    (arr.length ? "." : "");
}

function returnArrayArrayBoolean(item, data){
  for (let i = 0; i < data.length; i++){
    var a = data[i];
    if (a.includes(item) === true)  {
      return a.includes(item);
    }
  }
  return false
}
function returnArrayBoolean(item, data){
  for (let i = 0; i < data.length; i++){
    var a = data;
    if (a.includes(item) === true)  {
      return a.includes(item);
    }
  }
  return false
}
function returnArrayArrayIndex3(item, data){
  for (let i = 0; i < data.length; i++){
    var a = data[i];
    if (a.includes(item) === true)  {
      return a.slice(2)
    }
  }
  return false
}
function getMaxHp() {
  var level = character.level;
  var Hd = character.hitDice;
  var conMod = getAbilityModifier(character.abilityScores.constitution);
  var dToughness = returnArrayArrayBoolean("Dwarven Toughness", character.subraceTraits) ? 1*level : 0;

  
  character.maxHp = (character.class !== "None") ? Hd + conMod + (level-1)*(Hd/2+1+conMod) + dToughness : "None";
  return character.maxHp;
}




//weapon prof
function getClassWeaponProf() {
  if (character.class !== "None") {
    character.weaponProf = classes[character.class].weapProf.slice()
  } else {
    character.weaponProf = []
  }
}
function getRaceWeaponProf(item, data) {
  if (character.class !== "None" || character.race !== "None") {
    var output = returnArrayArrayIndex3(item, data)
    for (let i = 0; i < output.length; i++){
      if (output !== false && returnArrayArrayBoolean(output[i], character.weaponProf)!== true) {
        if (returnArrayBoolean("simple weapons", character.weaponProf) === true && returnArrayBoolean(output[i], Object.getOwnPropertyNames(weapons["simple weapons"])) === true) {
          return null;
        } else if (returnArrayBoolean("martial weapons", character.weaponProf) === true && returnArrayBoolean(output[i], Object.getOwnPropertyNames(weapons["martial weapons"])) === true){
         return  null;
        } else {
          character.weaponProf.push(output[i]);
        }
      } else {
        return null;
      }
    }
  } else {
    character.weaponProf = []
  }
}
function weaponProf() {
  character.weaponProf = []
  getClassWeaponProf()
  getRaceWeaponProf("Dwarven Combat Training", character.raceTraits)
}

//armor prof
function getClassArmorProf() {
  if (character.class !== "None") {
    character.armorProf = classes[character.class].armorProf.slice()
  } else {
    character.armorProf = []
  }
}
function getRaceArmorProf(item, data) {
  if (character.class !== "None" || character.race !== "None") {
    var output = returnArrayArrayIndex3(item, data)
    for (let i = 0; i < output.length; i++){
      if (output !== false && returnArrayArrayBoolean(output[i], character.armorProf)!== true) {
        if (returnArrayBoolean("light armor", character.armorProf) === true && returnArrayBoolean(output[i], Object.getOwnPropertyNames(armor["light armor"])) === true) {
          return null;
        } else if (returnArrayBoolean("medium armor", character.armorProf) === true && returnArrayBoolean(output[i], Object.getOwnPropertyNames(armor["medium armor"])) === true){
         return  null;
        } else if (returnArrayBoolean("heavy armor", character.armorProf) === true && returnArrayBoolean(output[i], Object.getOwnPropertyNames(armor["heavy armor"])) === true){
         return  null;
        } else {
          character.armorProf.push(output[i]);
        }
      } else {
        null;
      }
    }
  } else {
    character.armorProf = []
  }
}
function armorProf() {
  character.armorProf = []
  getClassArmorProf()
  getRaceArmorProf("Dwarven Armor Training", character.subraceTraits)
}



//Event Listener used with html elements
document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
 
 
 

  


  
  
  
  
  //xp
  var xpButton = document.getElementById('xpButton');

  //level
  var levelButton = document.getElementById('levelButton');
  
  //prof bonus
  var profOutputEl = document.getElementById('prof');
  
  //class
  var classInputEl = document.getElementById('classInput');
  
  //race
  var raceInputEl = document.getElementById('raceDropdown');
  
  //subrace
  var subraceInputEl = document.getElementById('subraceDropdown');
  
  //alignment
  var alignmentInputEl = document.getElementById('alignmentInput');

  var abilityScoreButton = document.getElementById('abilityScoreButton');
  
  var rawAbilityScoreInputs = document.querySelectorAll('.character-input input');

  function generateSkillDropdown() {
    if (character.class !== "None") {
      var skillDiv = document.getElementById('skillsProf')
      skillDiv.innerHTML = ""
      var skillNumber = classes[character.class].skills.number
      for (var i = 0; i < skillNumber; i++) {
        var dropdown = document.createElement('select')
        skillDiv.appendChild(dropdown)
        var skillKeys = classes[character.class].skills.list.slice()
        skillKeys.unshift("None")
        
        
        for (var j = 0; j < skillKeys.length; j++) {
          var key = skillKeys[j];
          var option = document.createElement('option');
          option.text = key;
          dropdown.appendChild(option);
        }
      }
      var skillDivSelect = document.querySelectorAll('#skillsProf select')
      skillDivSelect.forEach(function(elem) {
        elem.addEventListener('change', function() {
          input.Character("skillsProf");
          getSkillsProf();
          getSkills();
          output.Character("skills");
          getPassivePerception();
          output.Character("passivePerception")
        });
      });
    }
    function getSkillsProf() {
      function hiddenClass(elem) {
        if ((elem.selected !== true) && (elem.value == character.skillsProf[i])){
          elem.className = "hidden"
          
        }
      }
      var optionList = document.querySelectorAll('#skillsProf select option')
      
      optionList.forEach(function(elem) {elem.className = ""})
      for (var i = 0; i < skillNumber; i++) {
        optionList.forEach(hiddenClass)
      }
    }
  }
  function getSkills() {
    	let skillsArray = Object.keys(skills)
    	let skillModifierArray = Object.values(skills)
    	let characterSkills = Object.keys(character.skills)
    	
    	for (let i = 0; i < skillsArray.length; i++) {
    		let currentSkill = skillsArray[i]
    		let itsModifier = skillModifierArray[i]
    		if (returnArrayBoolean(skillsArray[i], character.skillsProf) == true) {
    			character.skills[currentSkill] = +character.abilityScoreModifiers[itsModifier] + +character.profBonus
    		} else {
    			character.skills[currentSkill] = +character.abilityScoreModifiers[itsModifier]
    		}
    	}
  }
  
  // generate race drop-down
  function generateRaceDropdown () {
    var raceKeys = Object.keys(races); //[dragonborn, dwarf, ...]
    for (var i = 0; i < raceKeys.length; i++) {
      var key = raceKeys[i];
      var el = document.createElement('option');
      raceInputEl.appendChild(el);
      el.text = key;
      raceInputEl.appendChild(el);
    }
  }
  
  // generate subrace drop-down
  
  function generateSubraceDropdown () {
    subraceInputEl.innerHTML = ""; //wipe dropdown to prevent addition
    var subraceKeys = Object.keys(races[character.race].subrace);
    for (var i = 0; i < subraceKeys.length; i++) {
      var key = subraceKeys[i];
      var el = document.createElement('option');
      el.text = key;
      subraceInputEl.appendChild(el);
    }
  }
  
  
  // generate class drop-down
  function generateClassDropdown () {
    var classKeys = Object.keys(classes); //[barbarian, bard, ...]
    for (var i = 0; i < classKeys.length; i++) {
      var key = classKeys[i];
      var el = document.createElement('option');
      el.text = key;
      classInputEl.appendChild(el);
    }
  }
  
  // generate alignment drop-down
  function generateAlignmentDropdown () {
    for (var i = 0; i < alignment.length; i++) {
      var key = alignment[i];
      var el = document.createElement('option');
      el.text = key;
      alignmentInputEl.appendChild(el);
    }
  }
    //dynamically generated dropdowns
  
  function dwarfTool(){
    if (character.race == "Dwarf"){
      var dwarfToolInput = document.getElementById('dwarfTool');
      
      dwarfToolInput.addEventListener('change', function() {
        input.Character("toolsProf");
        output.Character("toolsProf");
      });
    }
  }
  function rockGnomeTool(){
  	if (character.race == "Gnome" && character.subrace == "Rock"){
  		input.Character("toolsProf")
  		output.Character("toolsProf")
  	}
  }
  function humanLanguage(){
  	if (character.race == "Human"){
  		let humanLanguageInput = document.getElementById('humanLanguage');
  		console.log(humanLanguageInput.value)

  		humanLanguageInput.addEventListener('input', function() {
  			let selected = humanLanguageInput.value
  			getLanguages();
  			character.languages = character.languages.slice(0,1)
  			character.languages.push(selected)
    		output.Character("languages");
      	});
  	}
  }
  
  
  //make arrays from inputs
  var getCharacterInput = document.querySelectorAll('.character-input'),
      getCharacterInputArray = [];
  
  function getCharacterInputs() {
    getCharacterInput = document.querySelectorAll('.character-input');
    getCharacterInputArray = [];
    getCharacterInput.forEach(function(el){
      getCharacterInputArray.push(el.dataset.inputname);
    });
  }

  //object and methods that links html inputs to "character" object
  var input ={
    
    // All: function() { //call this method to bind all dropdown values to character object
    //   getCharacterInputs();
    //   for (var i = 0; i < getCharacterInputArray.length; i++ ){ 
        
    //     var inputKey = getCharacterInput[i];
    //     var arrayKey = getCharacterInputArray[i];
    //     for (var key in character) {
    //       if (key == arrayKey) {
    //           character[key] = inputKey.selectedIndex !== undefined
    //           ? inputKey.options[inputKey.selectedIndex].text
    //           : inputKey.value;
              
    //       }
    //     }
    //   }
    // },
    Character: function(item) { //call this method to bind specific Input value to its key in character object
      getCharacterInputs();
      function pushSkill(elem) {
        elem.firstChild !== elem.options[elem.selectedIndex] //Don't input "None" to skillsProf
      ? character.skillsProf.push(elem.options[elem.selectedIndex].text)
      : null
      }
      for (var i = 0; i < getCharacterInputArray.length; i++ ){
        var inputKey = getCharacterInput[i];
        var arrayKey = getCharacterInputArray[i];
        if (arrayKey == item) {
          
          if (item == "rawAbilityScores") {

            var keys = Object.keys(character.rawAbilityScores); // ['strength', 'dexterity'...]
            for (let j = 0; j < keys.length; j++) {
              var key = keys[j]; // 'strength'
              character.rawAbilityScores[key] = +rawAbilityScoreInputs[j].value;
            }
          
          } else if (item == "skillsProf") {
            
            var skillDivSelect = document.querySelectorAll('#skillsProf select')
            var skillDiv = document.getElementById('skillsProf')
            character.skillsProf = []
            
            skillDivSelect.forEach(pushSkill)
          
            
          } else {
            character[arrayKey] = inputKey.selectedIndex !== undefined
          ? inputKey.options[inputKey.selectedIndex].text
          : inputKey.value;
          }
          
        }
      }
    },
    
  };
  
  //make arrays from outputs
  var getCharacterOutput = document.querySelectorAll('.character-output'),
      getCharacterOutputArray = [];
  function getCharacterOutputs() {
    getCharacterOutput = document.querySelectorAll('.character-output');
    getCharacterOutputArray = [];
    getCharacterOutput.forEach(function(el){
        getCharacterOutputArray.push(el.dataset.outputname);
    });
  }

  //object and methods that links "character" object keys to their outputs
  var output = {
    // All: function() { //call this method to output all character keys
    // getCharacterOutputs();
    //   for (var i = 0; i < getCharacterOutput.length; i++ ){
    //     var outputKey = getCharacterOutput[i];
    //     var arrayKey = getCharacterOutputArray[i];
    //     for (var key in character) {
    //       if (key == arrayKey) {
    //         outputKey.innerHTML = "";
    //         if (key == "raceTraits" || key == "subraceTraits"){
    //           if (character[key][0][0] !== "None") {
    //             for (var j = 0; j < character[key].length; j++ ){
    //               var traitValue = character[key][j];
    //               var span = document.createElement('span');
    //               span.innerHTML = ": " + traitValue[1];
    //               var li = document.createElement('li');
    //               li.innerHTML = traitValue[0];
    //               li.appendChild(span);
    //               outputKey.appendChild(li);
    //               // traitValue[2] !== undefined ? traitValue[2]() : "";
    //             }
    //           } else {
    //             outputKey.innerHTML = "";
    //           }
    //         } else {
    //           debugger
    //           outputKey.innerHTML = character[key];
    //         }
    //       }
    //     }
    //   }
    // },
    Character: function(item) { //call this method to output specific character keys
    getCharacterOutputs();
      for (var i = 0; i < getCharacterOutput.length; i++ ){
        var outputKey = getCharacterOutput[i];
        var arrayKey = getCharacterOutputArray[i];
        
        if (arrayKey == item) {
          
          //Complex list outputs
          if (item == "raceTraits" || item == "subraceTraits") {
            outputKey.innerHTML = "";
            if (character[item][0][0] !== "None") {
              for (let j = 0; j < character[item].length; j++ ){
                let traitValue = character[item][j];
                let span = document.createElement('span');
                span.innerHTML = ": " + traitValue[1];
                let li = document.createElement('li');
                li.innerHTML = traitValue[0];
                li.appendChild(span);
                outputKey.appendChild(li);
                // traitValue[2] !== undefined ? traitValue[2]() : "";
              }
            } else {
              outputKey.innerHTML = "";
            }
          } else if (item == "languages" || item == "weaponProf" || item == "armorProf") {
            outputKey.innerHTML = "";
            outputKey.innerHTML = toSentence(character[item]);
            // for (var k = 0; k < character[item].length; k++ ){
            //   var langValue = character[item][k];
            //   var li2 = document.createElement('li');
            //   var tempArray = []
            //   li2.innerHTML = langValue;
            //   tempArray.push(li2);
              
            // }
          //Simple data outputs
          } else if (item == "abilityScores") {
            let abilityScoreOutputs = document.querySelectorAll('.abilityOutput');
            let abilityModifierOutputs = document.querySelectorAll('.modifierOutput'); 
            let keys = Object.keys(character.abilityScores); // ['strength', 'dexterity'...]
            
            for (let j = 0; j < keys.length; j++) {
              let key = keys[j];
              abilityScoreOutputs[j].innerText = character.abilityScores[key];
              //and modifiers
              abilityModifierOutputs[j].innerText = character.abilityScoreModifiers[key];
            }
          } else if (item == "skills") {
          	let skillsOutput = document.querySelectorAll('.skillsOutput')
          	let keys = Object.keys(character.skills)
          	for (let j = 0; j < keys.length; j++ ){
          		let key = keys[j];
          		skillsOutput[j].innerText = character.skills[key]
          	} 

          } else if (item == "savingThrows") {
            outputKey.innerHTML = "";
            let keys = Object.keys(character.abilityScores); // ['strength', 'dexterity'...]
            for (let j = 0; j < keys.length; j++ ){
              let key = keys[j];
              let traitValue = character[item][key];
              let span = document.createElement('span');
              let li = document.createElement('li');
              
              span.innerHTML = key;
              
              li.innerHTML =  character[item][key]+": "
              li.appendChild(span);
              outputKey.appendChild(li);
              // traitValue[2] !== undefined ? traitValue[2]() : "";
            }
          } else {
            outputKey.innerHTML = "";
            outputKey.innerHTML = character[arrayKey];
          }
        }
      }
    }
  };
  
  

  //clicking xp button
  xpButton.addEventListener('click', function() {
    input.Character("xp");
    character.level = getLevelFromXp(character.xp);
    character.profBonus = getProfBonusFromLevel(character.level);
    output.Character("level");
    output.Character("xp");
    output.Character("profBonus");
    calls();
  });
  
  //clicking level button
  levelButton.addEventListener('click', function() {
    input.Character("level");
    character.xp = getXpFromLevel(character.level);
    character.profBonus = getProfBonusFromLevel(character.level);
    output.Character("level");
    output.Character("xp");
    output.Character("profBonus");
    calls();
  });
  
  //selecting class
  classInputEl.addEventListener('change', function() {
    input.Character("class");
    output.Character("class");
    getSavingThrows();
    output.Character("savingThrows")
    generateSkillDropdown()
    input.Character("skillsProf");
    getSkills();
    output.Character("skills");
    calls();
  }, false);
 
 
  //selecting race
  raceInputEl.addEventListener('change', function() {
    input.Character("race");
    generateSubraceDropdown();
    input.Character("subrace");
    input.Character("rawAbilityScores")
    getCharacterAbilityScores();
    output.Character("abilityScores")
    // getSize();
    // getSpeed();
    // getLanguages();
    
    getRaceTraits();
    // getSubraceTraits();
    output.Character("race");
    output.Character("subrace");
    // output.Character("size");
    // output.Character("speed");
    // output.Character("languages");
    output.Character("raceTraits");
    // output.Character("subraceTraits");
    calls();
  }, false);
  
  //selecting subrace
  subraceInputEl.addEventListener('change', function() {
    input.Character("subrace");
    input.Character("rawAbilityScores")
    getCharacterAbilityScores();
    output.Character("abilityScores")
    // getSubraceTraits();
    output.Character("subrace");
    // output.Character("subraceTraits");
    // output.Character("maxHp");
    calls();
  }, false);
  
  //selecting alignment
  alignmentInputEl.addEventListener('change', function() {
    input.Character("alignment");
    output.Character("alignment");
    calls();
  }, false);
  
  //press on ability score button
  abilityScoreButton.addEventListener('click', function() {
    input.Character("rawAbilityScores")
    getCharacterAbilityScores();
    output.Character("abilityScores")
    getSavingThrows();
    output.Character("savingThrows")
    getSkills();
    output.Character("skills")
    
    // outputAbilityScores();
    // outputAbilityModifiers();
    calls();
  });
  

 
  
  function calls() {
    getInitiative()
    output.Character("initiative")
    getSize();
    output.Character("size");
    getSpeed();
    output.Character("speed");
    
    getLanguages();
    humanLanguage();
    output.Character("languages");
    getSubraceTraits();
    output.Character("subraceTraits");
    getHitDice();
    output.Character("hitDice");
    getMaxHp();
    output.Character("maxHp");
    dwarfTool();
    
    weaponProf();
    output.Character("weaponProf")
    armorProf();
    output.Character("armorProf")
    getPassivePerception()
    output.Character("passivePerception")


    
  }


//load order

  generateRaceDropdown();
  generateSubraceDropdown();
  generateClassDropdown();
  generateAlignmentDropdown();
  // input.All();
  getCharacterAbilityScores();
  // outputAbilityScores ();
  // output.All();

}