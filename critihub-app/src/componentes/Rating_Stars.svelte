<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let rating2 = writable(0);

    function handleClick(event) {
        const selectedRating = event.target.dataset.rating;
        rating2.set(Number(selectedRating));
        localStorage.setItem('rating', selectedRating);
    }

    onMount(() => {

        const savedRating = localStorage.getItem('rating');
        if (savedRating) {
            rating2.set(Number(savedRating));
        }
    });

    let stars = Array(5).fill(0).map((_, i) => i + 1);
</script>

<style>
    .rating-wrapper {
        border: thin solid #555;
        display: inline-block;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    .ratings {
        display: flex;
    }

    .ratings span {
        cursor: pointer;
        transition: color .2s, transform .2s;
        font-size: 50px;
    }

    .ratings span:hover,
    .ratings span:hover ~ span {
        color: orange;
        transform: scale(1.3);
    }

    .ratings span.selected {
        color: orange;
    }
</style>

<div class="rating-wrapper">
    <div class="ratings">
        {#each stars as star}
            <span
                class:selected={star <= $rating2}
                data-rating={star}
                on:click={handleClick}
            >&#9733;</span>
        {/each}
    </div>
</div>