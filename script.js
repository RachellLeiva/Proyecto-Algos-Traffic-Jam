// importar el módulo readline y crear una interfaz para leer desde consola


function iniciar() {
  const entrada = document.getElementById("tableroInput").value.trim();
  const salida = document.getElementById("salidaInput").value.trim().split(",").map(Number);
  const algoritmo = document.getElementById("algoritmo").value;

  if (!entrada || salida.length !== 2) {
    alert("⚠️ Ingresa el tablero y las coordenadas de salida correctamente");
    return;
  }

  const matriz = entrada.split(";").map(fila => fila.split(","));
  const [x, y] = salida;

  mostrarMatriz(matriz);

  if (algoritmo === "DFS") {
    const camino = DFS(matriz, x, y, []);
    if (camino) {
      animarCamino(camino);
    } else {
      document.getElementById("acciones").textContent = "❌ No se encontró solución";
    }
  } else {
    alert("⚠️ Backtracking aún no implementado");
  }
}

  
//          node script.js  -,-,-,-,>,.,.;.,.,.,.,.,.,.;|,.,.,-,-,-,>;|,.,.,.,.,.,.;v,.,-,-,-,B,.;.,.,.,.,.,.,.;-,-,-,-,>,.,. .,.,|;-,B,v;.,.,.;.,-,>

//-------------------------------------------------------------------------------------------------------------------//



function mostrarMatriz(matriz) {
  const contenedor = document.getElementById("tablero");
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");

  matriz.forEach(fila => {
    const tr = document.createElement("tr");
    fila.forEach(celda => {
      const td = document.createElement("td");
      td.textContent = celda;
      td.className =
        celda === "B" ? "carroB" :
        celda === ">" || celda === "-" ? "carroH" :
        celda === "v" || celda === "|" ? "carroV" :
        "vacio";
      tr.appendChild(td);
    });
    tabla.appendChild(tr);
  });

  contenedor.appendChild(tabla);
}


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


function encontrarB(matriz){
  for(let i=0;i<matriz.length;i++){
    for(let j=0;j<matriz[0].length;j++){
      if(matriz[i][j] === "B"){
        return [i, j];
      }
    }
  }
}


 // DFS
function DFS(matriz, x, y, camino = [], visitados = new Set()) {
  // Evitar bucles
  const hash = JSON.stringify(matriz);
  if (visitados.has(hash)) {
    return null; 
  }

  visitados.add(hash);

  // si el carro B llego a la salida
  const carros = buscar_carros(matriz);
  if (carros[0][1] == x && carros[0][2] == y) {
    camino.push(copiarMatriz(matriz)); // guardar el ultimo estado tambien
    return camino; 
  }


  camino.push(copiarMatriz(matriz));

  for (carro of carros) {
    if (carro[0] == "B" || carro[0] == ">") {
      const matrizIzq = mover_izquierda(copiarMatriz(matriz), carro[1], carro[2]);
      const matrizDer = mover_derecha(copiarMatriz(matriz), carro[1], carro[2]);
      if (JSON.stringify(matrizIzq) !== JSON.stringify(matriz)) {
        const res = DFS(matrizIzq, x, y, [...camino], visitados); // para copiar el camino para ramas diferentes ( lo de ...camino es para que sea diferente ( el tema de punteros))
        if (res)
           return res;
      }
      if (JSON.stringify(matrizDer) !== JSON.stringify(matriz)) {
        const res = DFS(matrizDer, x, y, [...camino], visitados);
        if (res) 
          return res;
      }
    } 
    else {
      const matrizArr = mover_arriba(copiarMatriz(matriz), carro[1], carro[2]);
      const matrizAba = mover_abajo(copiarMatriz(matriz), carro[1], carro[2]);
      if (JSON.stringify(matrizArr) !== JSON.stringify(matriz)) {
        const res = DFS(matrizArr, x, y, [...camino], visitados);
        if (res) 
          return res;
      }

      if (JSON.stringify(matrizAba) !== JSON.stringify(matriz)) {
        const res = DFS(matrizAba, x, y, [...camino], visitados);
        if (res) 
          return res;
      }
    }
  }
  return null;
}








//Aca empezare A*















//mostrar el camino
function animarCamino(camino) {
  let i = 0;
  const acciones = document.getElementById("acciones");
  acciones.textContent = "🔄 Resolviendo...";

  function paso() {
    if (i < camino.length) {
      mostrarMatriz(camino[i]);
      acciones.textContent = `Paso ${i + 1} de ${camino.length}`;
      i++;
      setTimeout(paso, 800); // velocidad de animación (ms)
      } else {
        acciones.textContent = "✅ ¡Carro objetivo llegó a la salida!";
      }
    }
    paso();
  }
document.getElementById("resolverBtn").addEventListener("click", iniciar);




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
