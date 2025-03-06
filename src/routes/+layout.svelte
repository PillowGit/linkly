<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Linkly</title>
<div
	class="text-fg dark:text-fgd flex min-h-[80vh] min-w-screen flex-col items-center justify-center font-light md:min-h-screen"
>
	{@render children()}
</div>
