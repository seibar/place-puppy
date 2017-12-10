import React from 'react';

class Image extends React.Component {
	render () {
		const { url, onLoad } = this.props;

		return <img src={url} className="img mb-2 mb-lg-3" onLoad={onLoad} />;
	}
}

export default Image;