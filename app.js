console.log('Inicio de Juego');

document.addEventListener('keydown', function(evento){
 
    if(evento.keyCode == 38 ){
        navePlayer.vy = navePlayer.salto;
        navePlayer.y -= navePlayer.vy;
    }
    if(evento.keyCode == 40){
        navePlayer.vy = navePlayer.salto;
        navePlayer.y += navePlayer.vy;
    }
    if(evento.keyCode == 13){
        imagenCorrecta();
    }

    verificar();
    
});




function detenerJuego(muerto){
    nivel.velocidad = 0;
    nivel.muerto = muerto;
    nivel.niveles = 1;
    imgPregunta1.x = ancho + 100;
    nivel.puntuacion = 0;
}


let imgNave, imgCactus, imgFondo;
let imgSelect1, imgSelect2, imgSelect3;
let imgSelect4, imgSelect5, imgSelect6;
let imgSelect7, imgSelect8, imgSelect9;

function cargarImagenes(){
    imgNave = new Image();
    imgCactus = new Image();
    imgFondo = new Image();

    imgSelect1 = new Image();
    imgSelect2 = new Image();
    imgSelect3 = new Image();
    imgSelect4 = new Image();
    imgSelect5 = new Image();
    imgSelect6 = new Image();
    imgSelect7 = new Image();
    imgSelect8 = new Image();
    imgSelect9 = new Image();

    imgSelectFoto = new Image();
    imgSelectFotoAll = new Image();
    imgSelectFotoError = new Image();

    imgNave.src ='img/nave.png';
    imgCactus.src ='img/cactus.png';
    imgFondo.src ='img/fondo.jpg';

    imgSelect1.src ='img/feto.png';
    imgSelect2.src ='img/asalto.png';
    imgSelect3.src ='img/bullying.png';

    imgSelect4.src ='img/ninaspeleando.png';
    imgSelect5.src ='img/reconciliacion.png';
    imgSelect6.src ='img/suicida.png';

    imgSelect7.src ='img/tapabocas.png';
    imgSelect8.src ='img/peleando.png';
    imgSelect9.src ='img/dulce.png';

    imgSelectFoto.src ='img/selectfoto.png';
    imgSelectFotoAll.src ='img/selectfotoall.png';
    imgSelectFotoError.src ='img/selectfoto-error.png';
}

let ancho = 900;
let alto = 600;
let canvas,ctx;
let naveImg = '';

function inicializa(){
 canvas = document.getElementById('canvas');
 ctx = canvas.getContext('2d');
 cargarImagenes();
 naveImg = imgNave;
 imgSelectTrue1 = imgSelectFotoAll;
 imgSelectTrue2 = imgSelectFotoAll;
 imgSelectTrue3 = imgSelectFotoAll;
 imgSelect1c = imgSelect1;
 imgSelect2c = imgSelect2;
 imgSelect3c = imgSelect3;
}

function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}


///////////////////////////////////////////////////////////////


let suelo = 600;


///////////////////////////////////////////////////////////////


let imgPregunta1 = {
    x: ancho + 200,
    y: suelo - 600
}
let imgPregunta2 = {
    x: ancho + 200,
    y: suelo - 400
}
let imgPregunta3 = {
    x: ancho + 200,
    y: suelo - 200
}

function dibujaImg1(imgTrue, imgChanged){
    ctx.drawImage(imgChanged,0,0,270,200,imgPregunta1.x,imgPregunta1.y,270,200);
    ctx.drawImage(imgTrue,0,0,270,200,imgPregunta1.x,imgPregunta1.y,270,200);
}
function dibujaImg2(imgTrue, imgChanged){
    ctx.drawImage(imgChanged,0,0,270,200,imgPregunta2.x,imgPregunta2.y,270,200);
    ctx.drawImage(imgTrue,0,0,270,200,imgPregunta2.x,imgPregunta2.y,270,200);
}
function dibujaImg3(imgTrue, imgChanged){
    ctx.drawImage(imgChanged,0,0,270,200,imgPregunta3.x,imgPregunta3.y,270,200);
    ctx.drawImage(imgTrue,0,0,270,200,imgPregunta3.x,imgPregunta3.y,270,200);
}

function logicaImagenes(){
    if (imgPregunta1.x < -100) {
        imgPregunta1.x = ancho +100;
        imgPregunta2.x = ancho +100;
        imgPregunta3.x = ancho +100;
        // nivel.puntuacion ++;
    }
    else{
        imgPregunta1.x -= nivel.velocidad*2;
        imgPregunta2.x -= nivel.velocidad*2;
        imgPregunta3.x -= nivel.velocidad*2;
    }
}

///////////////////////////////////////////////////////////////


let suelog = {
    x: 0,
    y: 0
}

function dibujaFondo(){
    ctx.drawImage(imgFondo,suelog.x,0,2000,600,0,suelog.y,2000,600);
}

function logicaFondo(){
    if(suelog.x > 2000) {
        suelog.x = 0;
    }
    else{
        suelog.x += nivel.velocidad;
    }
}

///////////////////////////////////////////////////////////////


let navePlayer = {
    y:  (suelo/2)-50,
    vy: 0,
    gravedad: 2,
    salto: 30,
    vymax: 9,
    saltando: false
};

function dibujaNave(naveImg){ 
    ctx.drawImage(naveImg,0,0,150,94,50,navePlayer.y,150,94);
}


