export interface Todo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

export interface ListTodo {
	todos: Todo[];
	skip: number;
	limit: number;
	total: number;
}
