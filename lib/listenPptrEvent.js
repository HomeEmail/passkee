const $ = require('puppeteer-domkit');
const url = require('url');
let inited = false;
module.exports = {
	on() {
		if (inited) return;
		inited = true;
		[ 'targetdestroyed', 'targetcreated' ].forEach((item) => {
			$.browser.on(item, (target) => {
				const details = {
					event: item,
					url: target.url(),
					targetType: target.type()
				};
				$.page.evaluate((req) => {
					if (typeof TNK !== 'undefined') TNK.pub('pptr-target', req);
				}, details);
			});
		});

		$.page.on('request', (request) => {
			const uri = request.url();
			if (uri.indexOf('http') === 0) {
				const details = {
					url: uri,
					resourceType: request.resourceType(),
					headers: request.headers(),
					method: request.method(),
					data: request.postData()
				};
				const u = url.parse(uri);
				const lastPath = u.pathname.split(/[\\\/]/g).pop();
				Object.assign(details, u, { lastPath });
				console.log(details);
				$.page.evaluate((req) => {
					if (typeof TNK !== 'undefined') TNK.pub('pptr-request', req);
				}, details);
			}
		});
	}
};
module.exports.default = module.exports;
