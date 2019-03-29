import sys
import json
from SDL_Pi_Thunderboard_AS3935 import  AS3935
import RPi.GPIO as GPIO
import time
from datetime import datetime

GPIO.setmode(GPIO.BCM)

InterruptGPIOpin = 16

sensor = AS3935(address=0x02, bus=1)

sensor.reset()
sensor.set_indoors(False)
sensor.set_noise_floor(0)
sensor.calibrate(tun_cap=0x09)
sensor.set_min_strikes(1)


count = 0
runcount = 0
def handle_interrupt(channel):
    global count
    count = count + 1
    time.sleep(0.003)
    global sensor
    reason = sensor.get_interrupt()
    print (reason);
    if reason == 0x01:
        print ("Noise")
        sensor.raise_noise_floor()
    elif reason == 0x04:
        print ("Disturber")
        sensor.set_mask_disturber(True)
    elif reason == 0x08:
        now = datetime.now().strftime('%H:%M:%S - %Y/%m/%d')
        distance = sensor.get_distance()
        print ("lightning " + str(distance) + "km away. " + now)

#GPIO.setup(InterruptGPIOpin, GPIO.IN )
GPIO.setup(InterruptGPIOpin, GPIO.IN, pull_up_down = GPIO.PUD_UP )
GPIO.add_event_detect(InterruptGPIOpin, GPIO.RISING, callback=handle_interrupt)

def readLightningStatus():

	distance = sensor.get_distance()
	noise_floor = sensor.get_noise_floor()
	min_strikes = sensor.get_min_strikes()
	indoor = sensor.get_indoors()
	mask_disturber = sensor.get_mask_disturber()
	disp_lco = sensor.get_disp_lco()
	interrupt = sensor.get_interrupt()


while True:
    readLightningStatus()