function niveles(){

    switch (nivel.puntuacion) {
        case 5: nivel.velocidad = 11;
        nivel.niveles = 2;
        break;

        case 10: nivel.velocidad = 13;
        nivel.niveles = 3;
        break;
        
        case 15: nivel.velocidad = 15;
        nivel.niveles = 4;
        break;

        case 20: nivel.velocidad = 17;
        nivel.niveles = 5;
        break;

        case 25: nivel.velocidad = 19;
        nivel.niveles = 6;
        break;

        case 30: 
        nivel.niveles = 7;

        break;
    
        default: 
        break;
    }

    ctx.font = "30px impact";
    ctx.fillStyle = "#fff";
    ctx.fillText("Nivel: "+nivel.niveles,50,50);

}

///////////////////////////////////////////////////////////////


let nivel = {
    velocidad: 9,
    puntuacion: 0,
    niveles: 1,
    muerto: false
}

function colision(){
    if (imgPregunta1.x >= 150 && imgPregunta1.x <= 210) {
        nivel.velocidad = 0;
        if (navePlayer.y > suelo-250) {
            imgSelectTrue1 = imgSelectFotoAll;
            imgSelectTrue2 = imgSelectFotoAll;
            if(imgSelectTrue3!==imgSelectFotoError ){imgSelectTrue3 = imgSelectFoto;}
        }else if (navePlayer.y < suelo-250 && navePlayer.y > suelo-450) {
            imgSelectTrue1 = imgSelectFotoAll;
            imgSelectTrue3 = imgSelectFotoAll;
            if(imgSelectTrue2!==imgSelectFotoError ){imgSelectTrue2 = imgSelectFoto;}
        }else if (navePlayer.y <= suelo-450 && navePlayer.y >= suelo-600) {
            imgSelectTrue2 = imgSelectFotoAll;
            imgSelectTrue3 = imgSelectFotoAll;
            if(imgSelectTrue1!==imgSelectFotoError ){imgSelectTrue1 = imgSelectFoto;}
        }else{
            imgSelectTrue1 = imgSelectFotoAll;
            imgSelectTrue2 = imgSelectFotoAll
            imgSelectTrue3 = imgSelectFotoAll
        }
    }
}

function inicializarNuevo(){
    nivel.puntuacion++;
    nivel.velocidad = 9;
    imgPregunta1.x = ancho +100;
    imgPregunta2.x = ancho +100;
    imgPregunta3.x = ancho +100;

    imgSelectTrue1 = imgSelectFotoAll;
    imgSelectTrue2 = imgSelectFotoAll
    imgSelectTrue3 = imgSelectFotoAll

    if(nivel.puntuacion===1){
        imgSelect1 = imgSelect4;
        imgSelect2 = imgSelect5;
        imgSelect3 = imgSelect6;
    }
    if(nivel.puntuacion===2){
        imgSelect1 = imgSelect7;
        imgSelect2 = imgSelect8;
        imgSelect3 = imgSelect9;
    }

}


function imagenCorrecta(){
   
    if(nivel.puntuacion===0){
        if(imgSelectTrue1===imgSelectFoto){
            inicializarNuevo();
        }else{
            if(imgSelectTrue2===imgSelectFoto ){
                imgSelectTrue2=imgSelectFotoError;
            }else{
                imgSelectTrue3=imgSelectFotoError;
            }
        }
        
    }else if(nivel.puntuacion===1){
        if(imgSelectTrue2===imgSelectFoto){
            inicializarNuevo();
        }else{
            if(imgSelectTrue1===imgSelectFoto ){
                imgSelectTrue1=imgSelectFotoError;
            }else{
                imgSelectTrue3=imgSelectFotoError;
            }
        }
    }else if (nivel.puntuacion===2){
        if(imgSelectTrue1===imgSelectFoto){
            inicializarNuevo();
        }else{
            if(imgSelectTrue2===imgSelectFoto ){
                imgSelectTrue2=imgSelectFotoError;
            }else{
                imgSelectTrue3=imgSelectFotoError;
            }
        }
    }

 

}

function verificar(){
    // navePlayer.saltando = true;
    if((navePlayer.y - navePlayer.vy) >= suelo-80){
        navePlayer.y = suelo-80;
    }
    if( (navePlayer.y - navePlayer.vy) < 0){
        navePlayer.y = 0;
    }
}



function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = "#fff";
    ctx.fillText("Puntos: "+nivel.puntuacion,700,50);

    if(nivel.muerto === true ){
        detenerJuego(true);
        ctx.font = "60px impact";
        ctx.fillText('GAME OVER',240,200);
    }


    if(nivel.puntuacion === 3){
        // detenerJuego(false);
        nivel.velocidad = 0;
        ctx.font = "60px impact";
        ctx.fillText('GANASTES',300,300);
        nivel.niveles = 7;
    }
}

///////////////////////////////////////////////////////////////

//Bucle principal
let FPS = 50;
//Cada cuanto tiempo tiene que ejecutarse una funcion
setInterval(function(){
    principal();
},1000/FPS); //  veces por segundo


function principal(){
    borraCanvas();

    logicaFondo();
    dibujaFondo();

    logicaImagenes();
    dibujaImg1(imgSelectTrue1, imgSelect1);
    dibujaImg2(imgSelectTrue2, imgSelect2);
    dibujaImg3(imgSelectTrue3, imgSelect3);

    dibujaNave(naveImg);

    colision();
    puntuacion();

    niveles();
    
    console.log("Principal");
}