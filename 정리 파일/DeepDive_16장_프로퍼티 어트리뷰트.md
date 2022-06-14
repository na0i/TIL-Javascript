## 16장 프로퍼티 어트리뷰트

#### 프로퍼티   디스크립터 객체

-  `Object.getOwnPropertyDescriptor`
  - 첫번째 매개변수에 객체의 참조를 전달
  - 두번째 매개변수에는 프로퍼티 키를 문자열로 전달
  - 프로퍼티 어트리뷰트 정보를 제공하는 `PropertyDescriptor` 객체를 반환
- `Object.getOwnPropertyDescriptors`
  - 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환

<br>

#### 데이터 프로퍼티

- 키와 값으로 구성된 일반적인 프로퍼티
- value, writable, enumerable, configurable
  - value: 값에 접근하면 반환되는 값
  - writable: 값의 변경 가능 여부
  - enumerable: 열거 가능 여부
  - configurable: 재정의 가능 여부
- value의 값은 프로퍼티 값으로 초기화, writable, enumerable, configurable은 true로 초기화

<br>

#### 접근자 프로퍼티

- getter/setter 함수라고도 부름

- 자체적으로 값을 갖지 않고

- 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

- get, set, enumerable, configurable

  - get: 접근자 프로퍼티를 통해 데이터 프로퍼티 값을 읽을 때 호출되는 접근자 함수
  - set: 접근자  프로퍼티를 통해 데이터 프로퍼티 값을 저장할 때 호출되는 접근자 함수
  - enumerable, configurable은 데이터 프로퍼티와 동일

  ```javascript
  const person = {
  	firstName: 'Nayoung',
      lastName: 'Park',
      
      get fullName() {
          return `${this.firstName} ${this.lastName}`
      }
      
      set fullName(name) {
          [this.firstName, this.lastName] = name.split(' ');
      }
  }
  
  // setter 함수 호출(프로퍼티 값 저장)
  person.fullName = 'Gayoung Park';
  console.log(person); // {firstName: 'Gayoung', lastName: 'Park'}
  
  // getter 함수 호출(프로퍼티 값 참조)
  console.log(person.fullName); // Gayoung Park
  ```

  