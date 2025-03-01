<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/state';
</script>

<div class="hidden md:block">
	<div class="flex items-center justify-between">
		<img src="/icons/linkly_filled.svg" alt="Linkly Mascot" class="mr-16 max-h-[40vh] min-h-64" />
		<div class="flex flex-col items-start justify-between">
			<h1 class="text-complement text-6xl font-medium">Linkly</h1>
			<p class="text-complement mt-6 text-2xl">Shorten. Save. Share. Simplify with Linkly.</p>
			{#if page.data.session}
				<SignOut>
					<div
						slot="submitButton"
						class="border-complement text-complement mt-6 flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-105"
						role="button"
						aria-pressed="false"
						tabindex="0"
					>
						Log Out
					</div>
				</SignOut>
			{:else}
				<SignIn provider="google">
					<div
						slot="submitButton"
						class="border-complement mt-6 flex cursor-pointer justify-center rounded-md border-2 p-2 transition hover:scale-105"
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
</div>
<div class="block md:hidden">Mobile not done yet D:</div>
