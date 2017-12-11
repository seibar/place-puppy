import fetch from 'node-fetch';

class AnalyticsService {
	static trackImageView ({ trackingId, clientIp, userAgent, isRandom, imageId, width, height }) {
		if (!trackingId) {
			return;
		}
		
		const parameters = {
			v: '1',
			tid: trackingId,
			cid: '1',
			t: 'event',
			ec: 'imageDownload',
			ea: isRandom ? 'random' : 'byId',
			el: `${imageId}-${width}x${height}`,
			uip: clientIp,
			ua: userAgent
		};
		const body = Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&');
		return fetch(`https://www.google-analytics.com/collect`, {
			method: 'POST',
			body
		});
	}
}

export { AnalyticsService };