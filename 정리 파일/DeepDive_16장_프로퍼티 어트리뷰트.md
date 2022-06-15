## 16장 프로퍼티 어트리뷰트

#### 프로퍼티 디스크립터 객체

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
    - false일 경우 value 값을 변경할 수 없다.
  - enumerable: 열거 가능 여부
    - false일 경우 for...in 문이나 Object.keys 등으로 열거할 수 없다.
  - configurable: 재정의 가능 여부
    - false일 경우 해당 프로퍼티를 삭제, 재정의할 수 없다.
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


<br>

#### 프로퍼티 정의

- `Object.defineProperty` 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의 할 수 있다.

  ```javascript
  const person = {};
  
  Object.defineProperty(person, 'firstName', {
      value: 'Nayoung',
      writable: true,
      enumerable: true,
      configurable: true,
  })
  
  Object.defineProperty(person, 'fullName', {
      get() {
          return `${this.firstName} ${this.lastName}`;
      },
      set(name) {
      	[this.firstName, this.lastName] = name.split('');
  	},
      enumerable: true,
      configurable: true,
  })
  ```

- Object.defineProperty 메서드는 한번에 하나의 프로퍼티만을 정의

- `Object.defineProperties` 메서드는 여러개의 프로퍼티를 한 번에 정의할 수 있다.

  ```javascript
  const person = {};
  
  Object.defineProperties(person, {
      firstName: {
          value: 'Ungmo',
          writable: true,
          enumerable: true,
          configurable: true,
      },
      lastName: {
          value: 'Lee',
          writable: true,
          enumerable: true,
          configurable: true,
      },
      fullName: {
          get() {
              return `${this.firstName} ${this.lastName}`;
          },
          set(name) {
              [this.firstName, this.lastName] = name.split(' ');
          },
          enumerable: true,
          configurable: true,
      }
  })
  ```

<br>

#### 객체 변경 방지

##### 객체 확장 금지

- `Object.preventExtensions`
- 확장이 금지된 객체는 프로퍼티 추가가 금지된다.
- 프로퍼티 동적 추가와, Object.defineProperty 메서드 모두 금지
- 확장이 가능한 객체인지 여부는 `Object.isExtensible` 메서드로 확인 가능

##### 객체 밀봉

- `Object.seal`
- 프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의 금지
- 읽기와 쓰기만 가능
- 프로퍼티 값 갱신은 가능
- 밀봉된 객체는 configurable이 false
- `Object.isSealed` 메서드로 밀봉된 객체인지 확인 가능

##### 객체 동결

- `Object.freeze`
- 프로퍼티 추가 및 삭제, 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지
- 읽기만 가능
- `Object.isFrozen` 메서드로 동결된 객체인지 확인 가능

##### 불변 객체

- 변경 방지 메서드들은 얕은 변경 방지로 직속 프로퍼티만 변경이 방지됨
- 중첩 객체까지는 영향을 주지 못함(Object.freeze도 마찬가지)
- 객체의 중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 함