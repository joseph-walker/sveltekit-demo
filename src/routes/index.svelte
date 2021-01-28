<script lang="ts" context="module">
	let initialCount: number;

    export async function load(context) {
		const raw = await context.fetch("/api/counter");
		const initial = await raw.json();

		initialCount = parseInt(initial.count);
    }
</script>

<script lang="ts">
	let locked = false;
	let count = initialCount;

	async function increment() {
		count = count + 1;

		locked = true;

		await fetch("/api/counter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				count
			})
		});

		locked = false;
	}
</script>

<main>
	<img width="50px" alt="berd" src="/budgie.jpg" />
	<h1>{count}</h1>
	<button on:click={increment} disabled={locked}>+</button>
</main>
