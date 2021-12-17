import M from 'utils/APICNIG'; // Así utilizamos las clases de APICNIG
import ol from 'utils/OL'; // Así utilizamos las clases de OL
import Utils from 'utils/Utils';
import LocalStorage from 'utils/LocalStorage';

import MAPA from 'static/img/mapa.png';
import IMAGEN from 'static/img/image.png';
import HIBRIDO from 'static/img/hibrido.png';

/**
 * En el directorio public podemos incluir ficheros JS con configuraciones guardadas en constantes.
 *  - appconfig.js: guarda las URLS con las rutas de los ficheros de Ayuda en diversos idiomas.
 *  - toc.js: guarda la lista de servicios que se ofrecen al usuario por defecto cuando pulsa el botón a´ñadir capas en el plugin TOC.
 * 
 * Para acceder a estos ficheros, desde el index.html tenemos que llamarlos usando %PUBLIC_URL%:
 *      <script type="text/javascript" src="%PUBLIC_URL%/toc.js"></script>
 *      <script type="text/javascript" src="%PUBLIC_URL%/appconfig.js"></script>
 * 
 * Para luego acceder su contenido, declaramos la variable de la siguiente forma:
 */

declare var PRECHARGED_LYRLIST; //e2m: con esto accedemos a la const de toc.js
declare var HELP_PAGES; //e2m: con esto accedemos a la const de appconfig.js

export let mapjs;

/**
 * Función que se lanza para configurar el mapa inicialmente
 * 
 * @param {*} unblock
 * @param {*} t 
 * @param {*} params : contiene separados por & los parámetros que configuran centro, zoom y srs
 */
export const initMap = (unblock, t, params) => {

  const lang = LocalStorage.getString('language') || 'es';
  M.language.setLang(lang);

  let zoom = 5;
  let center = [-17181.402054092905, 4716045.89913776];
  let mouseProjection = 'EPSG:4326';
  let placeMarked = false;
  try {
    const arrayParams = params.split('&');
    arrayParams.forEach((param) => {
      if (param.indexOf('center') > -1) {
        const values = param.split('=')[1].split(',');
        center = [parseFloat(values[0]), parseFloat(values[1])];
        placeMarked = true;
      } else if (param.indexOf('zoom') > -1) {
        const value = param.split('=')[1];
        zoom = parseInt(value, 10);
      } else if (param.indexOf('srs') > -1) {
        const value = param.split('=')[1];
        mouseProjection = value;
      }
    });

    if (center[0] !== -17181.402054092905 && center[1] !== 4716045.89913776) {
      center = ol.proj.transform(center, mouseProjection, 'EPSG:3857');
    }
  } catch (err) {}


  if (Utils.isMobile()) {
    // e2m: modo móvil
    mapjs = M.map({
      container: 'maplienzo',
      controls: ['location', 'rotate'],
      center: {
        x: center[0],
        y: center[1],
        draw: placeMarked  //Dibuja un punto en el lugar de la coordenada
      },
      zoom: zoom,
      minZoom: 5,
      maxZoom: 20,
    });

    window.mapjs = mapjs;
    mapjs.addPlugin(getConfiguredBaseLayersPlugin(t));

    mapjs.addPlugin(new M.plugin.IGNSearch({
      servicesToSearch: 'gn',
      maxResults: 10,
      isCollapsed: false,
      collapsible: true,
      position: 'TL',
      reverse: true,
    }));
  } else {
    // e2m Modo PC
    mapjs = M.map({
      container: 'maplienzo',
      center: {
        x: center[0],
        y: center[1],
        draw: placeMarked  //Dibuja un punto en el lugar de la coordenada
      },
      zoom: zoom,
      minZoom: 5,
      maxZoom: 20,
    });

    window.mapjs = mapjs;

    mapjs.addPlugin(getConfiguredBaseLayersPlugin(t));
    mapjs.addPlugin(new M.plugin.MeasureBar({ position: 'TR' }));

    mapjs.addPlugin(new M.plugin.FullTOC({
      collapsed: true,
      collapsible: true,
      position: 'TR',
      https: true,
      http: true,
      precharged: PRECHARGED_LYRLIST,
      codsi: true,
    }));

    mapjs.addPlugin(new M.plugin.ZoomPanel({
      position: 'TL',
      collapsed: true,
      center: [-17181.402054092905, 4716045.89913776],
      zoom: 5,
    }));

    mapjs.addPlugin(new M.plugin.IGNSearch({
      servicesToSearch: 'gn',
      searchPosition: 'geocoder,nomenclator',
      maxResults: 10,
      isCollapsed: false,
      collapsible: true,
      position: 'TL',
      reverse: true,
    }));

    mapjs.addPlugin(new M.plugin.OverviewMap({
      position: 'BR',
      fixed: true,
      zoom: 4,
      baseLayer: 'WMTS*https://www.ign.es/wmts/mapa-raster?*MTN*GoogleMapsCompatible*Cartografía del IGN*false*image/png*false*false*true',
      collapsed: true,
      collapsible: true,
    }));

    mapjs.addPlugin(new M.plugin.MouseSRS({
      position: 'BL',
      tooltip: t('visor.coordinates'),
      srs: mouseProjection,
      label: mouseProjection,
      precision: 4,
      geoDecimalDigits: 6,
      utmDecimalDigits: 2,
      activeZ: true,
    }));
  }

  mapjs.getMapImpl().once('postrender', (evt) => {
    unblock();
    // e2m: Lanza automáticamente la selección de capas
    // setTimeout(() => {
    //   document.querySelector('.m-plugin-fulltoc .m-fulltoc-addservice').click();
    // }, 500);
  });
};

