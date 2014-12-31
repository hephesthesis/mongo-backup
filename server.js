/**
 * Created by Sundar on 29/12/14.
 */

var sys = require('sys');
var fs = require('node-fs');
var date=new Date().getDate();
var month=new Date().getMonth();
var year=new Date().getFullYear();
var output='/home/ard008/mongoDump/';
sys.exec('mongodump --db test --out '+output+year + '-' + month + '-' + date, function (err, res) {
    //console.log(res)
    console.log('Dump taken on '+ year+'-'+month+'-'+date)
    fs.readdir('DumpMaster',function(error,files){
        //console.log(files);
        files.forEach(function(file){
            //console.log(file);
            if(file.match(date-7)){
                deleteFolderRecursive('./DumpMaster/'+file);
            }
        })
    })
});

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

//require('/home/ard008/Sundar/NodeWS/PDF/mongoDump')
