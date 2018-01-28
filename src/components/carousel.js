import React from 'react';
import Image from './image';
import Card from './card';
import Url from './url';

class Carousel extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentImageIdx: 0,
			isLoading: false
		};

		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.getSpinner = this.getSpinner.bind(this);
	}

	previous () {
		let currentImageIdx = this.state.currentImageIdx;
		if (currentImageIdx === 0) {
			currentImageIdx = this.props.tenant.images.length - 1;
		} else {
			currentImageIdx--;
		}
		this.setState({
			currentImageIdx,
			isLoading: true
		});
	}

	next () {
		let currentImageIdx = this.state.currentImageIdx;
		if (currentImageIdx === this.props.tenant.images.length - 1) {
			currentImageIdx = 0;
		} else {
			currentImageIdx++;
		}
		this.setState({
			currentImageIdx,
			isLoading: true
		});
	}

	getImage (imageUrl) {
		return (
			<div className={this.state.isLoading ? 'hidden' : ''}>
				<Image url={imageUrl} onLoad={() => this.setState({ isLoading: false })} />
			</div>
		);
	}

	getSpinner () {
		if (this.state.isLoading) {
			return <div className="loading img mb-2 mb-lg-3"><i className="fa fa-spinner fa-spin"></i></div>;
		}
		return null;
	}

	render () {
		const { tenant, children } = this.props;
		const imageUrl = `/${tenant.images[this.state.currentImageIdx]}/400/250`;
		const image = this.getImage(imageUrl);
		const spinner = this.getSpinner();
		
		return (
			<Card>
				<div className="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							{spinner}
							{image}
						</div>
					</div>
					<a className="carousel-control carousel-control-prev" href="javascript:void(0)" role="button" onClick={this.previous}>
						<i className="fa fa-angle-left" aria-hidden="true"></i>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control carousel-control-next" href="javascript:void(0)" role="button" onClick={this.next}>
						<i className="fa fa-angle-right" aria-hidden="true"></i>
						<span className="sr-only">Next</span>
					</a>
				</div>
				<Url url={`${tenant.baseUrl}${imageUrl}`} />
				{children}
			</Card>
		);
	}
}

export default Carousel;