<script lang="ts">
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import { page } from '$app/state';
</script>

<div class="hidden md:block">
	<Dashboard session={page.data.session} />
</div>
<div class="block md:hidden">
	<p>Only PC view is done so far</p>
	<a href="/" class="text-blue-500">Back to Home</a>
</div>
