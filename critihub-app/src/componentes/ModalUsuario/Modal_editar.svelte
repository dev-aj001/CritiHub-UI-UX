<script>
    import { db } from "$lib/firebase";
    import {
        getFirestore,
        collection,
        query,
        getDocs,
        onSnapshot,
        doc,
        getDoc,
        updateDoc,

    } from "firebase/firestore";

    
    export let selected;
    export let showModalp; // boolean
    let dialog; // HTMLDialogElement

    let email = "";
    let password = "";
    let nombre = "";
    let edad = "";
    let genero = "";



   $: if (dialog && showModalp) dialog.showModal();


  // Función para obtener el documento
  async function obtenerDocumento() {
    try {
   const docSnap = await getDoc(doc(db, 'usuariosnew', "CEQEu0a2ZTXGeXTc35tcmHrHGod2"),{
        
                nombre: nombre,
                email: email,
                password: password,
                edad: edad,
                genero: genero,
    });
        console.log("Documento encontrado:", docSnap.data());
      
      
    } catch (error) {
      console.error("Error al obtener el documento:", error);
    }
  }

obtenerDocumento()
    const actualizar = async () => {
        try{
        await updateDoc(doc(db, "usuariosnew",selected),{
                nombre: nombre,
                password: password,
                edad: edad,
                genero: genero,
        });
         dialog.close();
            console.log("Usuario actualizado")
         }catch{
        console.log("Error al actualizar")
    }
    };
    
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModalp = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
    <div class= "contenedor">
         <div class="contenedor">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">
                       Modificar Usuario
                    </h5>   
                </div>
                <div class="modal-body">
                    <form>
                        <!-- Name input -->
                        <div class="form-group">
                            <label for="email">Nombre Completro</label>
                            <input
                                type="text"
                                id="text"
                                bind:value={nombre}
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                disabled
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                bind:value={password}
                                required
                            />
                        </div>

                        <div class="row">        
                                    <label
                                        class="form-label"
                                        for="registerPassword">Edad</label
                                    >
                                    <input
                                        type="text"
                                        id="text"
                                        class="form-control"
                                        bind:value={edad}
                                        required
                                    />
                                <div class="form-group">
                                    <label
                                        class="form-label"
                                        for="registerRepeatPassword"
                                        >Genero</label
                                    >
                                    <select
                                        name="select"
                                        bind:value={genero}
                                        required
                                    >
                                        <option value="Masculino"
                                            >Masculino</option
                                        >
                                        <option value="Femenino" selected
                                            >Femenino</option
                                        >
                                        <option value="No Binario"
                                            >No binario</option
                                        >
                                    </select>
                                </div>
                           
                        </div>
                        <div class="form-group">
                            <!-- Submit button -->
                            <button on:click={actualizar} class="login-button"
                                >Actualizar</button
                            >
                        </div>
                    </form>
                </div>
            
        </div>

    </div>

       
    </div>
</dialog>

<style>
    
    dialog {
        margin: auto;
        max-width: 32em;
        border-radius: 0.2em;
        border: none;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
        position: relative;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
     .form-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .form-group input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
    }

    .form-group button {
        background-color: #025e73;
        color: #ffffff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .form-group button:hover {
        background-color: #f25c05;
    }
    .form-group {
        margin-bottom: 2rem;
    }
</style>
