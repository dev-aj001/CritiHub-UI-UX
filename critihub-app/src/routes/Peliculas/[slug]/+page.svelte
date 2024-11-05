<script>
    /** @type {import('./$types').PageData} */
    import Rating from "../../../componentes/Rating_banner.svelte";
    import { isLoggedIn, isAdmin, user } from "$lib/stores.js";
    import Estrellas from  "../../../componentes/Rating_Stars.svelte";
    import { query,collection,addDoc,getDocs,onSnapshot,doc,updateDoc, deleteDoc} from "firebase/firestore";
    import {db } from "$lib/firebase";
    import { writable } from 'svelte/store';

   
   
    let stars = Array(5).fill(0).map((_, i) => i + 1);
	
    let showModal = false;

	export let data;
    export let rating2 = writable(0);


    let rating = data.data.rating;

    let nombre = "Inicia sesión"; 
    let rsn = "";
    let foto = "";
    let items = []
    let valoresDeseados = 0
    let promedioC = 0;

    console.log($isLoggedIn);

    if($isLoggedIn){
        nombre = $user.displayName;
        foto = $user.photoURL;
    }

    let text = "";
    
    $:console.log(text);

async function Mostrarreseña() {
    const q = query(collection(db, "Publicaciones", data.id, "Reseñas"));
   

    onSnapshot(q, async (querySnapshot) => {
        const reseñas = [];
        querySnapshot.forEach((doc) => {
            reseñas.push(doc.data());
        });

          console.log(reseñas);
      items=[...reseñas];
        promedioCalif()
        
    });
}

async function promedioCalif() {
    let promedio = 0;
    const valoresDeseados = items.map(items => items.Calificacion);
        const sumaValores = valoresDeseados.reduce((total, valor) => total + valor, 0);
        promedio = sumaValores / valoresDeseados.length;
        promedio = parseFloat(promedio.toFixed(1));
        console.log("El promedio es:", promedio);

        try {
            await updateDoc(doc(db, "Publicaciones", data.id), {
                ratingpromediado: promedio
            });
            console.log("Calificación Actualizada");
        } catch (error) {
            console.log("Error al actualizar la calificación:");
        }
}


 async function reseña() {
  try {
    
    const subcoleccionRef = collection(db,"Publicaciones",data.id, "Reseñas");
    await addDoc(subcoleccionRef, {
      Nombre:nombre,
      Foto:foto,
      Comentario: rsn,
      Calificacion: $rating2,
      Fecha:new Date().toLocaleDateString('es-ES')
      
    }); 
     
    rsn='';
    rating2= writable(0);
    
    console.log('Datos agregados correctamente a la subcolección');
  } catch (error) {
    console.error('Error al agregar datos a la subcolección:', error);
  }

  }
  //Funcion de estrellas
   function handleClick(event) {
        const selectedRating = event.target.dataset.rating;
        rating2.set(Number(selectedRating));
        
    }

Mostrarreseña()

</script>


<!-- Detail content -->

