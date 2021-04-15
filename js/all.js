// Skript für alle Inhaltsseiten

/**
 * Lesen und Schreiben von Cookie-Informationen
 */
var CookieUtil = {
    setCookie: function(cookieName, retentionDays, cookieValue) {
        var d, cookieString;
        cookieString = cookieName + "=" + cookieValue;
        if (null !== retentionDays) {
            d = new Date();
            d.setTime(d.getTime() + (retentionDays * 24 * 60 * 60 * 1000));
            cookieString += ";expires=" + d.toUTCString();
        }
        document.cookie = cookieString + ";path=/";
    },
    getCookie: function(cookieName) {
        var name, decodedCookie, cookieArray, i, l, c;
        name = cookieName + "=";
        decodedCookie = decodeURIComponent(document.cookie);
        cookieArray = decodedCookie.split(";");
        for (i = 0, l = cookieArray.length; i < l; i++) {
            c = cookieArray[ i ];
            while (" " === c.charAt(0)) {
                c = c.substring(1);
            }
            if (0 === c.indexOf(name)) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
/**
 * Aufzeichnung des Aufrufs verschiedener Digital-Typen durch den Nutzer
 */
var TypeHistory = {
    retentionDays: 7,
    cookieName: "visited_types",
    setCookie: function(cookieValue) {
        CookieUtil.setCookie(this.cookieName, this.retentionDays, cookieValue)
    },
    getCookie: function() {
        return CookieUtil.getCookie(this.cookieName);
    },
    add: function(visitedType) {
        var cookieValue;
        var visitedTypes;
        cookieValue = this.getCookie();
        visitedTypes = "" === cookieValue ? [] : cookieValue.split(",");
        if (0 === visitedTypes.length || visitedType !== visitedTypes[visitedTypes.length - 1]) {
            visitedTypes.push(visitedType);
        }
        this.setCookie(visitedTypes.join(","));
    }
}
/**
 * Generieren und Lesen einer ID des Benutzers
 */
var TypeUserId = {
    cookieName: "user_id",
    idLength: 32,
    idChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    setCookie: function(cookieValue) {
        CookieUtil.setCookie(this.cookieName, null, cookieValue)
    },
    getCookie: function() {
        return CookieUtil.getCookie(this.cookieName);
    },
    generateId: function () {
        var str = "";
        for (var i=0; i < this.idLength; ++i) {
            var rand = Math.floor((window.crypto.getRandomValues(new Uint16Array(1))[0] / 65535) * this.idChars.length);
            str += this.idChars.substring(rand, rand+1);
        }
        return str;
    },
    init: function() {
        if ("" === this.getCookie()) {
            this.setCookie(this.generateId());
        }
    }
}
TypeUserId.init();
