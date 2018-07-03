# Link SEO bodge
Bodge for crawling a site for broken links or links w/ trailing, double slashes

# Usage
1. Set up link of site to crawl in config.js::crawlSite
2. Run crawler and log output
```
node config.js | tee reports/example_com_$(date +%s);
```
3. Grep for information you want to see

#### Keywords to grep
* `Crawler denied` - Crawler got 999 HTTP response code - request to crawler denied
* `Error` - Broken URL encountered (400/404/500/etc.)
* `Excluded` - For some reason the URL was excluded from crawl (sitemap.xml)
* `Double slash` - Url has a double slash in it 
* `Trailing slash` - Url ends with a slash
