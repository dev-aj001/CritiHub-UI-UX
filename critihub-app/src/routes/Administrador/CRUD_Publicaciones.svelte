<script>
    import { Grid, h } from "gridjs";
    import "gridjs/dist/theme/mermaid.css";
    import { onMount } from "svelte";
    import { db } from "$lib/firebase";
    import { goto } from "$app/navigation";
    import {
        collection,
        query,
        where,
        onSnapshot,
        deleteDoc,
        doc,
    } from "firebase/firestore";
    import ModalPublicacion from "../../componentes/Modal_CrearPublicacion.svelte";
    import ModalEditPublicacion from "../../componentes/Modal_EditarPublicacion.svelte";
    import ModalDeletePublicacion from "../../componentes/Modal_EliminarPublicacion.svelte";
    import { idP } from "$lib/stores.js";

    let showModal_Publicacion = false;
    let showModal_EditarPublicacion = false;
    let showModal_EliminarPublicacion = false;
    let items = [];

    var table;
    let grid = new Grid({
        columns: [
            "id",
            "titulo",
            "categoria",
            "rating",
            {
                name: "Actions",
                sort: false,
                formatter: (cell, row) => {
                    return h(
                        "div",
                        { className: "actions-container" },
                        h(
                            "button",
                            {
                                className: "btn warning",
                                onClick: () => updateAction(row),
                            },
                            h("i", {
                                className: "bx bxs-pencil tbl-btn",
                            }),
                        ),
                        h(
                            "button",
                            {
                                className: "btn danger",
                                onClick: () => deleteAction(row),
                            },
                            h("i", {
                                className: "bx bxs-trash tbl-btn ",
                            }),
                        ),
                        h(
                            "button",
                            {
                                className: "btn success",
                                onClick: () => viewAction(row),
                            },
                            h("i", {
                                className: "bx bxs-binoculars tbl-btn ",
                            }),
                        ),
                    );
                },
            },
        ],
        search: true,
        sort: true,
        height: "400px",
        resizable: true,
        pagination: { limit: 5 },
        data: items,
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
        style: {
            table: {
                border: "none",
                "font-size": "0.9rem",
            },
            th: {
                "background-color": "#ff6d19",
                color: "#fff",
                "border-bottom": "3px solid #ccc",
                "text-align": "center",
            },
            td: {
                "text-align": "center",
                "background-color": "#172c3a",
                color: "#fff",
            },
            footer: {
                "background-color": "#172c3a",
                color: "#fff",
            },
        },
    });

    onMount(async () => {
        grid.render(table);
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

    const q = query(collection(db, "Publicaciones"));

    function viewAction(row) {
        let cate = row.cells[2].data;
        cate = cate.charAt(0).toUpperCase() + cate.slice(1);
        goto(`/${cate}/${row.cells[0].data}`);
    }

    async function updateAction(row) {
        $idP = row.cells[0].data;
        showModal_EditarPublicacion = true;
    }

    async function deleteAction(row) {
        $idP = row.cells[0].data;
        showModal_EliminarPublicacion = true;
    }
</script>

<ModalPublicacion bind:showModal_Publicacion={showModal_Publicacion} />
<ModalEditPublicacion bind:showModal_EditarPublicacion />
<ModalDeletePublicacion bind:showModal_EliminarPublicacion />

<div class="table-container">
    <div class="add-container">
        <p>Agregar publicación</p>
        <button
            class="add btn primary"
            on:click={() => {
                showModal_Publicacion = true;
            }}
        >
            <i class="bx bx-plus"></i>
        </button>
    </div>
    <div class="table" bind:this={table}></div>
</div>

<style>
    .table-container {
        position: relative;
    }

    .add-container {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        column-gap: 10px;
        z-index: 10;
    }

    .add {
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add .bx {
        font-size: 1.4rem;
        font-weight: 600;
    }

    .add p {
        font-size: 0.6rem;
    }
</style>
