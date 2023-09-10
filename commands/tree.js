function treefn(dirPath) {

    if(dirPath == undefined){
        treeHelper(process.cwd(),"")
        return;
    } 
    else {
        let doesExist = fs.existsSync(dirPath)

        if(doesExist){
          treeHelper(dirPath,"")
         
        }
        else{
            console.log("Kindly enter the correct path")
            return;
        }
    }
}
function treeHelper(dirPath,indent){
    // is file or folder
    let isFile = fs.lstatSync(dirPath).isFile()
    if(isFile){
        let fileName = path.basename(dirPath)
        console.log(indent+"|----"+fileName)
    }
    else{
        let dirName = path.basename(dirPath)
        console.log(indent+"|____"+dirName)
        let childNames = fs.readdirSync(dirPath)
        for(let i =0;i<childNames.length;i++){
            let childPath = path.join(dirPath,childNames[i]);
            treeHelper(childPath,indent+"\t")
        }
    }
}
module.exports = {
    treeKey : treefn
}