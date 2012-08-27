/*
 * jQuery.glaze - element overlay loading plugin.
 * https://github.com/ljurgs/jquery.glaze
 *
 * @author Luke Jurgs
 * Copyright 2012, Luke Jurgs
 * Released under the MIT and BSD Licenses.
 */

(function ($) {

	//public methods start here
	var methods = {
		init : function (userOptions) {
			var defaultOptions = {
				overlayHtml : '<div></div>',
				overlayClass : null,
				zIndex : 500,
				opacity : 0.8,
				background : '#000000 url(\'img/loader.gif\') no-repeat center',
				show : function () {
					this.show();
				},
				hide : function () {
					this.hide();
				}
			};

			var options = $.extend(defaultOptions, userOptions);

			return this.each(function () {
				var self = $(this);

				//only insert the overlay object if there isn't one already for this object
				if (0 === (typeof self.data('glazeOverlay')).localeCompare('undefined')) {
					var overlay = $(options.overlayHtml);
					overlay.addClass('glaze-overlay');

					//applies to everything
					overlay.hide();
					overlay.css('position', 'absolute');
					overlay.offset({ left : self.offset().left, top : self.offset().top });
					overlay.width(self.outerWidth(false));
					overlay.height(self.outerHeight(false));
					//default css
					if (null === options.overlayClass) {
						overlay.css('z-index', options.zIndex);
						overlay.css('opacity', options.opacity);
						overlay.css('background', options.background);
					} else {
						overlay.addClass(options.overlayClass);
					}

					$('body').append(overlay);
					self.data('glazeOverlay', overlay);
					self.data('glazeShow', options.show);
					self.data('glazeHide', options.hide);
				}
			});
		},

		show : function (userOptions) {
			return this.each(function () {
				var self = $(this);
				self.data('glazeShow').call(self.data('glazeOverlay'));
			});
		},

		hide : function () {
			return this.each(function () {
				var self = $(this);
				self.data('glazeHide').call(self.data('glazeOverlay'));
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

})(jQuery);