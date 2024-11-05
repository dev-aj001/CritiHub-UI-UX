<script>
    import { user } from "$lib/stores.js";
    import { auth } from "$lib/firebase.js";
    import { updateProfile } from "firebase/auth";

    let nombre = $user.displayName;
    let email = $user.email;

    
    const cambiarNombre = (n) => {
        updateProfile(auth.currentUser, {
        displayName:n,
        
        }).then(() => {
        // Profile updated!
        // ...
        console.log("Nombre actualizado");
        }).catch((error) => {
        console.log("Error de actulizacion");
        });
    }
    
    $:console.log(nombre);

</script>


<section class="contenedor ">
    <div class="perfil-contenedor">
        <h2>Configuración de perfil</h2>
        <hr>
        <div class="perfil-content">
            <div class="perfil-card">
                <img src={$user.photoURL} alt="">
                <button class="btn primary">Cambiar foto de perfil</button>
                <p>{$user.email}</p>
            </div>
            <div class="perfil-form">
                <form action="">
                    <label for="nombre-input">Nombre completo</label>
                    <input type="text" id="nombre-input" bind:value={nombre}>
                    <label for="correo-input">Correo</label>
                    <input type="text" id="correo-input"  bind:value={email} >
                    <label for="edad-input">Edad</label>
                    <input type="text" id="edad-input" value=22>
                    <label for="genero-input">Genero</label>
                    <select name="" id="genero-input">
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="No Binario">No binario</option>
                        <option value="Prefiero no especificar" selected>Prefiero no especificar</option>
                    </select>
                    <div class="acciones">
                        <button class="btn primary" on:click={cambiarNombre(nombre)}>Actualizar</button>
                        <button class="btn secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<style>

    hr {
        border: 0;
        height: 1px;
        width: 100%;
        background-color: #f9f9f9;
        margin: 15px 0 10px;
    }

    h2 {
        color: var(--main-color);
    }

    section {
        margin-top: 3rem;
    }

    .perfil-contenedor {
        background-color: var(--container-color);
        color: var(--text-color);
        padding: 20px;
        border-radius: 0.5rem;
    }

    .perfil-content {
        display: flex;
        column-gap: 15px;
        height: 500px;
    }

    .perfil-card {
        width: 30%;
        padding: 25px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .perfil-card img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
    }

    .perfil-card p {
        margin-top: 1.5rem;
        color: #f9f9f9b4;
    }

    .perfil-card button {
        margin-top: 1.0rem;
        border: none;

    }
    
    .perfil-form {
        width: 70%;
        padding: 20px;
        position: relative;
        height: 100%;
    }

    .perfil-form form {
        display: flex;
        flex-direction: column;
        row-gap: 6px;
    }

    .perfil-form form label {
        font-size: 0.93rem;
        font-weight: 500;
    }

    .perfil-form form input, select {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        
    }

    .acciones {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
</style>