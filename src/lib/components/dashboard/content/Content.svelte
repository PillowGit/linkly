<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { Url } from '$lib/types';

	import UrlCard from './UrlCard.svelte';
	import QrCodeMenu from '../menus/QrCodeMenu.svelte';

	// let show_url_gen_menu = $state(false);
	let show_qr_code_menu = $state(false);

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
	function ShowQrCodeMenu(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		show_qr_code_menu = false;
		show_qr_code_menu = true;
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
				class="border-complement text-complement focus:bg-complement-bg hover:bg-complement-bg flex h-full items-center rounded-lg border-[0.5px] transition hover:scale-105 hover:cursor-pointer focus:scale-105"
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
				class="border-complement2 text-complement2 focus:bg-complement2-bg hover:bg-complement2-bg flex h-full items-center rounded-lg border-[0.5px] transition hover:scale-105 hover:cursor-pointer focus:scale-105"
				role="button"
				aria-pressed="false"
				tabindex="0"
				onclick={ShowQrCodeMenu}
				onkeydown={ShowQrCodeMenu}
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
					class="text-fgd bg-complement rounded-2xl p-3 text-xl transition hover:scale-105 hover:grayscale-25 focus:scale-105 focus:grayscale-25"
				>
					Get your link →
				</button>
			</div>
		</form>
		<!-- Shortlink cards -->
		<div class="mt-8 text-xl font-medium"><h2>Your URLs:</h2></div>
		<div class="mt-4"></div>
		<div class="flex flex-wrap items-center justify-start">
			{#each urls as urlData}
				<UrlCard {urlData} />
			{/each}
		</div>
	</div>
</div>
<QrCodeMenu showing={show_qr_code_menu} />
