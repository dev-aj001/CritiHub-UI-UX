<script>
    import Modal1 from "../../componentes/ModalUsuario/Modal_Admin.svelte";
    import Modal2 from "../../componentes/ModalUsuario/Modal_editar.svelte";
    import { query,collection,onSnapshot,doc, deleteDoc} from "firebase/firestore";
    import { getAuth, deleteUser } from "firebase/auth";
  
    

    import {db } from "$lib/firebase";

    let showModal = false;
    let showModalp = false;
    let items = []
    let selected = null

  
    const q = query(collection(db, "usuariosnew"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      usuarios.push(doc.data());
        });
         items = [...usuarios]
       
    });

    const eliminar = async () => {
         try {  
        deleteUser(selected).then(() => {
            // User deleted.
        }).catch((error) => {
        // An error ocurred
             // ...
        });
            await deleteDoc(doc(db, "usuariosnew",selected));
            console.log("Usuario elimnado")
         }catch{
        console.log("Error al eliminar")
    } 
};


</script>

<div class="crud-contenedor">
    <div class="menu-acciones">
        <h2>Lista de Usuarios</h2>
        <div>
            <button on:click={() => (showModal= true)} class="btn secondary">Agregar</button>
            <button on:click={() => (showModalp = true)} class="btn secondary">Editar</button>
            <button on:click={eliminar} class="btn secondary">Eliminar</button>
        </div>
    </div>
    <div class="lista">
        <table>
            <thead>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
            </thead>
            <tbody>
                {#each items as item}
                    <tr on:click={() => {selected=item.uid}} class:selected={selected === item.uid}> 
                        <td>{item.uid}</td>
                        <td>{item.nombre}</td>
                        <td>{item.email}</td>
                        <td>{item.rol}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<Modal1  bind:showModal></Modal1>

<Modal2 bind:showModalp></Modal2>
<style>
    .crud-contenedor {
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 20px 0px rgba(93, 93, 93, 0.75);
        border-radius: 0.5rem;
    }
     .crud-contenedor {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 20px 0px rgba(93, 93, 93, 0.75);
        border-radius: 0.5rem;
    }

    .btn {
        color: rgb(54, 54, 54);
        font-weight: 700;
        margin-left: 0.3rem;
    }

    .menu-acciones {
        display: flex;
        column-gap: 15px;
        justify-content: space-between;
        margin: 10px 15px;
    }

    .lista {
        height: 100%;
        width: 100%;
    }

    .lista table {
        padding: 20px;
        width: 100%;
        height: auto;
        
    }

    thead {
        color: var(--main-color);
    }

    th,
    td {
    padding: 2px;
    border: 1px solid var(--main-color);
    }

    tr:hover {
        background-color: rgba(209, 209, 209, 0.181);
    }

    .selected {
        background-color: rgba(149, 149, 149, 0.219);
    }
</style>
