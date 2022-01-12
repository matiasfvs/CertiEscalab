'use strinct'

const ROCK = 0
const PAPER = 1
const SCISSORS = 2 

const imgRock ="rock"
const imgPaper ="paper"
const imgScissors ="scissors"

let puntaje = 0
const juegoTerminado = 10
let countsGames = 0
let totalScore = 0
let parcialResult = 0

let valuesHist= []
console.log(valuesHist,"valuesHist iniciado")


const rockBtn = document.getElementById("rock")
const paperBtn = document.getElementById("paper")
const scissorsBtn = document.getElementById("scissors")
const desactiveLogin = document.getElementById("login")
const activateGame = document.getElementById("game")
const buttonLogin = document.getElementById("init")
const user = document.getElementById("user")
const password = document.getElementById("pass")
const machineImg = document.getElementById("machine-img")
const userImg = document.getElementById("user-img")
const resultText = document.getElementById("start-text")
const parcialText = document.getElementById("parcial-text")
const sesionOut = document.getElementById("sesion")

activateGame.style.display="none"

buttonLogin.addEventListener("click", ()=>{
if(user.value==="admin" && password.value ==="123"){
    alert("Bienvenido puedes jugar!")
    desactiveLogin.style.display = "none"
    activateGame.style.display="block"
}else if (user.value==="" || password.value ===""){
    alert("Debe completar todos los campos")
}else{
    alert("Ingrese Usuario o Contraseña correcto")

}//termina if
})


rockBtn.addEventListener("click", ()=>{
    juego(ROCK,imgRock)
    countsGames = countsGames+1
})

paperBtn.addEventListener("click",()=>{
    juego(PAPER,imgPaper)
    countsGames = countsGames+1
})

scissorsBtn.addEventListener("click",()=>{
    juego(SCISSORS,imgScissors)
    countsGames = countsGames+1
})

sesionOut.addEventListener("click",()=>{
    exit()
})

// verifico si hay informacion en el storage en caso de que devuelva nulo, usa el espacio en memoria con storageHist
if(JSON.parse(localStorage.getItem("storageHist"))!==null){
    valuesHist=JSON.parse(localStorage.getItem("storageHist")) //--> inicializo valuesHist para mantener valores de storage
}//-> termina if

resultText.innerHTML = "Resultados Historicos: "+JSON.stringify(valuesHist) //--> inicializa los resultados

// esta funcion pushea el arreglo y va limpiando a medida que se va llenando
function addPila(valor){
    valuesHist.push(valor)

    if(valuesHist.length>5){
        valuesHist.shift()
    }//-> termina if

    localStorage.setItem("storageHist",JSON.stringify(valuesHist))
    valuesHist=JSON.parse(localStorage.getItem("storageHist"))
}

// aqui se encuentra la funcion logica del juego y controla la cantidad de juegos que se realizan
function result(userOption){

const iaOption = Math.floor(Math.random()*3)

if(iaOption === 0){
    machineImg.src = "img/" + imgRock + ".svg";
}else if(iaOption===1){
    machineImg.src = "img/" + imgPaper + ".svg";
}else{
    machineImg.src = "img/" + imgScissors + ".svg";
}//-> Termina if

sumResult(userOption,iaOption)
}

function sumResult(userOption,iaOption){
    // Calculo de totales segun resultado matematico
if(userOption === iaOption)
{
    console.log("Empate")
}else if(userOption===ROCK){
    if(iaOption === PAPER){console.log("Perdiste"); totalScore = totalScore -30}
    if(iaOption === SCISSORS){console.log("Ganaste"); totalScore = totalScore +100 }

}else if(userOption === PAPER){
    if(iaOption === ROCK) {console.log("Ganaste"); totalScore = totalScore+100}
    if(iaOption === SCISSORS) {console.log("Perdiste"); totalScore = totalScore -30}

}else if(userOption === SCISSORS){
    if(iaOption === ROCK){console.log("Perdiste"); totalScore = totalScore -30}
    if(iaOption === PAPER){console.log("Ganaste");totalScore = totalScore+100}
}
//-> termina if
}

// aqui se ejecuta el juego y se reinician los contadores
function juego(userOption,img){

    userImg.src = "img/" + img + ".svg";

    //console.log(iaOption)
if(countsGames === juegoTerminado){
    
    alert("JUEGO TERMINADO")
    console.log(valuesHist)
    parcialResult = totalScore
    resultText.innerHTML = "Resultados Historicos: " + JSON.stringify(valuesHist) //--> muestro los ultimos resultados 
    parcialText.innerHTML = "Resultado de juego actual: " + parcialResult
    addPila(totalScore)
    totalScore = 0
    countsGames = 0
}else{
    result(userOption)
}//termina if
}

function exit(){
    localStorage.removeItem("storageHist")
    location.reload();
}



//