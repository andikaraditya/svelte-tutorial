interface FetchRequest {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // restrict to HTTP methods
	body?: object;
	header?: Record<string, string>;
}

interface FetchResponse {
	statusCode: number;
	body: Record<string, any>;
}

export async function fetchData(req: FetchRequest): Promise<FetchResponse> {
	const response = await fetch(req.url, {
		method: req.method,
		headers: {
			'Content-Type': 'application/json',
			...(req.header || {})
		},
		body: req.body ? JSON.stringify(req.body) : undefined
	});

	if (!response.ok) {
		const errorText = await response.text(); // helpful for debugging
		throw new Error(`HTTP ${response.status}: ${errorText}`);
	}

	const data: Record<string, any> = await response.json();
	return {
		statusCode: response.status,
		body: data
	} as FetchResponse;
}
