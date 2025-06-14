// This is just an example on how to handle different HTTP methods in a server route.
// https://restfulapi.net/http-methods/ -- This will help you understand the different HTTP methods.

import { error, json } from '@sveltejs/kit';

export function GET() {
	// Simulating a data fetch operation
	// Normally you'd either do the following:
	// fetch('https://api.example.com/data')
	// or import data from a local file
	// import data from '$lib/data.json';
	// or get it from a database.
	const data = {
		message: 'Welcome to the API server',
		version: '1.0.0'
	};

	if (data === null) {
		error(500, 'Internal Server Error');
	}

	return json(data, { status: 200 }); // 200 OK
}

export function POST({ request, cookies }) {
	const userid = cookies.get('userid');
	// if (!userid) {
	// 	error(401, 'Unauthorized: No userid found in cookies');
	// }

	// Here you would typically handle the request body, e.g., saving data to a database
	// await database.saveData(request.body); // Not implemented in this example
	if (!request.body) {
		error(400, 'Bad Request: No body provided');
	}
	const data = {
		message: 'POST request received',
		status: 'success',
		body: request.body ? request.body : 'No body provided'
	};

	return json(data, { status: 201 }); // 201 Created
}

export function PUT({ params, request, cookies }) {
	const userid = cookies.get('userid');
	// if (!userid) {
	// 	error(401, 'Unauthorized: No userid found in cookies');
	// }

	if (!request.body) {
		error(400, 'Bad Request: No body provided');
	}

	// Here you would typically update some resource based on the request body
	// await database.toggleTodo({ userid, id: params.id, done }); // Not implemented in this example
	const updatedData = {
		message: 'PUT request received',
		status: 200,
		body: request.body ? request.body : 'No body provided',
		userid,
		params
	};

	return json(updatedData, { status: 202 }); // 202 Accepted
}

export function DELETE({ params, cookies }) {
	const userid = cookies.get('userid');
	// if (!userid) {
	// 	error(401, 'Unauthorized: No userid found in cookies');
	// }

	// Here you would typically delete a resource based on the userid or params
	// await database.deleteTodo({ userid, id: params.id });
	const data = {
		message: 'DELETE request received',
		status: 'success',
		userid,
		params
	};

	return json(data, { status: 202 });
}


// Other Status Codes:
// 204 No Content
// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 500 Internal Server Error
// 503 Service Unavailable
// 422 Unprocessable Entity
// 429 Too Many Requests
// 501 Not Implemented
// 502 Bad Gateway
// 504 Gateway Timeout
// 418 I'm a teapot (just for fun, not a real status code in production)

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status