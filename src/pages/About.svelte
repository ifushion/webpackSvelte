<script>
  import Nav from '../component/Nav';
	export let name;
</script>

<main>
	<Nav></Nav>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
	<h1>Hello {name}!</h1>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>