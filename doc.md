EntryDSM Q&A System
===
## 개요
EntryDSM Q&A System(이하 시스템)은 입학 전형에 관해 궁금한 사항이 있거나, 전형 도중 생긴 의문점에 대해 상담받을 수 있도록 제작되었습니다. 사용자는 다음 기능들을 사용할 수 있습니다.

1. 현재 접속 중인 관리자가 있다면, 바로 실시간 문의할 수 있습니다.
2. 현재 접속 중인 관리자가 없더라도 문의를 남겨둘 수 있습니다.

## API

### 인증 번호 발급

|URI  |Description|Argument|On success|On failure|
|:---:|:---------:|:------:|:--------:|:--------:|
|/auth|인증 번호를 발급합니다.|쿼리: email로 인증번호를 발급받을 이메일 전송|HTTP 201|HTTP 500|

### Socket.io 채팅: 일반 유저용 클라이언트
채팅의 흐름은 다음과 같습니다.
```
[client]        [server]
    |               |
   join ----------->|   <- chat room generated
    |               |
  message --------->|   <- message receive
    |               |
   ...             ...
    |               |
disconnect -------->|   <- leaving room
```
따라서 클라이언트는, 채팅 생명주기에 따라 socket.io 객체에 이벤트를 emit함으로서 서버와 통신하게 됩니다. 아래는 emit 가능한 이벤트들입니다.
#### 1. emit 'join'
- 보내야 하는 데이터 (JS 객체. JSON이 아님에 주의할 것!)
``` js
{
  key: key, // key: String
}
```
#### 2. emit 'message'
- 보내야 하는 데이터 
``` js
{
  key: key, // key: String
  message: message, // message: String
}
```
지금까지는 서버로 보내는 메시지였지만, 서버에서 클라이언트로 보내는 메시지도 존재합니다. 

#### 1. on 'connect admin'
connect admin 메시지를 서버로부터 수신하면, 클라이언트는 서버 최초 접속 시 전달받은 접속 중인 어드민의 수를 증가시켜야 합니다.
#### 2. on 'disconnect admin'
disconnect admin 메시지를 서버로부터 수신하면, 클라이언트는 서버 최초 접속 시 전달받은 접속 중인 어드민의 수를 감소시켜야 합니다.
#### 3. on 'admins'
admins 메시지는 다음과 같은 JS 객체를 클라이언트로 전송합니다.
``` js
{
  count: 0, // count: Number, 현재 접속 중인 어드민의 수
}
```
#### 4. on 'message'
message 메시지는 메시지가 도착했음을 알립니다. 주의할 점은, 자신이 송신한 메시지이더라도 도착한다는 사실입니다.
``` js
{
  message: '', // message: String, 수신한 메시지
}
```
### Socket.io 채팅: 관리자용 클라이언트
관리자용 클라이언트 역시 비슷한 메커니즘으로 동작하지만, 다음과 같은 중요한 차이점이 존재합니다:
1. 관리자는 미리 발급된 하나의 인증 코드를 가지고 있습니다.
2. 관리자는 현재 서버에 접속된 클라이언트의 목록을 가져올 수 있습니다.
3. 목록으로부터 채팅을 시작할 유저를 고를 수 있습니다.
#### 1. emit 'join'
- 보내야 하는 데이터
``` js
{
  key: key, // key: String
  userId: userId, // userId: String
}
```
관리자 클라이언트는 join시 어느 유저와 채팅할 것인지 골라야 합니다. 따라서, userId 프로퍼티를 추가로 전송해야 합니다. userId는 후술할 list를 통해 얻을 수 있습니다.
#### 2. emit 'message'
- 보내야 하는 데이터
``` js
{
  key: key, // key: String
  userId: userId, // userId: String
  message: message, // message: String
}
```
유저 클라이언트에서 메시지를 보낼 때와 비교해 보면 userId 필드가 추가되었습니다. 이 필드는 어느 채팅방에 메시지를 보낼 지 정합니다. (userId가 채팅방을 식별합니다)
#### 3. emit 'list'
- 보내야 하는 데이터
``` js
{
  key: key, // key: String
}
```
key가 어드민의 것이 아니라면, 이 요청은 무시됩니다. 어드민의 것이라면 서버는 비동기적으로 접속 중인 유저의 목록을 list라는 이름의 이벤트에 담아 보냅니다.
#### 4. on 'message'
유저 클라이언트와 같습니다.
#### 5. on 'list'
서버는 유저의 목록(즉, 채팅방 식별자의 목록) 을 배열에 담아서 보냅니다.

