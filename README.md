<p align="center">
  <img src="assets/img/logo-APICNIG.png" height="152" />
  <img src="assets/img/logo-React.png" height="152" />
</p>
<h1 align="center"><strong>APICNIG</strong> - <small>Arquetipo React 16</small></h1>

<p align="center">
  <a title="GNU GPL v3" href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-GPLv3-blue.svg">
  </a>
  <a title="Node version" href="#">
    <img src="https://img.shields.io/badge/node-v14.16-blue">
  </a>  
  <a title="NPM version" href="#">
    <img src="https://img.shields.io/badge/npm-v6.14-blue">
  </a>
  <a title="Language" href="https://www.w3schools.com/html/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lang&message=HTML&color=maroon">
  </a>  
  <a title="Language" href="https://www.w3schools.com/js/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lang&message=Javascript&color=maroon">
  </a>
  <a title="Language" href="https://www.w3schools.com/css/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lang&message=CSS3&color=maroon">
  </a> 
  <a title="Library" href="https://componentes.cnig.es/api-core/test.html" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lib&message=APICNIG&color=khaki">
  </a>   
</p>

## Descripci贸n 馃懛

El objeto de este proyecto es disponer de una [single-page application (SPA), o aplicaci贸n de p谩gina 煤nica](https://es.wikipedia.org/wiki/Single-page_application), muy b谩sica, que haga uso de los componentes de la API-CNIG y sirva como base a aplicaciones m谩s complejas.

<p align="center">
  <img src="assets/img/favicon-Arquetipo_512.png" height="256" />
</p>


El prop贸sito de una **SPA** es la de disponer de una aplicaci贸n web o sitio web que quepa en una sola p谩gina con el prop贸sito de dar una experiencia m谩s fluida a los usuarios, como si fuera una aplicaci贸n de escritorio. En una SPA todos los c贸digos de HTML, JavaScript, y CSS se cargan una sola vez o los recursos necesarios se cargan din谩micamente cuando lo requiera la p谩gina, normalmente como respuesta a las acciones del usuario.

![](assets/img/mapa-ejemplo.jpg)

La aplicaci贸n se compone de un layout formado por un header, lienzo con cartograf铆a y footer. Se han cargado algunos componentes muy b谩sicos y algunos plugin para mostrar en qu茅 ficheros del c贸digo se configuran cada una de las herramientas.

La aplicaci贸n dispone de soporte mutiidioma  utilizando los componentes de [react-i18next](https://react.i18next.com/).

Adem谩s viene activa el arranque en una vista definida por par谩metros. Podemos centrar el mapa de arranque en un lugar, especificando centro, sistema de referencia y nivel de zoom de la siguiente manera

```bash
http://localhost:3000?zoom=18&srs=EPSG:4083&center=563308,3104166
http://localhost:3000?zoom=18&srs=EPSG:25830&center=439836,4477460
http://localhost:3000?zoom=18&srs=EPSG:4326&center=-3.7102,40.4459
http://localhost:3000?zoom=18&srs=EPSG:3857&center=-412985,4930860
```


## 鈿涳笍 React

Como *framework* para el desarrollo de este arquetipo se ha utilizado **React**. Se trata de una biblioteca Javascript de c贸digo abierto dise帽ada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola p谩gina. Es mantenido por Facebook y la comunidad de software libre.

Se ha utilizado la versi贸n de React 16. Esta es la versi贸n utilizada en otros visualizadores como [Iberpix](https://www.ign.es/iberpix/visor/) o [Fototeca](https://fototeca.cnig.es/fototeca/).

### Creaci贸n del proyecto.

Este proyecto se ha creado usando el comando **npx** del gestor de paquetes de Node.JS

```bash
$ npx create-react-app
```

Toda la estructura, incluido el repo por defecto o el package.json, se crea autom谩ticamente sin hacer m谩s. Para m谩s informaci贸n sobre esto ver los [Apuntes de desarrollo](develnotes.md).


### Available Scripts

El package.json viene con los siguientes scripts:

### `npm start`

Lanza la App en modo de desarrollo en un servidor propio con autoreload cuando var铆an cosas.\
Podemos verlo en [http://localhost:3000](http://localhost:3000) con el *browser*.

La p谩gina se recarga con los cambios.\
Podemos comprobar los errores por consola.

### `npm run build`

Realiza un *build* de la App para producci贸n en la carpeta `build` folder.\
Para m谩s informaci贸n, consultar [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

create-react-app encapsula todos los m贸dulos npm que est谩 usando internamente, por lo que su package.json ser谩 muy limpio y simple sin que tenga que preocuparse por ello.

Sin embargo, si desea comenzar a hacer cosas m谩s complejas e instalar m贸dulos que puedan interactuar con los m贸dulos que create-react-app est谩 usando bajo el cap贸, esos nuevos m贸dulos necesitan saber qu茅 est谩 disponible y qu茅 no, lo que significa que debe tener create-react -app anular el resumen de ellos.

Eso, en esencia, es lo que react-scripts ejecthace. Dejar谩 de ocultar lo que tiene instalado debajo del cap贸 y en su lugar expulsar谩 esas cosas en el package.json de su proyecto para que todos lo vean.

## 馃殌 Despliegue

https://projects.develmap.com/apicnig/arquetipor16/

## 鉀诧笍 Referencias

* [Apuntes de desarrollo](develnotes.md)
* [Extensiones de Visual Studio Code para trabajar con React](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)

### 馃敻 More info

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)