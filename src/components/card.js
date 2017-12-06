import React from 'react';

class ImageCard extends React.Component {
	render () {
		const { children } = this.props;
		return (
			<div className="image-card mb-4 mb-lg-0 col-xs-12 col-sm-10 col-md-10 col-lg-6">
				{children}
			</div>
		);
	}
}

export default ImageCard;