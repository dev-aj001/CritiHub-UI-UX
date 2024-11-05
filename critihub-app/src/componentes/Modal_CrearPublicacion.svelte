<script>
	import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
	import { collection, addDoc } from "firebase/firestore";
	import { db } from "$lib/firebase";

	export let showModal_Publicacion;
	let dialog;
	let inputCover;
	let inputBanner;
	let coverView;
	let bannerView;
	let coverName;
	let bannerName;
	let coverURL;
	let bannerURL;
	const storage = getStorage();

	let titulo = "";
	let trailer = "";
	let categoria = "";
	let rating = "";
	let tags = "";
	let sinopsis = "";

	$: if (dialog && showModal_Publicacion) dialog.showModal();

	$: coverRef = coverName ? ref(storage, `covers/${coverName}`) : null;
	$: bannerRef = bannerName ? ref(storage, `banners/${bannerName}`) : null;

	async function uploadFiles() {
		try {
			// Carga y obtención de URL para la portada (cover)
			if (inputCover.files[0]) {
				const coverSnapshot = await uploadBytes(coverRef, inputCover.files[0]);
				console.log('Cover file uploaded!');
				coverURL = await getDownloadURL(coverRef);
			}

			// Carga y obtención de URL para el banner
			if (inputBanner.files[0]) {
				const bannerSnapshot = await uploadBytes(bannerRef, inputBanner.files[0]);
				console.log('Banner file uploaded!');
				bannerURL = await getDownloadURL(bannerRef);
			}

			// Aquí puedes proceder con el siguiente proceso, ya que ambas cargas han sido exitosas
			console.log('Both files uploaded successfully:', { coverURL, bannerURL });
			
			// Realiza el siguiente proceso aquí
			await createPub();

			// Restablecer el formulario después de subir los archivos
			resetForm();

		} catch (error) {
			// Maneja cualquier error
			console.error('Error uploading files:', error);
		}
	}

	async function createPub() {
		const docRef = await addDoc(collection(db, "Publicaciones"), {
			titulo: titulo,
			trailer: trailer,
			cover: coverURL,
			banner: bannerURL,
			categoria: categoria,
			sinopsis: sinopsis,
			rating: rating,
			tags: tags.split(",").map((elemento) => elemento.trim()),
			ratingpromediado: "",
		});

		console.log("Document written with ID: ", docRef.id);
	}

	function resetForm() {
		titulo = "";
		trailer = "";
		coverURL = "";
		bannerURL = "";
		categoria = "";
		sinopsis = "";
		rating = "";
		tags = "";
		inputCover.value = "";
		inputBanner.value = "";
		coverName = "";
		bannerName = "";
		coverView.style.backgroundImage = "";
		coverView.style.backgroundColor = '';
		coverView.innerHTML = `<img src="/img/Upload.png" style="margin-top: 20px; width: 50px;"/><p style="font-size: 0.9rem;">Arrastra y suelta o haz click aquí <br>para subir una imagen</p><span style="font-size: 0.4rem;">Sube cualquier imagen desde tu computadora</span>`;
		bannerView.style.backgroundImage = "";
		bannerView.style.backgroundColor = '';
		bannerView.innerHTML = `<img src="/img/Upload.png" style="margin-top: 20px; width: 50px; /><p style="font-size: 0.9rem;">Arrastra y suelta o haz click aquí <br>para subir una imagen</p><span style="font-size: 0.4rem;">Sube cualquier imagen desde tu computadora</span>`;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal_Publicacion = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="modal-conainer">
			<h2>Crear nueva publicación</h2>
			<form class="form">
				<div class="input-box">
					<label for="titulo">Titulo</label>
					<input
						type="text"
						name="titulo"
						id="titulo"
						placeholder="Titulo de publicación"
						required
						bind:value={titulo}
					/>
				</div>
				<div class="input-box">
					<label for="sinopsis">Sinopsis</label>
					<textarea
						name="textarea"
						rows="5"
						placeholder="Sinopsis de la publicacion"
						bind:value={sinopsis}
					></textarea>
				</div>

				<div class="input-box" >
					<label for="trailer">Trailer</label>
					<input
						type="text"
						name="trailer"
						id="trailer"
						placeholder="URL del trailer"
						required
						bind:value={trailer}
					/>
				</div>
				<div class="row">
					<div class="input-box">
						<label for="calif">Calificación</label>
						<input
							type="text"
							name="calif"
							id="calif"
							placeholder="0-5"
							required
							bind:value={rating}
						/>
					</div>
					<div class="input-box slt">
						<label for="categ">Categoria</label>
						<div class="select-box">
							<select name="categ" id="categ" bind:value={categoria}>
								<option value="peliculas">peliculas</option>
								<option value="series">series</option>
								<option value="juegos">juegos</option>
							</select>
						</div>
					</div>
				</div>
				<div class="input-box">
					<label for="tags">Etiquetas</label>
					<input
						type="text"
						name="tags"
						id="tags"
						placeholder="Etiqueta1, Etiquetas2, ..."
						required
						bind:value={tags}
					/>
				</div>

				<!-- IMGs INPUTS  -->
				<div class="img-drops">
					<div class="col-cover">
						<p>Cover</p>
						<label for="cover" class="drop-cover drop-area">
							<!-- svelte-ignore missing-declaration -->
							<input
								type="file"
								id="cover"
								accept="image/*"
								required
								hidden
								bind:this={inputCover}
								on:change={() => {
									let imgLink = URL.createObjectURL(inputCover.files[0]);
									coverView.style.backgroundImage = `url(${imgLink})`;
									coverView.style.backgroundColor = 'black';
									coverView.textContent = "";
									coverName = inputCover.files[0].name;
								}}
							/>
							<div class="img-view" bind:this={coverView}>
								<img src="/img/Upload.png" />
								<p>
									Arrastra y suelta o haz click aquí <br />para subir una imagen
								</p>
								<span>Sube cualquier imagen desde tu computadora</span>
							</div>
						</label>
					</div>

					<div class="col-banner">
						<p>Banner</p>
						<label for="banner" class="drop-banner drop-area">
							<!-- svelte-ignore missing-declaration -->
							<input
								type="file"
								id="banner"
								accept="image/*"
								required
								hidden
								bind:this={inputBanner}
								on:change={() => {
									let imgLink = URL.createObjectURL(inputBanner.files[0]);
									bannerView.style.backgroundImage = `url(${imgLink})`;
									bannerView.style.backgroundColor = 'black';
									bannerView.textContent = "";
									bannerName = inputBanner.files[0].name;
								}}
							/>
							<div class="img-view" bind:this={bannerView}>
								<img src="/img/Upload.png" />
								<p>
									Arrastra y suelta o haz click aquí <br />para subir una imagen
								</p>
								<span>Sube cualquier imagen desde tu computadora</span>
							</div>
						</label>
					</div>
				</div>

				<div class="actions">
					<button class="btn danger publicar" on:click|preventDefault={() => dialog.close()}>Cancelar</button>
					<button type="submit" class="btn primary publicar" on:click|preventDefault={uploadFiles}>Publicar</button>
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
		background-size: cover;
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
