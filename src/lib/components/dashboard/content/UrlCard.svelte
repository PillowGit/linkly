<script lang="ts">
	import { page } from '$app/state';
	import type { Url } from '$lib/types';
	let { urlData, ...others } = $props();

	import EditUrlMenu from '../menus/EditUrlMenu.svelte';
	import Analytics from './Analytics.svelte';

	const page_url = page.url.origin;
	const redirect_url = `${page_url}/${urlData.id}`;

	let delete_form: HTMLFormElement;
	let show_edit_url_menu = $state(false);
	let show_analytics = $state(false);

	function CopyURL(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		if (confirm(`Copy ${redirect_url} to your clipboard?`)) {
			navigator.clipboard.writeText(redirect_url);
		}
	}
	function ShowAnalytics(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		show_analytics = false;
		show_analytics = true;
	}
	function ShowEditUrlMenu(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		show_edit_url_menu = false;
		show_edit_url_menu = true;
	}
	function Delete(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		if (confirm(`Are you sure you want to delete the shortlink ${urlData.title}?`)) {
			delete_form.submit();
		}
	}
	function Unimplemented(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		alert('This feature is not implemented yet');
	}
</script>

<div
	class="border-transparent-mixed bg-bg text-fg mb-6 ml-6 flex h-44 min-w-72 flex-col items-start justify-between rounded-lg border-2"
>
	<!-- Link Icons -->
	<div class="mt-4 flex h-8 w-full items-center justify-between">
		<img src="/icons/link_icon.svg" alt="Link Icon" class="ml-4 aspect-square h-8" />
		<div
			role="button"
			class="mr-4 transition hover:scale-110 hover:cursor-pointer hover:invert-25 focus:scale-110 focus:invert-25"
			aria-pressed="false"
			tabindex="0"
			onclick={CopyURL}
			onkeydown={CopyURL}
		>
			<img src="/icons/copy_icon.svg" alt="Copy Icon" class="aspect-square h-8" />
		</div>
	</div>
	<!-- Link Title/URL -->
	<div class="ml-4 flex w-full flex-col items-start justify-center">
		<div class="text-lg font-bold"><h4>{urlData.title}</h4></div>
		<a
			href={redirect_url}
			target="_blank"
			rel="noopener noreferrer"
			class="transition hover:font-medium focus:font-medium"
			><div class="text-sm underline"><p>linkly.sh/{urlData.id}</p></div></a
		>
	</div>
	<!-- Buttons -->
	<div class="mx-4 mb-4 flex h-6 w-[90%] items-center justify-between">
		<!-- View Analytics -->
		<div
			class="mr-1 flex h-full items-center justify-center text-xs transition hover:scale-105 hover:cursor-pointer hover:font-medium focus:scale-105 focus:font-medium"
			role="button"
			aria-pressed="false"
			tabindex="0"
			onclick={ShowAnalytics}
			onkeydown={ShowAnalytics}
		>
			<img
				src="/icons/small_analytics_icon.svg"
				alt="Analytics Icon"
				class="mr-1 aspect-square h-[80%]"
			/>
			<p>View Analytics</p>
		</div>
		<!-- Spacer -->
		<div class="border-transparent-mixed mx-2 h-full border-[0.5px]"></div>
		<!-- Edit -->
		<div
			class="text-complement2 mr-1 flex h-full items-center justify-center text-xs transition hover:scale-105 hover:cursor-pointer hover:font-medium focus:scale-105 focus:font-medium"
			role="button"
			aria-pressed="false"
			tabindex="0"
			onclick={ShowEditUrlMenu}
			onkeydown={ShowEditUrlMenu}
		>
			<img src="/icons/small_edit_icon.svg" alt="Edit Icon" class="mr-1 aspect-square h-[80%]" />
			<p>Edit</p>
		</div>
		<!-- Spacer -->
		<div class="border-transparent-mixed mx-2 h-full border-[0.5px]"></div>
		<!-- Trash/Delete -->
		<form bind:this={delete_form} method="POST" action="?/delete">
			<input type="hidden" name="id" bind:value={urlData.id} />
			<div
				class="mr-1 transition hover:scale-110 hover:cursor-pointer focus:scale-110"
				role="button"
				aria-pressed="false"
				tabindex="0"
				onclick={Delete}
				onkeydown={Delete}
			>
				<img src="/icons/small_trash_icon.svg" alt="Trash Icon" class="aspect-square h-[80%]" />
			</div>
		</form>
	</div>
</div>
<EditUrlMenu showing={show_edit_url_menu} {urlData} />
<Analytics showing={show_analytics} {urlData} />
