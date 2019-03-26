import sys
import json

L = "yes"

json_map = {"LightingSeen": L}
msg = json.dumps(json_map)

print(msg)
