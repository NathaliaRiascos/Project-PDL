import React from 'react';
import { DatePicker, Space,ConfigProvider} from 'antd';
import locale from 'antd/lib/locale/es_ES';

const FechaEntrega = ({setFecha}) => {

     const dateFormat = 'DD-MM-YYYY';
     const onChange = e => {

          const dia = e._d.getUTCDate();
          const anio = e._d.getFullYear();
          const mes = e._d.getMonth();

          setFecha(dia+'-'+mes+'-'+anio)

     }
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
                         onChange={onChange}
                         format={dateFormat}
                         />  
                    </ConfigProvider >             
               </Space>
                </div>
          </>   
            
     );
}
 
export default FechaEntrega;