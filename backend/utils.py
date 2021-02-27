import time
from urllib.request import urlretrieve
from selenium import webdriver
from bs4 import BeautifulSoup as Bs
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait


import os
# Python 이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.prod')
# 이제 장고를 가져와 장고 프로젝트를 사용할 수 있도록 환경을 만듭니다.
import django
django.setup()
from pin.models import Pin

loginModal = '//*[@id="__PWS_ROOT__"]/div[1]/div/div/div/div[1]/div[1]/div[2]/div[2]/button/div'
loginButton = '//*[@id="__PWS_ROOT__"]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]' \
              '/form/div[5]/button/div'

driver = webdriver.Chrome('C:\chromedriver_win32/chromedriver')

driver.get('https://www.pinterest.co.kr/')

driver.find_element_by_xpath(loginModal).click()

driver.find_element_by_id('email').send_keys('hy_stom@naver.com')
driver.find_element_by_id('password').send_keys('kTmD*fL59XWs4ce')

driver.find_element_by_xpath(loginButton).click()

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'hCL')))  # 10초 기다릴 때까지 hCL 이 있는지 확인 (없으면 false)
    # hCL 들어간 애들을 모두 pinData 에 넣을거야(리스트) 근데 그 전에 스크롤 해야겠다. 이건 나중에.
    cnt = 0
    for _ in range(10):
        count = 0
        for _ in range(6):
            pinData = driver.find_elements_by_class_name("hCL")
            pinData[count].click()
            time.sleep(1)
            count += 1
            # cnt += 1
            url = driver.current_url
            if not url.__contains__('/pin/'):
                # cnt -= 1
                driver.back()
                time.sleep(0.5)
                continue
            time.sleep(1)
            image = driver.find_elements_by_tag_name("img")
            link = image[1].get_attribute('src')  # image 에서 두번째 녀석을 다운로드 받을거임. 얘가 첫 번째 보다 크거든.
            # urlretrieve(link, f'C:\images\{cnt}.jpg')  파일을 로컬에 저장함
            driver.find_elements_by_css_selector(".gUZ.pBj.U9O.kVc")[1].click()  # 두번째 인덱스를 클릭해야함
            time.sleep(1)
            tag_set = driver.find_elements_by_css_selector(".tBJ.dyH.iFc.yTZ.pBj.DrD.IZT.mWe.z-6")
            # print(tag_set[1].text)
            title = ''.join(["#"+tag.text for tag in tag_set[1:4]])
            print(title)
            Pin(author_id=3, title=title, image_url=link).save()
            driver.back()
            time.sleep(0.7)
        # 새로고침 조져서 infinity 스크롤 크롤링의 곤란함을 줄임
        driver.refresh()

except TimeoutException:
    print('해당 태그 없는디?')


# Pin(author_id=3,title="#tag2 #tag1 #tag3",
# image_url="").save()
# 이런 느낌으로 세이브함 ㅇㅋ?