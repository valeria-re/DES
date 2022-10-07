function cifrar(){
    let txt = document.getElementById("txt").value;
    let clave = document.getElementById("clave").value;
    if(clave.length != 8){
        alert("La clave debe tener 8 caracteres");
        return false;
    }

    let cifra =  CryptoJS.DES.encrypt(txt,clave);
    
    descargarArchivo(generarTexto(cifra), 'TextoCifrado'+Math.random()+'.txt');
}

function descifrar(){
    let cifrado = document.getElementById("txt").value;
    let clave = document.getElementById("clave").value;
    if(clave.length != 8){
        alert("La clave debe tener  8 caracteres");
        return false;
    }

    let descifra = CryptoJS.DES.decrypt(cifrado,clave);
    descifrafinal = descifra.toString(CryptoJS.enc.Utf8);
    descargarArchivo(generarTexto(descifrafinal), 'TextoDescifrado'+Math.random()+'.txt');  
}


function leer(){
    let archivo = document.getElementById("archivo").files[0];
    let archivoinput = document.getElementById("archivo"); 
    let archivoRuta = archivoinput.value;
    var extPer = /(.txt)$/i;

    if(!extPer.exec(archivoRuta)){
        alert("El archivo debe ser de tipo  .txt");
        archivoinput.value='';
        return false;
    }
    else{
        let reader = new FileReader();
        reader.onload = function(fileLoadedEvent){
            let txt = fileLoadedEvent.target.result;
            document.getElementById("txt").value = txt;
        };

        reader.readAsText(archivo, "UTF-8");

        if(archivoinput.files && archivoinput.files[0]){
            var visor = new FileReader();
            visor.onload=function(e){
                document.getElementById('visualizar').innerHTML= 
                '<center><embed src="'+e.target.result+'" width="500" height="100"><center>';
            };
            visor.readAsDataURL(archivoinput.files[0]);
        }
    }
}


function descargarArchivo(contBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var save = document.createElement('a');
      save.href = event.target.result;
      save.target = '_blank';
      save.download = nombreArchivo;
      var clicEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      save.dispatchEvent(clicEvent);
      
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contBlob);
    alert("Se descargara el archivo");
};


function generarTexto(datos) {
    let texto = [];
    texto.push(datos);
    return new Blob(texto, {
        type: 'text/plain'
    });
};