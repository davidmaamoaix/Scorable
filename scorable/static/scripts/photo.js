let constraints = {
	video: true
};

let v = $('#vid').get(0);
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

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
	}, 1000);
})(jQuery);

function postData(data) {
	var formData = new FormData();
	formData.append('image', data);
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.open('POST', 'http://0.0.0.0:8000/image', true);
	xhr.onload = function() {
		if (this.status == 200) {
			console.error(this.response['height']);
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
	$('html, body').animate({scrollTop: curr + parseInt(amount)}, 'medium');
}