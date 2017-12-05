import { ImageService, Analytics } from '../services';
import images from '../images.json';

// TODO: multi-tenancy with separate tracking IDs
const GA_TID = 'UA-110217086-1';

class ImageController {
	constructor ({ maxAge = 86400 }) {
		this.imageService = new ImageService();
		this.maxAge = maxAge;
	}

	_isNotModified (req) {
		const ifModifiedSince = new Date(req.get('If-Modified-Since'));
		const now = new Date();
		const age = now - ifModifiedSince;
		if (age < this.maxAge * 1000) {
			return true;
		}

		return false;
	}

	_isValidDimensions (req) {
		const width = parseFloat(req.params.width);
		const height = parseFloat(req.params.height);
		return Number.isInteger(width) && Number.isInteger(height);
	}

	_setHeaders (res) {
		res.setHeader('Content-Type', 'image/jpeg');
		res.setHeader('Cache-Control', ` max-age=${this.maxAge}, public`);
		res.setHeader('Expires', new Date(Date.now() + this.maxAge * 1000).toUTCString());
		res.setHeader('Last-Modified', new Date().toUTCString());
	}

	_fetchImage (imageId, width, height, res) {
		res.setHeader('id', imageId);
		return this.imageService.fetchImage(imageId, width, height);
	}

	async _getRandom (bucket, req, res) {
		if (this._isNotModified(req)) {
			return res.sendStatus(304);
		}

		const width = parseFloat(req.params.width);
		const height = parseFloat(req.params.height);

		if (!ImageService.isValidDimensions(width, height)) {
			return res.sendStatus(400);
		}

		this._setHeaders(res);
		const imageId = bucket[Math.floor(Math.random() * bucket.length)];

		Analytics.trackImageView({
			trackingId: GA_TID,
			clientIp: req.ip,
			userAgent: req.get('User-Agent'),
			isRandom: true,
			imageId,
			width,
			height
		});

		const image = await this._fetchImage(imageId, width, height, res);
		res.send(image);
	}

	async _getById (bucket, req, res) {
		const id = req.params.id;
		const imageId = bucket.find(i => i === id);

		if (!imageId) {
			return res.sendStatus(404);
		}
		
		if (this._isNotModified(req)) {
			return res.sendStatus(304);
		}

		const width = parseFloat(req.params.width);
		const height = parseFloat(req.params.height);

		if (!ImageService.isValidDimensions(width, height)) {
			return res.sendStatus(400);
		}

		Analytics.trackImageView({
			trackingId: GA_TID,
			clientIp: req.ip,
			userAgent: req.get('User-Agent'),
			isRandom: false,
			imageId,
			width,
			height
		});

		this._setHeaders(res);
		const image = await this._fetchImage(imageId, width, height, res);
		res.send(image);
	}

	async getRandomPuppy (req, res, next) {
		try {
			await this._getRandom(images.puppies, req, res);
		} catch (err) {
			next(err);
		}
	}

	async getPuppyById (req, res, next) {
		try {
			await this._getById(images.puppies, req, res);
		} catch (err) {
			next(err);
		}
	}
}

export { ImageController };