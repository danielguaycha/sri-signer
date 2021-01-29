# SRI-SIGNER

SriSigner permite firmar comprobantes electrónicos usando como base las librerías de **Java** para el estándar `XADES-BES `  provistas por el SRI, es decir es una implementación **híbrida** entre NodeJs y Java, por ende esta paquete requiere de la instalación de esta tecnología del lado del servidor.

## Instalación

```bash
npm install sri-signer
# o
yarn add sri-sginer
```

## Uso

```javascript
const signer = require('sri-signer');

(async function () {
    try {
        const rs = await signXML(
            'src/files/file.xml',
            'src/files/sign.p12',
            'passwordP12',
            'src/files/sign'
        );
        console.log(rs);
    } catch (err) {
        console.log(err);
    }
})();
```
o
```javascript
(function () {
    signXML(
        'src/files/file.xml',
        'src/files/sign.p12', 
        'passwordP12', 
        'src/files/sign'
    ).then((result) => {
         console.log(result);
     }).catch(err => {
         console.log(err);
     });
})();
```

## Parámetros

La función `signXML` tiene como base los siguientes parámetros 

| Parámetro   | Descripción                                                  | Requerido |
| ----------- | ------------------------------------------------------------ | --------- |
| `XMLFile`   | `String`: Especifica la ruta del archivo XML que se desea firmar, siguiendo la estructura valida expedida por el SRI | SI        |
| `P12File`   | `String `: Comprende la ruta del archivo en formato `.p12` emitido por la entidad certificante | SI        |
| `PWP12`     | `String`: Hace referencia a la contraseña expedida por entidad certificante | SI        |
| `OutPutXML` | `String`: La ruta de salida del archivo firmado, `default =''` | NO        |

Se recomienda validar la firma y su respectiva clave como el [Facturador Gratuito](https://www.sri.gob.ec/web/guest/herramienta-de-comprobantes-electronicos) expedido por el SRI , con el fin de evitar conflictos en contraseña y archivo .p12.  

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)