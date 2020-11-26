import React from 'react';
import { DatePicker, Space,ConfigProvider} from 'antd';
import moment from 'moment';
//import 'moment/locale/es-es';
//import locale from 'antd/es/date-picker/locale/es_ES';

const FechaEntrega = ({setFecha}) => {
     return ( 
          <>
               <div className="titleLine">
                    <p>Fecha</p>
               </div>
               <div className="fondo">
               <Space direction="vertical">
               <ConfigProvider /*locale={locale}*/>
                    <DatePicker  
                         placeholder="Selecciona una fecha"
                         style={{width: '200px'}}
                         onChange={e => setFecha(e.value)}
                         />  
                    </ConfigProvider >             
               </Space>
                </div>
          </>   
            
     );
}
 
export default FechaEntrega;