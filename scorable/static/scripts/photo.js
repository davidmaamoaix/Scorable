let constraints = {
	video: true
};

let v = $('#vid').get(0);
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

var disable = false;
var prev = -1;
var midPos;
var accumulate;

(function($) {
	$(document).ready(function() {
		navigator.mediaDevices.getUserMedia(constraints)
		.then(stream => v.srcObject = stream)
		.catch(e => alert("Browser not supported. (" + e.name + ":" + e.message + ")"));
	});

	$('#vid').click(function() {
		postImg();
	});

	setInterval(function() {
		postImg();
	}, 200);
})(jQuery);

function postData(data) {
	var formData = new FormData();
	formData.append('image', data);
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.open('POST', 'http://0.0.0.0:8000/image', true);
	xhr.onload = function() {
		if (this.status == 200) {
			var curr = this.response['height'];
			if (!disable) {
				if (curr != -1) {
					if (curr < midPos) {
						if (accumulate >= 2) {
							scroll(150);
						} else {
							accumulate++;
						}
					} else {
						accumulate = 0;
					}
				}
			}
			console.log(curr);
			prev = curr;
		} else {
			console.error(xhr);
		}
	}
	xhr.send(formData);
}

function postImg() {
	canvas.width = v.videoWidth;
	canvas.height = v.videoHeight;

	ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
	canvas.toBlob(postData, 'image/jpeg');
}

function scroll(amount) {
	var curr = $(document).scrollTop();
	console.log('scroll');
	$('html, body').animate({scrollTop: curr + parseInt(amount)}, 'fast');
}

function calibrate() {
	disable = true;
	if (prev == -1) {
		alert('Calibration failed.');
	} else {
		alert('Success:' + prev);
	}
	midPos = prev;
	disable = false;
}