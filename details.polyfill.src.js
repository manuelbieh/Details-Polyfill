/**
 * <details> crossbrowser support
 *
 * This jQuery based polyfill makes <details>/<summary> ready for use
 * in most browsers.
 * http://dev.w3.org/html5/spec/Overview.html#the-details-element
 * 
 * @author Manuel Bieh
 * @url http://www.manuel-bieh.de/
 * @version 0.9
 * @license http://www.gnu.org/licenses/lgpl-3.0.txt LGPL
 *
 * Date $LastChangedDate: 2011-08-03 08:43:30 +0200 (Mi, 03 Aug 2011) $
 *
 */


jQuery(function($) {

	(function() {

		var me = this;

		this.hideDetailChildren = function(detail) {

			var	children = detail instanceof jQuery ? detail[0].childNodes : detail.childNodes,
				childrenLength = children.length;

			$(detail).attr('open', false);

			$.each(children, function(cKey, childElement) {

				if($(childElement)[0].nodeType == 1 
					&& childElement == $(childElement).parent().find('> summary:first-of-type')[0]) {

					if($(childElement).data('processed') != true) {

						$(childElement).css({"display":"block", "cursor":"pointer"}).data('processed', true).addClass('detailHidden').bind('click', function() {
							me.toggleDetailChildren($(this));
						});

						$(detail).prepend($(childElement));

					}

				} else if($(childElement)[0].nodeType == 3 
					/*&& !childElement.isElementContentWhitespace*/) {

					var	span = $('<span />').css({"color":"red"});
						span.text(childElement.textContent).hide();

					$(childElement).after(span);
					childElement.textContent = '';

				} else if ($(detail).find('> summary').length == 0) {

					var summary = $('<summary />').text('Details').css({"display":"block", "cursor":"pointer"}).data('processed', true).addClass('detailHidden').bind('click', function() {
						me.toggleDetailChildren($(this));
					});

					$(detail).prepend(summary);

				}

				$(detail).find('> :visible:not(summary:first-child)').hide();

			});

		}

		this.showDetailChildren = function(detail) {

			$(detail).attr('open', true);

			$.each($(detail).find('> *'), function(key, childNode) {
				$(childNode).show();
			});

		}

		this.toggleDetailChildren = function(summary) {

			if(summary.hasClass('detailHidden')) {
				summary.removeClass('detailHidden');
				me.showDetailChildren(summary.parents('details')[0]);
			} else {
				summary.addClass('detailHidden');
				me.hideDetailChildren(summary.parents('details')[0]);
			}

		}

		if('open' in document.createElement('details') == false) {

			$.each($('details'), function(dKey, detailElement) {

				me.hideDetailChildren(detailElement);
				var style = $('<style />').text('summary {-webkit-text-size-adjust: none;} details > summary:first-child:before {content: "▼ "} details > summary.detailHidden:first-child:before {content: "► "}');
				$('head').append(style);

			});

		}

	})();

});