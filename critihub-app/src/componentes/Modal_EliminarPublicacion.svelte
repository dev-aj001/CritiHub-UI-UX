<script>
	import { idP } from "$lib/stores";
	import { doc, getDoc, deleteDoc } from "firebase/firestore";
	import { db } from "$lib/firebase";

    export let showModal_EliminarPublicacion;
    let dialog;
    let titulo = "";
    let id = "";

    // Mostrar el modal si la variable de control cambia
    $: if (dialog && showModal_EliminarPublicacion) dialog.showModal();

    // Observar cambios en idP y ejecutar fetchDoc cuando cambia
    $: idP.subscribe(value => {
        id = value;
        if (id) {
            fetchDoc(id);
        }
    });

	async function fetchDoc(id){
		if (!id || typeof id !== 'string') {
			console.error('Invalid document ID');
			return;
		}
		const docRef = doc(db, "Publicaciones", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			titulo = docSnap.data().titulo;
		} else {
			console.log("No such document!");
		}
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal_EliminarPublicacion = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
        
        <div class="modal-conainer">
			<h2>¿Seguro que deseas eliminar esta publicación?</h2>
			<h5>ID: </h5><span>{id}</span>
			<h5>Nombre: </h5><span>{titulo}</span>
        </div>
        <div class="actions">
			<button class="btn danger" on:click={() => dialog.close()}>Cancelar</button>
			<button class="btn success" on:click={async() => {await deleteDoc(doc(db, "Publicaciones", id)).then(dialog.close()); }}>Eliminar</button>
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		 
	</div>
</dialog>

<style>
    .modal-conainer {
		position: relative;
        height: 150px;
        width: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
    }

	.modal-conainer h2 {
		color: #e93737;
		margin-bottom: 15px;
	}

	span {
		color: var(--main-color);
	}

	.actions {
		display: flex;
		flex-direction: row;
		justify-content: end;
		column-gap: 10px;
	}

	dialog {
        margin: auto;
		border-radius: 0.4em;
		border: none;
		padding: 0;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog > div {
		padding: 1em;
        position: relative;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
    }
</style>