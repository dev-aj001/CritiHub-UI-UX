<script>
    import Grid from "../../componentes/Grid.svelte";
    import { movies } from "$lib/stores.js";

</script>

<Grid categoria="Peliculas" items={$movies}/>