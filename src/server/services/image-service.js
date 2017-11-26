import { S3 } from 'aws-sdk';
import Jimp from 'jimp';

const S3_BUCKET = 'place-puppy';

class ImageService {
	_getS3 () {
		if (!this._s3) {
			this._s3 = new S3();
		}

		return this._s3;
	}

	_fetchImageFromS3 (filename) {
		const s3 = this._getS3();

		return new Promise((resolve, reject) => {
			s3.getObject({
				Bucket: S3_BUCKET,
				Key: filename
			}, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.Body);
				}
			});
		});
	}

	_uploadImageToS3 (imageBuffer, filename) {
		const s3 = this._getS3();

		return new Promise((resolve, reject) => {
			s3.upload({
				Bucket: S3_BUCKET,
				Key: filename,
				Body: imageBuffer,
				StorageClass: 'REDUCED_REDUNDANCY'
			}, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	_resizeImage (baseImageBuffer, width, height) {
		return new Promise ((resolve, reject) => {
			Jimp.read(baseImageBuffer, function (err, image) {
				if (err) {
					reject(err);
				} else {
					image.cover(width, height, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
					image.getBuffer(Jimp.MIME_JPEG, (err, resized) => resolve(resized));
				}
			})
		});
	}

	static isValidDimensions (width, height) {
		if (!Number.isInteger(width)) return false;
		if (!Number.isInteger(height)) return false;
		if (width > 2000) return false;
		if (height > 2000) return false;
		if (width < 1) return false;
		if (height < 1) return false;

		return true;
	}

	async fetchImage (imageId, width, height) {
		if (!ImageService.isValidDimensions(width, height)) {
			return Promise.reject(new Error('Invalid image dimensions'));
		}

		const filename = `${imageId}-${width}x${height}.jpg`;

		try {
			return await this._fetchImageFromS3(filename);
		} catch (err) {
			// TODO: 
			// Better way to check if image exists than catching a 403?
			// Is it better to be optimistic that the image will exist, or should there be a headObject before the get to ensure it exists?
			// Should the known good image paths be cached to avoid extra head checks? How to handle if the cache becomes invalid due to image being deleted from server?

			if (err.statusCode === 403) {
				// Image does not exist. Need to create one with the given dimensions and save it.
				try {
					const baseImage = await this._fetchImageFromS3(`${imageId}.jpg`);
					const resized = await this._resizeImage(baseImage, width, height);

					try {
						this._uploadImageToS3(resized, filename);
					} catch (err) {
						// Upload failure should not prevent serving the resized image.
						// TODO: logging
						console.log('Failed to upload to S3', filename, err);
					}

					return resized;
				} catch (err) {
					return Promise.reject(err);
				}
			} else {
				return Promise.reject(err);
			}
		}
	}

}

export { ImageService };