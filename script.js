// importar el módulo readline y crear una interfaz para leer desde consola


const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question("Escribe filas separadas por ';' y caracteres por ',': ", function(entrada) {
  const matriz = entrada.split(";").map(fila =>
    fila.split(",")
  );

  console.table(matriz);


  // la segunda pregunta
  rl.question("Escribe 2 números separados por coma: ", function(numeros) {
    const [x, y] = numeros.split(",").map(Number);
    //console.log(encontrar(matriz,x,y))
    console.log(DFS(matriz,x,y))
    rl.close();
  });
});

//          node script.js  -,-,-,-,>,.,.;.,.,.,.,.,.,.;|,.,.,-,-,-,>;|,.,.,.,.,.,.;v,.,-,-,-,B,.;.,.,.,.,.,.,.;-,-,-,-,>,.,.

//-------------------------------------------------------------------------------------------------------------------//


//verificar si la salida esta en linea con B ( si no esta en linea con B no podra salir y asi no se hace todo el trabajo)
function encontrar(matriz,x,y){
  if (x>=0 && x< matriz.length && y>=0 && y<matriz[0].length){
    for(let i=0;i<matriz.length;i++){
      for(let j=0;j<matriz[x].length;j++){
        if(matriz[i][j] === "B"&& ((x==0 && y==j)||(x==matriz.length-1 && y==j)||(y==0 && x==i)||(y==matriz[0].length-1 && x==i))){
          console.log("biennnn")
          return true;
        }
      }
    }
    console.log("mal")
    return false
  }
}


//mueve a la derecha pidiendo la cabeza
function mover_derecha(matriz,x,y){
  if(matriz[x][y] == ">"){
    if(y+1<matriz[0].length){
      if(matriz[x][y+1]=="."){
        let bandera = true
        matriz[x][y+1]=">"
        matriz[x][y]="-"
        while(matriz[x][y]=="-"){
          if(y-1<0){
            matriz[x][y] = "."
            bandera = false
            break
          }
          y-=1
        }
        if (bandera)
          matriz[x][y+1] = "."
        return matriz;
      }
      return matriz;
    }
    return matriz;
  }
  else if(matriz[x][y] == "B"){
        if(y+1<matriz[0].length){
      if(matriz[x][y+1]=="."){
        let bandera = true
        matriz[x][y+1]="B"
        matriz[x][y]="-"
        while(matriz[x][y]=="-"){
          if(y-1<0){
            matriz[x][y] = "."
            bandera = false
            break
          }
          y-=1
        }
        if (bandera)
          matriz[x][y+1] = "."
        return matriz;
      }
      return matriz;
    }
    return matriz;
  }
  else{
    return matriz;
  }
}

//mueve a la izquierda pidiendo la cabeza
function mover_izquierda(matriz,x,y){
  if(matriz[x][y] == ">" && y-2>=0){
    k = y 
    y = y-2
    while(matriz[x][y]=="-"){
          if(y-1<0){
            return matriz;
          }
          y-=1
        }
   
    if (matriz[x][y] == "."){
      
      matriz[x][k] = "."
      matriz[x][k-1] = ">"
      matriz[x][y] = "-"
    }
    else{
      return matriz;
    }
    return matriz
  }
  else if(matriz[x][y] == "B" && y-2>=0){
    k = y 
    y = y-2
    while(matriz[x][y]=="-"){
          if(y-1<0){
            return matriz;
          }
          y-=1
        }
   
    if (matriz[x][y] == "."){
      
      matriz[x][k] = "."
      matriz[x][k-1] = "B"
      matriz[x][y] = "-"
    }
    else{
      return matriz;
    }
    return matriz
  }
  else{
    return matriz
  }
}

//mueve a abajo pidiendo la cabeza
function mover_abajo(matriz,x,y){
  if( matriz[x][y] == "v"){
    if(x+1 < matriz.length){
      if(matriz[x+1][y]=="."){
        matriz[x+1][y] = "v"
        matriz[x][y] = "|"
        x-=1
        while(matriz[x][y]=="|"){
          x-=1
          if(x<0){
            break
          }
        }
        matriz[x+1][y] = "."
        return matriz
      }
      else{
        return matriz;
      }
    }
    else{
      return matriz;
    }
  }
  else{
    return matriz;
  }
}

