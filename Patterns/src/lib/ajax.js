define(function(require) {
    var log = require('../logging').getLogger('ajaxlib');

    var submit = function($el, opts) {
        // XXX: make these only defaults
        opts.context = $el;
        opts.error = function(a,b,c,d) {
            log.error(arguments);
        };

        if ($el.is('form')) {
            log.debug('form submit', $el);
            opts.url = $el.attr('action');
            if (opts.beforeSerialize) {
                opts.beforeSerialize();
            }
            opts.data = $el.serialize() + '&submit=submit';
            // XXX: check method on form, use POST as default only
            opts.type = 'POST';
            $.ajax(opts);
        } else {
            log.debug('submit', $el);
            $.ajax(opts);
        }
    };

    return submit;
});