<div class="detail-container contenedor">
    <!-- Image -->
    <img src={data.data.banner} alt="" class="detail-img">
    <div class="post-content">
        <!-- POSTER -->
        <img src={data.data.cover} alt="poster" class="poster-img">
        <!-- Text -->
        <div class="detail-text">
            <h2>{data.data.titulo}</h2>
                <p>Critihub </p>
            <div class="rating">
                <Rating {rating} />
                <p>{data.data.rating}</p>
            </div>
            <p>Usuarios </p>
             <div class="rating">
                <Rating  rating={data.data.ratingpromediado}/>
                <p>{data.data.ratingpromediado}</p>
            </div>
            
            <div class="tags">
                {#each data.data.tags as tag}
                    <span>{tag}</span>
                {/each}
            </div>

            <a href={data.data.trailer} class="watch-btn" target="_blank">
                <i class="bx bx-play" on:click={()=>{showModal = true}}></i>
                <span>Mira el trailer!</span>
            </a>
        </div>
    </div>
</div>

<div class="contenedor about-content">
    <h2>{data.data.titulo}</h2>
    <p>{data.data.sinopsis}</p>
</div>

<!-- Caja de comentarios -->
<div class="contenedor bg">
    
    <div class="comment-session">
        <h3>Dejanos saber que piensas!</h3>
        <br>
        <div class="comment-box">
           
            <div class="user">
                <div class="image"> <img src="{foto} "alt="user"> </div>
                <div class="name">{nombre}</div>
            </div>
            <div class="rating-wrapper">
                <div class="ratings">
                {#each stars as star}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <span
                        class:selected={star <= $rating2}
                        data-rating={star}
                        on:click={handleClick}
                        >&#9733;</span>
                    {/each}
                </div>
            </div>
            <form action="">
                
                <textarea name="comment" placeholder="Tu mensaje" id="comentario" bind:value={rsn}></textarea>
                  
                <button class="comment-submit" on:click={reseña}>Comentario</button>
            </form>
        </div>
        <div class="post-comment">
           {#each items as item} 
            <div class="list">
                <div class="user">
                    <div class="user-image"> <img src={item.Foto?item.Foto:"/img/usuario2.png"} alt="user"> </div>
                    <div class="user-meta">
                        <div class="name"><p>{item.Nombre}</p>
                          <div class="rating">
                        <Rating rating={item.Calificacion} />
                    </div>
                           </div>
                        <div class="day"> Publicando el {item.Fecha}</div>
                    </div>
                </div> 
                <div class="comment-post">{item.Comentario}</div>  
            </div>
             {/each}
        </div>
    </div>
</div>
<!-- Fin caja comentarios -->

<style>
    .poster-img {
        width: 200px;
        height: 290px;
        position: absolute;
        object-fit: cover;
        left: 0;
        bottom: 0;
        z-index: 2;
        box-shadow: 10px -2px 66px 0px rgba(0,0,0,0.75);
    }

    .detail-container {
        position: relative;
        min-height: 540px;
        margin-top: 5rem !important;
        overflow: hidden;
        box-shadow: 1px 13px 20px -7px rgba(0,0,0,0.41);
    }

    .detail-img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        z-index: -1;
    }

    .detail-text {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding: 40px 240px;
        background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9));
    }

    .detail-text h2 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .rating {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        color: var(--main-color);
        margin-top: 4px;
    }

    .tags {
        display: flex;
        align-items: center;
        column-gap: 8px;
        margin: 1rem 0;
    }

    .tags span {
        background-color: var(--container-color);
        padding: 0 4px;
    }

    /*Descripcion*/

    .about-content{
        margin-top: 2rme;
    }

    .about-content h2 {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--main-color);
    }

    .about-content p {
        max-width: 600px;
        font-size: 0.93rem;
        margin: 10px 0;
    }

    /*--------------- Critica CSS--------------------*/
    .bg {
        background-color: var(--container-color);
        padding: 40px 0 40px;
        border-radius: 0.5rem;
        margin-top: 3rem;
    }

    .comment-box,
    .post-comment .list{
        background: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 2px #0002;
        color: #000 !important;
    }
    .comment-session{
        width: 90%;
        height: auto;
        margin: 0 auto;
    }

    .comment-session h3 {
        color: var(--main-color);
    }

    .comment-session p {
        margin-bottom: 15px;
    }

    .post-comment .list{
        width: 100%;
        margin-top: 12px;
    }
    .post-comment .list .user{
        display: flex;
        padding: 8px;
        overflow: hidden;
        flex-wrap: nowrap;
    }
    .post-comment .list .user img{
        height: 38px;
        width: 38px;
        margin-right: 10px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }
    .comment-session .name{
        text-transform: uppercase;
        width: 400px;
        font-weight: 500;
        color: blacks !important;
    }
    .post-comment .list .day{
        font-size: 12px;
    }
    .post-comment .comment-post{
        padding: 0 0 15px 58px;
    }
    
    /* Comment-Box */
    .comment-box{
        padding: 10px;
        overflow: hidden;
    }
    .comment-box .user{
        display: flex;
        width: min-content;
        flex-wrap: nowrap;
    }
    .comment-box .image img{
        width: 24px;
        height: 24px;
        margin-right: 10px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
    }
    .comment-box textarea{ 
        background: #eee;
        width: 100%;
        height: 152px;
        margin: 10px 0;
        padding: 10px;
        resize: inherit;
        border-radius: 5px;
        box-shadow: 0 0 0 1px #0003;
    }
    .comment-box textarea:focus-visible{
    box-shadow: inset 0 0 0 1px #009cff;
    outline: none;
    }
    .comment-box .comment-submit{
        float: right;
        padding: 6px 10px;
        border: none;
        background: #009cff;
        color: #eee;
        cursor: pointer;
        border-radius: 3px;
    }
    .comment-box .comment-submit:hover{
        background: #0076bf;
    }
    .rating-wrapper {
        display: inline-block;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    .ratings {
        display: flex;
         margin-top: 12px;
        
    }

    .ratings span {
        cursor: pointer;
        transition: color .2s, transform .2s;
        font-size: 50px;
    }

    .ratings span:hover,
    .ratings span:hover ~ span {
        color: orange;
        transform: scale(1.3);
    }

    .ratings span.selected {
        color: orange;
    }

</style>