<script lang="ts">
	import { goto } from '$app/navigation';
	import { invoke } from '$lib/invoke';
	import { getListTodos } from '$lib/todos';
	import type { Todo } from '$lib/types/todos';
	import { onMount } from 'svelte';

	let todos: Todo[] = [];
	let isLoading = true;
	let isEnd = false;
	let skip = 0;

	onMount(async () => {
		const [req, err] = await invoke(
			getListTodos({
				limit: 10,
				skip
			})
		);
		if (err) {
			return;
		}

		todos = [...todos, ...(req?.todos || [])];
		isLoading = false;
	});
</script>

<h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Todo List</h1>
<div class="mb-6 text-center">
	<button on:click={() => goto('/todos/create')} class="text-2xl font-bold text-gray-800">
		Add Todo
	</button>
</div>
<div class="mx-auto max-w-xl space-y-4">
	{#each todos as todo}
		<div class="rounded-lg border border-gray-200 bg-white p-4 shadow transition hover:shadow-lg">
			<p><span class="font-semibold text-gray-700">ID:</span> {todo.id}</p>
			<p><span class="font-semibold text-gray-700">Task:</span> {todo.todo}</p>
			<p>
				<span class="font-semibold text-gray-700">Completed:</span>
				{#if todo.completed}
					<span class="font-semibold text-green-600">Yes</span>
				{:else}
					<span class="font-semibold text-yellow-600">No</span>
				{/if}
			</p>
			<p><span class="font-semibold text-gray-700">User ID:</span> {todo.userId}</p>
		</div>
	{/each}
	{#if isLoading}
		<div class="mt-4 mb-10 flex flex-col items-center justify-center">
			<svg width="70" height="70" viewBox="0 0 24 24" fill="blue" xmlns="http://www.w3.org/2000/svg"
				><style>
					.spinner_P7sC {
						transform-origin: center;
						animation: spinner_svv2 0.75s infinite linear;
					}
					@keyframes spinner_svv2 {
						100% {
							transform: rotate(360deg);
						}
					}
				</style><path
					d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
					class="spinner_P7sC"
				/></svg
			>
			<p class="text-2xl">Loading Todos</p>
		</div>
	{/if}
</div>
