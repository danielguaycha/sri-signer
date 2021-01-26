const exec = require('child_process').exec;
const path = require('path');
const JAR = path.join(__dirname, 'src', 'DetzSigner.jar');

function signXML(XMLFile, P12File, PWP12, OUTPUTXML='firmado') {
    return new Promise((resolve) => {
        const command = `java -jar ${JAR} ${XMLFile} ${P12File} ${PWP12} ${OUTPUTXML}`;
        exec(command, function(err, result, stderr){
            if(err  || stderr) {
                resolve(result, false);
            }
            resolve(result, true);
        });        
    });
}

module.exports = {
    signXML
}