## 9장 타입 변환과 단축 평가

#### 옵셔널 체이닝 연산자

- `?.`는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다

- `&&` 를 사용한 단축평가와 유사

  ```javascript
  var str = '';
  
  var length1 = str && str.length;
  var length2 = str?.length;
  
  console.log(length1); // ''
  console.log(length2); // 0
  ```

<br>

#### null 병합 연산자

`??` 

- 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고 그렇지 않으면 좌항의 피연산자를 반환

- 변수에 기본값을 설정할 때 유용

  ```javascript
  var foo = null ?? 'default string';
  console.log(foo); // 'default string'
  ```

- `||`를 사용한 단축평가와 유사

  ```javascript
  var foo = '' || 'default string';
  console.log(foo); // 'default string';
  
  좌항의 피연산자에 0이나 ''가 기본값으로 들어갈 경우 예기치 않은 동작이 발생할 수 있음
  ```

  