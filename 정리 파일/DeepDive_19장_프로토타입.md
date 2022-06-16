## 19장 프로토타입

- 자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어
- 자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 모든 것이 객체다.(원시 타입 값 제외한 나머지 값들(함수, 배열, 정규 표현식 등) 모두 객체)

<br>

#### 객체지향 프로그래밍

- 객체지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작
- 실체는 특징이나 성질을 나타내는 **속성**을 가지고 있고 이를 통해 실체를 인식 및 구별
- **추상화**: 프로그램에 필요한 속성만 간추려 내어 표현하는 것(사람 객체에서 '이름'과 '주소'라는 속성을 갖게 함)
- **객체**: 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료 구조
- 객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어 생각한다.
- 따라서 객체는 상태 데이터(property)와 동작(method)을 하나의 논리적인 단위로 묶은 복합적인 자료 구조

<br>

#### 상속과 프로토타입

- 상속: 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것

- 자바스크립트는 프로토타입을 기반으로 상속을 구현해 불필요한 중복을 제거

- ```javascript
  function Circle(radius) {
      this.radius = radius;
      this.getArea = function () {
          return Math.PI * this.radius ** 2;
      }
  }
  
  const circle1 = new Circle(1);
  const circle2 = new Circle(2);
  
  // 생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용
  // radius 프로퍼티 값은 인스턴스마다 다르지만 getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용
  // 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리 낭비, 퍼포먼스에도 악영향
  // 상속을 통해 불필요한 중복을 줄일 수 있다.
  ```

- ```javascript
  function Circle(radius) {
      this.radius = radius;
  }
  
  // Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해서 사용할 수 있도록 프로토타입에 추가
  // 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
  Circle.prototype.getArea = function() {
      return Math.PI * this.radius ** 2;
  }
  
  // 인스턴스 생성
  const circle1 = new Circle(1);
  const circle2 = new Circle(2);
  
  console.log(circle1.getArea === circle2.getArea); // true
  // Circle 생성자 함수가 생성한 모든 인스턴스는
  // 부모 객체의 역할을 하는 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
  // 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
  ```

- 생성자 함수가 생성할 **모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현**해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.

