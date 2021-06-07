import Index from './Index.svelte';

const app = new Index({
	target: document.body,
	props: {
		name: 'Prodcut List'
	}
});

export default app;