<script>
    export let item = [];
    export let categoria = '';

    $: colorTag = (cal) => {
        if (cal < 2) {
            return 'red';
        } else if (cal >= 2.5 && cal < 4) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    //export let tags = ['accion', 'trama']
    let tags = Array.isArray(item.data.tags) ? item.data.tags.slice(0, 4) : [];

</script>

<div class="swiper-slide">
    <div class="movie-box">
        <img src={item.data.cover} alt="cover" class="movie-box-img">
        <div class="box-text">
            <a href={`${categoria}/${item.id}`}>
                <h2 class="movie-title">{item.data.titulo}</h2>
            </a>
            <span class="movie-type"><div class="tags">
                {#each tags as tag}
                    <span>{tag}</span>
                {/each}
            </div></span>
            <a href={`${categoria}/${item.id}`} class="rating-tag">
                <div class="rating {colorTag(item.data.rating)}">
                    <h3>{item.data.rating}</h3>
                    <i class='bx bxs-star'></i>
                </div>
                <div class="rating {colorTag(item.data.ratingpromediado)}">
                    <h3>{item.data.ratingpromediado}</h3>
                    <i class='bx bxs-star'></i>
                </div>
            </a>
        </div>
    </div>
</div>


<style>

    a {
        color: var(--text-color);
        text-decoration: none;
    }

    .rating-tag {
        display: flex;
        align-items: center;
        column-gap: 0.8rem;
        
    }
    .rating {
        font-size: 15px;
        background-color: var(--main-color);
        width: auto;
        height: 40px;
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
    }
    .rating:hover {
        background-color: var(--hover-color);
        transform: scale(1.05);
        transition: 0.3s linear;
    }

    .green {
        background-color: #2fcb24;
    }

    .yellow {
        background-color: #e8bd22;
    }

    .bx {
        font-size: 1.1rem;
    }

    /* Movie-box */

    .movie-box {
        position: relative;
        width: 100%;
        height: 380px;
        overflow: hidden;

    }

    .movie-box-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .movie-box .box-text {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 14px;
        background: linear-gradient(to bottom, transparent 60%, black);
        overflow: hidden;
    }

    .movie-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .movie-type{
        font-size: 0.93rem;
        margin-right: 30%;
    }

    .rating-tag {
        position: absolute;
        bottom: 0;
        right: 0.4rem;
    }

    .movie-box:hover .movie-box-img{
        transform: scale(1.1);
        transition: 0.3s all linear;
    }

    .tags {
        display: flex;
        align-items: center;
        column-gap: 8px;
        margin-bottom: 10px;
        flex-wrap: wrap;
        row-gap: 5px;
    }

    .tags span {
        background-color: rgba(0, 0, 0, 0.443);
        padding: 0 4px;
        font-size: 12px;
    }

</style>