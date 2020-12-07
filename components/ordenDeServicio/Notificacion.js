import {notification} from 'antd';

export function notificacion(type, mensaje) {
  notification[type]({
    message: mensaje
  });
};

export function camposVacios(){
     notification['error']({
          message: 'No pueden quedar campos sin llenar'
     });
};