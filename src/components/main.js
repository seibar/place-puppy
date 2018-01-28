import React from 'react';
import Url from './url';
import Image from './image';
import Card from './card';
import Carousel from './carousel';
import tenants from '../server/tenants';

class Main extends React.Component {
	constructor (props) {
		super(props);
		this.getOtherTenants = this.getOtherTenants.bind(this);
	}

	getOtherTenants () {
		const thisTenant = this.props.tenant;

		const otherTenants = Object.keys(tenants)
			.filter(key => tenants[key].name !== thisTenant.name)
			.map(key => {
				const tenant = tenants[key];
				return [
					<a href={tenant.baseUrl}>{tenant.title}</a>, 
					<br />
				];
			});

		return otherTenants;
	}

	render () {
		const { tenant } = this.props;
		const otherTenants = this.getOtherTenants();

		return [
			<header className="container">
				<h1>{tenant.title}</h1>
			</header>,
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<div className="row justify-content-center">
						<Card>
							<Image url={`/400/250`} />
							<Url url={`${tenant.baseUrl}/400/250`} />
							a random {tenant.name} image
						</Card>
						<Carousel tenant={tenant}>
							your favorite {tenant.name} image
						</Carousel>
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
							<a href="https://github.com/seibar/place-puppy" className="github"><i className="fa fa-github"></i></a>
						</div>
						<div className="col-11 text-right">
							more placeholder images!
							<br />
							{otherTenants}
						</div>
					</div>
				</footer>
			</div>
		];
	}
}

export default Main;
