import { fetchData } from './fetch';
import { invoke } from './invoke';
import type { ListTodo } from './types/todos';

interface GetTodosInput {
	limit: number;
	skip: number;
}

export async function getListTodos(input: GetTodosInput): Promise<ListTodo> {
	const [req, err] = await invoke(
		fetchData({
			url: 'https://dummyjson.com/todos',
			method: 'GET',
			queryParams: input as Record<string, any>
		})
	);
	if (err) {
		throw err;
	}

	if (req?.statusCode == 200) {
		return req.body as ListTodo;
	} else {
		throw new Error(`HTTP ${req?.statusCode}: ${JSON.stringify(req?.body)}`);
	}
}
