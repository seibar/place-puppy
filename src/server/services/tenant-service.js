import tenants from '../tenants';

class TenantService {
	static getTenant (hostname) {
		const host = hostname.toLowerCase();

		let tenant = undefined;

		Object.keys(tenants).forEach(tenantKey => {
			if (host.indexOf(tenants[tenantKey].host) > -1) {
				tenant = tenants[tenantKey];
				return;
			}
		})

		if (!tenant) {
			tenant = tenants.puppies;
		}

		return tenant;
	}
}

export { TenantService };