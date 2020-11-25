import React from 'react';
import { DatePicker, Space } from 'antd';

const FechaEntrega = () => {
     return ( 
          <>
               <div className="titleLine">
                    <p>Fecha</p>
               </div>
               <div className="fondo">
               <Space direction="vertical">
                    <DatePicker  
                         placeholder="Selecciona una fecha"
                         style={{width: '200px'}}/>               
               </Space>
                </div>
          </>   
            
     );
}
 
export default FechaEntrega;