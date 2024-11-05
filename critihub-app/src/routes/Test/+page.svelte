<script>
    import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
    import { onMount } from "svelte";
    
    let inputFile;
    let img;

    const storage = getStorage();
    let cover_name = "cover1"
    $:storageRef = ref(storage, `covers/${cover_name}`);
    

    let gsReference = ref(storage, 'covers/42129-729588-20230405074853.jpg');


</script>
<br><br><br><br><br>


<center>
    <input type="file" bind:this={inputFile} on:change={()=>{cover_name = inputFile.files[0].name}}>
    <br><br><br>
    <button on:click={async()=>{
        uploadBytes(storageRef, inputFile.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef)
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'
                    // Or inserted into an <img> element
                    
                    img.setAttribute('src', url);
                    console.log(url);
                })
                .catch((error) => {
                    // Handle any errors
                });
        });
        
    }
    }>upload</button>

    <img src="" alt="" bind:this={img}>

</center>

<style>
    img {
        width: 250px;
        margin: auto;
    }
</style>