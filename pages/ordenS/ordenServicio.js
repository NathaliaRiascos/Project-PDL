import react, {useContext, useState} from 'react'
import styles from '../../styles/Home.module.css'
import FormCliente from '../../components/ordenDeServicio/cliente/FormCliente'
import FormEmpleado from '../../components/ordenDeServicio/empleado/FormEmpleado'
import FormMateriales from '../../components/ordenDeServicio/materiales/FormMateriales'
import Descripcion from '../../components/ordenDeServicio/descripcion/Descripcion'
import FormGatos from '../../components/ordenDeServicio/otrosgatos/FormGastos'
import Total from '../../components/ordenDeServicio/total/Total'
import Fecha from '../../components/ordenDeServicio/fecha/FechaEntrega'
import  BtnAgregar from '../../components/ordenDeServicio/btnAgregar/BtnAgregar'

import ClienteState from '../../components/ordenDeServicio/context/cliente/clienteState'
import EmpleadoState from '../../components/ordenDeServicio/context/empleado/empleadoState'
import  MaterialState from '../../components/ordenDeServicio/context/materiales/materialState'
import  OtrosgastosState from '../../components/ordenDeServicio/context/otrosgastos/otrosgastosState'


function OrdenServicio() {

  const[boton, activarBoton]= useState(false)
  const[description, setDescription] = useState('');
  const[total, setTotal] = useState(0)
  const[fecha, setFecha] = useState()

  //console.log(description);
  return (
    <>
      <div>
      <ClienteState>
        <EmpleadoState>
          <MaterialState>
            <OtrosgastosState>
          <div className="displayHead">
            <h1 className={styles.title}>
              Orden de servicio 
            </h1>
            <div className="pequeno_cont">
              <Fecha 
                setFecha={setFecha}
              />
            </div>        
          </div>
        <div className="container"> 
          <div className="cliente ">               
              <FormCliente 
                boton={boton}
                activarBoton={activarBoton}
              />            
          </div>
          <div className="empleado titleMargin">            
              <FormEmpleado/>            
          </div>
          <div className="materiales titleMargin">            
              <FormMateriales />            
          </div>
          <div className="descripcion titleMargin">
            <Descripcion
              boton={boton}
              activarBoton={activarBoton}
              setDescription={setDescription}
            />
          </div>
          <div className=" gastos titleMargin">           
              <FormGatos />            
          </div>
          <div className="pequeno_cont titleMargin">
            <Total
                total={total}
                setTotal={setTotal}
             />
          </div>
          
        </div>
            <BtnAgregar 
                fecha={fecha}
                total={total}
                boton={boton}
                activarBoton={activarBoton}
                description={description}
            />
              </OtrosgastosState>
            </MaterialState>
          </EmpleadoState>
        </ClienteState>
      </div>
      
    </>
  )
}

export default OrdenServicio;