<script>
	import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
	import { collection,updateDoc,doc,getDoc } from "firebase/firestore";
	import { db } from "$lib/firebase";
    import { idu } from "$lib/stores";
	export let showModal_EditarPublicacion;
	let dialog;
	const storage = getStorage();

	let nombre = "";
	let correo = "";
	let edad = "";
	let genero = "";
    let id = "";
	

	$: if (dialog && showModal_EditarPublicacion) dialog.showModal();

     // Observar cambios en idP y ejecutar fetchDoc cuando cambia
    $: idu.subscribe(value => {
        id = value;
        if (id) {
            fetchDoc(id);
        }
        console.log(id);
    });
    
	async function fetchDoc(id){
		if (!id || typeof id !== 'string') {
			console.error('Invalid document ID');a
			return;
		}
		const docRef = doc(db,"usuariosnew", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			nombre = docSnap.data().nombre;
            correo = docSnap.data().email;
            edad = docSnap.data().edad;
            genero = docSnap.data().genero;
		} else {
			console.log("No such document!"); 
		}
	}

	
    
	async function createPub() {
		const docRef = await  updateDoc(doc(db, "usuariosnew",id),{
                nombre: nombre,
                edad: edad,
                genero: genero,
        });
        dialog.close();
		console.log("Documento actualizado");
	}

	
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal_EditarPublicacion = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="modal-conainer">
			<h2>Actualizar usuario</h2>
			<form class="form">
				<div class="input-box">
					<label for="titulo">Nombre</label>
					<input
						type="text"
						name="titulo"
						id="titulo"
						placeholder="nombre"
						required
						bind:value={nombre}
					/>
				</div>
				<div class="input-box">
					<label for="sinopsis">Correo</label>
					<textarea
						name="textarea"
						rows="5"
						placeholder="correo"
						bind:value={correo } disabled
					></textarea>
				</div>
				<div class="row">
					<div class="input-box">
						<label for="calif">Edad</label>
						<input
							type="text"
							name="calif"
							id="calif"
							placeholder="edad"
							required
							bind:value={edad}
						/>
					</div>
					<div class="input-box slt">
						<label for="categ">Genero</label>
						<div class="select-box">
							<select name="categ" id="categ" bind:value={genero}>
								<option value="peliculas">Masculino</option>
								<option value="series">Femenino</option>
								<option value="juegos">Prefiero no decir</option>
							</select>
						</div>
					</div>
				</div>
				

				<div class="actions">
					<button class="btn danger publicar" on:click|preventDefault={() => dialog.close()}>Cancelar</button>
					<button type="submit" class="btn primary publicar" on:click|preventDefault={createPub}>Publicar</button>
				</div>
			</form>
		</div>
	</div>
</dialog>
<style>

	.modal-conainer {
		height: auto;
		width: 600px;
	}

	.modal-conainer h2 {
		color: var(--main-color);
	}

	form {
		margin-top: 20px;
	}

	.row {
		display: flex;
		column-gap: 10px;
	}

	form .input-box {
		margin-top: 15px;
	}

	.slt {
		width: 100%;
	}

	.img-drops {
		margin-top: 30px;
		width: 100%;
		display: flex;
		column-gap: 15px;
	}

	form .input-box label {
		color: #333;
		font-weight: 500;
	}

	form :where(.input-box input, .select-box, textarea) {
		position: relative;
		height: 40px;
		width: 100%;
		padding: 0 15px;
		outline: none;
		border: 1px solid #ddd;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 500;
		margin-top: 6px;
	}

	.input-box textarea {
		resize: vertical;
	}

	.select-box select {
		height: 100%;
		width: 100%;
		outline: none;
		border: none;
		font-size: 1rem;
		font-weight: 500;
	}

	.actions {
		display: flex;
		justify-content: end;
		margin-top: 30px;
		column-gap: 10px;
	}

	.drop-area {
		display: block;
		width: 100%;
		height: 270px;
		padding: 20px;
		text-align: center;
		background-color: #ddd;
		border-radius: 0.5rem;
	}

	.col-cover {
		width: 35%;
	}

	.col-banner {
		width: 65%;
	}

	.img-view {
		width: 100%;
		height: 100%;
		border-radius: 0.4rem;
		border: 2px solid #999999;
		background-color: #e7e7e7;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.drop-area img {
		width: 50px;
		margin-top: 20px;
	}

	.drop-area p {
		font-size: 0.9rem;
	}

	.drop-area span {
		font-size: 0.4rem;
	}

	dialog {
		margin: auto;
		border-radius: 0.2em;
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
