import finder from '@medv/finder';
import codeGenerator from '../lib/codeGenerator';
export default {
	on() {
		[ 'click', 'change' ].forEach((item) => {
			document.addEventListener(
				item,
				function(e) {
					if (!$Z(e.target).parents().filter('#puppeteer-domkit-recorder').length) {
						//console.log('[pdr-command]event=' + encodeURIComponent(item + ',' + finder(e.target)));
						codeGenerator.insertLine({
							type: 'trigger',
							from: 'document',
							selector: finder(e.target),
							event: item
						});

						// $Z('.CodeMirror-scroll').scrollTop($Z('.CodeMirror-sizer').height());
					}
				},
				true
			);
		});
	}
};
