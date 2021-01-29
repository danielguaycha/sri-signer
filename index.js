const fs = require('fs')
const exec = require('child_process').exec;
const path = require('path');
const JAR = path.join(__dirname, 'src', 'DetzSigner.jar');

// signXML form file
function signXML(XMLFile, P12File, PWP12, OutputXML='signed') {
    return new Promise((resolve, reject) => {

        //fileexist
        if(!existsFile(XMLFile)) reject('XML file not found ', XMLFile);
        if(!existsFile(P12File)) reject('.P12 file not found');

        // comamnd
        const command = `java -jar ${JAR} ${XMLFile} ${P12File} ${PWP12} ${OutputXML}`;
        exec(command, function(err, result, stderr){

            if(err) { reject(getMessages(err).msg);}
            if(stderr) {reject(getMessages(stderr).msg);}

            const rs = getMessages(result);
            if(rs.ok)
                resolve(rs.msg);
            else
                reject(rs.msg)
        });        
    });
}

// comprobate file exists
function existsFile(filePath) {
    if(!filePath) {
        return false;
    }
    if (fs.existsSync(filePath)) {
        return true;
    } else {
        return false;
    }
}

// get messages from jarva execution
function getMessages(result) {
    if(!result) return 'Unknow message';
    const rs = result.toString().trim().split('\n');
    if(rs.length <= 0) {
        return 'Not message';
    }
    let msgObj = rs[0].split('=');
    let msg = '';
    let type = '';
    if(msgObj) {
        type = msgObj[0];
        msg = msgObj[1].replace('\t', '').replace('\r', '');
    } else {
        msg = rs;
    }

    switch(type.toString().toLowerCase()) {
        case 'error':
            return {ok: false, msg};
        case 'ok':
            return {ok: true, msg}
        default:
            return {ok: false, msg}
    }
}

module.exports = {
    signXML
}