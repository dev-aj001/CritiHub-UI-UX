import { error } from '@sveltejs/kit';
import { doc, getDoc } from "firebase/firestore";
import { db } from "$lib/firebase.js";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let id = params.slug;
	const docRef = doc(db, "Publicaciones", id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		
		const nDoc = {
			data: docSnap.data(),
			id: id,
		};
		
		return nDoc;
	  } else {
		// docSnap.data() will be undefined in this case
		console.log("No such document!");
		error(404,'Not Found');
	  }
}