<script lang="ts">
	import { goto } from '$app/navigation';
	import { fetchData } from '$lib/fetch';
	import { invoke } from '$lib/invoke';
	import type { Todo } from '$lib/types/todos';
	import { onMount } from 'svelte';

	let todos: Todo[] = [];
	let errMessage = '';

	onMount(async () => {
		const [req, err] = await invoke(
			fetchData({
				url: 'https://dummyjson.com/todos',
				method: 'GET'
			})
		);
		if (err) {
			errMessage = err.message;
			return;
		}

		if (req?.statusCode == 200) {
			todos = req.body.todos;
		}
	});
</script>

<h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Todo List</h1>
<div class="mb-6 text-center">
	<button on:click={() => goto('/todos/create')} class="text-2xl font-bold text-gray-800">
		Add Todo
	</button>
</div>
{#if errMessage}
	<p class="text-center font-semibold text-red-600">{errMessage}</p>
{:else}
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
	</div>
{/if}
