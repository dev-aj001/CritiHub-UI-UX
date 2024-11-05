<script>
    export let rating = 0;
  
    // Función para generar las estrellas
    function getStars(rating) {
      const fullStars = Math.floor(rating); // Estrellas llenas
      const halfStar = (rating - fullStars >= 0.5) ? 1 : 0; // Estrella a medias
      const emptyStars = 5 - fullStars - halfStar; // Estrellas vacías
  
      const stars = [];
  
      // Agregar estrellas llenas
      for (let i = 0; i < fullStars; i++) {
        stars.push('bxs-star');
      }
  
      // Agregar estrella a medias
      if (halfStar) {
        stars.push('bxs-star-half');
      }
  
      // Agregar estrellas vacías
      for (let i = 0; i < emptyStars; i++) {
        stars.push('bx-star');
      }
  
      return stars;
    }
  </script>
  
  <div class="rating">
    {#each getStars(rating) as star}
      <i class="bx {star}"></i>
    {/each}
  </div>