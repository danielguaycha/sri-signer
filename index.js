const exec = require('child_process').exec;
const JAR = `src/DetzSigner.jar`;

function signXML(XMLFile, P12File, PWP12, OUTPUTXML='firmado') {
    return new Promise((resolve, rejects) => {
        // comando para realizar el firmado
        const command = `java -jar ${JAR} ${XMLFile} ${P12File} ${PWP12} ${OUTPUTXML}`;
        // ejecución del comando de java para realizar el firmado
        exec(command, function(err, result, stderr){
            if(err  || stderr) {
                resolve(result, false);
            }
            resolve(result, true);
        });        
    });
}

//signXML(`src/files/fact.xml`, `src/files/sign.p12`, `Pau110381ce`, 'src/files/firmado');

module.exports = {
    signXML
}