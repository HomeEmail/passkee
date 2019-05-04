import Tnk from '../../../common/Tnk';

window.TNK = new Tnk({
	postData: {},
	getData: {},
	currentLine: {
		line: 0,
		ch: 0,
		code: ''
	},
	networkList: [
		{
			url: window.parent.location.href,
			resourceType: 'document',
			pathname: window.parent.location.pathname,
			lastPath: window.parent.location.pathname.split('/').pop(),
			method: 'GET'
		}
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'xhr',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin',
		// 	method: 'GET'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'image',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin',
		// 	method: 'GET'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'document',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin',
		// 	method: 'POST'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'script',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin',
		// 	method: 'GET'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'stylesheet',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin',
		// 	method: 'GET'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'eventsource',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin',
		// 	method: 'GET'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'font',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'media',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin'
		// },
		// {
		// 	url: 'https://tumaxapi.to8to.com/merchant/login/accountlogin',
		// 	resourceType: 'websocket',
		// 	pathname: '/merchant/login/accountlogin',
		// 	lastPath: 'accountlogin'
		// }
	]
});
console.log('TNK', window.TNK);
export default window.TNK;
