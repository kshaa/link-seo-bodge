const blc = require('broken-link-checker')

const crawlSite = "http://www.example.com"
const crawlOptions = {
    rateLimit: 25, // Miliseconds between requests
    maxSocketsPerHost: 5    
}

function isDoubleSlash(url) {
    var protocolIndication = "://";
    var protocolIndex = url.indexOf(protocolIndication);
    var doubleSlash = "//";
    var trailSearchable;

    if (protocolIndex === -1) {
        trailSearchable = url
    } else {
        trailSearchable = url.slice(protocolIndex + protocolIndication.length)
    }

    return trailSearchable.indexOf(doubleSlash) !== -1;
}

function isTrailingSlash(url) {
        if (url.indexOf("?") !== -1) {
                    url = url.substring(0, url.indexOf('?'))
                            }
            if (url.indexOf("#") !== -1) {
                        url = url.substring(0, url.indexOf('#'))
                                }

                return url.substr(url.length -1) === "/"; 
}

function logUrlResult(result) {
    // Denied / Errored / Excluded / OK'd
    if (result.broken) {
        if (result.brokenReason == "HTTP_999") {
            console.log("Crawler denied for url '" + result.url.original + "' as seen in '" + result.base.original + "'");
        } else {
            console.log("Error '" + result.brokenReason + "' for url '" + result.url.original + "' as seen in '" + result.base.original + "'");
        }
    } else if (result.excluded) {
        console.log("Excluded '" + result.excludedReason + "' for url '" + result.url.original + "' as seen in '" + result.base.original + "'");
    } else {
        console.log("OK for url '" + result.url.original + "' as seen in '" + result.base.original + "'");
    }

    // Trailing slashes
    if (isDoubleSlash(result.url.original)) {
        console.log("Double slash in url '" + result.url.original + "' as seen in '" + result.base.original + "'");
    }

    if (isTrailingSlash(result.url.original)) {
        console.log("Trailing slash in url '" + result.url.original + "' as seen in '" + result.base.original + "'");
    }
}

var siteChecker = new blc.SiteChecker({}, {
    robots: function(robots, customData){},
    html: function(tree, robots, response, pageUrl, customData){},
    junk: function(result, customData){},
    link: logUrlResult, // function(result, customData){},
    page: function(error, pageUrl, customData){},
    site: function(error, siteUrl, customData){},
    end: function(){}
});

siteChecker.enqueue(crawlSite);

