<script lang="ts">
	const legal = [
		{ slug: 'imprint', label: 'Imprint' },
		{ slug: 'privacy', label: 'Privacy policy' },
		{ slug: 'terms', label: 'Terms' },
		{ slug: 'withdrawal', label: 'Withdrawal' }
	];
</script>

<svelte:head><title>About · MilitärNews</title></svelte:head>

<div class="min-h-dvh bg-base-200 p-4 text-base-content">
	<div class="mx-auto max-w-2xl space-y-6">
		<header>
			<a class="link link-primary" href="/">← Back</a>
			<h1 class="mt-2 text-3xl font-extrabold">About MilitärNews tools</h1>
			<p class="opacity-70">Simple tools built by MilitärNews.</p>
		</header>
		<section class="card bg-base-100 shadow">
			<div class="card-body">
				<h2 class="card-title">Legal</h2>
				{#each legal as item}
					<a
						class="link py-1 link-hover"
						href={`https://militaernews.vercel.app/legal/${item.slug}`}
						target="_blank"
						rel="noreferrer"
					>
						{item.label} ↗
					</a>
				{/each}
			</div>
		</section>
		<section class="card bg-base-100 shadow">
			<div class="card-body">
				<h2 class="card-title">Support</h2>
				<a
					class="btn btn-primary"
					href="https://t.me/MilitaernewsKontakt"
					target="_blank"
					rel="noreferrer"
				>
					Contact @MilitaernewsKontakt
				</a>
			</div>
		</section>
		<a class="btn btn-outline" href="/settings">Settings →</a>
	</div>
</div>
