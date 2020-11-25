import React,{useContext, useMemo, useEffect} from 'react'
import { PrinterOutlined, WarningTwoTone } from '@ant-design/icons';
import { Button, Tooltip, notification, Modal } from 'antd';
import materialContext from '../../ordenDeServicio/context/materiales/materialContext';
import empleadoContext from '../context/empleado/empleadoContext'

const btnAgregar = () => {

     //Extrae datos del context de empleado
     const empleadosContext = useContext(empleadoContext);
     const{manodeobra} = empleadosContext;

     //Extrae datos del context de materiales
    const materialesContext = useContext(materialContext);
    const{materiales,materialesenuso, agregarMaterial, agregarMaterialEnUso} = materialesContext;

     useEffect(() => {
          console.log(manodeobra);
          console.log(materialesenuso);
     },[manodeobra,materialesenuso])
     
     return (
          <Tooltip placement="top" title={"Agregar"}>
              <Button type="primary"
                icon={<PrinterOutlined />}
                
                //onClick={onClick}
              >Agregar
            </Button>
            </Tooltip>
     );
}
 
export default btnAgregar;