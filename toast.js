//
//  toast.js
//  Toast
//
//  Created by Akinjide Bankole on 9/23/17, 7:44 PM.
//  Copyright © 2017
//

/* global define */
(function (define) {
  define(['jquery'], function ($) {
    return (function () {

      var opts;
      var toast = {
        info: info,
        dark: dark,
        success: success,
        error: error,
        warn: warn,
        config: config,
        version: '1.1.0'
      };

      return toast;

      ////////////////

      function info(message) {
        return new ToastBuilder()(message, 'info');
      }

      function dark(message) {
        return new ToastBuilder()(message);
      }

      function success(message) {
        return new ToastBuilder()(message, 'success');
      }

      function error(message) {
        return new ToastBuilder()(message, 'error');
      }

      function warn(message) {
        return new ToastBuilder()(message, 'warning');
      }

      function config(options) {
        opts = getToastOptions(options);
      }

      function getToastOptions(options) {
        return $.extend({}, getToastDefaults(), options);
      }

      ////////////////

      // setup some defaults ...
      function getToastDefaults() {
        return {
          target: 'body',
          showDuration: 3000,
          text: 'yo! toast',
          tapToDismiss: true,
          bgColor: 'rgba(0, 0, 10, 0.7)',
          toastClass: '.toast'
        };
      }

      function colors(color) {
        return {
          'error': 'rgba(239, 83, 80, 0.7)',
          'info': 'rgba(66, 165, 245, 0.7)',
          'success': 'rgba(102, 187, 106, 0.7)',
          'warning': 'rgba(255, 202, 40, 0.7)'
        }[color] || null;
      }

      ////////////////

      // requires jQuery ... for now
      function ToastBuilder() {
        if (!opts) {
          config();
        }

        return function (text, type) {
          $('<div/>')
            .addClass('toast')
            .prependTo($(opts.target))
            .text(text || opts.text)
            .queue(function(next) {
              $(this).css({
                'opacity': 1,
                'background-color': colors(type) || opts.bgColor
              });

              var topOffset = 15;
              $('.toast').each(function() {
                var $this = $(this);
                var height = $this.outerHeight();
                var offset = 15;

                $this.css('top', topOffset + 'px');

                if (opts.tapToDismiss) {
                  $(this).click(function() {
                    $(this).remove();
                  });
                }

                topOffset += height + offset;
              });

              next();
            })
            .delay(opts.showDuration)
            .queue(function(next) {
              var $this = $(this);
              var width = $this.outerWidth() + 20;

              $this.css({
                'right': '-' + width + 'px',
                'opacity': 0
              });

              next();
            })
            .delay(600)
            .queue(function(next) {
              $(this).remove();
              next();
            });
        };
      }

      /* TODO: make this */

      // preventDuplicates: false,
      // newestOnTop: false,
      // position: 'top right'
      // if (opts.position.indexOf('left') > -1) {
      //   $this.css('left', '15px');
      // }
      //
      // closeButton: false,
      // closeClass: '.closer',
      // $closer
      //   .css('cursor', 'pointer')
      //   .on('click', function(e) {
      //     e.preventDefault();
      //     e.stopPropagation();
      //
      //     return true;
      //   });

    })();
  });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    window.toast = factory(window.jQuery);
  }
}));