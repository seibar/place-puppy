import tenants from '../tenants';

class TenantService {
	static getTenant (url) {
		return tenants.puppies;
	}
}

export { TenantService };