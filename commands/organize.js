let fs = require('fs')
let path = require('path')

let types = {
    media : ["mp4","mkv",'jpg','png','jpeg'],
    archives :['zip','csv','html','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','xls','odt','txt','ps','ods','odg'],
    app : ['exe','sql','dmg','pkg','deb']
}

function organizefn(dirPath){
    let destPath;
    // 1. input -> directory path given
    // if(dirPath == undefined){
    //     destPath = process.cwd();
    //     return;
    // } 
    (dirPath==undefined)?dirPath=process.cwd():dirPath;
    // else {
        let doesExist = fs.existsSync(dirPath)

        if(doesExist){
          // 2. create -> organized_files -> directory
           destPath = path.join(dirPath,"organized_files");
          if(!fs.existsSync(destPath)){
            fs.mkdirSync(destPath);
          }
        }
        else{
            console.log("Kindly enter the correct path")
            return;
        }
    organizeHelper(dirPath,destPath);

}
function organizeHelper(src,dest){
    let childNames = fs.readdirSync(src);
    // console.log(childNames)
    // 3. identify categories of all the files present in that input directory

    for(let i = 0;i<childNames.length;i++){

        let childAddress = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile()

        if(isFile){
            let category = getcategory(childNames[i])
            console.log(childNames[i]," belongs to --> ",category)
    // 4.copy/cut files to that organized directory inside any of category folder
            sendFiles(childAddress,dest,category)
        }
    }
}
function getcategory(name){
   let ext = path.extname(name)
   ext = ext.slice(1)
   for(let type in types){
    let cTypeArr = types[type]
    for(let i =0;i<cTypeArr.length;i++){
        if(cTypeArr[i] == ext){
            return type;
        }
    }
   }
   return "others";
}
function sendFiles(srcFilePath,dest,category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath)
    }
    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(categoryPath,fileName)
    fs.copyFileSync(srcFilePath,destFilePath);
    console.log(fileName, " is copied to ",category)
}
module.exports = {
    organizeKey : organizefn
}