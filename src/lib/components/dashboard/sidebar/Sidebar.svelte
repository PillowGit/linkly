<script lang="ts">
	// Session details
	let { username, email, image, ...others } = $props();
	// Components
	import { signOut } from '@auth/sveltekit/client';
	// Logout function
	function logout(e: KeyboardEvent | MouseEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') {
			return;
		}
		signOut();
	}
</script>

<div
	class="border-complement bg-bg text-fg fixed top-0 left-0 flex h-screen w-[22.5vw] flex-col items-center justify-between not-dark:border-r-[0.5px]"
>
	<div class="flex w-full flex-col items-center">
		<!-- Titlecard -->
		<div class="m-8 flex w-[80%] items-center justify-start">
			<img src="/icons/linkly_filled.svg" alt="Linkly Logo" class="h-20" />
			<div class="text-complement ml-4 flex flex-col">
				<h1 class="text-3xl font-bold">Linkly</h1>
				<p class="text-sm">Shorten. Save. Share. Simplify.</p>
			</div>
		</div>
		<!-- App Products -->
		<div class="w-[80%] text-2xl font-medium"><h2>Dashboard</h2></div>
		<div class="mt-8 flex w-[80%] flex-col items-center justify-start">
			<div class="w-full text-2xl font-medium"><h3>Products</h3></div>
			<div class="border-transparent-mixed mt-1 w-full border-t-[1px]"></div>
			<!-- URL Shortener -->
			<div class="mt-4 flex w-full items-center justify-start">
				<img src="/icons/link_icon.svg" alt="Link Icon" class="h-6" />
				<div class="ml-4 flex flex-col">
					<h4 class="text-xl font-medium">URL Shortener</h4>
					<p class="text-sm">Shorten, track, & save your links</p>
				</div>
			</div>
			<!-- Qr Code Gen -->
			<div class="mt-4 flex w-full items-center justify-start">
				<img src="/icons/qr_code_icon.svg" alt="QR Code Icon" class="h-6" />
				<div class="ml-4 flex flex-col">
					<h4 class="text-xl font-medium">QR Code Generator</h4>
					<p class="text-sm">Easily make QR codes for any link</p>
				</div>
			</div>
		</div>
		<!-- App Features -->
		<div class="mt-8 flex w-[80%] flex-col items-center justify-start">
			<div class="w-full text-2xl font-medium"><h3>Features</h3></div>
			<div class="border-transparent-mixed mt-1 w-full border-t-[1px]"></div>
			<!-- URL Shortener -->
			<div class="mt-4 flex w-full items-center justify-start">
				<img src="/icons/analytics_icon.svg" alt="Analytics Icon" class="h-6" />
				<div class="ml-4 flex flex-col">
					<h4 class="text-xl font-medium">Track Analytics</h4>
					<p class="text-sm">See analytics for any of your short URLs</p>
				</div>
			</div>
			<!-- Qr Code Gen -->
			<div class="mt-4 flex w-full items-center justify-start">
				<img src="/icons/save_icon.svg" alt="Save Icon" class="h-6" />
				<div class="ml-4 flex flex-col">
					<h4 class="text-xl font-medium">Link Management</h4>
					<p class="text-sm">Easily edit, delete, or view your short links</p>
				</div>
			</div>
		</div>
	</div>
	<!-- User Profile Card -->
	<div
		class="flex h-[20%] w-full flex-col items-center justify-end bg-[url(/images/sidebar_vector_image.svg)]"
	>
		<div
			class="bg-bg border-transparent-mixed mb-8 flex h-[40%] w-[80%] items-center justify-between rounded-md border-2"
		>
			<div class="ml-3 flex h-full items-center">
				<img
					src={image}
					alt="User Profile"
					class="border-transparent-mixed aspect-square h-[60%] rounded-full border-[1px]"
				/>
				<div class="ml-2 flex flex-col">
					<p class="text-xs font-medium">{username}</p>
					<p class="text-xs">{email}</p>
				</div>
			</div>
			<div
				class="mr-4 aspect-square h-[45%] cursor-pointer transition hover:scale-105 hover:invert-50"
				role="button"
				aria-pressed="false"
				tabindex="0"
				onclick={logout}
				onkeydown={logout}
			>
				<img src="/icons/logout_icon.svg" alt="Logout Icon" class="h-full" />
			</div>
		</div>
	</div>
</div>
