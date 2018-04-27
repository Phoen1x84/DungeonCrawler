/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// create hero constructor\r\nvar createCharacter = function(name, health, strength) {\r\n    this.name = name || generateName();\r\n    this.health = health || 10;\r\n    this.strength = strength || 10;\r\n};\r\n\r\n// name generator\r\nvar generateName = function() {\r\n    var names = [\r\n        'Odin',\r\n        'Thor',\r\n        'Sniffles',\r\n        'Kitopants'\r\n    ];\r\n    return names[Math.floor(Math.random() * names.length)];\r\n};\r\n\r\n// hero attack\r\nvar attackValue = function(character) {\r\n    if (character != undefined) {\r\n        var atkMaxDmg = Math.max(character.strength);\r\n        var atkDmg = Math.round(Math.random() * character.strength);\r\n\r\n        if (atkDmg == atkMaxDmg) {\r\n            // critical attack does extra damage\r\n            return atkDmg;\r\n        } else {\r\n            // basic attack damage lowest number to highest number - 1\r\n            return atkDmg + 5;\r\n        }\r\n    } else {\r\n        throw 'hero is undefined or has not been created.';\r\n    }\r\n};\r\n\r\n// calculate hits\r\nvar calcHits = function(character, attackValue) {\r\n\r\n  if (character && attackValue) {\r\n    return character.health = character.health - attackValue;\r\n  }\r\n  else {\r\n    throw 'character argument is ' + character + ' and attack value is ' + attackValue;\r\n  }\r\n};\r\n\r\n// character health check\r\nvar checkHealth = function(character) {\r\n  if (character.health <= 0) {\r\n    alert(character.name + ' is dead, try again');\r\n  }\r\n};\r\n\r\n// hero inventory\r\n\r\n// level up\r\nvar levelUp = function(character) {\r\n    if (character) {\r\n        debugger;\r\n        return character.strength += 10;\r\n    }\r\n};\r\n\r\n\r\n\r\n// global hero namespace\r\nvar hero;\r\nvar heroCreateEvent = document.getElementById('create-hero');\r\n\r\nvar monster = new createCharacter('monster');\r\n\r\nheroCreateEvent.addEventListener('click', function() {\r\n    if (hero == null || hero == undefined) {\r\n        hero = new createCharacter();\r\n        // console.log('Your hero name is ' + hero.name,\r\n        //               'your attack damage is ' + hero.strength,\r\n        //                 'your health is ' + hero.health);\r\n        console.log('name: ' + hero.name);\r\n        console.log('health: ' + hero.health);\r\n        console.log('strength: ' + hero.strength);\r\n    }\r\n});\r\n\r\n// attack events\r\nvar attackEvent = document.getElementById('hero-attack');\r\n\r\nattackEvent.addEventListener('click', function() {\r\n\r\n    // hero will always attack first calculate the monster health first\r\n    // then carry out the monster attack\r\n    var heroAttack = attackValue(hero);\r\n    var monsterAttack = attackValue(monster);\r\n\r\n    if (monster.health > 0) {\r\n      // hero attacks the monster first\r\n      calcHits(monster, heroAttack);\r\n      checkHealth(monster);\r\n    }\r\n    if (hero.health > 0 && monster.health > 0) {\r\n      // if the monster is not dead the monster attacks the hero\r\n      calcHits(hero, monsterAttack);\r\n      checkHealth(hero);\r\n    }\r\n\r\n    console.log('hero attack ' + heroAttack);\r\n    console.log('monster attack ' + monsterAttack);\r\n\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });