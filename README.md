# Traffic Jam Solver


## Descripción general
El juego consiste en un tablero con varios carros ubicados en diferentes posiciones.  
Cada carro tiene una orientación (horizontal o vertical) y solo puede desplazarse en esa dirección si hay espacio disponible, solo permitiendo carros de un tamaño minimo de 2 campos
y muy importante, el carro objetivo (B) solo puede estar horizontal como el juego original.  
El objetivo es mover los carros de forma estratégica para liberar el camino del carro objetivo B hasta llegar a la salida indicada por coordenadas (x, y).

## Instrucciones de uso
1. Abrir el archivo index.html en un navegador .
2. En el área "Ingresar tablero", escribir la configuración del tablero usando los siguientes símbolos:
   - .  : Espacio vacío  
   - -  : Parte de un carro horizontal  
   - |  : Parte de un carro vertical  
   - >  : Frente de un carro horizontal  
   - v  : Frente de un carro vertical  
   - B  : Carro objetivo  

   Los elementos se separan por espacios y cada fila va en una nueva línea.  
   El tamaño máximo permitido del tablero es 12 × 12.
3. Especificar las coordenadas de salida en el campo correspondiente (por ejemplo: 0,5).
4. Seleccionar el algoritmo a utilizar: DFS, BFS, Backtracking o A*.
5. Presionar el botón "Resolver tablero".

## Métricas mostradas
- Tiempo de ejecución del algoritmo.  
- Número de movimientos realizados.  
- Estados explorados.  
- Secuencia de acciones realizadas.  
- Animación visual del proceso.

## Algoritmos implementados

### Depth-First Search (DFS)
Explora recursivamente cada camino posible hasta llegar a la meta.  
No garantiza la solución más corta, pero es útil para recorrer todo el espacio de estados.

### Breadth-First Search (BFS)
Explora los estados por niveles, garantizando encontrar la solución mínima en número de pasos.  
Usa una cola FIFO para almacenar los estados pendientes.

### Backtracking
Versión optimizada de DFS que aplica poda y evita repetir estados redundantes.

### A* (A Estrella)
Algoritmo heurístico que combina el costo real (g(n)) y una estimación (h(n)) para priorizar los estados más prometedores.  
Usa la función de evaluación f(n) = g(n) + h(n).

## Detalles técnicos  
- Documentado con JSDoc.

##  Análisis comparativo del rendimiento de los algoritmos

Despues de multipes pruebas, se sacan las siguientes concluciones:
A* es junto a BFS obviamente encuentran las rutas más optimas, pero BFS explora 
muchos más (muchooos más) estados, mientras que A* por la heuristica explora muchos menos, y por ende mucho más tiempo
DFS tiende a tarda menos en tiempo por que encuentra una solucion (sí la hay) aunque sea a lo loco, pero esto genera que encuentre una ruta nada optima comparado a las de BFS y A*
Y por ultimo el backtraking, que es la más ineficientes de todas, explora demasiados estados y complica el encontrar la solucion.

## Validaciones implementadas
- Solo se permiten los símbolos válidos (. - | > v B).  
- Tamaño máximo del tablero: 12×12.  
- Si hay errores de entrada, la ejecución se detiene y se muestra un mensaje de advertencia.


## jsDoc
Para la documentación en jsDoc ejecutar en consola
- npm install -g 
- jsdoc jsdoc script.js -d docs/ 
- start docs/index.html
Si ya están las carpetas de docs, solo ejecutar la última

## Autor
Kendall Sanchez
Rachel leiva  
Estudiantes de Ingeniería en Computación  
Instituto Tecnológico de Costa Rica

