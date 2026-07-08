import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = process.env.PORT || 0;

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".glb": "model/gltf-binary",
    ".json": "application/json; charset=utf-8"
};

const server = createServer(async (request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const safePath = normalize(decodeURIComponent(requestUrl.pathname)).replace(/^([.]{2}[\/\\])+/, "").replace(/^\/+/, "");
    const filePath = safePath === "" || safePath === "." ? join(root, "index.html") : join(root, safePath);

    try {
        const file = await readFile(filePath);
        const type = mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream";

        response.writeHead(200, { "Content-Type": type });
        response.end(file);
    } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
    }
});

server.listen(port, () => {
    const address = server.address();
    const actualPort = typeof address === "object" && address ? address.port : port;
    console.log(`EjiCode running at http://localhost:${actualPort}`);
});