import React,{useContext, useMemo, useEffect, useState} from 'react'
import { PrinterOutlined, WarningTwoTone } from '@ant-design/icons';
import { Button, Tooltip, notification, Modal } from 'antd';
import materialContext from '../../ordenDeServicio/context/materiales/materialContext';
import empleadoContext from '../context/empleado/empleadoContext'
import clienteContext from '../context/cliente/clienteContext'
import otrosgastosContext from '../context/otrosgastos/otrosgastosContext'


const btnAgregar = ({fecha, boton,activarBoton, description,total}) => {
     
     //Extrae datos del context de empleado
     const empleadosContext = useContext(empleadoContext);
     const{empleados,manodeobra} = empleadosContext;

     //Extrae datos del context de materiales
     const materialesContext = useContext(materialContext);
     const{materialesenuso} = materialesContext;

     //Extrae datos del context de cliente
     const clientesContext = useContext(clienteContext);
     const{cliente} = clientesContext;

     //Extraer datos del context de otrosgastos
     const OtrosgastosContext = useContext(otrosgastosContext);
     const{otrosgastos} = OtrosgastosContext;

     const[activo,modificar] = useState(false);

     //Aquí estará toda la información de ordenes de servicio
     const lista = [];
    
     
     useEffect(() => {
          
          if(activo === true && cliente !== null ){
          //console.log(activo);
               lista.push({datoscliente: cliente, description: description,
               empleados: manodeobra, gastos: otrosgastos, gastoTotal: total
               });
               console.log(lista);               
          }
          //console.log(fecha);
          //activarBoton(false);
     },[activo,manodeobra,materialesenuso,cliente,description,otrosgastos,total,fecha])
     
     
     const onClick =  () =>{
          activarBoton(true);
          modificar(true);  
     }
     

     return (
          <>
               <Tooltip placement="top" title={"Agregar"}>
                    <Button type="primary"
                         icon={<PrinterOutlined />}
                         
                         onClick={onClick}
                    >Agregar
                    </Button>
               </Tooltip>
          </>
     );
}
 
export default btnAgregar;