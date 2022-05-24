let helpFunc= require("./commands/help");
let orgFunc= require("./commands/organize");
let treeFunc= require("./commands/tree");

let inputArr= process.argv.slice(2);

let command= inputArr[0];
let path= inputArr[1];

switch (command) {
    case "tree" :
        treeFunc.tree(path);
        break;

    case "organize" :
        orgFunc.organize(path);
        break;   
            
    case "help":
        helpFunc.help();
        break;  

    case "default":
        console.log("command not recognized:/");
        break;
}