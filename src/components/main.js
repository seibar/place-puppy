import React from 'react';
import Url from './url';
import Image from './image';
import Card from './card';
import Carousel from './carousel';

class Main extends React.Component {
	componentDidMount () {
		console.log('component did mount');
	}
	
	render () {
		const { tenant } = this.props;
		return [
			<header className="container">
				<h1>{tenant.title}</h1>
			</header>,
			<div className="jumbotron jumbotron-fluid">
				<div className="container">

					<div className="row justify-content-center">
						<Card>
							<Image url={`${tenant.host}/400/250`} />
							<Url url={`${tenant.host}/400/250`} />
						</Card>
						<Carousel tenant={tenant} />
					</div>

				</div>
			</div>
		];
	}
}

export default Main;