//mueve a arrriba pidiendo la cabeza
function mover_arriba(matriz,x,y){
  if(matriz[x][y]=="v"){
    k = x
    x-=1
    while(matriz[x][y]=="|"){
      x-=1
      if(x<0){
        return matriz;
      }
    }
    if(matriz[x][y]=="."){
      matriz[x][y]="|"
      matriz[k][y]="."
      matriz[k-1][y]="v"
      return matriz
    }
    else{
      return matriz;
    }

  }
  else{
    return matriz;
  }
}

//-------------------------------------------------------------------------------------------------------------------//

//          node script.js  -,-,-,-,>,.,.;.,.,.,.,.,.,.;|,.,.,-,-,-,>;|,.,.,.,.,.,.;v,.,-,-,-,B,.;.,.,.,.,.,.,.;-,-,-,-,>,.,.
// original -,-,-,-,>,.,.;.,.,.,.,.,.,.;|,.,.,-,-,-,>;|,.,.,.,.,.,.;v,.,-,-,-,B,.;.,.,.,.,.,.,.;-,-,-,-,>,.,.

//-------------------------------------------------------------------------------------------------------------------//




//Aca empezare DFS

function buscar_carros(matriz,carros = null){     //  para tener una lista con los carros (cada carro tiene la siguiente estructura:
  if (carros == null){                            //  [">",x,y] que seria para adonde apunta, y las cordenadas)
    carros = new Array();
  }
  for(let i=0;i<matriz.length;i++){
    for(let j=0;j<matriz[0].length;j++){
      if(matriz[i][j]==">"){
        carros.push([">",i,j])
      }
      if( matriz[i][j]=="v"){
        carros.push(["v",i,j])
      }
      if (matriz[i][j]=="B"){
        carros.push(["B",i,j])
      }
    }
  }
  let indiceB = carros.findIndex(sublista => sublista[0] === 'B');
  let temp = carros[0];
  carros[0] = carros[indiceB];
  carros[indiceB] = temp;
  return carros
}

function copiarMatriz(matriz) {           //para copiar la matriz y guardarla luego ( si se hace matriz1 = matriz2 solo guarda en memoria el puntero(feo js))
  return matriz.map(fila => [...fila]); 
}









function DFS(matriz,x,y,matrizTemporal = [], camino = []){
  console.table(matriz)
  carros = buscar_carros(matriz);
  if (JSON.stringify(matriz) === JSON.stringify(matrizTemporal)) {    //si no hubo un cambio
    return
  }
  if(carros[0][1]==x && carros[0][2]==y){  //llego a la salida el carro B
    console.log("llegue aca")
    return camino
  }
  if (camino.some(estado => JSON.stringify(estado) === JSON.stringify(matriz))) { //si ya se verifico(evita bucles)
    return;
  }
  if(matrizTemporal.length === 0)
    matrizTemporal = copiarMatriz(matriz)
  for (carro of carros){
    console.log(carro)
    camino.push(copiarMatriz(matriz));
    matrizTemporal = copiarMatriz(matriz);
    if(carro[0]== "B"||carro[0]== ">"){
      matriz_movimientosIzquierda = mover_izquierda(matriz,carro[1],carro[2]);
      //console.log("primer matriz:",matriz_movimientosIzquierda)
      matriz_movimientosDerecha = mover_derecha(matriz,carro[1],carro[2]);
      //console.log("primer matriz:",matriz_movimientosDerecha)
      DFS(matriz_movimientosIzquierda,x,y,matrizTemporal,camino)
      DFS(matriz_movimientosDerecha,x,y,matrizTemporal,camino)
    }
    else{
      matriz_movimientosArriba = mover_arriba(matriz,carro[1],carro[2]);
      matriz_movimientosAbajo = mover_abajo(matriz,carro[1],carro[2]);
      DFS(matriz_movimientosArriba,x,y,matrizTemporal,camino)
      DFS(matriz_movimientosAbajo,x,y,matrizTemporal,camino)
    }
  }
  camino.pop();

}
//          node script.js  .,.,|;-,B,v;.,.,.;.,-,>
// original -,-,-,-,>,.,.;.,.,.,.,.,.,.;|,.,.,-,-,-,>;|,.,.,.,.,.,.;v,.,-,-,-,B,.;.,.,.,.,.,.,.;-,-,-,-,>,.,.

//-------------------------------------------------------------------------------------------------------------------//

// [ CARROS:
//   [ 'B', 4, 5 ],
//   [ '>', 2, 6 ],
//   [ 'v', 4, 0 ],
//   [ '>', 0, 4 ],
//   [ '>', 6, 4 ]
// ]
