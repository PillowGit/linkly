<script lang="ts">
	import { animate } from 'motion';
	import { onMount } from 'svelte';

	let elem: HTMLDivElement;

	onMount(() => {
		animate(elem, { y: [-5, 5, -5] }, { duration: 4, repeat: Infinity });
	});
</script>

<div bind:this={elem} class="text-3xl font-bold">Linkly coming soon</div>
