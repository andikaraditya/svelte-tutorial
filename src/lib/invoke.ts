function normalizeError(err: unknown): Error {
	if (err instanceof Error) {
		return err;
	}

	if (typeof err === 'string') {
		return new Error(err);
	}

	if (typeof err === 'object' && err !== null) {
		try {
			return new Error(JSON.stringify(err));
		} catch {
			return new Error('Unknown object error');
		}
	}

	return new Error(`Unknown error: ${err}`);
}

// go-style wrapper
export async function invoke<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
	try {
		const result = await promise;
		return [result, null];
	} catch (err: unknown) {
		return [null, normalizeError(err)];
	}
}
