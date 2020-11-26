import React,{useState,useContext, useEffect} from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const Descripcion = ({boton,activarBoton,setDescription}) => {

     const[description, guardarDescription] = useState('');
     //console.log(description);

     useEffect(() => {
          
          if(boton === true){
               setDescription(description)
              //console.log(typeof(description), description)
          }
     })

     const onChange = e => {
          guardarDescription(e.target.value);
          activarBoton(false);
     }
     return (  
          <>
                <div className="titleLine">
                    <p>Descripcion</p>
                </div>
                <TextArea  autoSize={false} style={{width:'400px', height: '200px'}}
                onChange={onChange}
                />
              
          </>
     );
}
 
export default Descripcion;