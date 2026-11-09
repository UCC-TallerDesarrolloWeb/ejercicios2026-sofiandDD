## Unidad 5: Frameworks y Preprocesadores CSS

### Ejercicio: Sass básico

1. Crea un archivo styles.scss
2. Ejecuta sass --watch styles.scss styles.css en la consola del proyecto para transpilar el scss a css
3. Crea una variable para almacenar colores y usalo en algún elemento
4. Agrega estilos por (descendientes) anidación
5. Crea un nuevo archivo de sass para que los estilos anidados estén separados. Crea otro archivo para las variables.
6. Crea un mixin que reciba un color para el fondo y un color para las letras. Reutilizalo en diferentes elementos html.

### Ejercicio: Diseño de Interiores

1. Creamos un index.html con su header, nav, section, footer
2. Creamos una carpeta scss con el archivo styles.scss dentro
3. Ejecutamos sass --watch scss/styles.scss css/styles.css
4. Agregamos los estilos para desktop
5. Creamos un archivo _mobile.scss y agregamos los estilos mobile

---

### Cómo correrlo

```bash
npm install -g sass
# Ej 1
cd 5-SASS/ej1
sass --watch styles.scss styles.css
# Ej 2
cd 5-SASS/ej2
sass --watch scss/styles.scss css/styles.css
```
Después abrir el `index.html` con Live Server.
