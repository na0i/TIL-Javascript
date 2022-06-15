## 17장 생성자 함수에 의한 객체 생성

#### Object 생성자 함수

- new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성해 반환

- 생성자 함수(constructor)란 new 연산자와 함께 호출하여 객체를 생성하는 함수를 말한다.

- 생성자 함수에 의해 생성된 객체를 인스턴스라 한다.

- 자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌트인 생성자 함수를 제공

- 일반 함수와 동일한 방법으로 생성자 함수를 정의하고

- new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작

- new 연산자와 함께 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작

- 객체 리터럴에 의한 객체 생성 방식의 장단점

  - 직관적이고 간편

  - 하지만 단 하나의 객체만을 생성

  - 동일한 프로퍼티를 갖는 객체를 여러개 생성해야 하는 경우는 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적

  - ```javascript
    const circle 1 = {
        radius: 5,
        getDiameter() {
            return 2 * this.radius;
        }
    };
    
    const circle2 = {
        radius: 10,
        getDiameter() {
            return 2 * this.radius;
        }
    }
    ```

- 생성자 함수에 의한 객체 생성 방식의 장점

  - 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

  - ```javascript
    function Circle(radius) {
        this.radius = radius;
        this.getDiameter = function () {
            return 2 * this.radius;
        }
    }
    
    const circle1 = new Circle(5);
    const circle2 = new Circle(10);
    ```

- 생성자 함수의 인스턴스 생성 과정

  - 생성자 함수의 역할: 인스턴스 생성(필수) & 생성된 인스턴스를 초기화(선택 사항)

  1. 인스턴스 생성과 this 바인딩

     - 암묵적으로 빈 객체 생성(생성자 함수가 생성한 인스턴스)
     - 인스턴스는 this에 바인딩: 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리킴
       - `바인딩`: 식별자와 값을 연결하는 과정
       - this 바인딩: this(식별자 역할)와 this가 가리킬 객체를 바인딩
     - 런타임 이전에 실행됨

  2. 인스턴스 초기화

     - this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고
     - 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당
     - 개발자가 기술

  3. 인스턴스 반환

     - 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환

     - ```javascript
       function Circle(radius) {
       	this.radius = radius;
           this.getDiameter = function () {
               return 2 * this.radius;
           };
       }
       
       const circle = new Circle(1);
       console.log(circle); // Circle {radius: 1, getDiameter: f} : this에 바인딩된 객체가 반환됨
       ```

     - this가 아닌 다른 객체를 명시적으로 반환하면 this가 아닌 return 문에 명시한 객체가 반환됨(return 문에 원시값을 썼을 경우에는 this 반환)

- 내부 메서드 [[ Call ]] 과 [[ Contrast ]]

  - 함수 선언식 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서 호출은 물론 생성자 함수로서 호출 가능
  - 함수는 객체이므로 일반 객체와 동일하게 동작 가능: 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문
  - 하지만, 일반 객체는 호출할 수 없고 함수는 호출할 수 있다.
  - 따라서, 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 [[ Enviroment ]], [[ FormalParameters ]] 등의 내부 슬롯과 [[ Call ]], [[ Contrast ]] 같은 내부 메서드를 추가로 가지고 있다.
    - `[[ Call ]]`: callable, 호출할 수 있는 객체
    - `[[ Construct ]]`: constructor, 생성자 함수로서 호출할 수 있는 함수, [[ Construct ]]를 갖지 않는 함수 객체를 non-constructor라 한다.
  - 함수 객체는 반드시 callable 해야한다 → 모든 함수 객체는 내부 메서드 [[ Call ]]을 갖고 있으므로 호출 가능
  - 하지만, 모든 함수 객체가 [[ Construct ]]를 갖는 것은 아니다. → 함수 객체는 constructor일 수도 있고 non-constructor일 수도 있다.
  - **함수 객체는 callable이면서 constructor이거나 callable이면서 non-constructor다.**
  - 즉, 모든 함수 객체는 호출할 수 있지만 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다.

- constructor과 non-constructor의 구분

  - 함수 정의를 평가하여
  - 함수 객체를 생성할 때 함수 정의 방식에 따라 함수를 constructor와 non-constructor로 구분
  - constructor: 함수 선언문, 함수 표현식, 클래스
  - non-constructor: 메서드(ES6 메서드 축약표현), 화살표 함수

- new 연산자

  - 일반 함수와 생성자 함수에 특별한 형식적 차이는 없다. new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작

  - 내부 메서드 [[Construct]] 호출

  - ```javascript
    function add(x, y) {
        return x + y;
    }
    
    let inst = new add();
    
    console.log(inst); // {}
    // 생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
    // 함수가 객체를 반환하지 않았으므로 반환문이 무시되고, 빈 객체가 생성되어 반환됨
    
    function createUser(name, role) {
        return { name, role };
    }
    
    let inst = new createUser('Lee', 'admin');
    
    console.log(inst);
    // {name: 'Lee', role: 'admin'}
    ```

  - 반대로 new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출됨

  - ```javascript
    function Circle(radius) {
        this.radius = radius,
        this.getDiameter = function () {
            return 2 * this.radius;
        };
    }
    
    const circle = Circle(5);
    
    console.log(circle); // undefined
    console.log(radius); // 5
    console.log(getDiameter()); // 10
    
    // 생성자 함수의 역할 중 첫번째는 빈 객체를 생성하고 this를 바인딩하는 것
    // new 연산자와 함께 생성자 함수로서 호출했다면 함수 내부의 this는 Circle 생성자 함수가 생성할 인스턴스를 가리켰을 것
    // 여기서는 일반 함수로서 호출되었으니 this가 window를 가리키는 상황
    ```

- `new.target`

  - 생성자 함수가 new 연산자 없이 호출되는 것을 방지

  - 함수 내부에서 new.target을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지 확인할 수 있다.

  - new 연산자와 함께 생성자 함수로 호출되면 함수 내부의 new.target은 함수 자신을 가리킴

  - 일반 함수로서 호출된 함수 내부의 new.target은 undefined

  - ```javascript
    function Circle(radius) {
    	if(!new.target) {
            return new Circle(radius);
        }
        this.radius = radius;
        this.getDiameter = function () {
            return 2 * this.radius;
        }
    }
    
    const circle = Circle(5);
    console.log(circle.getDiameter());
    // new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출됨
    ```

<br>

#### this

- 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수

- this가 가리키는 값(this 바인딩)은 함수 호출 방식에 따라 동적으로 결정된다.