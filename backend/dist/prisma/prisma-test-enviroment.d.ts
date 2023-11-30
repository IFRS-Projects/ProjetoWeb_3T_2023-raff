import NodeEnvironment from 'jest-environment-node';
export default class PrismaTestEnviroment extends NodeEnvironment {
    private schema;
    private connectionString;
    constructor(config: any, context: any);
    setup(): Promise<void>;
    teardown(): Promise<void>;
}
