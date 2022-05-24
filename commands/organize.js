const fs=require("fs");
const path=require("path");
let types={
    media:["mp4", "mkv", "mp3", "mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg']
}

function organize(srcPath){
    if(srcPath==undefined){

        srcPath=process.cwd();
    }

    let organizedFiles=path.join(srcPath,"organized_files");
    if(fs.existsSync(organizedFiles)==false){
        fs.mkdirSync(organizedFiles);
    }else{
        console.log("folder already exits");
    }

    let allFiles=fs.readdirSync(srcPath);

    for(let i=0; i<allFiles.length; i++){

        let fullPathOfFile=path.join(srcPath,allFiles[i]);
        console.log(fullPathOfFile);

        let isThisAFile = fs.lstatSync(fullPathOfFile).isFile();
        console.log(allFiles[i] + " is " + isThisAFile);

        if(isThisAFile){
            let ext= path.extname(allFiles[i]).split(".")[1];

            let folderName= getFolderName(ext);

            copyFileToDest(srcPath, fullPathOfFile, folderName);
        }
    }

}

function getFolderName(ext){
    for(let key in types){
        for(let i=0; i< types[key].length; i++){
            if(types[key][i]==ext){
                return key;
            }
        }
    }
    return "miscellaneous"
}

function copyFileToDest(srcPath, fullPathOfFile, folderName){
    let destFolderPath= path.join(srcPath, "organized_files", folderName);

    if(!fs.existsSync(destFolderPath)){
        fs.mkdirSync(destFolderPath);
    }

    let fileName= path.basename(fullPathOfFile);
    let destFileName= path.join(destFolderPath, fileName);

    fs.copyFileSync(fullPathOfFile, destFileName);

}

module.exports= {
    organize:organize
}