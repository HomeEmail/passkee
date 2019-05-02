import finder from '@medv/finder';
import codeGenerator from '../../lib/codeGenerator';
export default {
	on() {
		[ 'click', 'change' ].forEach((item) => {
			document.addEventListener(
				item,
				function(e) {
					if (!$Z(e.target).parents().filter('#puppeteer-domkit-recorder').length) {
						//console.log('[pdr-command]event=' + encodeURIComponent(item + ',' + finder(e.target)));

						codeGenerator.appendLine({
							type: 'trigger',
							options: {
								from: 'document',
								selector: finder(e.target),
								tagName: e.target.tagName,
								type: e.target.type,
								name: e.target.name,
								value: $Z(e.target).val(),
								event: item
							}
						});
					}
				},
				true
			);
		});

		[ 'popstate' ].forEach((item) => {
			window.addEventListener(
				item,
				function(e) {
					//console.log('[pdr-command]event=' + encodeURIComponent(item + ',' + finder(e.target)));
					setTimeout(() => {
						codeGenerator.appendLine({
							type: 'request',
							options: {
								from: 'window',
								hash: window.location.hash,
								url: window.location.href,
								event: item
							}
						});
					}, 0);
				},
				true
			);
		});

		TNK.sub('pptr-request', (request) => {
			console.log(`TNK.sub('pptr-request'`, request);
			if (request.resourceType === 'xhr') {
				codeGenerator.appendLine({
					type: 'request',
					options: request
				});
			}

			TNK.dispatch('network-list-change', 'networkList', (networkList) => {
				console.log(`TNK.dispatch('network-list-change'`, networkList);
				networkList.push(request);
				return networkList;
			});
		});

		TNK.sub('pptr-target', (target) => {
			codeGenerator.appendLine({
				type: 'target',
				options: target
			});
		});
	}
};
