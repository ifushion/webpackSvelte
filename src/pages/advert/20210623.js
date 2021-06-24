import Index from './20210623.svelte';

const app = new Index({
	target: document.body,
	props: {
		name: 'Index'
	}
});

export default app;