- ![image](https://user-images.githubusercontent.com/77482972/174002966-b122a7bd-d4ce-4de8-b3e3-d968b0aaad1b.png)

<br>

#### 프로토타입 객체

- 프로토타입은 객체지향 프로그래밍의 근간을 이루는 **객체 간 상속**을 구현하기 위해 사용된다.

- 프로토타입은 어떤 객체의 **상위(부모) 객체의 역할을 하는 객체**로서 다른 객체에 **공유 프로퍼티**를 제공

- 프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용 가능

- 모든 객체는 [[ Prototype ]] 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참좌.

  - [[ Prototype ]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정됨
  - 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[ Prototype ]]에 저장된다.

- 모든 객체는 하나의 프로토타입을 갖는다.

- 모든 프로토타입은 생성자 함수와 연결되어 있다.

- ![image](https://user-images.githubusercontent.com/77482972/174005292-b6b3392d-6278-483a-8536-a9e38f8f8ed2.png)

  - [[ Prototype ]] 내부 슬롯에는 직접 접근 불가능
  - __ proto __ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 [[ Prototype ]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근 가능
  - 프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근 가능
  - 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근 가능

- `__proto__` 접근자 프로퍼티

  - 모든 객체는 __ proto __ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[ Prototype ]] 내부 슬롯에 간접적 접근 가능

  - [[ Prototype ]]은 내부 슬롯이므로 원칙적으로 직접 접근은 불가능하나 __ proto __ 접근자 프로퍼티를 통해 간접적으로 접근 가능하다.

  - 접근자 프로퍼티

    - 접근자 프로퍼티는 자체적으로 값을 갖지 않고
    - 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수
    - 즉, [[ Get ]], [[ Set ]] 프로퍼티 어트리뷰트로 구성된 프로퍼티

  - Object.prototype의 접근자 프로퍼티인 __ proto __ 는 getter/setter 함수라고 부르는 접근자 함수([[ Get ]], [[ Set ]])를 통해 [[ Prototype ]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.

  - __ proto __ 접근자 프로퍼티를 통해  프로토타입에 접근하면  __ proto __ 접근자 프로퍼티의 getter 함수인 [[ Get ]] 호출

  - __ proto __ 접근자 프로퍼티를 통해 새로운 프로토타입을 할당하면 __ proto __ 접근자 프로퍼티의 setter 함수인 [[ Set ]] 호출

  - ```javascript
    const obj = {};
    const parent = { x : 1 };
    
    // getter 함수 호출
    obj.__proto__ ;
    
    // setter 함수 호출
    obj.__proto__ = parent;
    
    console.log(obj.x); // 1
    ```

  - __ proto __ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티

  - 모든 객체는 상속을 통해 Object.prototype.__ proto __ 접근자 프로퍼티를 사용 가능

    ```javascript
    const person = { name: 'Lee' };
    
    console.log(person.hasOwnProperty('__proto__')); // false
    
    console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
    // {get: f, set: f, enumerable: false, configurable: false}
    
    console.log({}.__proto__ === Object.prototype); // true
    // 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
    ```

  - __ proto __ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

    - 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해

    - ```javascript
      const parent = {};
      const child = {};
      
      child.__proto__ = parent;
      parent.__proto__ = child;
      
      // 이러한 코드가 에러 없이 정상적으로 처리되면서
      // 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어짐
      ```

    - 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.

    - 따라서, 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 __ proto __ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현

  - __ proto __ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권하지 않는다.

    - 모든 객체가 __ proto __ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문

    - 따라서 __ proto __ 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 Object.getPrototypeOf 메서드를 사용

    - 프로토타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장

    - ```javascript
      const obj = {};
      const parent = { x : 1 };
      
      Object.getPrototypeOf(obj);
      Object.setPrototypeOf(obj, parent);
      
      console.log(obj.x); // 1
      ```

- 함수 객체의 prototype 프로퍼티

  - 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킴

  - 일반 객체는 prototype 프로퍼티를 소유하지 않는다.

  - prototype 프로퍼티는 생성자 함수가 생성할 객체의 프로토타입을 가리킨다.

  - 따라서 생성자 함수로서 호출할 수 없는 함수(non-constructor)인 화살표 함수와, 메서드 축약 표현은 prototype 프로퍼티를 소유하지 않으며, 프로토타입도 생성하지 않음

  - 생성자 함수로 호출하기 위해 정의하지 않은 일반 함수도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의 prototype 프로퍼티는 아무 의미도 없다

  - 모든 객체가 가지고 있는 __ proto __ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.

    - ![image](https://user-images.githubusercontent.com/77482972/174065413-054daf28-5e0c-452a-8cdb-20cf4f6555a5.png)

    - ![image](https://user-images.githubusercontent.com/77482972/174065666-dd03f4c9-3056-4430-a6fc-8be23e3942a3.png)

    - ```javascript
      function Person(name) {
          this.name = name;
      }
      
      const me = new Person('Lee');
      
      console.log(me.__proto__ === Person.prototype); // true
      ```

- 프로토타입의 constructor 프로퍼티와 생성자 함수

  - 모든 프로토타입은 constructor 프로퍼티를 갖는다.

  - 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.

  - 이 연결은 생성자 함수가 생성될 때(함수 객체가 생성될 때) 이루어진다.

  - ```javascript
    function Person(name) {
        this.name = name;
    }
    
    const me = new Person('Lee');
    
    console.log(me.constructor === Person); // true
    
    // me 객체에는 constructor가 없다.
    // 하지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있다.
    ```

  - ![image](https://user-images.githubusercontent.com/77482972/174067379-e11d4d0c-d5f9-4cb5-a8ab-054cc523e77e.png)

#### 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

- 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출해 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

- 하지만, 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

  - Object 생성자 함수

    - ![image](https://user-images.githubusercontent.com/77482972/174070792-ff53b35f-3615-421a-a412-89fd1f428221.png)

    - ```javascript
      // 1. new.target이 undefined나 Object가 아닌 경우
      // (new.target을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지 확인)
      // 즉, new.target이 undefined: 일반 함수로 생성됨
      // 인스턴스 → Foo.prototype → Object.prototype 순으로 프로토타입 체인이 생성
      class Foo extends Object {}
      new Foo();
      
      // 2. Object 생성자 함수에 의한 객체 생성
      // 인수가 전달되지 않았으므로 OrdinaryObjectCreate를 호출해 빈 객체를 생성
      obj = new Object();
      console.log(obj); // {}
      
      // 3. 인수가 전달된 경우에는 인수를 객체로 변환
      obj = new Object(123);
      console.log(obj); // Number {123}
      
      ```

  - 객체 리터럴의 평가

    - ![image-20220616221654739](C:\Users\na_0_i\AppData\Roaming\Typora\typora-user-images\image-20220616221654739.png)
    - OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의됨

  - 즉, Object 생성자 함수 호출과 객체 리터럴의 평가는 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하는 점에서는 동일

  - 하지만 new.target 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다름

  - **따라서 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.**

  - 함수 객체의 경우 차이가 더 명확

    - Function 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않는다.

    - 따라서 **함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Function 생성자가 아니다.**

    - 하지만 constructor 프로퍼티를 통해 확인해보면 Function 생성자 함수이다.

    - ```javascript
      function foo () {} // 함수 선언문으로 생성
      
      console.log(foo.constructor === Function); // true
      ```

- 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요

- 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 가진다.

- **프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재**하기 때문

- 리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니지만 본질적인 면에서 큰 차이는 없다.

  - **객체 리터럴에 의해 생성된 객체와 Object 생성자 함수에 의해 생성한 객체**는 생성 과정에서의 차이는 있지만 결국 **객체로서 동일한 특성**을 갖는다.
  - **함수 리터럴에 의해 생성한 함수와 Function 생성자 함수에 의해 생성한 함수**는 스코프, 클로저 등의 차이가 있지만 결국 **함수로서 동일한 특성**을 갖는다.

- 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

  - ![image-20220616220644748](C:\Users\na_0_i\AppData\Roaming\Typora\typora-user-images\image-20220616220644748.png)

#### 프로토타입의 생성 시점

<br>

#### 내부 슬롯과 내부 메서드

- 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ECMA Script 사양에서 사용하는 의사 프로퍼티와 의사 메서드
- 이중 대괄호(`[[ ]]`)로 감싼 이름들
- 자바스크립트의 내부 로직이므로 원칙적으로 직접 접근하거나 호출할 수 있는 방법을 제공하지는 않는다.
- 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공(ex. [[ Prototype ]])