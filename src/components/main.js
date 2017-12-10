import React from 'react';
import Url from './url';
import Image from './image';
import Card from './card';
import Carousel from './carousel';

class Main extends React.Component {
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
							<Image url={`/400/250`} />
							<Url url={`${tenant.host}/400/250`} />
						</Card>
						<Carousel tenant={tenant} />
					</div>
				</div>
			</div>,
			<div className="container">
				<div className="row">
					<div className="col">
						<article>
							<p>Serving all of your <strong>{tenant.description}</strong> needs, these images are free for you to use in your design or development projects.</p>
						 	<p>If you need a simple placeholder image, choose either a <strong>random {tenant.name}</strong>, or your <strong>favorite {tenant.name}</strong>. Change the image size by modifying the width/height parameters on the URL as you need.</p>
						</article>
					</div>
				</div>
				<footer className="mt-4">
					<div className="row">
						<div className="col-1">
							<a href="https://github.com/seibar/place-puppy"><i className="fa fa-github"></i></a>
						</div>
						{/* <div className="col-11 text-right">
							more placeholder images!
							<br />
							<a href="http://www.placecage.com/">place trump</a>
							<br />
							<a href="http://www.placecage.com/">place a baby</a>
						</div> */}
					</div>
				</footer>
			</div>
		];
	}
}

export default Main;
