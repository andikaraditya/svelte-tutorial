<script lang="ts">
	import { fetchData } from '$lib/fetch';
	import { invoke } from '$lib/invoke';
	import type { Todo } from '$lib/types/todos';

	let submitted = false;
	let todo: Todo = {
		completed: false,
		id: 0,
		todo: '',
		userId: Math.floor(Math.random() * 100) + 1
	};
	let errMessage = '';

	async function handleSubmit(input: Todo) {
		const [req, err] = await invoke(
			fetchData({
				url: 'https://dummyjson.com/todos/add',
				method: 'POST',
				body: input
			})
		);
		if (err) {
			errMessage = err.message;
		}

		if (req?.statusCode == 201) {
			submitted = true;
			todo.id = req.body.id;
			todo.todo = req.body.todo;
			todo.completed = req.body.completed;
			todo.userId = req.body.userId;
		}
	}
</script>

<h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Create Todo</h1>

<form
	on:submit|preventDefault={async () => await handleSubmit(todo)}
	class="mx-auto max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
>
	<div>
		<label for="name" class="mb-2 block text-sm font-medium text-gray-700">Task Name</label>
		<input
			id="name"
			type="text"
			bind:value={todo.todo}
			required
			placeholder="e.g., Buy groceries"
			class="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
		/>
	</div>

	<button
		type="submit"
		class="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow transition duration-200 hover:bg-blue-700"
	>
		Submit
	</button>

	{#if submitted}
		{#if errMessage}
			<p class="mt-4 text-center font-medium text-red-600">{errMessage}</p>
		{:else}
			<p class="mt-4 text-center font-medium text-green-600">Thanks for your submission!</p>

			<div class="mt-4 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
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
		{/if}
	{/if}
</form>
