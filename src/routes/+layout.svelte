<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<title>Linkly</title>
<div
	class="text-complement bg-dark flex min-h-screen min-w-screen flex-col items-center justify-center"
>
	{@render children()}
</div>
