import type { Tenant } from "@/tenants/tenantModel";

// Mock the database
export const tenants: Tenant[] = [
  {
    id: "5eca2c84-6ce5-4102-b41c-2bbc16001d4f",
    name: "Datum Corporation",
    apiKey: "016fd72a5a2701e5ab28a22d497af0e1d1f1517ac59db87b93e977791f2ae3dd",
    usageRequests: 0,
    usageTraffic: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: "0c80a535-7c9d-43d7-924a-08404da40f79",
    name: "Contoso Corp.",
    apiKey: "6c4e8583e66506517c1213dcbd8a42dd7607804ae51a68c10a0284bf34493b82",
    usageRequests: 10,
    usageTraffic: 1024,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "b03d30dd-bb3f-4aed-ac11-9685a028306b",
    name: "Northwind Traders",
    apiKey: "acd747a7ef80239a50c4b4f0a7d1b04bcbb434d20c46348421775b0bb8938909",
    usageRequests: 10,
    usageTraffic: 1024,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "698413fc-a701-4f16-bb7e-01d17d2106d8",
    name: "Southbridge Video",
    apiKey: "056219c53ddd3e8361cfd5b8faa69000bc1f4a9628a476cfb067792d97473d01",
    usageRequests: 0,
    usageTraffic: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];

export class TenantRepository {
  async findByApiKey(apiKey: string): Promise<Tenant | null> {
    return tenants.find((tenant) => tenant.apiKey === apiKey) || null;
  }

  async addTraffic(id: string, traffic: number) {
    const tenant = tenants.find((tenant) => tenant.id === id);

    if(tenant){
      tenant.usageRequests += 1;
      tenant.usageTraffic += traffic;
    } else {
      throw Error("Cannot save the traffic");
    }
  }
}