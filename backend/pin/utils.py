import base64
from io import BytesIO
import requests

from PIL import Image


def retrieve_image(url):
    response = requests.get(url)
    temp_file = BytesIO()
    temp_file.write(response.content)
    temp_file.seek(0)
    return temp_file


def decode_design_image(data):
    try:
        da = base64.b64decode(data)
        buf = BytesIO(data)
        img = Image.open(buf)
        return img
    except :
        print("errored")
        return None



# url = "https://i.pinimg.com/236x/76/d0/ce/76d0ced78f2bf72370d753afaead0d63.jpg"
# kk = retrieve_image(url)
# img = decode_design_image(kk)
# print(data)