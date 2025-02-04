<script>
	import '../app.css';
	let { children } = $props();
</script>

<title>Linkly</title>
<div class="min-w-screen flex min-h-screen flex-col items-center justify-center">
	{@render children()}
</div>
