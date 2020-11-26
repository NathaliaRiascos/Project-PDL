import React,{useContext, useState,useEffect} from 'react'
import materialContext from '../../ordenDeServicio/context/materiales/materialContext';
import empleadoContext from '../context/empleado/empleadoContext'
import otrosgastosContext from '../context/otrosgastos/otrosgastosContext'

const Total = ({total,setTotal}) => {

  //const[total, setTotal] = useState(0);

  //Extrae datos del context de empleado
  const empleadosContext = useContext(empleadoContext);
  const{manodeobra} = empleadosContext;

  //Extrae datos del context de materiales
  const materialesContext = useContext(materialContext);
  const{materialesenuso} = materialesContext;

  //Extraer proyectos del state inicial
  const OtrosgastosContext = useContext(otrosgastosContext);
  const{otrosgastos} = OtrosgastosContext;

  const pagos = [];

  useEffect(() => {
         
      manodeobra.forEach(element => {
        pagos.push(element.pago);
      });
        
      materialesenuso.forEach(element => {
        pagos.push(element.total);
      })

      otrosgastos.forEach(element => {
        pagos.push(element.precio);
      })

      //Hacer suma de todo los pesos pra saber su total
      let suma = 0;
      pagos.forEach(e => {
        suma += e;
        
      })

      //Cambiar el formato
      const resultado =  new Intl.NumberFormat('es-CO',{
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(suma);

      setTotal(resultado);
   // }
    
       
      // console.log(materialesenuso);
  },[manodeobra,materialesenuso, otrosgastos])



     return ( 
          <> 
                <div className="titleLine">
                    <p>Valor Total</p>
                </div>
                <div className="fondo">
                <p className="total" >{total}</p>
                </div>
                
        </>
      );
}
 
export default Total;