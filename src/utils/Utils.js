export default class Utils {

  static sortArrayByProperty(array, property, asc) {
    let res = [];
    if (array && array.list) {
      res = array.list.sort((a, b) => this.compareStrings(a[property], b[property]));
    } else {
      res = array.sort((a, b) => this.compareStrings(a[property], b[property]));
    }

    if (!asc) {
      res = res.reverse();
    }

    return res;
  }

  static sortArrayByPropertyInsideObject(array, object, property, asc) {
    const _this = this;
    let listElements = array;
    if (array && array.list) {
      listElements = array.list;
    }

    let res = listElements.sort(function (a, b) {
      let compA = a[object] !== undefined ? a[object][property] : '-';
      let compB = b[object] !== undefined ? b[object][property] : '-';
      return _this.compareStrings(compA, compB) !== 0 ?
        _this.compareStrings(compA, compB) : _this.compareStrings(a[property], b[property]);
    });

    if (!asc) {
      res = res.reverse();
    }

    return res;
  }

  static arrayRemoveObjectWithProperty(array, property, value) {
    let res = [];
    if (array !== undefined) {
      res = array.filter(item => item[property] !== value);
    }

    return res;
  }

  static arrayContainsObjectWithProperty(array, property, value) {
    let res = false;
    if (array !== undefined) {
      res = array.filter(item => item[property] === value).length > 0;
    }

    return res;
  }

  static arrayReturnObjectWithProperty(array, property, value) {
    let listElements = array;
    if (array && array.hasOwnProperty('list')) {
      listElements = array.list;
    }

    return listElements.filter(item => item[property] === value)[0];
  }

  static simplifyArrayByProperty(array, property) {
    let res = [];
    if (array !== undefined) {
      for (let elem of array) {
        res.push(elem[property]);
      }
    }

    return res;
  }

  static simplifyArrayByPropertyInObject(array, object, property) {
    let res = [];
    let listElements = [];
    if (array && array.list) {
      listElements = array.list;
    } else if (array && array.length) {
      listElements = array;
    }

    for (let elem of listElements) {
      res.push(elem[object][property]);
    }

    return res;
  }

  static isEmpty(string) {
    let res = string === undefined || string === '';
    if (!res) {
      string = '' + string;
      res = res || string.trim().length === 0;
    }

    return res;
  }

  static compareStrings(a, b) {
    if (isNaN(a) || isNaN(b)) {
      a = this.normalize(a);
      b = this.normalize(b);
    }

    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  static stringContainsString(a, b) {
    if (isNaN(a) || isNaN(b)) {
      a = this.normalize(a);
      b = this.normalize(b);
    }

    return a.indexOf(b) > -1;
  }

  static normalize(a) {
    return (a + '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  static isMobile() {
     return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  static getFile(uri) {
    return fetch(uri).then(function(response) {
      return response.json();
    });
  }

  static checkFileExtension(file, extension) {
    return file.name.indexOf(extension) !== -1;
  }

}
