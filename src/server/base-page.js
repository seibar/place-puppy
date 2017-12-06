export default ({ title, body }) => `
<!doctype html>
<html lang="en">
	<head>
		<title>${title} - placeholder images</title>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">		
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-110217086-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'UA-110217086-1');
		</script>
		<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({
			google_ad_client: "ca-pub-7757864177952629",
			enable_page_level_ads: true
			});
		</script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<style>
			body {
				color: #52526b;
				background-color: #EDEDED;
			}
			input {
				background-color: #EDEDED;
			}
			button.btn.btn-info {
				cursor: pointer;
				background-color: #52526b;
				border-color: #52526b;
				color: #EDEDED;
			}
			button.btn.btn-info:hover {
				background-color: #78798c;
				border-color: #78798c;
			}
			.jumbotron {
				background-color: #52526b;
				color: #EDEDED;
			}
			.img {
				width: 100%;
				border-radius: 3px;
			}
			.carousel-control {
				font-size: 65px;
				color: #52526b;
				opacity: 0.85;
			}
			.carousel-control:hover {
				color: #52526b;
				opacity: 1;
			}
			.carousel-control:focus {
				color: #52526b;
				opacity: 1;
			}
		</style>
	</head>
	<body>
		${body}
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
		<script src="/public/main.js"></script>
	</body>
</html>
`
