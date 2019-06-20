import React from 'react';

class ImageUrl extends React.Component {
	constructor (props) {
		super(props);
		this.copyToClipboard = this.copyToClipboard.bind(this);
		this.state = {
			isCopied: false
		};
	}

	copyToClipboard (event) {
		this.urlInput.select();
		document.execCommand('copy');
		// event.target.focus();
		this.setState({
			isCopied: true
		});
		setTimeout(() => this.setState({ isCopied: false }), 2000);
	}

	getTooltip () {
		if (this.state.isCopied) {
			return (
				<div className="tooltip bs-tooltip-bottom" role="tooltip">
					<div className="arrow"></div>
					<div className="tooltip-inner">
						Copied.
					</div>
				</div>
			)
		}

		return null;
	}

	render () {
		const { url } = this.props;
		const tooltip = this.getTooltip();

		return (
			<div className="url input-group">
				<input ref={(input) => { this.urlInput = input; }} className="form-control" type="text" value={url} readOnly />
				<span className="input-group-addon">
					<button onClick={this.copyToClipboard} className="btn btn-info" aria-label="Copy URL to your clipboard">
						<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14" className="copy-icon"><path fillRule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>
					</button>
					{tooltip}
				</span>
			</div>
		);
	}
}

export default ImageUrl;