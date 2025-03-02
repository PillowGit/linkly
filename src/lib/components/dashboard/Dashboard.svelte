<script lang="ts">
	// Import components
	import Sidebar from './sidebar/Sidebar.svelte';
	import Content from './content/Content.svelte';

	// Importing dependencies
	let { session, ...others } = $props();

	// Session details
	const username = session?.user?.name || 'Unknown User';
	const email = session?.user?.email || 'unknown@example.com';
	const image = session?.user?.image || '/icons/example_user_image.svg';
</script>

<Sidebar {username} {email} {image} />
<div class="flex min-h-screen w-screen items-start">
	<div class="w-[22.5vw]"></div>
	<Content {username} {email} {image} />
</div>
