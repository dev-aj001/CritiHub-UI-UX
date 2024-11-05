<script>
    import { Grid, h } from "gridjs";
    import "gridjs/dist/theme/mermaid.css";
    import { onMount } from "svelte";
    import { db } from "$lib/firebase";
    import ModalEditar from "../../componentes/Modal_EditarUsuarios.svelte";
    import {
        collection,
        query,
        where,
        onSnapshot,
        deleteDoc,
        doc,
    } from "firebase/firestore";
    import { idu } from "$lib/stores.js";
    let items = [];

    var table;
    let grid = new Grid({
        columns: [
                "ID",
                "Nombre",
                "Correo",
                "Genero",
                "Edad",
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
                        );
                    },
                },
            ],
        language: {
        search: {
            placeholder: "Buscando...",
        },
        pagination: {
            previous: "Anterior",
            next: "Siguiente",
            to: "a",
            of: "de",
            showing: "Mostrando de",
            results: () => "Resultados",
        },
        },
        search: true,
        sort: true,
        height: "400px",
        resizable: true,
        pagination: {limit: 5},
        data: items,
        style: {
    table: {
      border: 'none',
      'font-size': '0.9rem',
    },
    th: {
      'background-color': '#ff6d19',
      color: '#fff',
      'border-bottom': '3px solid #ccc',
      'text-align': 'center'
    },
    td: {
      'text-align': 'center',
      'background-color': '#172c3a',
      color: '#fff',
    },
    footer: {
        'background-color': '#172c3a',
        color: '#fff',
    }
    }
    });

    onMount(async () => {
        grid.render(table);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const aItems = [];
        querySnapshot.forEach((doc) => {
            let i = [
                doc.id,
                doc.data().nombre,
                doc.data().email,
                doc.data().genero,
                doc.data().edad,
            ];
            aItems.push(i);
        });
        items = [...aItems];
        console.log(items);
        updateTable();
    });
    });

    function updateTable() {
        grid.updateConfig({
            data: items,
        }).forceRender();
    }

    const q = query(collection(db, "usuariosnew"));

    function editAction(row) {
        showModal2 = true;
       $idu = row.cells[0].data;
        showModal_EditarPublicacion = true;
    }
    
   
    async function deleteAction(row) {
        $idu = row.cells[0].data;
    }

    var showModal2 = false;
    

</script>

<ModalEditar bind:showModal_EditarPublicacion={showModal2}/>
<div class="table-container">
    <div class="table" bind:this={table}></div>
</div>

<style>
    .table-container {
        position: relative;
    }
</style>
