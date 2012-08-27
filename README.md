============
jQuery Glaze
============

A lightweight plugin for loading overlays for individual DOM elements. (e.g. grey out a single element while loading it's content via ajax)

- Requires at least jQuery 1.7

Usage
-----
JavaScript::

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.glaze.js"></script>
	<script type="text/javascript">
		$(function () {
			//initialize (the supplied object is the default option object - shown for documentation purposes)
			$('#demo').glaze({
				overlayHtml : '<div></div>', //basic overlay html
				overlayClass : null, //optional user defined class to apply, all other appearance options will be ignored
				zIndex : 500, //z-index of the overlay
				opacity : 0.8, //opacity of the overlay
				background : '#000000 url(\'img/loader.gif\') no-repeat center', //the overlay background css property
				//show callback
				show : function () {
					this.show();
				},
				//hide callback
				hide : function () {
					this.hide();
				}
			});
			//this is the same as the above
			$('#demo-2').glaze();

			//call show function
			$('#show').on('click', function (e) {
				$('#demo').glaze('show');
				$('#demo-2').glaze('show');
			});

			//call hide function
			$('#hide').on('click', function (e) {
				$('#demo').glaze('hide');
				$('#demo-2').glaze('hide');
			});
		});
	</script>