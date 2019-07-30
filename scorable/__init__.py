from flask import Flask, render_template, request, jsonify
import time
import os


PATH_IMG = 'cache'


app = Flask(__name__)


@app.route('/')
def home():
	return render_template('index.html')


@app.route('/demo')
def demo():
	return render_template('demo.html')


@app.route('/image', methods=['POST'])
def send_img():
	img = request.files['image']
	file = ('%s.jpg' % time.strftime("%Y%m%d-%H%M%S"))
	path = '%s/%s' % (PATH_IMG, file)
	img.save(path)

	os.remove(path)

	return jsonify({'scroll': '100'})