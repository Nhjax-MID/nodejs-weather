import sys
import json

L = "JAX"
H = "29"
T = "32"

#build message as JSON dump
json_map = {"location": L, "humidity": H, "temperature": T}
msg = json.dumps(json_map)

   #test output debug
    #completed Formatted JSON objects
print(msg)
