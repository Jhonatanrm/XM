export interface IAppConfig {
    env: { name: string };
    tenants: [{ name: string, tenant: string }];
    portTypes: [{ name: string }];
}