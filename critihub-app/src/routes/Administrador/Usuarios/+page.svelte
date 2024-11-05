<script>
  import Modal1 from "../../../componentes/Modal_Admin.svelte";
  import Modal2 from "../../../componentes/Modal_Login.svelte";
  import { app } from "$lib/firebase";
  import {
    getFirestore,
    collection,
    onSnapshot,
    getDocs,
    doc,
    setDoc,
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";

  const db = getFirestore(app);
  // optener el servicio de Authentication
  const auth = getAuth(app);

  let showModal = false;
  let showModalp = false;
  //const q = query(collection(db, "usuariosnew"));
  let idpeli = "";
  let titulo = "";
  let rating = "";
  let sinopsis = "";
  let trailer = "";
  let subcategoria = [];
  let baner = "";
  let cover = "";

  const unsub = onSnapshot(
    doc(db, "usuariosnew", "0jBtn64PkFTlh76B0rQo"),
    (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc.data());
    },
  );

  async function obtenerDatosFirestore() {
    // const querySnapshot = await getDocs(
    //   collection(db, "Peliculas", "1", "reseñas"),
    // );
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    try {
      onSnapshot(collection(db, "usuariosnew"), (querySnapshot) => {
        const tablaBody = document.querySelector("#tablaDatos tbody");
        tablaBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const fila = document.createElement("tr");
          fila.innerHTML = `
        <td>${data.uid}</td>
        <td>${data.nombre}</td>
        <td>${data.email}</td>
        <td>${data.rol}</td>
        <td>${data.edad}</td>
        <td>${data.genero}</td>
        <!-- Agrega más columnas según los datos que tengas -->
      `;
          tablaBody.appendChild(fila);
        });
      });
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  }

  // Uso de la funcion
  obtenerDatosFirestore();

  async function crearPubli() {
    try {
      // Intenta añadir un nuevo documento a la colección "users" en Firestore
      const docRef = await setDoc(doc(db, "Peliculas", idpeli), {
        baner: baner,
        cover: cover,
        id: idpeli,
        titulo: titulo,
        rating: rating,
        sinopsis: sinopsis,
        trailer: trailer,
        tags: subcategoria.split(",").map((elemento) => elemento.trim()),
      });
      // Si se añade correctamente, imprime en la consola el ID del documento creado
      console.log("Documento escrito con ID: ", idpeli);
    } catch (e) {
      // Si ocurre algún error, imprime el error en la consola
      console.error("Error al añadir el documento: ", e);
    }
  }
</script>

<section>
  <div class="contenedor admin">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group mb-4">
          <h3>Usuarios</h3>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group mb-4">
          <button on:click={() => (showModal = true)} class="btn btn-primary"
            >Agregar</button
          >
          <button class="btn btn-primary">Inabilitar</button>
          <button class="btn btn-primary">Eliminar</button>
          <button class="btn btn-primary">Actulizar</button>
        </div>
      </div>
    </div>
    <table class="contenedor table" id="tablaDatos">
      <thead>
        <tr>
          <th> UID </th>
          <th> NOMBRE </th>
          <th> CORREO </th>
          <th> ROL </th>
          <th> EDAD </th>
          <th> Genero </th>
        </tr>
      </thead>
      <tbody> </tbody>
    </table>
  </div>

  <div class="contenedor mi-div">
    <h3>Publicaciones</h3>
    <div class="form-group mb-4">
      <button on:click={() => (showModalp = true)} class="btn">Agregar</button>
    </div>
    <form class="publicacion" action="#">
      <h1>Agregar Publicación</h1>
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select>
          <option value="Peliculas">Peliculas</option>
          <option value="Series">Series</option>
          <option value="Juegos">Juegos</option>
        </select>
      </div>
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" bind:value={idpeli} />
      </div>
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input type="text" bind:value={titulo} />
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="text" bind:value={rating} />
      </div>
      <div class="form-group">
        <label for="sinopsis">Sinopsis:</label>
        <input type="text" bind:value={sinopsis} />
      </div>
      <div class="form-group">
        <label for="subcategoria">Subcategoría:</label>
        <input type="text" bind:value={subcategoria} />
      </div>
      <div class="form-group">
        <label for="trailer">Trailer:</label>
        <input type="text" bind:value={trailer} />
      </div>
      <div class="form-group">
        <label for="Poster">Poster:</label>
        <input type="text" bind:value={cover} />
      </div>
      <div class="form-group">
        <label for="Baner">Baner:</label>
        <input type="text" bind:value={baner} />
      </div>
      <div class="form-group">
        <button on:click={crearPubli} class="btn">Agregar</button>
      </div>
    </form>
  </div>
</section>

<Modal1 bind:showModal></Modal1>

<Modal2 bind:showModalp></Modal2>

<style>
  .publicacion {
    color: black;
  }
  .table {
    color: black;
  }
  .table th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }
  .table th {
    background-color: #f2f2f2;
  }

  .mi-div {
    margin: 0 auto;
    margin-top: 3rem;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 2rem;
  }

  .form-group button {
    background-color: #025e73;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .form-group button:hover {
    background-color: #f25c05;
  }
  h3 {
    color: #f25c05;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .admin {
    margin-top: 3rem;
    background-color: #ffffff;

    margin: 0 auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
