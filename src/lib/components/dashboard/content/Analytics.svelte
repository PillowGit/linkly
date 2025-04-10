<script lang="ts">
	let { showing, urlData, ...others } = $props();

	interface AnalyticsText {
		left: string;
		right: string;
	}

	// fetching, success, fail
	let analytics_status: string = $state('fetching');
	let analytics_text: AnalyticsText[] = $state([]);

	async function fetchAnalytics() {
		const response = await fetch(`/api/analytics/${urlData.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const response_json = await response.json();
		if ('error' in response_json) {
			analytics_status = 'fail';
		}
		analytics_text = [];
		const { data, total_visits } = response_json;
		const countries: any = {};
		let today = new Date();
		let clicks_today = 0;
		const today_seconds = 24 * 60 * 60 * 1000;
		let clicks_last_week = 0;
		const week_seconds = 7 * 24 * 60 * 60 * 1000;
		let clicks_last_month = 0;
		const month_seconds = 30 * 24 * 60 * 60 * 1000;
		for (let i = 0; i < data.length; i++) {
			const { country, created_on } = data[i];
			const timestamp = new Date(created_on).getTime();
			const cntry = !country ? 'Unknown' : country;
			countries[cntry] = countries[cntry] ? countries[cntry] + 1 : 1;
			if (today.getTime() - timestamp < today_seconds) {
				clicks_today++;
			}
			if (today.getTime() - timestamp < week_seconds) {
				clicks_last_week++;
			}
			if (today.getTime() - timestamp < month_seconds) {
				clicks_last_month++;
			}
		}
		analytics_text.push({
			left: 'Total Clicks (all time):',
			right: `${total_visits}`
		});
		console.log(clicks_today, clicks_last_week, clicks_last_month);
		if (clicks_today) {
			analytics_text.push({
				left: '# of clicks in the last 24 hours:',
				right: `${clicks_today}`
			});
		}
		if (clicks_last_week) {
			analytics_text.push({
				left: '# of clicks in the past week:',
				right: `${clicks_last_week}`
			});
		}
		if (clicks_last_month) {
			analytics_text.push({
				left: '# of clicks in the past month:',
				right: `${clicks_last_month}`
			});
		}
		// Get top 3 countries
		const country_list = Object.entries(countries);
		country_list.sort((a: any, b: any) => b[1] - a[1]);
		const top_countries = country_list.slice(0, 3);
		for (let i = 0; i < top_countries.length; i++) {
			const [country, clicks] = top_countries[i];
			analytics_text.push({
				left: country !== 'Unknown' ? `Clicks from ${country}:` : 'Clicks from unknown country:',
				right: `${clicks}`
			});
		}
		analytics_status = 'success';
	}

	$effect(() => {
		if (showing) {
			fetchAnalytics();
		} else {
			analytics_status = 'fetching';
		}
	});

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
		class="dark:bg-bgd bg-bg z-30 flex max-h-[75vh] min-h-[30vw] min-w-[30vw] flex-col items-center justify-between rounded-xl"
		role="menu"
		tabindex="0"
		onclick={StopPropagation}
		onkeydown={StopPropagation}
	>
		<!-- Title -->
		<div class="my-8 flex w-full items-center justify-between text-2xl font-medium">
			<div class="flex flex-col items-start justify-start">
				<h1 class="ml-8">Click Analytics</h1>
				<p class="ml-8 text-sm">{urlData.title}</p>
			</div>
			<img
				src="/icons/small_analytics_icon.svg"
				alt="Analytics Menu Icon"
				class="mr-8 aspect-square h-8 invert-0 dark:invert-100"
			/>
		</div>
		<!-- Actual Analytical Data -->
		<div class="mb-8 flex h-full w-[85%] flex-col items-center justify-center">
			{#if analytics_status === 'fetching'}
				<div class="flex items-center justify-center">
					<p>Loading data</p>
					<img
						src="/icons/tube-spinner.svg"
						alt="loading icon"
						class="ml-2 aspect-square h-6 dark:invert-100"
					/>
				</div>
			{:else if analytics_status === 'success'}
				{#each analytics_text as { left, right }, i}
					<div class="flex w-[90%] items-center justify-between py-2">
						<p class="ml-4 text-sm">{left}</p>
						<p class="mr-4 text-sm">{right}</p>
					</div>
				{/each}
			{:else}
				<p>Error loading analytics :(</p>
			{/if}
		</div>
	</div>
</div>
