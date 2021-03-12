# Django React Pinterest Clone Page

#### Django 와 React 를 이용해 만든 Pinterest Clone Page

## *Introduction*

### summary
> - Project 소개
>   - Pinterest Clone Page
>   - Content Based Filtering 을 이용한 비슷한 Pin 추천 기능
>   - image 파일뿐만 아니라 URL을 이용한 업로드
>   - Pinterest Pin Crawling 으로 데이터 수집

### Requirements

> - BACKEND
>   - Python    
>   - Django
>   - Django Rest FrameWork
>   - ...
> - FrontEnd
>   - TailWind CSS
>   - Axios
>   - Redux
>   - ...
> - DataBase
>   - PostgreSQL
> - Deployment
>   - Azure
>   - Azure Storage
> - Etc.
>   - Selenium
>   - Pandas
>   - Sklearn
>   - Konlpy
>   - ...

### API EndPoints

 #### rest-auth 인증
|PATH|METHOD|AUTH|내용|
|----|----|----|----|
|rest-auth/login|POST|X|JWT 인증 로그인
|rest-auth/logout|POST|O|
|rest-auth/registration|POST|X|
|rest-auth/user|GET/PATCH|O|현재 REQUEST USER 정보 GET 또는 PATCH
|rest-auth/password/change|POST|O|REQUEST USER 비밀번호 변경

 #### pinterestAccount
|PATH|METHOD|AUTH|내용|
|----|----|----|----|
|pinterestAccounts/following-list|GET|O|REQUEST USER 의 팔로잉 유저 GET
|pinterestAccounts/follow|POST|O|
|pinterestAccounts/unfollow|POST|O|

 #### pins
 |PATH|METHOD|AUTH|내용|
 |----|----|----|----|
 |pins/|GET/POST|O|
 |pins/following_pin_list|GET|O|REQUEST USER 가 팔로우하는 태그/유저 의 핀 GET
 |pins/{id}/|GET/POST/DELETE|O|
 |pins/{id}/sim_pin_list|GET|O| pin.id=id 에 해당하는 핀 추천 리스트 GET
 
  #### tags
 |PATH|METHOD|AUTH|내용|
 |----|----|----|----|
 |tags/|GET/POST|O|
 |tags/{id}|GET/POST|O|
 |tags/{id}/follow_tag|POST|O| tag.id = id 에 해당하는 태그 Follow
 |tags/{id}/unfollow_tag|POST|O| tag.id = id 에 해당하는 태그 Unfollow
 
   #### boards
 |PATH|METHOD|AUTH|내용|
 |----|----|----|----|
 |boards/|GET/POST|O| REQUEST USER 의 보드 GET
 |boards/{id}|GET/DELETE|O| board.id=id 에 해당하는 Pin GET
 |boards/{id}/add_pin|POST|O| board.id=id 에 해당하는 board 에 request.pin_id 추가 
 
 
 ### Pin Recommend Algorithm
 > - Content Based Recommender System
 >   - Pin 의 Title 을 분석하여 Pin 들 간의 유사도 구현
 ```
 #utils2.py
 def gs(metadata):
    from konlpy.tag import Okt
    okt = Okt()
    title_lists = metadata["title"].fillna('')
    title_lists = [' '.join(re.findall(r"([a-zA-Z\dㄱ-힣]+)", title)) for title in title_lists]
    noun_title_lists = [' '.join(okt.nouns(title)) for title in title_lists]

    tfidf = TfidfVectorizer(min_df=1)

    tfidf_matrix = tfidf.fit_transform(noun_title_lists)
    # similarities = tfidf_matrix * tfidf_matrix.T
    similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    return similarities
 ```
 
 ### Crawler
 > - Pinterest Crawler With Selenium
 >   - Selenium 과 ChromeDriver 을 통한 Pinterest 의 이미지 크롤링
 >   - Pin Tag 는 Pinterest 내부 알고리즘으로 핀 이미지에 맞는 Tag 를 제시해줌
 >   - Pinterest 사이트 로그인 -> Pin URL 추출
 >   - 각각의 URL 을 돌면서 Pin Tag/Image 추출
 >   - 해당 내용 POST (author='crawler')
 ```
 utils.py
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
 ```
