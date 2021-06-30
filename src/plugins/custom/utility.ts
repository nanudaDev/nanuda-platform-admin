import Vue from 'vue';

export default {
  install() {
    Vue.prototype.$setSameKeyValue = function(fromObj: any, toObj: any) {
      Object.keys(toObj).map(toKey => {
        Object.keys(fromObj).forEach(fromKey => {
          if (toKey === fromKey && fromObj[fromKey]) {
            // Vue.set(toObj,toKey, fromObj[fromKey])
            toObj[toKey] = fromObj[fromKey];
          }
        });
      });
    };
  },
};
