<script lang="ts">
	let { showing, ...others } = $props();
	import qrcodegen from '$lib/qrcodegen';

	let url = $state('');
	let qr_code: HTMLCanvasElement;
	let download_button: HTMLAnchorElement;

	function scale(x: number) {
		if (x < 43) return 11;
		else if (x < 62) return 10;
		else return 9;
	}

	function drawCanvas(
		qr: qrcodegen.QrCode,
		scale: number,
		border: number,
		lightColor: string,
		darkColor: string,
		canvas: HTMLCanvasElement
	): void {
		if (scale <= 0 || border < 0) throw new RangeError('Value out of range');
		const width: number = (qr.size + border * 2) * scale;
		canvas.width = width;
		canvas.height = width;
		let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		for (let y = -border; y < qr.size + border; y++) {
			for (let x = -border; x < qr.size + border; x++) {
				ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor;
				ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
			}
		}
	}

	$effect(() => {
		const qr: qrcodegen.QrCode = qrcodegen.QrCode.encodeSegments(
			qrcodegen.QrSegment.makeSegments(url || 'https://linkly.sh'),
			qrcodegen.QrCode.Ecc.MEDIUM,
			qrcodegen.QrCode.MIN_VERSION,
			qrcodegen.QrCode.MAX_VERSION,
			-1
		);
		drawCanvas(qr, scale(url.length), 2, '#ffffff', '#000000', qr_code);
		const dataUrl = qr_code.toDataURL('image/png');
		download_button.href = dataUrl;
		download_button.download = 'qr_code.png';
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
		class="dark:bg-bgd bg-bg z-30 flex max-h-[75vh] min-h-[40vw] min-w-[40vw] flex-col items-center rounded-xl"
		role="menu"
		tabindex="0"
		onclick={StopPropagation}
		onkeydown={StopPropagation}
	>
		<!-- Title -->
		<div class="mt-8 flex w-full items-center justify-between text-2xl font-medium">
			<h1 class="ml-8">QR Code Generator</h1>
			<img
				src="/icons/white_qr_code_icon.svg"
				alt="Qr Code Icon"
				class="mr-8 aspect-square h-12 invert-100 dark:invert-0"
			/>
		</div>
		<!-- Menu Info -->
		<div class="text-md mt-4 w-full"><p class="ml-8">Generate a QR code for your link:</p></div>
		<div class="mt-4 flex w-full items-center justify-between text-lg">
			<input
				type="text"
				class="ml-8 h-10 w-3/4 rounded-md border-[0.5px] p-3"
				placeholder="https://linkly.sh"
				bind:value={url}
			/>
			<a
				bind:this={download_button}
				href="/"
				class="mr-8 transition hover:scale-110 hover:cursor-pointer hover:invert-50 focus:scale-110 focus:invert-50"
			>
				<img
					src="/icons/check.svg"
					alt="Download Icon"
					class="aspect-square h-12 text-fgd bg-complement rounded-2xl p-3 text-xl transition hover:scale-105 focus:scale-105" 
				/>
			</a>
		</div>
		<!-- Qr Code -->
		<canvas bind:this={qr_code} class="my-auto rounded-md p-4"></canvas>
	</div>
</div>
