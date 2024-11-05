<script>
    import Grid from "../../componentes/Grid.svelte";
    import { juegos } from "$lib/stores.js";
</script>

<Grid categoria="Juegos" items={$juegos}/>