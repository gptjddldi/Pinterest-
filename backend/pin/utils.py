import base64
from io import BytesIO, StringIO
from urllib import request

import requests
from PIL import Image

VALID_IMAGE_EXTENSION = [
    ".jpg",
    ".png",
    ".jpeg",
    ".gif"
]


def valid_url_extension(url, extension_list=VALID_IMAGE_EXTENSION):
    return any([url.endswith(e) for e in extension_list])


def retrieve_image(url):
    response = requests.get(url)
    # temp_file = Image.open(BytesIO(response.content))
    temp_file = BytesIO()
    temp_file.write(response.content)
    temp_file.seek(0)
    # img = temp_file.open()
    return temp_file
    # return response.content


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