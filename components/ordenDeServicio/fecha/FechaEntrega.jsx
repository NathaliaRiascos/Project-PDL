import React from 'react';
import { DatePicker, Space,ConfigProvider} from 'antd';
import locale from 'antd/lib/locale/es_ES';

const FechaEntrega = ({setFecha}) => {
     return ( 
          <>
               <div className="titleLine">
                    <p>Fecha</p>
               </div>
               <div className="fondo">
               <Space direction="vertical">
               <ConfigProvider locale={locale} >
                    <DatePicker  locale={locale}
                         placeholder="Selecciona una fecha"
                         style={{width: '200px'}}
                         onChange={e => console.log(e._d)}
                         />  
                    </ConfigProvider >             
               </Space>
                </div>
          </>   
            
     );
}
 
export default FechaEntrega;