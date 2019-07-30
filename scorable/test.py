import cv2 as cv
import numpy as np

from detect import find_face, find_eyes, FACE_CLASSIFIER, EYE_CLASSIFIER


vid = cv.VideoCapture(0)


while True:
	_, img = vid.read()
	gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

	face_coord = find_face(gray, FACE_CLASSIFIER)
	if face_coord is None:
		continue
	face = gray[
		face_coord[1]: face_coord[1] + face_coord[3],
		face_coord[0]: face_coord[0] + face_coord[2]
	]

	eyes_coords = find_eyes(face, EYE_CLASSIFIER)
	if len(eyes_coords) == 0:
		continue

	eye_coord = eyes_coords[0]

	eye = face[
		eye_coord[1]: eye_coord[1] + eye_coord[3],
		eye_coord[0]: eye_coord[0] + eye_coord[2]
	]

	cv.imshow('img', eye);
	if cv.waitKey(1) & 0xFF == 27:
		break
