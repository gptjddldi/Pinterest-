import time
from urllib.request import urlretrieve
from selenium import webdriver
from bs4 import BeautifulSoup as Bs
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.chrome.options import Options
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

userid = input("id: ")
password = input("password: ")
loginModal = '//*[@id="__PWS_ROOT__"]/div[1]/div/div/div/div[1]/div[1]/div[2]/div[2]/button/div'
loginButton = '//*[@id="__PWS_ROOT__"]/div[1]/div/div/div/div[1]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]' \
              '/form/div[5]/button/div'

driver = webdriver.Chrome('C:\Chrome_driver/chromedriver')

# for _ in range(100):
#     count = 0
#     for _ in range(6):
#         pinData = driver.find_elements_by_class_name("hCL")
#         pinData[count].click()
#         time.sleep(1)
#         count += 1
#         # cnt += 1
#         url = driver.current_url
#         if not url.__contains__('/pin/'):
#             # cnt -= 1
#             driver.back()
#             continue
#         time.sleep(1)
#         image = driver.find_elements_by_tag_name("img")
#         link = image[1].get_attribute('src')  # image 에서 두번째 녀석을 다운로드 받을거임. 얘가 첫 번째 보다 크거든.
#         # urlretrieve(link, f'C:\images\{cnt}.jpg')  파일을 로컬에 저장함
#         driver.find_elements_by_css_selector(".gUZ.pBj.U9O.kVc")[1].click()  # 두번째 인덱스를 클릭해야함
#         time.sleep(1)
#         tag_set = driver.find_elements_by_css_selector(".tBJ.dyH.iFc.yTZ.pBj.DrD.IZT.mWe.z-6")
#         # print(tag_set[1].text)
#         title = ''.join(["#"+tag.text for tag in tag_set[1:4]])
#         print(title)
#         Pin(author_id=2, title=title, image_url=link).save()
#         driver.back()
#         # 뒤로가서 다시 js 가 로드될 때까지 기다림
#     # 새로고침 조져서 infinity 스크롤 크롤링의 곤란함을 줄임
#     driver.refresh()
pin_set = set()

def login(driver):
    driver.maximize_window()
    print("---------Pinterest 사이트에 로그인---------")
    driver.get('https://www.pinterest.co.kr/')

    driver.find_element_by_xpath(loginModal).click()

    driver.find_element_by_id('email').send_keys(userid)
    driver.find_element_by_id('password').send_keys(password)

    driver.find_element_by_xpath(loginButton).click()
    print("---------로그인 완료---------")

def get_pin_id_set(driver):
    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.Yl-.MIw.Hb7')))  # 10초 기다릴 때까지 js 로딩 확인
        driver.execute_script("window.scrollTo(0, 3000)")
        time.sleep(1)
        pars = driver.find_elements_by_css_selector('.Yl-.MIw.Hb7')
        for par in pars:
            f_chi = par.find_element_by_xpath('./div/div')  # pin_id 가 있는 태그 찾음
            # print(f_chi.get_attribute("data-test-pin-id"))
            pin_set.add(f_chi.get_attribute("data-test-pin-id"))
        driver.refresh()
    except TimeoutException:
        print('해당 태그 없는디?')

def post_pin_from_pin_set(driver, pin_set):
    for pin_id in pin_set:
        try:
            pin_id = int(pin_id)
        except ValueError:  # 가끔 int 가 아닌 값이 들어옴 이 경우 걸러내기
            continue
            
        url = 'https://www.pinterest.co.kr/pin/{}'.format(pin_id)
        driver.get(url)
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.PinBetterSave__DownArrowContainer.PinBetterSave__'
                                                             'DownArrowContainer--lego')))  # 10초 기다릴 때까지 js 로딩 확인
        try:
            image = driver.find_element_by_css_selector(".MIw.QLY.Rym.ojN.p6V.sLG.zI7.iyn.Hsu")
            link = image.find_element_by_xpath('./div/img').get_attribute('src')

            driver.find_element_by_css_selector(".PinBetterSave__DownArrowContainer.PinBetterSave__DownArrowContainer--lego"
                                                ).click()
            time.sleep(1)
            tag_set = driver.find_elements_by_css_selector(".tBJ.dyH.iFc.yTZ.pBj.DrD.IZT.mWe.z-6")
            title = ''.join(["#"+tag.text+" " for tag in tag_set[1:4]])
            print(title)
            Pin(author_id=2, title=title, image_url=link).save()
        except NoSuchElementException:  # 이미지가 아니라 gif 일 경우는 그냥 넘어감
            pass


if __name__ == '__main__':
    st = time.time()
    login(driver=driver)
    print("---------Pin id 를 수집합니다.. ---------")
    time.sleep(0.2)
    while len(pin_set) < 400:
        get_pin_id_set(driver)
    print("---------수집 완료---------")
    print("---------포스팅 시작---------")
    post_pin_from_pin_set(driver, pin_set)
    print("---------포스팅 종료---------")
    print("소요 시간 : {}초".format(time.time() - st))
    # print(len(pin_set))
