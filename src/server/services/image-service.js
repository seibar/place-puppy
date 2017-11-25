import { S3 } from 'aws-sdk';
import sharp from 'sharp';

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

	async fetchImage (imageId, width, height) {
		const filename = `${imageId}-${width}x${height}.jpg`;

		try {
			return await this._fetchImageFromS3(filename);
		} catch (err) {
			// TODO: 
			// Better way to check if image exists than catching a 403?
			// Is it better to be optimistic that the image will exist, or should there be a headObject before the get to ensure it exists?
			// Should the known good image paths be cached to avoid extra head checks? How to handle if the cache becomes invalid due to image being deleted from server?

			// TODO: validate image dimensions (even though that should have happened already upstream)

			if (err.statusCode === 403) {
				// Image does not exist. Need to create one with the given dimensions and save it.
				try {
					const baseImage = await this._fetchImageFromS3(`${imageId}.jpg`);
					const resized = await sharp(baseImage).resize(width, height).toBuffer();

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