export const isLoadedMap = () => mapjs !== undefined;

export const addWMSLayer = (name, legend, url, version, tiled, options) => {
  const args = {
    name: name,
    url: url,
    legend: legend,
    transparent: true,
    tiled: tiled,
    version: version,
  };

  const layer = new M.layer.WMS(args, options);

  layer.options.visibility = options.visibility;
  layer.options.displayInLayerSwitcher = options.displayInLayerSwitcher;
  layer.options.queryable = options.queryable;

  if (options && options.hasOwnProperty('visibility')) {
    layer.setVisible(options.visibility);
  }

  if (options && options.hasOwnProperty('displayInLayerSwitcher')) {
    layer.displayInLayerSwitcher = options.displayInLayerSwitcher;
  }

  if (options && options.hasOwnProperty('zIndex')) {
    layer.setZIndex(options.zIndex);
  }

  mapjs.addLayers(layer);
  return layer.getImpl().getExtent();
};

const getConfiguredBaseLayersPlugin = (t) => {
  return new M.plugin.BackImgLayer({
    position: 'TR',
    layerId: 0,
    layerVisibility: true,
    collapsed: true,
    collapsible: true,
    columnsNumber: 3,
    layerOpts: [
      {
        id: 'mapa',
        preview: MAPA,
        title: t('visor.street_map'),
        layers: [
          new M.layer.WMTS({
            url: 'https://www.ign.es/wmts/ign-base?',
            name: 'IGNBaseTodo',
            legend: t('visor.street_map'),
            matrixSet: 'GoogleMapsCompatible',
            transparent: false,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/jpeg',
          }),
        ],
      },
      {
        id: 'imagen',
        preview: IMAGEN,
        title: t('visor.image'),
        layers: [
          new M.layer.XYZ({
            url: 'https://tms-pnoa-ma.ign.es/1.0.0/pnoa-ma/{z}/{x}/{-y}.jpeg',
            name: 'PNOA-MA',
            legend: t('visor.image'),
            projection: 'EPSG:3857',
            transparent: false,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            maxZoom: 19,
          }),
          new M.layer.WMTS({
            url: 'https://www.ign.es/wmts/pnoa-ma?',
            name: 'OI.OrthoimageCoverage',
            matrixSet: 'GoogleMapsCompatible',
            legend: t('visor.image'),
            transparent: true,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/jpeg',
            minZoom: 19,
          }),
        ],
      },
      {
        id: 'hibrido',
        title: t('visor.hybrid'),
        preview: HIBRIDO,
        layers: [
          new M.layer.XYZ({
            url: 'https://tms-pnoa-ma.ign.es/1.0.0/pnoa-ma/{z}/{x}/{-y}.jpeg',
            name: 'PNOA-MA',
            legend: t('visor.image'),
            projection: 'EPSG:3857',
            transparent: false,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            maxZoom: 19,
          }),
          new M.layer.WMTS({
            url: 'https://www.ign.es/wmts/pnoa-ma?',
            name: 'OI.OrthoimageCoverage',
            matrixSet: 'GoogleMapsCompatible',
            legend: t('visor.image'),
            transparent: true,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/jpeg',
            minZoom: 19,
          }),
          new M.layer.WMTS({
            url: 'https://www.ign.es/wmts/ign-base?',
            name: 'IGNBaseOrto',
            matrixSet: 'GoogleMapsCompatible',
            legend: t('visor.toponyms'),
            transparent: true,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/png',
          })
        ],
      },
    ],
  });
}
