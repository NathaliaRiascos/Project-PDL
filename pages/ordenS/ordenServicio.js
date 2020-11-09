import styles from '../../styles/Home.module.css'
import FormCliente from '../../components/ordenDeServicio/cliente/FormCliente'
import ClienteState from '../../components/ordenDeServicio/context/cliente/clienteState'

function OrdenServicio() {
  return (
    <>
      <div>
        <h1 className={styles.title}>
          Orden de servicio 
       </h1>
       <ClienteState>
          <FormCliente />
        </ClienteState> 
      </div>
    </>)
}

export default OrdenServicio;