<script lang="ts">
	import { render } from "svelte/server";

    let { children } = $props();  
</script>

<div class="container">
    {@render children()}
</div>


<style>
    .container {
        width: 100%;
        height: 100%;
        background-color: white;
        padding: 20px;
        border-radius: 20px;
    }
</style>