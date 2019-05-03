import './src/frame.styl';
import docEvent from './src/docEvent';

docEvent.listen();

$Z('html').append(`<div id='passkee-ifr-controller'>Psk</div>`);

$Z('#passkee-ifr-controller').on('click', function(e) {
	$Z('#passkee-ifr').toggleClass('hide');
});

let dragStart = null;
let ctrl = $Z('#passkee-ifr-controller').offset();
$Z('#passkee-ifr-controller').on('mousedown', function(e) {
	ctrl = $Z('#passkee-ifr-controller').offset();
	dragStart = { x: e.x - ctrl.left, y: e.y - ctrl.top };
	console.log(ctrl, dragStart);
});
$Z(document).on('mousemove', function(e) {
	if (dragStart) {
		$Z('#passkee-ifr-controller').css({
			left: e.x - dragStart.x,
			top: e.y - dragStart.y
		});
	}
});
$Z(document).on('mouseup', function(e) {
	dragStart = null;
});
