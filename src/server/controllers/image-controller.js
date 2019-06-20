import { ImageService, AnalyticsService, TenantService } from '../services';

class ImageController {
	constructor ({ randomMaxAge = 60, byIdMaxAge = 60 * 60 * 24 * 100, returnApiGatewayProxyResponse = false }) {
		this.imageService = new ImageService();
		this.randomMaxAge = randomMaxAge;
		this.byIdMaxAge =  byIdMaxAge;
		this.returnApiGatewayProxyResponse = returnApiGatewayProxyResponse;
	}

	_isNotModified (req, maxAge) {
		const ifModifiedSince = new Date(req.get('If-Modified-Since'));
		const now = new Date();
		const age = now - ifModifiedSince;
		if (age < maxAge * 1000) {
			return true;
		}

		return false;
	}

	_isValidDimensions (req) {
		const width = parseFloat(req.params.width);
		const height = parseFloat(req.params.height);
		return Number.isInteger(width) && Number.isInteger(height);
	}

	_setHeaders (res, maxAge) {
		res.setHeader('Content-Type', 'image/jpeg');
		res.setHeader('Cache-Control', ` max-age=${maxAge}, public`);
		res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
		res.setHeader('Last-Modified', new Date().toUTCString());
	}

	async _fetchImage (imageId, width, height, res) {
		res.setHeader('id', imageId);
		const image = this.imageService.fetchImage(imageId, width, height);

		if (this.returnApiGatewayProxyResponse) {
			// API gateway expects binary responses to be base64 encoded.
			const encoded = (await image).toString('base64');
			return {
				statusCode: 200,
				headers: { 'content-type': 'image/jpeg' },
				body: encoded,
				isBase64Encoded: true
			};
		} else {
			return await image;
		}
	}

	async _getRandomRedirect (bucket, req, res) {
		if (this._isNotModified(req, this.randomMaxAge)) {
			return res.sendStatus(304);
		}

		const width = parseFloat(req.params.width);
		const height = parseFloat(req.params.height);

		if (!ImageService.isValidDimensions(width, height)) {
			return res.sendStatus(400);
		}

		this._setHeaders(res, this.randomMaxAge);
		const imageId = bucket[Math.floor(Math.random() * bucket.length)];
		if (!imageId) {
			return res.sendStatus(500);
		}

		const tenant = TenantService.getTenant(req.hostname);
		AnalyticsService.trackImageView({
			trackingId: tenant.gaTrackingId,
			clientIp: req.ip,
			userAgent: req.get('User-Agent'),
			isRandom: true,
			imageId,
			width,
			height
		});

		res.redirect(`/${imageId}/${width}/${height}`);
	}

	async _getById (bucket, req, res) {
		const id = req.params.id;
		const imageId = bucket.find(i => i === id);

		if (!imageId) {
			return res.sendStatus(404);
		}
		
		if (this._isNotModified(req, this.byIdMaxAge)) {
			return res.sendStatus(304);
		}

		const width = parseFloat(req.params.width);
		const height = parseFloat(req.params.height);

		if (!ImageService.isValidDimensions(width, height)) {
			return res.sendStatus(400);
		}

		const tenant = TenantService.getTenant(req.hostname);
		AnalyticsService.trackImageView({
			trackingId: tenant.gaTrackingId,
			clientIp: req.ip,
			userAgent: req.get('User-Agent'),
			isRandom: false,
			imageId,
			width,
			height
		});

		this._setHeaders(res, this.byIdMaxAge);
		const image = await this._fetchImage(imageId, width, height, res);
		res.send(image);
	}

	async getRandom (req, res, next) {
		try {
			const tenant = TenantService.getTenant(req.hostname);
			await this._getRandomRedirect(tenant.images, req, res);
		} catch (err) {
			next(err);
		}
	}

	async getById (req, res, next) {
		try {
			const tenant = TenantService.getTenant(req.hostname);
			await this._getById(tenant.images, req, res);
		} catch (err) {
			next(err);
		}
	}
}

export { ImageController };