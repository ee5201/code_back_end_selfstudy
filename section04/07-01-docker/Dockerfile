FROM node:14 
# // 우분트가 다운로드가 된다. => 컴퓨터가 생성된다. node 14가 안정 버전이며 다운로드 하는 것이다. 

COPY ./index.js myfolder/
# // index.js 파일을 myfolder에다가 넣는다 만약
# 파일이 없다면 새로 생성한다.

WORKDIR /myfolder/
# myfolder를 실행 시킨다. 

CMD node index.js
# 실행 명령어로 cmd가 있다 run은 여러번 사용할 수 있지만 cmd는 한번만 사용할 수 있으며 최종 결과 실행 할떄 사용한다.

# 이것이 총 컴퓨터 제조 설명서이디.