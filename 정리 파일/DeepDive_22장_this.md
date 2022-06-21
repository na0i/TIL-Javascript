## 22장 this

#### this 키워드

- this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 **자기 참조 변수**

- this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조

- this는 자바스크립트 엔진에 의해 암묵적으로 생성

- 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달

- 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼 this도 지역 변수처럼 사용할 수 있다.

- this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정

  - this 바인딩
    - 바인딩: 식별자와 값을 연결하는 과정
    - 예시)변수 선언: 변수 이름(식별자)과 메모리 공간의 주소를 바인딩
    - this 바인딩: this와 this가 가리킬 객체를 바인딩하는 것

- 객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체를 가리킨다.

- 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.

- 전역에서 this는 전역 객체 window를 가리킨다.

- 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.

- ```javascript
  console.log(this); // window
  
  function square(number) {
      console.log(this); // window
      return number * number;
  }
  square(2);
  
  const person = {
      name: 'Lee',
      getName() {
          // 객체 리터럴의 메서드이므로 this는 메서드를 호출한 객체(person)을 가리킨다.
          console.log(this); // {name: 'Lee', getName: f}
          return this.name;
      }
  };
  console.log(person.getName()); // Lee
  
  function Person(name) {
      this.name = name;
      // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
      console.log(this); // Person {name: 'Lee'}
  }
  
  const me = new Person('Lee');
  ```

- 일반적으로 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다.

<br>

#### 함수 호출 방식과 this 바인딩

- this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

- 렉시컬 스코프와 this 바인딩

  > 렉시컬 스코프는 함수를 어디서 호출했는지가 아니라 어디서 정의했는지에 따라 상위 스코프를 결정, 함수가 호출된 위치는 상위 스코프에 어떠한 결정도 주지 않는다. 이와 다르게 this 바인딩은 함수 호출 시점에 결정된다.

- 함수 호출 방식

  - 일반 함수 호출

    - 기본적으로 this에는 전역 객체가 바인딩된다.(중첩 함수도)

    - 다만 this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서는 this가 의미가 없다.

    - 어떤 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩

      - 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 this에는 전역 객체가 바인딩

      - 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩
      - 이 때, Function.prototype.bind, 화살표 함수 등을 사용해 this 바인딩을 일치시킬 수 있다.

  - 메서드 호출

    - 메서드 내부의 this에는 메서드를 호출한 객체(메서드를 호출할 때 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체)가 바인딩
    - 메서드 내부의 this는 메서드를 소유한 객체가 아니라 메서드를 호출한 객체에 바인딩
    - 프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩
    - ![image](https://user-images.githubusercontent.com/77482972/174796825-f869eaf8-c8ee-4117-b6b8-0d3e094abae5.png)

  - 생성자 함수 호출

    - 생성자 함수 내부의 this에는 생성자 함수가 미래에 생성할 인스턴스가 바인딩
    - 만약 new 연산자와 함께 생성하지 않으면 생성자 함수가 아니라 일반 함수로 동작

  - Function.prototype.apply/call/bind 메서드에 의한 간접 호출

    - apply, call, bind 메서드는 Function.prototype의 메서드
    - this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출
    - apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달
    - call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달
    - bind 메서드는 함수를 호출하지 않는다.
    - bind 메서드는 첫번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환
    - bind 메서드는 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용
    - ![image](https://user-images.githubusercontent.com/77482972/174804353-e9c21c57-f389-4108-8264-22fc68d2aada.png)