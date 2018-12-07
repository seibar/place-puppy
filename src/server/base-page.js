export default ({ tenant, body, version }) => `
<!-- version ${version} -->
<!doctype html>
<html lang="en">
	<head>
		<title>${tenant.title} - placeholder images</title>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">		
		${
			!!tenant.gaTrackingId ? `
				<script async src="https://www.googletagmanager.com/gtag/js?id=${tenant.gaTrackingId}"></script>
				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${tenant.gaTrackingId}');
				</script>
			` : ''
		}
		${
			!!tenant.googleAdClientId ? `
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<script>
					(adsbygoogle = window.adsbygoogle || []).push({
					google_ad_client: "${tenant.googleAdClientId}",
					enable_page_level_ads: true
					});
				</script>
			` : ''
		}
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<style>
			body {
				color: #4b4b54;
				background-color: #EFEFEF;
			}
			input {
				background-color: #EDEDED;
			}
			button.btn.btn-info {
				cursor: pointer;
				background-color: #4b4b54;
				border-color: #4b4b54;
				color: #EDEDED;
			}
			button.btn.btn-info:hover {
				background-color: #78798c;
				border-color: #78798c;
			}
			.jumbotron {
				background-color: #4b4b54;
				color: #EDEDED;
			}
			.img {
				width: 100%;
				border-radius: 3px;
			}
			.carousel-control {
				font-size: 65px;
				color: #4b4b54;
				opacity: 0.85;
			}
			.carousel-control:hover {
				color: #4b4b54;
				opacity: 1;
			}
			.carousel-control:focus {
				color: #4b4b54;
				opacity: 1;
			}
			.copy-icon {
				fill: white;
			}
			.url .tooltip {
				opacity: 1;
				top: 45px;
				right: 0;
			}
			.url .tooltip .arrow {
				left: 50%;
			}
			.loading {
				width: 100%;
				height: 338px;
				font-size: 50px;
			}
			.loading i {
				position: relative;
				top: 50%;
				left: 50%;
			}
			.hidden {
				display: none;
			}
			footer {
				font-size: 14px;
			}
			a.github {
				color: #4b4b54;
			}
			a.github:hover {
				color: #19191d;
			}
			i.fa-github {
				font-size: 18px;
			}
		</style>
	</head>
	<body>
		<div id="app">
			${body}
		</div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js"></script>
		<script>window.tenant = ${JSON.stringify(tenant)}</script>
		<script src="/public/main.js"></script>
	</body>
</html>
`
