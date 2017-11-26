export const homeView = ({ title, imageIds }) => `
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>placeholder images ${title}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
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
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<style>
			body {
				margin: 0 auto;
				width: 1000px;
				font-family: Verdana, sans-serif;
			}
			h1 {
				font-size: 24px;
				margin-bottom: 20px;
			}
			footer {
				clear: both;
				padding-top: 30px;
			}
			footer i.fa {
				font-size: 22px;
				color: #989898;
			}
			footer i.fa:hover {
				color: black;
			}

			section.step {
				margin-top: 15px;
			}
			.step-action {
				display: inline-block;
				margin: 10px 0 0 82px;
			}
			.step-action label {
				width: 160px;
				display: inline-block;
			}

			.img-description {
				text-align: center;
				margin-top: 5px;
			}

			section.img {
				float: left;
				margin-top: 10px;
				margin-bottom: 20px;				
			}
			section.img img {
				width: 480px;
				height: 260px;
			}
			#loading {
				width: 480px;
				height: 263px;
				font-size: 50px;
				text-align: center;
				display: table-cell;
				vertical-align: middle;
				display: none;
			}
			section.img.random {
				margin-right: 30px;
			}
			section.img input {
				display: block;
				margin: 0 auto;
				width: 455px;
				font-size: 24px;
				height: 20px;
				padding: 10px;
				margin-bottom: 5px;
			}
			section.img button {
				cursor: pointer;
				font-size: 12px;
    			margin: 0 5px 0 5px;
			}
		</style>
	</head>
	<body>
		<header>
			<h1>${title} placeholder image</h1>
		</header>
		<section class="step">
			<div>
				<strong>pick your dimensions</strong>
			</div>
			<div style="margin-top:10px;">
				<label for="width">width (max 2000):</label>
				<input id="width" type="number" min="1" max="2000" value="400" style="margin-right:25px;" />
				<label for="height">height (max 2000):</label>
				<input id="height" type="number" min="1" max="2000" value="250" />
			</div>
		</section>

		<section class="step">
			<strong>pick your puppy</strong>
		</section>
		<section class="img random">
			<img id="random-img" src="/480/260" />
			<div class="img-description">
				<input id="random-url" type="text" disabled="disabled" />
				pick a random puppy
			</div>
		</section>
		<section class="img by-id">
			<img id="favorite-img" data-imgid="0" src="/1p/480/260" />
			<div id="loading">
				<i class="fa fa-spinner fa-spin"></i>
			</div>
			<div class="img-description">
				<input id="favorite-url" type="text" disabled="disabled" />
				<button id="prev-favorite">&laquo; previous puppy</button>
				pick your favorite puppy
				<button id="next-favorite">next puppy &raquo;</button>
			</div>
		</section>

		<footer>
			<a href="https://github.com/seibar/place-puppy"><i class="fa fa-github"></i></a>
		</footer>

		<script>
			(function () {
				document.addEventListener("DOMContentLoaded", function () {
					var imageIds = [
						${imageIds.map(imageId => `'${imageId}'`).join(',')}
					];
					var widthElement = document.getElementById('width');
					var heightElement = document.getElementById('height');
					var favoriteImgElement = document.getElementById('favorite-img');
					var randomUrlInputElement = document.getElementById('random-url');
					var favoriteUrlInputElement = document.getElementById('favorite-url');
					var prevButton = document.getElementById('prev-favorite');
					var nextButton = document.getElementById('next-favorite');
					var loadingElement = document.getElementById('loading');
					var host = document.location.host;

					widthElement.onchange = handleDimensionChange;
					heightElement.onchange = handleDimensionChange;
					prevButton.onclick = prevFavoriteImage;
					nextButton.onclick = nextFavoriteImage;
					favoriteImgElement.onload = function () {
						loading(false);
					}

					setRandomImageUrl(400, 250);
					favoriteUrlInputElement.value = getFavoriteImageUrl(0, 400, 250);

					function isValidDimension (dimension) {
						dimension = parseFloat(dimension);
						if (!Number.isInteger(dimension)) return false;
						if (dimension > 2000) return false;
						if (dimension < 1) return false;

						return true;
					}

					function handleDimensionChange (event) {
						if (!isValidDimension(event.target.value)) {
							return;
						}

						var width = widthElement.value;
						var height = heightElement.value;
						
						var favoriteIndex = favoriteImgElement.dataset.imgid;
						setRandomImageUrl(width, height);
						favoriteUrlInputElement.value = getFavoriteImageUrl(favoriteIndex, width, height);
					}

					function setRandomImageUrl (width, height) {
						randomUrlInputElement.value = 'http://' + host + '/' + width + '/' + height;
					}

					function getFavoriteImageUrl (index, width, height) {
						return favoriteUrlInputElement.value = 'http://' + host + '/' + imageIds[index] + '/' + width + '/' + height;
					}

					function setFavoriteImage (index) {
						loading(true);
						var url = getFavoriteImageUrl(index, 480, 260);
						favoriteImgElement.src = url;
						favoriteImgElement.dataset.imgid = index;
					}

					function prevFavoriteImage() {
						var favoriteIndex = parseFloat(favoriteImgElement.dataset.imgid);
						if (favoriteIndex === 0) {
							favoriteIndex = imageIds.length - 1;
						} else {
							favoriteIndex--;
						}
						setFavoriteImage(favoriteIndex);
						favoriteUrlInputElement.value = getFavoriteImageUrl(favoriteIndex, 400, 250);						
					}

					function nextFavoriteImage () {
						var favoriteIndex = parseFloat(favoriteImgElement.dataset.imgid);
						if (favoriteIndex === imageIds.length - 1) {
							favoriteIndex = 0;
						} else {
							favoriteIndex++;
						}
						setFavoriteImage(favoriteIndex);
						favoriteUrlInputElement.value = getFavoriteImageUrl(favoriteIndex, 400, 250);
					}

					function loading(isLoading) {
						favoriteImgElement.style.display = isLoading ? 'none' : 'inline-block';
						loadingElement.style.display = isLoading ? 'table-cell': 'none';
					}
				});
			}());
		</script>
	</body>
</html>
`;