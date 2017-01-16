<?php
	require_once('config.php');

	$admin = !empty($_SESSION['admin']) ? 1 : 0;

	$sql = "SELECT * FROM bindio_points";
	$result = mysql_query($sql);

	$points = array();
	if (mysql_num_rows($result) > 0) {
		while($obj = mysql_fetch_object($result)) {
			$points[] = array(
				'id' => $obj->id,
				'lat' => $obj->lat,
				'long' => $obj->long,
				'times_requested' => $obj->times_requested,
				'owned' => in_array($obj->id, $_SESSION['users_points']),
				'upvoted' => in_array($obj->id, $_SESSION['users_upvotes'])
			);
		}
	}

	$firstTime = true;
	if(!empty($_SESSION['first_time']) && $_SESSION['first_time'] == 1){
		$firstTime = false;
	}
	$_SESSION['first_time'] = 1;

?>

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Bindio World Map for Kickstarter</title>
		<link rel="stylesheet" href="css/style.css">
		<link rel="shortcut icon" href="/map/favicon.ico" />
		<meta property="og:title" content="Bindio" />
		<meta property="og:description" content="Would love to bring the #Bindio smart bike parking to our city. If we team up, it's definitely doable! Who’s in?" />
		<meta property="og:image" content="http://bindio.com/map/images/FB-share.png" />
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-59354733-1', 'auto');
			ga('send', 'pageview');

		</script>
	</head>

	<body>
		<div class="container">
			<div class="top">
				<div class="block">
					<a href="http://bindio.com/" class="logo"></a>
					<span class="site-description">Choose your desired location</span>
					<a href="javascript:" onclick="$('.guide').show();return false;" class="show-guide">How does it work?</a>
				</div>
				<div class="corner"></div>
			</div>

			<div class="guide" style="<?= (!$firstTime) ? 'display: none' : '' ?>">
				<p>Now’s your chance to decide where Bindio will be rolled out first. Vote for locations in your city!</p>
				<strong>How does it work?</strong>
				<br/>
				<p>1. You get 5 pins</p>
				<p>2. Place your pins on the map where you want to see Bindio</p>
				<p>3. If the location is already pinned, hover over it and click on the ‘+’ symbol to add your vote</p>
				<p>4. Changed your mind? Press the ‘-’ symbol when you hover the mouse over your pin</p>
				<p>
					We will begin launching Bindio in cities with the most pins, so every vote counts. Share with your
					friends and make sure that your city is on top!
				</p>
				<br/>
				<a href="https://www.kickstarter.com/projects/914874115/bindio-the-smartest-most-secure-bike-parking-stand" target="_blank" class="video">Read more about Bindio stands on Kickstarter</a>

				<a href="javascript: closeGuide();" class="close">Ok, got it!</a>
			</div>

			<div id="map">

			</div>
			<div class="bottom">
				<div class="left-side">
					<a href="https://www.kickstarter.com/projects/914874115/bindio-the-smartest-most-secure-bike-parking-stand" target="_blank" class="kickstarter"></a>
				</div>

				<div class="right-side">
					<a href="javascript: showVideo()" class="what-is-bindio">What is Bindio?</a>

					<a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//bindio.com/map" 
					onclick="return !window.open(this.href, 'Facebook', 'width=500,height=500')" 
					class="facebook-icon"></a>

					<a href="https://twitter.com/home?status=Would%20love%20to%20bring%20the%20%23Bindio%20smart%20bike%20parking%20to%20our%20city.%20If%20we%20team%20up,%20it's%20definitely%20doable!%20Who%E2%80%99s%20in?%20http%3A//bindio.com/map/" 
					onclick="return !window.open(this.href, 'Twitter', 'width=500,height=500')" 
					class="twitter-icon"></a>
				</div>

				<div class="clearfix"></div>
			</div>
		</div>

		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4nGBpwskWYWdGiAYNtH92MkKWRvn2yMw"></script>
		<script src="js/marker.js"></script>
		<script src="js/jquery-1.11.3.min.js"></script>
		<script src="js/jquery.simplemodal.1.4.4.min.js"></script>
		<script src="js/main.js"></script>

		<script>
			var totalActions = <?= count($_SESSION['users_points']); ?>;
			var admin = <?= $admin ?>;

			var points = <?= json_encode($points) ?>;
			initMap(points);
		</script>
	</body>
</html>
