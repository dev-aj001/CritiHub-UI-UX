<script>
  import { isLoggedIn, user, isAdmin } from "$lib/stores.js";  
  import { auth } from "$lib/firebase.js";
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, updateProfile } from "firebase/auth";

	export let showModal; // boolean

	let dialog; // HTMLDialogElement

  let email = '';
  let password = '';
  let password2 = '';
  let nombre = '';

	$: if (dialog && showModal) dialog.showModal();

  let change = false;

  // Crear cuenta con correo

  $: passCoincide = password===password2;

  const crearUsuario = (auth, email, password) => {
    if(passCoincide){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        // Signed up 
        showModal = false;
        updateProfile(auth.currentUser, {
          displayName: nombre
        }).then(() => {
          $user = auth.currentUser;
        });
        dialog.close();
        change = false;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
  }

  //Iniciar con correo
  const iniciarConCorreo = (auth, email, password) => { 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log($user);
      showModal = false;
      dialog.close()
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  //Observer
  onAuthStateChanged(auth, (u) => {
    if (u) {
      $isLoggedIn = true;
      $user = u;
      console.log($user);
      // ...
    } else {
      $isLoggedIn = false;
      $user = null;
      console.log($isLoggedIn);
      showModal = false
    }
  });

  //Inicio con google
  const provider = new GoogleAuthProvider();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
        
        {#if !change}
          <form action="">
            <h1 class="center-text">Accede a CRITIHUB</h1>
            <p class="center-text">Ingresa con tu correo y contraseña</p>
            <input type="email" placeholder="Correo electronico" class="input-field" required bind:value={email} />
            <input type="password" placeholder="Contraseña" class="input-field" required bind:value={password} />
            <button class="login-button" on:click={iniciarConCorreo(auth,email,password)}>Iniciar sesión</button>
            <p class="center-text">¿No tienes una cuenta? <span on:click={()=>{change = !change}}>Crea una nueva</span>, o...</p>
          </form>
          
          <div class="social-buttons">
            <div class="social-button" on:click={()=>{signInWithRedirect(auth, provider)}}>
              <img src="/logos/google.svg" alt="Google"/>
              <p>Continuar con Google</p>
            </div>
            <div class="social-button">
              <img src="/logos/meta.svg" alt="Meta" />
              <p>Continuar con Meta</p>
            </div>
            <div class="social-button">
              <img src="/logos/github.svg" alt="Github" />
              <p>Continuar con Github</p>
            </div>
          </div>
        {:else}
          <form action="">
            <h1 class="center-text">Registrate en CRITIHUB</h1>
            <p class="center-text">Llena el formulario</p>
            <input type="text" placeholder="Nombre" class="input-field" required bind:value={nombre} />
            <input type="email" placeholder="Correo electronico" class="input-field" required bind:value={email} />
            <input type="password" placeholder="Contraseña" class="input-field" required bind:value={password} />
            <input type="password" placeholder="Confirmar contraseña" class="input-field" required bind:value={password2} />
            {#if !passCoincide}
              <p style="color: brown;">Las contraseñas no coinciden!</p>
            {/if}
            <button class="login-button" on:click={crearUsuario(auth, email, password)}>Registrarse</button>
            <p class="center-text">¿Ya tienes una cuenta? <span on:click={()=>{change = !change}}>Inicia sesión</span>, o...</p>
          </form>  

          <div class="social-buttons">
            <div class="social-button">
              <img src="/logos/google.svg" alt="Google"/>
              <p>Continuar con Google</p>
            </div>
            <div class="social-button">
              <img src="/logos/meta.svg" alt="Meta" />
              <p>Continuar con Meta</p>
            </div>
            <div class="social-button">
              <img src="/logos/github.svg" alt="Github" />
              <p>Continuar con Github</p>
            </div>
          </div>
        {/if}
        
		<!-- svelte-ignore a11y-autofocus -->
		<i class='bx bxs-x-circle' on:click={() => dialog.close()}></i>
	</div>
</dialog>

<style>

  .center-text {
    text-align: center;
  }

  span {
    color: var(--main-color);
    cursor: pointer;
  }

  span:hover {
    color: var(--hover-color);
  }

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

  .bx {
    font-size: 2rem;
    display: block;
    position: absolute;
    z-index: 200;
    right: 10px;
    top: 10px;
  }

  * {
    color: #666;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  p {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .social-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;
    row-gap: 10px;
  }

  .social-button {
    width: 100%;
    height: 60px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    column-gap: 30px;
    display: flex;
    align-items: center; /* Centra verticalmente los elementos dentro del contenedor */
  }

  .social-button p {
    margin-bottom: 0;
  }

  .social-button:hover {
    transition: 0.3s linear;
    background-color: #ececec;
  }

  .social-button img {
    max-width: 10%;
    height: auto;
    margin-left: 10px;
  }

  .login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--main-color);
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 2rem;
  }

  .login-button:hover {
    background-color: var(--hover-color);
  }
</style>
