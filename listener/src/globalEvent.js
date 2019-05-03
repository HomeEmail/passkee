import connection from './connection';

import finder from '@medv/finder';
export default {
	listen() {
		// 默认
		connection.send(
			'code-generate',
			{
				action: 'append',
				type: 'request',
				options: {
					from: 'window',
					hash: window.location.hash,
					url: window.location.href,
					event: 'popstate'
				}
			},
			'gui'
		);

		[ 'click', 'change' ].forEach((item) => {
			document.addEventListener(
				item,
				function(e) {
					if (!$Z(e.target).parents().filter('#puppeteer-domkit-recorder').length) {
						connection.send(
							'code-generate',
							{
								action: 'append',
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
							},
							'gui'
						);
					}
				},
				true
			);
		});

		[ 'popstate' ].forEach((item) => {
			window.addEventListener(
				item,
				function(e) {
					console.log(`[ 'popstate' ]`, e);
					//console.log('[pdr-command]event=' + encodeURIComponent(item + ',' + finder(e.target)));
					setTimeout(() => {
						connection.send(
							'code-generate',
							{
								action: 'append',
								type: 'request',
								options: {
									from: 'window',
									hash: window.location.hash,
									url: window.location.href,
									event: item
								}
							},
							'gui'
						);
					}, 0);
				},
				true
			);
		});
	}
};
