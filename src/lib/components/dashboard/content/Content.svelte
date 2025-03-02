<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { Url } from '$lib/types';

	import UrlCard from './UrlCard.svelte';

	let { username, email, image, ...others } = $props();
	const urls: Url[] = page.data.urls;
	if (username.includes('(')) {
		username = username.split('(')[1].split(')')[0].trim();
	}

	interface FormData {
		longUrl: string;
	}

	let formData: FormData = {
		longUrl: ''
	};

	function NotImplemented(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		alert('This feature is not implemented yet');
	}

	onMount(() => {
		if (page.form !== undefined && page.form?.error !== undefined) {
			alert(page.form.error);
		}
	});
</script>

<div class="z-10 flex min-h-screen w-[77.5vw] flex-col items-center justify-start">
	<div class="mt-12 w-[85%]">
		<!-- Top of page text -->
		<div class="text-3xl font-medium"><h1>Welcome {username},</h1></div>
		<div class="mt-2 text-xl"><p>Start shortening and managing links today!</p></div>
		<div class="mt-6 text-3xl font-medium"><h2>Generate a digital connection</h2></div>
		<!-- Make URL/QR Code buttons -->
		<div class="mt-6 flex h-14 w-full items-center justify-center">
			<div
				class="border-complement text-complement hover:bg-complement-bg flex h-full items-center rounded-lg border-[0.5px] transition hover:scale-105 hover:cursor-pointer"
				role="button"
				aria-pressed="false"
				tabindex="0"
				onclick={NotImplemented}
				onkeydown={NotImplemented}
			>
				<img src="/icons/link_icon.svg" alt="Link Icon" class="mx-2 aspect-square h-[55%]" />
				<div class="mr-2 text-xl font-bold"><p>Short Link</p></div>
			</div>
			<div class="mx-6 text-xl font-medium"><p>OR</p></div>
			<div
				class="border-complement2 text-complement2 hover:bg-complement2-bg flex h-full items-center rounded-lg border-[0.5px] transition hover:scale-105 hover:cursor-pointer"
				role="button"
				aria-pressed="false"
				tabindex="0"
				onclick={NotImplemented}
				onkeydown={NotImplemented}
			>
				<img
					src="/icons/blue_qr_code_icon.svg"
					alt="Link Icon"
					class="mx-2 aspect-square h-[55%]"
				/>
				<div class="mr-2 text-xl font-bold"><p>QR Code</p></div>
			</div>
		</div>
		<!-- Quick Short URL Input Field -->
		<div class="mt-8 text-xl"><p>Paste in a long URL...</p></div>
		<form method="POST" action="?/shorten">
			<div class="mt-2">
				<input
					type="url"
					name="longUrl"
					bind:value={formData.longUrl}
					placeholder="https://example.com/long-url"
					class="w-full rounded-lg border p-3"
				/>
			</div>
			<div class="mt-4">
				<button
					type="submit"
					class="text-fgd rounded-2xl bg-red-500 p-3 text-xl transition hover:scale-105 hover:grayscale-25"
				>
					Get your link →
				</button>
			</div>
		</form>
		<!-- Shortlink cards -->
		<div class="mt-8 text-xl font-medium"><h2>Your URLs:</h2></div>
		<div class="mt-4"></div>
		{#each { length: Math.floor(urls.length / 3) + 1 } as _, i}
			{#if urls[i * 3] !== undefined}
				<div class="mt-8 mb-8 flex h-44 items-center">
					{#each { length: 3 } as _, j}
						{#if urls[i * 3 + j] === undefined}
							<div class="mx-4 w-[30%]"></div>
						{:else}
							<UrlCard urlData={urls[i * 3 + j]} />
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>
