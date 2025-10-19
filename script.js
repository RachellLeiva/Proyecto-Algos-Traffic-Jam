// importar el módulo readline y crear una interfaz para leer desde consola


function iniciar() {
  const entrada = document.getElementById("tableroInput").value.trim();
  const salida = document.getElementById("salidaInput").value.trim().split(",").map(Number);
  const algoritmo = document.getElementById("algoritmo").value;

  if (!entrada || salida.length !== 2) {
    alert("⚠️ Ingresa el tablero y las coordenadas de salida correctamente");
    return;
  }

  const matriz = entrada
    .split(";")
    .map(fila => fila.trim())             // elimina espacios y saltos extra en cada fila
    .filter(fila => fila.length > 0)      // evita filas vacías si el usuario dejó un ; al final
    .map(fila => fila.split(",").map(c => c.trim())); // limpia cada celda

  const [x, y] = salida;

  mostrarMatriz(matriz);

  if (algoritmo === "DFS") {
    const camino = DFS(matriz, x, y, []);
    if (camino) {
      animarCamino(camino);
    } else {
      document.getElementById("acciones").textContent = "❌ No se encontró solución";
    }
  } else if (algoritmo === "A*" || algoritmo === "Aestrella") {
    const camino = Aestrella(matriz, x, y);
    if (camino) {
      animarCamino(camino);
    } else {
      document.getElementById("acciones").textContent = "❌ No se encontró solución con A*";
    }
  } else {
    alert("⚠️ Algoritmo no reconocido");
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


function matrizAHash(m) {
  return JSON.stringify(m);
}


function Aestrella(matriz, x, y) {
  const listaAbierta = [];
  const listaCerrada = new Set();

  // f, g, h, camino
  listaAbierta.push([copiarMatriz(matriz), 0, 0, 0, [copiarMatriz(matriz)]]); // inicializar con camino inicial

  while (listaAbierta.length != 0) {
    let mejorF = Infinity;
    let pos;
    let g = 0;
    let indiceMejor = 0;
    let caminoActual = [];

    for (let i = 0; i < listaAbierta.length; i++) {
      if (listaAbierta[i][1] < mejorF) {
        mejorF = listaAbierta[i][1];
        pos = copiarMatriz(listaAbierta[i][0]);
        g = listaAbierta[i][2];
        indiceMejor = i;
        caminoActual = listaAbierta[i][4]; // recuperamos el camino que llevó hasta aquí
      }
    }

    listaCerrada.add(JSON.stringify(listaAbierta[indiceMejor][0]));
    listaAbierta.splice(indiceMejor, 1);

    const carros = buscar_carros(pos);

    const [l, p] = encontrarB(pos);
    if (l == x && p == y) {
      return caminoActual; // ✅ ahora devuelve el camino completo
    }

    for (carro of carros) {
      if (carro[0] == "B" || carro[0] == ">") {
        const matrizIzq = mover_izquierda(copiarMatriz(pos), carro[1], carro[2]);
        const matrizDer = mover_derecha(copiarMatriz(pos), carro[1], carro[2]);

        // ================= IZQUIERDA =================
        if (JSON.stringify(matrizIzq) !== JSON.stringify(pos)) {
          if (!listaCerrada.has(JSON.stringify(matrizIzq))) {
             listaCerrada.add(JSON.stringify(matrizIzq)); 
            let heuristica = 1;
            let [i, j] = encontrarB(matrizIzq);
            while (j < y) {
              if (matrizIzq[i][j] == ".") {
                heuristica += 1;
              } else {
                heuristica += 2;
              }
              j += 1;
            }
            let gx = g + 1;
            let f = gx + heuristica;
            listaAbierta.push([
              copiarMatriz(matrizIzq),
              f,
              gx,
              heuristica,
              [...caminoActual, copiarMatriz(matrizIzq)]
            ]);
          }
        }

        // ================= DERECHA =================
        if (JSON.stringify(matrizDer) !== JSON.stringify(pos)) {
          if (!listaCerrada.has(JSON.stringify(matrizDer))) {
             listaCerrada.add(JSON.stringify(matrizDer)); 
            let heuristica = 1;
            let [i, j] = encontrarB(matrizDer);
            while (j < y) {
              if (matrizDer[i][j] == ".") {
                heuristica += 1;
              } else {
                heuristica += 2;
              }
              j += 1;
            }
            let gx = g + 1;
            let f = gx + heuristica;
            listaAbierta.push([
              copiarMatriz(matrizDer),
              f,
              gx,
              heuristica,
              [...caminoActual, copiarMatriz(matrizDer)]
            ]);
          }
        }
      } else {
        const matrizArr = mover_arriba(copiarMatriz(pos), carro[1], carro[2]);
        const matrizAba = mover_abajo(copiarMatriz(pos), carro[1], carro[2]);

        // ================= ARRIBA =================
        if (JSON.stringify(matrizArr) !== JSON.stringify(pos)) {
          if (!listaCerrada.has(JSON.stringify(matrizArr))) {
            listaCerrada.add(JSON.stringify(matrizArr)); 
            let heuristica = 1;
            let [i, j] = encontrarB(matrizArr);
            while (j < y) {
              if (matrizArr[i][j] == ".") {
                heuristica += 1;
              } else {
                heuristica += 2;
              }
              j += 1;
            }
            let gx = g + 1;
            let f = gx + heuristica;
            listaAbierta.push([
              copiarMatriz(matrizArr),
              f,
              gx,
              heuristica,
              [...caminoActual, copiarMatriz(matrizArr)]
            ]);
          }
        }

        // ================= ABAJO =================
        if (JSON.stringify(matrizAba) !== JSON.stringify(pos)) {
          if (!listaCerrada.has(JSON.stringify(matrizAba))) {
             listaCerrada.add(JSON.stringify(matrizAba)); 
            let heuristica = 1;
            let [i, j] = encontrarB(matrizAba);
            while (j < y) {
              if (matrizAba[i][j] == ".") {
                heuristica += 1;
              } else {
                heuristica += 2;
              }
              j += 1;
            }
            let gx = g + 1;
            let f = gx + heuristica;
            listaAbierta.push([
              copiarMatriz(matrizAba),
              f,
              gx,
              heuristica,
              [...caminoActual, copiarMatriz(matrizAba)]
            ]);
          }
        }
      }
    }
  }
  return null; // ❌ si no hay camino
}









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
      setTimeout(paso, 400); // velocidad de animación (ms)
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
