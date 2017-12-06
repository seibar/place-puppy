import React from 'react';
import Image from './image';
import Card from './card';
import Url from './url';

class Carousel extends React.Component {
	render () {
		const { tenant } = this.props;

		return (
			<Card>
				<div className="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<Image url={`${tenant.host}/1p/400/250`} />
						</div>
					</div>
					<a className="carousel-control carousel-control-prev" href="#" role="button">
						<i className="fa fa-angle-left" aria-hidden="true"></i>
						<span className="sr-only">Previous</span>
					</a>
					<a className="carousel-control carousel-control-next" href="#" role="button">
						<i className="fa fa-angle-right" aria-hidden="true"></i>
						<span className="sr-only">Next</span>
					</a>
				</div>
				<Url url={`${tenant.host}/1p/400/250`} />
			</Card>
		);
	}
}

export default Carousel;