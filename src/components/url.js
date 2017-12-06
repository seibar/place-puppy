import React from 'react';

class ImageUrl extends React.Component {
	constructor (props) {
		super(props);
		this.copyToClipboard = this.copyToClipboard.bind(this);
	}

	copyToClipboard (event) {
		this.urlInput.select();
		document.execCommand('copy');
		event.target.focus();
	}

	render () {
		const { url } = this.props;

		return (
			<div className="input-group">
				<input ref={(input) => { this.urlInput = input; }} className="form-control" type="text" value={url} readOnly />
				<span className="input-group-addon">
					<button onClick={this.copyToClipboard} className="btn btn-info" aria-label="Copy URL to your clipboard">
						<i className="fa fa-clipboard" aria-hidden="true"></i>
					</button>
				</span>
			</div>
		);
	}
}

export default ImageUrl