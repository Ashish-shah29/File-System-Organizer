#!/usr/bin/env node
const { dir } = require('console');
let fs = require('fs');
let path = require('path');
let helpObj = require('./commands/help')
let treeObj = require('./commands/tree')
let organizeObj = require('./commands/organize')
let inputArr = process.argv.slice(2);
console.log(inputArr)

// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help 


let command = inputArr[0];
switch(command){
    case "tree" : 
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help" :
        helpObj.helpkey();
        break;
    default:
        console.log("Please Input Rgiht Command")
        break;
}



