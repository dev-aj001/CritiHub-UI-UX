<script>
    import Grid from "../../componentes/Grid.svelte";
    import { series } from "$lib/stores.js";
    

</script>

<Grid categoria="Series" items={$series}/>