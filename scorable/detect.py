import cv2 as cv
import numpy as np


FACE_CLASSIFIER = cv.CascadeClassifier('scorable/classifiers/face.xml')
EYE_CLASSIFIER = cv.CascadeClassifier('scorable/classifiers/eye.xml')


def find_face(gray, cascade):
	faces_coords = cascade.detectMultiScale(gray, 1.3, 5)

	if len(faces_coords) == 0:
		return

	face_coords = max(faces_coords, key=lambda x: x[2] * x[3])
	return face_coords


def find_eyes(gray, cascade):
	eyes_coords = cascade.detectMultiScale(gray, 1.3, 5)

	return eyes_coords


def height_from_path(path) -> int:
	image = load_from_path(path)
	return get_eye_height(image)


def load_from_path(path):
	return cv.imread(path, cv.IMREAD_GRAYSCALE)


def get_eye_height(gray) -> int:
	face_coord = find_face(gray, FACE_CLASSIFIER)
	if face_coord is None:
		return -1
	face = gray[
		face_coord[1]: face_coord[1] + face_coord[3],
		face_coord[0]: face_coord[0] + face_coord[2]
	]

	eyes_coords = find_eyes(face, EYE_CLASSIFIER)
	if len(eyes_coords) == 0:
		return -1

	return int(sum([i[3] for i in eyes_coords]) // len(eyes_coords))