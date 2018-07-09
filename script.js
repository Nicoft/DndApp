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








var initialAbilityScore = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};






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