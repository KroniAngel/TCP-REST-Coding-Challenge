import net from "net";
const PORT = 3000;

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
type ContentType =
	| "application/json"
	| "text/html"
	| "text/plain"
	| "image/jpg";

interface HTTPRequest {
	method: HTTPMethod;
	path: string;
	headers: string[];
	body?: object;
}

interface HTTPResponse {
	statusCode: number;
	contentType: ContentType;
	body: object | string;
}

const httpStatus = new Map([[200, "OK"], [201, "Created"], [404, "Not Found"]]);

const notFoundPage = `
<!DOCTYPE html>
<html>
<head>
    <title>404 Not Found</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
            text-align: center;
            padding-top: 50px;
        }
        h1 {
            color: #444;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>404 Not Found</h1>
    <hr>
    <p>Lo sentimos, la página que está buscando no existe.</p>
    <p>HTTP from TCP</p>
</body>
</html>`

const httpServer = net.createServer((socket) => {
	socket.on("data", (data) => {
		const httpRequest = parseHttpData(data);
		// console.log('httpRequest',httpRequest)
		const httpResponse = router(httpRequest);

		socket.write(httpResponse);
		socket.end();
	});

	socket.on("close", () => {
		console.log("Client desconnect");
	});

	socket.on("error", (err) => {
		console.error(err);
	});
});

httpServer.listen(PORT, () => {
	console.log(`Servidor HTTP (TCP) escuchando en http://localhost:${PORT}`);
});

function parseHttpData(data: Buffer<ArrayBufferLike>): HTTPRequest {
	const resquestStr = data.toString();
	const [method, path] = resquestStr.split(" ");
	const headers = resquestStr.split("\r\n").slice(1, -2);
	const [, body] = resquestStr.split("\r\n\r\n");

	const bodyParsed = body ? JSON.parse(body) : undefined;

	return {
		method: method as HTTPMethod,
		path,
		headers,
		body: bodyParsed,
	};
}

function httpResponse(response: HTTPResponse) {
	const statusMsg = httpStatus.get(response.statusCode);
	const status = `${response.statusCode} ${statusMsg}`;
	const bodyStr = typeof response.body === 'object'
		? JSON.stringify(response.body)
		: response.body;

	const httpResponse = `HTTP/1.1 ${status}\r\nContent-Type: ${response.contentType}\r\n\r\n${bodyStr}`;
	
	return httpResponse;
}

function router(request: HTTPRequest) {
	if (request.method === "GET" && request.path === "/users") {
		return httpResponse({
			statusCode: 200,
			contentType: 'application/json',
			body: { users: [] }
		})
	} else if (request.method === "GET" && request.path === "/users") {
		return httpResponse({
			statusCode: 200,
			contentType: 'application/json',
			body: { users: [] }
		})
	} else if (request.method === "GET" && request.path === "/users") {
		return httpResponse({
			statusCode: 200,
			contentType: 'application/json',
			body: { users: [] }
		})
	} else if (request.method === "GET" && request.path === "/users") {
		return httpResponse({
			statusCode: 200,
			contentType: 'application/json',
			body: { users: [] }
		})
	} else {
		return httpResponse({
			statusCode: 404,
			contentType: 'text/html',
			body: notFoundPage
		})
	}
}


