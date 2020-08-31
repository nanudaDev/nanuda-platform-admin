/* eslint-disable @typescript-eslint/no-var-requires */
import '../../../../node_modules/izitoast/dist/css/iziToast.css';
const iZtoast = require('izitoast');

const toast = {
  error: (message, title) => {
    if (!title) {
      title = 'Error';
    }
    return iZtoast.error({
      title: title,
      message: message,
      position: 'topRight',
    });
  },

  success: (message, title = '성공') => {
    return iZtoast.success({
      title: title,
      message: message,
      position: 'topRight',
    });
  },
};

export default toast;
