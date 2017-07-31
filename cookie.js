/*
 * Cookie javascript library
 * https://github.com/delfimov/JS-Cookie
 *
 * Copyright (c) 2011 by Dmitry Elfimov
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2011-09-15
 */

var cookie = {

	set: function(k, v, e, p, d, s) {
		var c = k+'='+escape(v)+'; ';
		if (e !== undefined) {
			var t = new Date();
			t.setTime(t.getTime()+(e*24*60*60*1000));
			c+= 'expires='+t.toUTCString()+'; ';
		}
		c += (p === undefined) ? 'path=/;' : 'path='+p+'; ';
		c += (d === undefined) ? '' : 'domain='+d+'; ';
		c += (s === true) ? 'secure; ' : '';
		document.cookie = c;
	},

	get: function(k) {
		var v = '',
			ke = k+ '=',
			c = document.cookie.split(';');
		for (var i = 0, l = c.length; i < l; i++) {
			while (c[i].charAt(0) === ' ') {
				c[i] = c[i].substring(1);
			}
			if (c[i].indexOf(ke) === 0) {
				v = c[i].substring(ke.length);
			}
		}
		return unescape(v);
	},

	remove: function(k) {
		cookie.set(k, '', -1);
	},

    isEnabled: function() {
        var e = !!(navigator.cookieEnabled),
            t = '_test';
        if (typeof navigator.cookieEnabled == 'undefined' && !e) {
            cookie.set(t, t);
            e = (cookie.get(t) === t);
            cookie.remove(t);
        }
        return e;
    }

};