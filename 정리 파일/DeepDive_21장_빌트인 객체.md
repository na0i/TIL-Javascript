## 21장 빌트인 객체

#### 자바스크립트 객체의 분류

- 표준 빌트인 객체
- 호스트 객체
- 사용자 정의 객체

<br>

#### 표준 빌트인 객체

- Object, String, Number, Boolean, Symbol, Date 등

- 인스턴스를 생성할 수 있는 생성자 함수 객체(Math, Reflect, Json 제외)

  - 생성자 함수 객체(표준 빌트인 객체 中) → 프로토타입 메서드와 정적 메서드 제공

  - 생성자 함수가 아닌 객체(표준 빌트인 객체 中) → 정적 메서드만 제공

  - ```javascript
    const numObj = new Number(1.5);
    
    console.log(numObj.toFixed());
    // toFixed: Number.prototype의 프로토타입 메서드
    // 모든 Number 인스턴스가 상속을 통해 사용 가능
    
    console.log(Number.isInteger(0.5));
    // isInteger: Number의 정적 메서드
    // 인스턴스 없이 정적으로 호출할 수 있는 정적 메서드 제공
    ```

<br>

#### 원시값과 래퍼 객체

- 원시값은 객체가 아니므로 프로퍼티나 메서드를 가질 수 없지만 객체처럼 동작

- 원시값에 대해(문자열, 숫자, 불리언 값) 마치 객체 처럼 마침표 표기법(또는 대괄호 표기법)으로 접근하면 자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환

- 원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.

- 래퍼객체

  - 문자열, 숫자, 불리언 값(원시값)에 대해 객체처럼 접근하면 생성되는 임시 객체

  - ```javascript
    const str = 'hi';
    
    // 원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환됨
    console.log(str.length); 
    
    // 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
    console.log(typeof str);
    ```

  - 예시) 문자열에 대해 마침표 표기법으로 접근 → 래퍼 객체인 String 생성자 함수의 인스턴스가 생성 → 문자열은 래퍼 객체의 [[ StringData ]] 내부 슬롯에 할당 → String.prototype 메서드를 상속받아 사용 가능 → 래퍼 객체의 처리가 종료 → [[ StringData ]] 내부 슬롯에 할당된 원시값으로 원래의 상태로 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 됨

  - ![image](https://user-images.githubusercontent.com/77482972/174746777-4b02740c-e4cf-46b6-9c8e-866ae9bb74b7.png)

  - ```javascript
    const str = 'hello';
    
    // 원시값에 대해 마침표 표기법으로 접근 → 암묵적으로 생성된 래퍼 객체를 가리킨다.
    // hello는 래퍼객체의 [[StringData]] 내부 슬롯에 할당
    // 래퍼 객체에 name 프로퍼티가 동적 추가
    str.name = 'Lee';
    
    // 식별자 str은 다시 원래의 원시값을 갖는다.
    // 래퍼 객체는 가비지 컬렉션의 대상이 된다.
    
    // 식별자 str은 새롭게 암묵적으로 생성된 래퍼 객체를 가리킨다.(위에서 가리킨 래퍼객체 X)
    // 새롭게 생성된 래퍼 객체에는 name 프로퍼티 존재 X
    console.log(str.name); // undefined
    
    // 식별자 str은 다시 원래의 원시값을 가진다.
    // 새롭게 생성된 래퍼 객체도 가비지 컬렉션의 대상이 된다.
    console.log(typeof str, str);
    ```

- 이처럼 문자열, 숫자, 불리언, 심벌은 래퍼 객체에 의해 마치 객체처럼 사용 가능하며, 표준 빌트인 객체인 String, Number, Boolean, Symbol의 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다.

- 따라서, String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 인스턴스를 생성할 필요가 없으며 권장하지 않는다.

- null과 undefined는 래퍼 객체를 생성하지 않는다. → 객체처럼 사용하면 에러 발생

<br>

#### 전역 객체

- 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체

- 어떤 객체에도 속하지 않은 최상위 객체

- 전역 객체는 표준 빌트인 객체, 호스트 객체, var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 가짐

- 전역 객체는 개발자가 의도적으로 생성할 수 없다.

- 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다.

- let이나 const로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.(window.foo와 같이 접근할 수 없다.)

- 빌트인 전역 프로퍼티

  - 전역 객체의 프로퍼티
  - Infinity: 무한대를 나타내는 숫자값
  - NaN: Not a Number을 나타내는 숫자값, Number.NaN 프로퍼티와 동일
  - undefined

- 빌트인 전역 함수

  - 애플리케이션 전역에서 호출할 수 있는 빌트인 함수
  - 전역 객체의 메서드
  - eval
    - 문자열을 인수로 전달 받음
    - 전달받은 문자열 코드가 표현식이라면 → 문자열 코드를 런타임에 평가하여 값을 생성
    - 전달받은 문자열 코드가 표현식이 아닌 문이라면 → 문자열 코드를 런타임에 실행
    - 여러개의 문으로 이루어져 있다면 모든 문을 실행한 다음 마지막 결과값을 반환
    - 사용 금지 권장
  - isFinite
    - 유한수인지 검사
    - NaN은 false, null은 true
  - isNaN
  - parseFloat
    - 실수로 해석해 반환
    - 두 번째 인수로 진법을 나타내는 기수를 전달
  - encodeURI / decodeURI
    - URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩, 디코딩
    - 아스키문자 셋으로 변환
  - encodeURIcomponent / decodeURIcomponent
    - URI 구성요소를 인수로 전달받아 인코딩, 디코딩

- 암묵적 전역

  - 선언하지 않은 식별자에 값을 할당하면 전역 객체의 프로퍼티가 됨

  - 다만, 변수 선언 없이 단지 전역 객체의 프로퍼티로 추가되었을 뿐이므로 변수가 아니다.

  - 프로퍼티이므로 delete 연산자로 삭제 가능

  - ```javascript
    var x = 10; // 전역 변수
    
    function foo () {
        y = 20; // window.y = 20;
        console.log(x + y);
    }
    
    foo(); // 30
    
    console.log(window.x); // 10
    console.log(window.y); // 20
    
    delete x;
    delete y;
    
    console.log(window.x); // 10
    console.log(window.y); // undefined
    ```

<br>

#### 프로토타입 메서드 vs 정적 메서드

- 프로토타입 메서드
  - 인스턴스로 호출
- 정적 메서드
  - 생성자 함수로 인스턴스를 생성하지 않아도 호출할 수 있는 메서드