import uriEncoder from '../utils/uriencoder';

export default {
  CHANGE_LOT: {
    path: '/detail/:makerName/:saleNumber/:lotNumberFull',
    toPath: (value, key) => {
      if (key === 'makerName') {
        const capitalized = uriEncoder(value).toLowerCase();
        return capitalized;
      }
      return value;
    }
  },
  CHANGE_LOT_NO_MAKER: {
    path: '/detail/:saleNumber/:lotNumberFull'
  }
};
