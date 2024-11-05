<script>
  import { user } from "$lib/stores.js";
  import { auth } from "$lib/firebase.js";
  import { updateProfile } from "firebase/auth";
  import Usuarios from "../Administrador/CRUD_Usuarios.svelte";
  import Publicaciones from "../Administrador/CRUD_Publicaciones.svelte";

  let activo = 2;
</script>

<section class="contenedor">
  <div class="admin-contenedor">
    <h3>Panel de administrador</h3>
    <hr />
    <div class="admin-content">
      <div class="menu-selector">
        <div
          class="btn menu-btn"
          class:primary={activo == 1}
          on:click={() => {
            activo = 1;
          }}
        >
          Usuarios
        </div>
        <div
          class="btn menu-btn"
          class:primary={activo == 2}
          on:click={() => {
            activo = 2;
          }}
        >
          Publicaciones
        </div>
      </div>
      <div class="crud-container">
        {#if activo == 1}
          <Usuarios />
        {:else}
          <Publicaciones />
        {/if}
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

  h3 {
    color: var(--main-color);
  }

  section {
    margin-top: 3rem;
  }

  .admin-contenedor {
    background-color: var(--container-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 0.5rem;
  }

  .admin-content {
    display: flex;
    column-gap: 10px;
    height: 600px;
    justify-content: start;
    align-items: start;
    flex-direction: column;
  }

  .menu-selector {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .crud-container {
    width: 100%;
    position: relative;
    height: 500px;
    
  }

  .menu-btn {
    width: 100%;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>
