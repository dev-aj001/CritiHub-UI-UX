<script>
    import { app } from "$lib/firebase";
    import {
        getFirestore,
        collection,
        query,
        where,
        onSnapshot,
        getDocs,
        addDoc,
        doc,
        getDoc,
        setDoc,
    } from "firebase/firestore";
    import Swal from "sweetalert2";
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import {
        getAuth,
        signInWithEmailAndPassword,
        AuthErrorCodes,
    } from "firebase/auth";

    const db = getFirestore(app);
    // optener el servicio de Authentication
    const auth = getAuth(app);

    export let showModal; // boolean

    let dialog; // HTMLDialogElement
    // Función para obtener los datos de Firestore
    let email = "";
    let password = "";
    let nombre = "";
    let edad = "";
    let genero = "";

    let loginError = "";

    $: if (dialog && showModal) dialog.showModal();

    const handleSubmit = async () => {
        try {
            const create = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            let ids = create.user.uid;
            await setDoc(doc(db, "usuariosnew", ids), {
                uid: ids,
                edad: edad,
                genero: genero,
                rol: "usuario",
            });

            dialog.close();
            console.log("usuario registrado");
        } catch (error) {
            MSJRe();
            console.error(error);
        }
    };
    const MSJR = () => {
        Swal.fire({
            title: "Usuario Registrado!",
            text: "Gracias por registrarse a crithub",
            icon: "success",
            allowOutsideClick: false, // Evita que el usuario cierre el cuadro de diálogo haciendo clic fuera de él
            showConfirmButton: true,
            allowEnterKey: true,
        });
    };

    const MSJRe = () => {
        Swal.fire({
            title: "Usuario Ya Registrado!",
            text: "Verifique sus datos!",
            icon: "error",
        });
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="contenedor">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">
                        Agregar Usuario
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
                                name="texte"
                                bind:value={nombre}
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                bind:value={email}
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Contraseña</label>
                            <input
                                type="password"
                                id="email"
                                name="email"
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
                            <button on:click={handleSubmit} class="login-button"
                                >Registrar</button
                            >
                        </div>
                    </form>
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
    button {
        display: block;
        background-color: var(--main-color);
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
