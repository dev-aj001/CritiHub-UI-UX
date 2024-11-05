<script>
    import Modal from './Modal_Login.svelte';

    import { signOut } from "firebase/auth";
    
    import { auth } from '$lib/firebase';
    import {isLoggedIn, user} from '$lib/stores';

    let showModal = false;
    let active = 1;

    $: userPhoto = ($user && $user.photoURL) ? $user.photoURL : 'img/user.jpg';
    $: userName = ($user && $user.displayName) ? $user.displayName : 'nombre sin definir';

    let toggleMenu = false;

    const cerrarSesion = () => {
        toggleMenu = !toggleMenu;
        signOut(auth);
    }

</script>

<Modal bind:showModal>
</Modal>

<header >    
    <div class="nav contenedor">
        <!-- Logo -->
        <a href="/" class="logo"> CRITI<span>HUB</span></a>
        <!-- Buscador -->
        <div class="search-box">
            <input type="search" id="search-input" placeholder="Busca">
            <i class='bx bx-search'></i>
        </div>
        <!-- Usuario -->
        {#if $isLoggedIn}
            <a href="#" class="user" on:click={()=>{toggleMenu = !toggleMenu}}>
                <img src={userPhoto} alt="user" class="user-img">
            </a>
            <!-- SubMenu -->
            <div class="sub-menu-wrap" class:open-menu={toggleMenu}>
                <div class="sub-menu">
                    <div class="user-info">
                        <img src={userPhoto} alt="">
                        <h3>{userName}</h3>
                    </div>
                    <hr>
                    <a href="/Perfil" class="sub-menu-link" on:click={()=>{toggleMenu = !toggleMenu}}>
                        <i class='bx bx-user'></i>
                        <p>Configuración de perfil</p>
                        <span>></span>
                    </a>
                    <a href="/Administrador" class="sub-menu-link" on:click={()=>{toggleMenu = !toggleMenu}}>
                        <i class='bx bx-cog'></i>
                        <p>Panel de administrador</p>
                        <span>></span>
                    </a>
                    <a href="/Ayuda" class="sub-menu-link" on:click={()=>{toggleMenu = !toggleMenu}}>
                        <i class='bx bx-help-circle' ></i>
                        <p>Ayuda y soporte</p>
                        <span>></span>
                    </a>
                    <a href="#" class="sub-menu-link logout" on:click={cerrarSesion}>
                        <i class='bx bx-log-out'></i>
                        <p>Cerrar sesión</p>
                        <span>></span>
                    </a>
                </div>
            </div>
            <!-- Fin SubMenu -->
        {:else}
            <button class="btn primary" on:click={()=>{showModal = true}}>Inicia sesión</button>
        {/if}
        <!-- Navbar -->
        <div class="navbar">
            <a href="/" class="nav-link" on:click={() => { active = 1 }} class:active={active===1}>
                <i class='bx bx-home' ></i>
                <span class="nav-link-title">Inicio</span>
            </a>
            <a href="/Peliculas" class="nav-link" on:click={() => { active = 2 }} class:active={active===2}>
                <i class='bx bx-film' ></i>
                <span class="nav-link-title">Peliculas</span>
            </a>
            <a href="/Series" class="nav-link" on:click={() => { active = 3 }} class:active={active===3}>
                <i class='bx bx-tv' ></i>
                <span class="nav-link-title">Series</span>
            </a>
            <a href="/Juegos" class="nav-link" on:click={() => { active = 4 }} class:active={active===4}>
                <i class='bx bx-joystick-alt' ></i>
                <span class="nav-link-title">Juegos</span>
            </a>
        </div>
    </div>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: var(--body-color);
        z-index: 100;
    }
/* Nav */
    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
    }
/* Logo */
    .logo {
        font-size: 1.4rem;
        color: var(--text-color);
        font-weight: 600;
        margin: 0 auto 0 0;
    }

    .logo span {
        color: var(--main-color);
    }
/* Buscador */
    .search-box {
        max-width: 240px;
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 0.7rem;
        padding: 8px 15px;
        background-color: var(--container-color);
        border-radius: 4rem;
        margin-right: 1rem;
    }

    .search-box .bx {
        font-size: 1.1rem;
    }

    .search-box .bx:hover {
        color: var(--main-color);
    }

    #search-input {
        width: 100%;
        border: none;
        outline: none;
        color: var(--text-color);
        background-color: transparent;
        font-size: 0.93rem;
    }
/* User */

    .user {
        display: flex;
    }

    .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }

/* Navbar */

    .navbar {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        left: 18px;
        display: flex;
        flex-direction: column;
        row-gap: 2.1rem;
    }

    .nav-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #b7b7b7;
    }

    .nav-link:hover,
    .active {
        color: var(--main-color);
        transition: 0.15s all linear;
        transform: scale(1.1);
    }

    .nav-link .bx {
        font-size: 1.6rem;
    }

    .nav-link-title {
        font-size: 0.82rem;
    }

/*Sub menu styles*/
.sub-menu-wrap {
        position: absolute;
        top: 70%;
        right: 10%;
        width: 320px;
        color: #393939;
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.5s;
    }

    .sub-menu {
        background-color: #fefefe;
        padding: 15px;
        margin: 10px;
        border-radius: .5rem;
    }

    .sub-menu-wrap.open-menu {
        max-height: 400px;
    }

    .sub-menu img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        margin-right: 15px;
    }

    .user-info {
        display: flex;
        align-items: center;
    }

    .user-info h3 {
        font-weight: 600;
    }

    .sub-menu hr {
        border: 0;
        height: 1px;
        width: 100%;
        background-color: #ccc;
        margin: 15px 0 10px;
        
    }

    .sub-menu-link{
        display: flex;
        align-items: center;
        color: #393939;
        margin: 15px 0;
    }

    .sub-menu-link .bx {
        font-size: 1.5rem;
        margin-right: 10px;
        padding: 5px;
        background-color: #ededed;
        border-radius: 50%;
    }

    .sub-menu-link p {
        width: 100%;
        display: block;
    }

    .sub-menu-link span {
        font-size: 22px;
        transition: transform 0.5s;
        
    }

    .sub-menu-link:hover span {
        transform: translateX(5px);
    }

    .logout {
        margin-top: 30px;
        margin-bottom: 5px;
    }

    .sub-menu-link:hover p {
        font-weight: 600;
    }

    @media (max-width: 1360px) {
    /* … */
        .sub-menu-wrap {    
            right: 5%;
        }
    }

    @media (max-width: 1084px) {
    /* … */
        .sub-menu-wrap {
            right: 0%;
        }
    }

</style>
