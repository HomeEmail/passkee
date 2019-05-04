const oneParam = [
	'text',
	'html',
	'height',
	'width',
	'offset',
	'offsetParent',
	'position',
	'val',
	'index',
	'scrollTop',
	'visible',
	'exist',
	'length'
];

const twoParams = [ 'css', 'attr', 'prop', 'data', 'is', 'hasClass' ];

module.exports = {
	triggers: [ 'click', 'input', 'focus', 'blur', 'hover', 'mouseenter', 'mouseleave' ],
	domMode: [ 'waitFor', 'expect', 'get' ],
	domOneParam: oneParam,
	domTwoParam: twoParams,
	dom: [].concat(oneParam, twoParams),
	bom: [ 'response', 'request', 'cookie', 'localStorage', 'sessionStorage', 'hashChange', 'pageRoute' ]
};

module.exports.default = module.exports;
