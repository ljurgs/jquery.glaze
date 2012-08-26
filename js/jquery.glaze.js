(function ($) {

	//public methods start here
	var methods = {

		init : function (userOptions) {
			var defaultOptions = {
				loadImage : 'img/loader.gif',
				zIndex : 1000,
				cssClass : null
			};

			var options = $.extend(defaultOptions, userOptions);

			return this.each(function () {
				var self = $(this);
				var overlay = $('<div></div>');
				overlay.addClass('glaze-overlay');

				//applies to everything
				overlay.css('position', 'absolute');
				if (null !== options.zIndex) {
					overlay.css('z-index', options.zIndex);
				}
				overlay.offset({ left : self.offset().left, top : self.offset().top });
				overlay.width(self.outerWidth(false));
				overlay.height(self.outerHeight(false));
				//default css
				if (null === options.cssClass) {
					overlay.css('opacity', '0.8');
					overlay.css('background-color', '#000000');
					overlay.css('background-image', 'url(' + options.loadImage + ')');
					overlay.css('background-repeat', 'no-repeat');
					overlay.css('background-position', 'center');
				} else {
					overlay.addClass(options.cssClass);
				}

				if (0 === self.next('.glaze-overlay').length) {
					self.after(overlay);
				}
			});
		},

		show : function (userOptions) {
			return this.each(function () {
				var self = $(this);
				self.next('.glaze-overlay').show();
			});
		},

		hide : function () {
			return this.each(function () {
				var self = $(this);
				self.next('.glaze-overlay').hide();
			});
		}

	};

	$.fn.extend({
		glaze : function (method) {
			// Method calling logic
			if (0 === (typeof method).localeCompare('string')) {
				if (methods.hasOwnProperty(method)) {
					return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
				} else {
					throw 'Method ' + method + ' does not exist on jQuery.glaze';
				}
			} else if ((0 === (typeof method).localeCompare('object')) || (0 === (typeof method).localeCompare('undefined'))) {
				return methods.init.apply(this, arguments);
			} else {
				throw 'Invalid parameter(s) for jQuery.glaze';
			}
		}
	});
})
	(jQuery);