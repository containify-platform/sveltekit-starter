<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>SvelteKit on Containify</title>
</svelte:head>

<main>
	<h1>SvelteKit on Containify</h1>
	<p>Edit <code>src/routes/+page.svelte</code> and push to deploy a new version.</p>
	{#if data.error}
		<p class="error">Couldn't reach the database. Is DATABASE_URL set, and have the migrations run?</p>
	{:else}
		<p>
			This page has been visited <strong>{data.visits}</strong>
			{data.visits === 1 ? 'time' : 'times'}, counted in Postgres.
		</p>
	{/if}
	<p class="links">
		<a href="https://containify.cloud/docs/guides/sveltekit">SvelteKit guide</a>
		<a href="https://svelte.dev/docs/kit">SvelteKit docs</a>
	</p>
</main>

<style>
	:global(:root) {
		color-scheme: light dark;
	}
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		line-height: 1.6;
	}
	main {
		max-width: 40rem;
		margin: 4rem auto;
		padding: 0 1rem;
	}
	.links {
		display: flex;
		gap: 1.5rem;
	}
	.error {
		color: #dc2626;
	}
</style>
