import tenants from '../tenants';

class TenantService {
	static getTenant (hostname) {
		const host = hostname.toLowerCase();

		if (host.indexOf('openshiftapps.com') > -1) {
			return tenants.puppies;
		}

		console.log(tenants);
		let tenant = undefined;

		Object.keys(tenants).forEach(tenantKey => {
			if (host.indexOf(tenants[tenantKey].host) > -1) {
				tenant = tenants[tenantKey];
				return;
			}
		})

		if (!tenant) {
			throw new Error('Could not find tenant for host ' + host);
		}

		return tenant;
	}
}

export { TenantService };