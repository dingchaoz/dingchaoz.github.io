import random
import time
from datetime import datetime
from os.path import abspath, dirname, join

import cv2
import numpy as np
import requests

from picamera import PiCamera
# import the necessary packages
from picamera.array import PiRGBArray

# initialize the camera and grab a reference to the raw camera capture
camera = PiCamera()
camera.resolution = (640, 480)
camera.framerate = 32
rawCapture = PiRGBArray(camera, size=(640, 480))

# allow the camera to warmup
time.sleep(0.1)

# from playsound import playsound

# DATA_DIR = abspath(dirname(dirname(dirname((__file__)))))
# VOICE_FILE = join(DATA_DIR, "audio.wav")
#
# print(VOICE_FILE)
# #
# video_file = "Cal_Fire1.mp4"
# video = cv2.VideoCapture(video_file)
# video = cv2.VideoCapture(0)

font = cv2.FONT_HERSHEY_SIMPLEX
bottomLeftCornerOfText = (10, 500)
fontScale = 1
fontColor = (0, 255, 0)
lineType = 2


def send_info():
    """ Function to send event type and lat lon to API.

    Returns
    -------
    type
        Description of returned object.

    """

    headers = {
        'x-api-key': "oeT0Q1Lfk52ynUv4FPsQq8jqnymhfBr26k3qOz2z",
        'Content-Type': "application/json",
        'Cache-Control': "no-cache",
        'Postman-Token': "e5f8bade-517c-4a9e-ba4d-b9ed601bdbd6"
    }
    lat, lon = 32.8377, -96.784
    lat = str(lat + random.uniform(-0.01, 0.01))
    lon = str(lon + random.uniform(-0.01, 0.01))
    headers = {'X-API-TOKEN': 'your_token_here',
               'Content-Type': 'application/json'}

    a = datetime.now()
    timestamp =\
        str(a.year) + str(a.month) + str(a.day) + str(a.hour) + \
        str(a.minute) + str(a.second) + str(a.microsecond)[:3]

    payload = {"vin": "VIN0123456789HACK",
               "eventType": "fire",
               "latitude": lat,
               "longitude": lon,
               "timeStamp": timestamp}
    r = requests.post("http://foo.com/foo/bar", data=payload, headers=headers)
    return


def pothole_detect(frame):
    imgray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(imgray, 127, 255, 0)


# while True:
#     (grabbed, frame) = video.read()
#     if not grabbed:
#         break
    # scale_percent = 80  # percent of original size
    # width = int(frame.shape[1] * scale_percent / 100)
    # height = int(frame.shape[0] * scale_percent / 100)
    # dim = (width, height)
    # # resize image
    # resized = cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)
for f in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
    frame = f.array
    copy = frame.copy()
    blur = cv2.GaussianBlur(frame, (21, 21), 0)
    hsv = cv2.cvtColor(blur, cv2.COLOR_BGR2HSV)

    # For HSV, Hue range is [0,179], Saturation range is [0,255] and
    # Value range is [0,255]
    # lower = np.array([18, 90, 90], dtype="uint8")
    # upper = np.array([35, 255, 255], dtype="uint8")
    # https://stackoverflow.com/questions/10948589/choosing-the-correct-upper-and-lower-hsv-boundaries-for-color-detection-withcv
    lower = np.array([0, 155, 20], dtype="uint8")
    upper = np.array([20, 255, 255], dtype="uint8")
    mask = cv2.inRange(hsv, lower, upper)

    # here insert the bgr values which you want to convert to hsv
    # red = np.uint8([[[0, 0, 255]]])
    # hsvRed = cv2.cvtColor(red, cv2.COLOR_BGR2HSV)
    #
    # lowerLimit = hsvRed[0][0][0] - 10, 100, 100
    # upperLimit = hsvRed[0][0][0] + 10, 255, 255

    # lower = np.array([177, 205, 20], dtype="uint8")
    # upper = np.array([179, 255, 255], dtype="uint8")
    # mask2 = cv2.inRange(hsv, lower, upper)
    #
    # mask = cv2.bitwise_or(mask1, mask2)
    # mask = mask1
    # kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    # omask = cv2.morphologyEx(1 - mask, cv2.MORPH_OPEN, kernel)

    contours, hierarchy = cv2.findContours(
        mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    output = cv2.bitwise_and(frame, hsv, mask=mask)
    no_red = cv2.countNonZero(mask)

    if int(no_red) > 30000:
        print('Fire detected')
        if len(contours) > 0:
            print('countours detected:', len(contours))
            for contour in contours:
                x, y, w, h = cv2.boundingRect(contour)
                cv2.drawContours(
                    copy, [contour], -1, (0, 128, 128), 3)
                cv2.rectangle(copy, (x, y), (x + w, y + h), (124, 252, 0), 2)
        cv2.putText(copy, 'Fire Detected!',
                    bottomLeftCornerOfText,
                    font,
                    fontScale,
                    fontColor,
                    lineType)
        # send_info()
        # playsound(VOICE_FILE)

    print(int(no_red))
    cv2.imshow("output", copy)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
video.release()
