<!-- Pagina de inicio -->

<script>
    // Componentes
    import Carrusel from "../componentes/Carrusel.svelte"; 
    import { db } from "$lib/firebase.js";   
    import { movies, series, juegos } from "$lib/stores.js";

    import { collection, query, where, onSnapshot } from "firebase/firestore";

    // Obtener lista de peliculas de firebase
    const qPeliculas = query(collection(db, "Publicaciones"),where("categoria", "==", "peliculas"));

    const unsubscribePeliculas = onSnapshot(qPeliculas, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({data:doc.data(), id:[doc.id]});
        });
        items.reverse();
        $movies = [...items];
    });

    // Obtener lista de series de firebase
    const qSeries = query(collection(db, "Publicaciones"),where("categoria", "==", "series"));

    const unsubscribeSeries = onSnapshot(qSeries, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({data:doc.data(), id:[doc.id]});
        });
        items.reverse();
        $series = [...items];
    });

    // Obtener lista de peliculas de firebase
    const qJuegos = query(collection(db, "Publicaciones"),where("categoria", "==", "juegos"));

    const unsubscribeJuegos = onSnapshot(qJuegos, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({data:doc.data(), id:[doc.id]});
        });
        items.reverse();
        $juegos = [...items];
    });

    
</script>

<section class="home contenedor">
    <!-- Home img -->
    <img src="img/home-background.png" alt="home" class="home-img">
    <!-- Home text -->
    <div class="home-text">
        <h1 class="home-title">CRITI<span>HUB</span></h1>
        <p>Series, Peliculas y Juegos</p>
    </div>
</section>

<Carrusel categoria="Peliculas" items={$movies}/>

<Carrusel categoria="Series" items={$series}/>

<Carrusel categoria="Juegos" items={$juegos}/>



<style>
    /* Home */
    .home {
        position: relative;
        min-height: 470px;
        display: flex;
        align-items: center;
        margin-top: 5rem !important; /*Todos los contenedores deben tener este margin-top */
        border-radius: 0.5rem;
        margin-bottom: 1.5rem !important;
    }
    .home-img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
        border-radius: 0.5rem;
    }
    .home-text {
        padding-left: 40px;
    }
    .home-title {
        font-size: 2rem;
        font-weight: 600;
    }
    .home-text p{
        font-size: 0.93rem;
        margin: 10px 0 20px;
        color: var(--text-color);
    }

    .home-text span {
        color: var(--main-color);
    }
    .watch-btn {
        display: flex;
        align-items: center;
        column-gap: 0.8rem;
        color: var(--text-color);
    }
    .watch-btn .bx {
        font-size: 21px;
        background-color: var(--main-color);
        width: 40px;
        height: 20px;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .watch-btn .bx:hover {
        background-color: var(--hover-color);
        transform: scale(1.05);
        transition: 0.3s linear;
    }
    .watch-btn span {
        font-size: 1rem;
        font-weight: 400;
    }

    
</style>