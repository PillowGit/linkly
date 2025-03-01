<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/state';
</script>

<div class="hidden items-center justify-between md:flex">
	<img src="/icons/linkly_filled.svg" alt="Linkly Mascot" class="mr-16 max-h-[40vh] min-h-64" />
	<div class="flex flex-col items-start justify-between">
		<h1 class="text-complement text-6xl font-medium">Linkly</h1>
		<p class="text-complement mt-6 text-2xl">Shorten. Save. Share. Simplify with Linkly.</p>
		{#if page.data.session}
			<div class="text-complement mt-12">
				Welcome back, {page.data.session?.user?.name}!
			</div>
			<div class="mt-6 flex items-center justify-between">
				<SignOut>
					<div
						slot="submitButton"
						class="border-complement text-complement flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-110 hover:font-medium"
						role="button"
						aria-pressed="false"
						tabindex="0"
					>
						Log Out
					</div>
				</SignOut>
				<a href="/dashboard">
					<div
						class="border-complement text-complement ml-4 flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-110 hover:font-medium"
						role="button"
						aria-pressed="false"
						tabindex="0"
					>
						Go To Dashboard
					</div></a
				>
			</div>
		{:else}
			<SignIn provider="google">
				<div
					slot="submitButton"
					class="border-complement mt-6 flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-110 hover:font-medium"
					role="button"
					aria-pressed="false"
					tabindex="0"
				>
					<img src="/icons/google.svg" alt="Google Logo" class="h-6 w-6" />
					<p class="text-complement ml-2">Log in with Google</p>
				</div>
			</SignIn>
		{/if}
	</div>
</div>
<div class="flex flex-col items-center md:hidden">
	<div class="flex items-center justify-between">
		<img src="/icons/linkly_filled.svg" alt="Linkly Mascot" class="max-h-[12.5vh] min-h-30" />
		<h1 class="text-complement ml-8 text-5xl font-medium">Linkly</h1>
	</div>
	<div class="text-complement mt-8 max-w-[75vw] text-center text-2xl">
		Shorten. Save. Share. Simplify with Linkly.
	</div>
	{#if page.data.session}
		<div class="text-complement mt-12">
			Welcome back, {page.data.session?.user?.name}!
		</div>
		<div class="mt-6 flex items-center justify-between">
			<SignOut>
				<div
					slot="submitButton"
					class="border-complement text-complement flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-110 hover:font-medium"
					role="button"
					aria-pressed="false"
					tabindex="0"
				>
					Log Out
				</div>
			</SignOut>
			<a href="/dashboard">
				<div
					class="border-com
plement text-complement ml-4 flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-110 hover:font-medium"
					role="button"
					aria-pressed="false"
					tabindex="0"
				>
					Go To Dashboard
				</div></a
			>
		</div>
	{:else}
		<SignIn provider="google">
			<div
				slot="submitButton"
				class="border-complement mt-6 flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-110 hover:font-medium"
				role="button"
				aria-pressed="false"
				tabindex="0"
			>
				<img src="/icons/google.svg" alt="Google Logo" class="h-6 w-6" />
				<p class="text-complement ml-2">Log in with Google</p>
			</div>
		</SignIn>
	{/if}
</div>
