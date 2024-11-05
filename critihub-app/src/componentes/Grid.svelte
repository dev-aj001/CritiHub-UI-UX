<script>
    import Card from "../componentes/Card.svelte";

    export let categoria = "categoria" ;
    export let items;

    console.log(items);

</script>

<section class="movies contenedor" id="movies">
    <!-- Titulo -->
    <div class="heading">
        <h2 class="heading-title">{categoria}</h2>
    </div>
    <!-- Contenido -->
    <div class="content-container">
        {#each items as item}
            <Card {item} {categoria}/>
        {/each}
    </div>
</section>

<style>

section {
    padding: 5rem 0 2rem !important;
  }

    /* Popular */
    .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--container-color);
        padding: 8px 14px;
        border: 1px solid rgba(133, 133, 133, 0.5);
        margin-bottom: 1rem;
    }

    .heading-title {
        font-size: 1.5rem;
        font-weight: 500;
    }

    .movies .heading{
        padding: 10px 14px;
    }

    .content-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(247px, 1fr));
        gap: 1.5rem;
    }
</style>