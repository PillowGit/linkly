<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Linkly</title>
<div
	class="bg-bg dark:bg-bgd text-fg dark:text-fgd flex min-h-screen min-w-screen flex-col items-center justify-center font-light"
>
	{@render children()}
</div>
