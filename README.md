# maze 백엔드 채용 과제

## 배포 주소
www.apryll.shop

## DB ERD
![스크린샷 2022-11-14 오전 12 55 26](https://user-images.githubusercontent.com/102751923/201531151-847c983f-c8b2-4a5d-a6b5-406b300b2de1.png)

<br/>

## API 명세
[API 명세 보러가기](https://speckle-fold-197.notion.site/maze-API-2a6f710019804e7c9207bee05d5897f6)

<br/>

## **Requirements & Stack**

- **Client**
    - 웹페이지로 구성합니다.
        - UI는 채점에 영향을 주지 않습니다.
    - 언어 / 프레임워크 : 자유 (`html`, `JavaScript`, `React`, `Vue.js`, etc.)
    - AWS 배포(선택)
        - `EC2`, `S3` 상관없습니다.
        - github 프로젝트 내부에 빌드 폴더를 넣어 실행만 가능해도 괜찮습니다.
- **Server**
    - 언어 / 런타임 : `JavaScript` / `Node.js`
    - 프레임워크 : `Express.js`
    - ORM: `Sequelize`
    - RESTful API, token(로그인 이후)으로 Client와 통신합니다.
    - 각 함수, 구성에 관련한 코드 주석문은 필수입니다.
    - AWS 배포
        - EC2(ubuntu)를 사용합니다.
        - 최소한 EC2 주소(퍼블릭 IPv4 주소 or DNS)를 활용합니다.
        - https 도메인 배포는 선택입니다.(과금 주의)
- **DB**
    - `MySQL`을 사용합니다.
    - AWS `RDS`를 사용해도, `EC2` 내부에서 `MySQL`을 설치해서 써도 됩니다.
    - ERD를 준비합니다.
        - DB Diagram, ERD Cloud, MySQL Workbench, etc.
- **SMS**
    - **NAVER CLOUD PLATFORM(**[https://www.ncloud.com](https://www.ncloud.com))의 **Simple & Easy Notification Service**를 이용하세요.
        - 위 서비스는 한 달에 50건까지 무료 API를 제공합니다.
            - ✅ *과제 확인 과정에서 **최대 5번**까지 시도할 예정입니다.*
        - `env`, `gitignore`  등을 활용하여 보안이 중요한 정보를 설정하세요.
        - 본인의 휴대폰번호를 발신번호로 설정해 주세요.
- **API**
    - Swagger, Postman, GitBook, etc. 활용하여 API Docs를 만듭니다. (간단하게, 자유롭게)
    - 특정 사이트 회원가입과 로그인을 위한 API를 구성합니다.
    - 회원가입과 로그인을 하나의 기능으로 취급합니다.
        - 회원정보 : 휴대폰 번호, 이용약관과 마케팅 활용 동의 여부
        - 사이트에 들어가면 기존 회원이든 신규 회원이든 이용약관과 마케팅 활용 동의를 한 뒤 번호인증까지 마쳐야 로그인하게 되는 시스템
        
    1. 회원가입 + 로그인을 위해 ‘이용약관 동의(필수)’ / ‘마케팅 활용 동의 및 서비스 관련 정보 수신 동의(선택)’를 먼저 동의(체크)하게 합니다.
        1. ‘마케팅 활용 동의 및 서비스 관련 정보 수신 동의(선택)’는 동의하지 않아도 넘어갈 수 있습니다.
        2. 각 동의에 자세한 내용은 없어도 됩니다.
    2. 회원가입 + 로그인 페이지에서 휴대폰 번호를 입력하면 인증번호를 문자로 보냅니다.
        1. 인증번호는 랜덤 6자리 숫자 혹은 영문+숫자로 설정합니다.
        2. **[메이즈 백엔드 채용]** 문구를 넣어주세요.
    3. 휴대폰 번호와 인증번호를 같이 입력하여 그 값이 알맞다면 가입 + 로그인을 완료할 수 있습니다.
    4. 중복 인증 여부 alert()로 표시
        1. 기존에 같은 핸드폰 번호로 인증한 기록이 있다면 관련 메세지 alert()로 표시
