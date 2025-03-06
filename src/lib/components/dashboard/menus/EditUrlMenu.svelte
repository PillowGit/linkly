<script lang="ts">
	let { showing, urlData, ...others } = $props();

	interface FormData {
		title: string;
		destination: string;
		id: string;
	}
	let formData: FormData = {
		title: urlData.title,
		destination: urlData.destination,
		id: urlData.id
	};

	function Unimplemented(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		alert('not working yet');
	}
	function StopShowing(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		showing = false;
	}
	function StopPropagation(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		e.stopPropagation();
	}
</script>

<div
	class={showing
		? 'bg-transparent-mixed fixed top-0 left-0 z-20 flex h-screen w-screen flex-col items-center justify-center opacity-100 backdrop-blur-[1.5px] transition'
		: 'bg-transparent-mixed fixed top-0 left-0 -z-30 flex h-screen w-screen flex-col items-center justify-center opacity-0 backdrop-blur-[1.5px] transition'}
	role="button"
	aria-pressed="false"
	tabindex="0"
	onclick={StopShowing}
	onkeydown={StopShowing}
>
	<div
		class="dark:bg-bgd bg-bg z-30 flex max-h-[75vh] min-h-[30vw] min-w-[30vw] flex-col items-center rounded-xl"
		role="menu"
		tabindex="0"
		onclick={StopPropagation}
		onkeydown={StopPropagation}
	>
		<!-- Title -->
		<div class="mt-8 flex w-full items-center justify-between text-2xl font-medium">
			<h1 class="ml-8">Update URL Info</h1>
			<img
				src="/icons/white_link_icon.svg"
				alt="Link Icon"
				class="mr-8 aspect-square h-8 invert-100 dark:invert-0"
			/>
		</div>
		<!-- Form -->
		<div class="mt-12"></div>
		<form method="POST" action="?/update" class="flex w-full flex-col items-center">
			<div class="w-full text-2xl font-medium">
				<h1 class="ml-8 underline">{urlData.title}:</h1>
			</div>
			<div class="mt-4 flex w-full flex-col text-xl">
				<h1 class="ml-8">Shortlink Title:</h1>
				<input
					type="text"
					name="title"
					bind:value={formData.title}
					class="mt-2 ml-8 h-10 w-3/4 rounded-md border-[0.5px] p-3"
					placeholder="Linkly"
				/>
			</div>
			<div class="mt-4 flex w-full flex-col text-xl">
				<h1 class="ml-8">Shortlink Destination:</h1>
				<input
					type="url"
					name="destination"
					bind:value={formData.destination}
					class="mt-2 ml-8 h-10 w-3/4 rounded-md border-[0.5px] p-3"
					placeholder="https://linkly.sh"
				/>
			</div>
			<input type="hidden" name="id" bind:value={formData.id} />
			<div class="w-full">
				<button
					type="submit"
					class="text-fgd bg-complement mt-6 ml-8 justify-self-start rounded-2xl p-3 text-xl transition hover:scale-105 hover:grayscale-25 focus:scale-105 focus:grayscale-25"
					>Update</button
				>
			</div>
		</form>
		<!-- Menu Info 
		<div class="text-md mt-4 w-full"><p class="ml-8">{JSON.stringify(urlData)}</p></div>-->
	</div>
</div>
