import finder from '@medv/finder';
import codeGenerator from './codeGenerator';
export default {
	listenerElementEvent() {
		[ 'click', 'change' ].forEach((item) => {
			document.addEventListener(
				item,
				function(e) {
					if (!$Z(e.target).parents().filter('#puppeteer-domkit-recorder').length) {
						//console.log('[pdr-command]event=' + encodeURIComponent(item + ',' + finder(e.target)));
						codeGenerator.generate(item, finder(e.target));
					}
				},
				true
			);
		});
	}
};
