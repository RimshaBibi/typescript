"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const app = (0, fastify_1.default)({ logger: true });
const user_js_1 = __importDefault(require("./routes/user.js"));
const PORT = parseInt(process.env.PORT || '8080');
// Register the user routes
app.register(user_js_1.default);
// console.log(`path is  ${path.join(__dirname,'../frontend/public')}`)
app.register(static_1.default, {
    root: path_1.default.join(__dirname, '../frontend/public'),
    prefix: '/',
});
app.get('/', async (request, reply) => {
    try {
        reply.type('text/html');
        await reply.sendFile('index.html');
    }
    catch (err) {
        reply.code(500).send('Internal Server Error');
    }
});
app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
