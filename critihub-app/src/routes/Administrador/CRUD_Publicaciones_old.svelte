<script>
    import { onMount } from "svelte";
    import { Grid, h } from "gridjs";
    import "gridjs/dist/theme/mermaid.css";
    import { db } from "$lib/firebase"; // Asegúrate de importar tu configuración de Firebase
    import { collection, query, where, onSnapshot, deleteDoc, doc  } from "firebase/firestore";
    import { writable } from "svelte/store";
    import ModalCrear from "../../componentes/Modal_CrearPublicacion.svelte";
    import ModalEditar from "../../componentes/Modal_EditarPublicacion.svelte";
    import { goto } from '$app/navigation';

    let tablaGJS;
    let items = writable([]);

    async function fetchData() {
        const q = query(
            collection(db, "Publicaciones"),
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aItems = [];
            querySnapshot.forEach((doc) => {
                let i = [
                    doc.id,
                    doc.data().titulo,
                    doc.data().categoria,
                    doc.data().rating,
                ];
                aItems.push(i);
            });
            items.set(aItems);
        });

        return () => unsubscribe();
    }

    onMount(() => {
        fetchData();
    });

    async function deleteAction(row){
        await deleteDoc(doc(db, "Publicaciones",  row.cells[0].data));
        goto('/').then(
            () => goto('/Administrador')
        );
    }


    
    // Usar una suscripción a la variable writable para inicializar Grid.js
    $: if ($items.length && tablaGJS) {
        initializeGrid($items);
    }

    function initializeGrid(data) {
        tablaGJS.innerHTML = ""; // Limpia el contenido previo si es necesario

        new Grid({
            columns: [
                "ID",
                "Titulo",
                "Categoria",
                "Rating",
                {
                    name: "Actions",
                    formatter: (cell, row) => {
                        return h(
                            "div",
                            { className: "actions-container" },
                            h(
                                "button",
                                {
                                    className: "btn warning",
                                    onClick: () => editAction(row),
                                },
                                h(
                                    "i",
                                    {
                                        className: "bx bxs-pencil tbl-btn"
                                    }
                                ),
                            ),
                            h(
                                "button",
                                {
                                    className: "btn danger",
                                    onClick: () => deleteAction(row),
                                },
                                h(
                                    "i",
                                    {
                                        className: "bx bxs-trash tbl-btn "
                                    }
                                ),
                            ),
                            h(
                                "button",
                                {
                                    className: "btn success",
                                    onClick: () => viewAction(row),
                                },
                                h(
                                    "i",
                                    {
                                        className: "bx bxs-binoculars tbl-btn "
                                    }
                                ),
                            ),
                        );
                    },
                },
            ],
            search: true,
            sort: true,
            fixedHeader: true,
            height: "400px",
            className: {
                td: "my-custom-td-class",
                table: "custom-table-classname",
            },
            pagination: {
                limit: 5,
            },
            data: data,
        }).render(tablaGJS);

        
    }

    function editAction(row) {
        showModal2 = true;
        // console.log("Edit action for", row.cells[0].data);
        // Aquí puedes agregar la lógica de edición
    }

    // async function deleteAction(row) {
    //     console.log(row.cells[0].data);
    //     await deleteDoc(doc(db, "Publicaciones",  row.cells[0].data));
    //     initializeGrid($items);
    //     // Aquí puedes agregar la lógica de eliminación
    // }

    function viewAction(row) {
        goto(`/Pelicula/${row.cells[0].data}`);
        // Aquí puedes agregar la lógica de eliminación
    }


    let showModal1 = false;
    let showModal2 = false;

</script>

<ModalCrear bind:showModal_Pulicacion={showModal1}/>
    <ModalEditar bind:showModal_EditarPublicacion={showModal2}/>
    <div class="contenedor cntd">
        <button class="btn primary mbtn" on:click={()=>{showModal1=true}}>Nuevo</button>
        <h3 class="mh3">Publicaciones</h3>
        <div class="table-container" bind:this={tablaGJS}>
        </div>
    </div>

<style>
    .cntd {
        position: relative;
    }

    .mbtn {
        position: absolute;
        right: 10px;
        top: 20px;
        z-index: 50;
    }

    .mh3 {
        position: absolute;
        color: var(--main-color);
        z-index: -50;
        top: 25px;
        left: 280px;
    }

    .table-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 10px;
    }
</style>
