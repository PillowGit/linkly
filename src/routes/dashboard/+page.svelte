<script lang="ts">
	import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
	import { page } from '$app/state';
</script>

<Dashboard session={page.data.session} />
