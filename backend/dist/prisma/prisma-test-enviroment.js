"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const dotenv_1 = require("dotenv");
const jest_environment_node_1 = require("jest-environment-node");
const pg_1 = require("pg");
const node_util_1 = require("node:util");
dotenv_1.default.config({ path: '.env.testing' });
const execSync = node_util_1.default.promisify(node_child_process_1.exec);
const prismaBinary = './node_modules/.bin/prisma';
class PrismaTestEnviroment extends jest_environment_node_1.default {
    constructor(config, context) {
        super(config, context);
        const dbUser = process.env.DATABASE_USER;
        const dbPass = process.env.DATABASE_ṔASS;
        const dbHost = process.env.DATABASE_HOST;
        const dbPort = process.env.DATABASE_PORT;
        const dbName = process.env.DATABASE_NAME;
        this.schema = `test_${crypto.randomUUID()}`;
        this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
    }
    async setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;
        await execSync(`${prismaBinary} migrate deploy`);
        return super.setup();
    }
    async teardown() {
        const client = new pg_1.Client({
            connectionString: this.connectionString,
        });
        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}
exports.default = PrismaTestEnviroment;
//# sourceMappingURL=prisma-test-enviroment.js.map