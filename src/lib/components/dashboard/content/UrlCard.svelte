<script lang="ts">
	import type { Url } from '$lib/types';
	let { urlData, ...others } = $props();

	function CopyURL(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		navigator.clipboard.writeText(`https://linkly.sh/${urlData.id}`);
	}
</script>

<div
	class="border-transparent-mixed bg-bg text-fg mx-4 flex h-full min-w-72 flex-col items-start justify-between rounded-lg border-2"
>
	<!-- Link Icons -->
	<div class="mt-4 flex h-8 w-full items-center justify-between">
		<img src="/icons/link_icon.svg" alt="Link Icon" class="ml-4 aspect-square h-8" />
		<div role="button" aria-pressed="false" tabindex="0" onclick={CopyURL} onkeydown={CopyURL}>
			<img
				src="/icons/copy_icon.svg"
				alt="Copy Icon"
				class="mr-4 aspect-square h-8 transition hover:scale-110 hover:cursor-pointer hover:invert-25"
			/>
		</div>
	</div>
	<!-- Link Title/URL -->
	<div class="ml-4 flex w-full flex-col items-start justify-center">
		<div class="text-lg font-bold"><h4>{urlData.title}</h4></div>
		<a href={`https://linkly.sh/${urlData.id}`} target="_blank" rel="noopener noreferrer"
			><div class="text-sm underline"><p>linkly.sh/{urlData.id}</p></div></a
		>
	</div>
	<!-- Buttons -->
	<div class="mx-4 mb-4 flex h-6 w-[90%] items-center justify-between">
		<!-- View Analytics -->
		<div
			class="mr-1 flex h-full items-center justify-center text-xs transition hover:scale-105 hover:cursor-pointer"
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
			class="text-complement2 mr-1 flex h-full items-center justify-center text-xs transition hover:scale-105 hover:cursor-pointer"
		>
			<img src="/icons/small_edit_icon.svg" alt="Edit Icon" class="mr-1 aspect-square h-[80%]" />
			<p>Edit</p>
		</div>
		<!-- Spacer -->
		<div class="border-transparent-mixed mx-2 h-full border-[0.5px]"></div>
		<!-- Trash/Delete -->
		<img
			src="/icons/small_trash_icon.svg"
			alt="Trash Icon"
			class="mr-1 aspect-square h-[80%] transition hover:scale-110 hover:cursor-pointer"
		/>
	</div>
</div>
