## 24장 클로저

#### 렉시컬 스코프

- 렉시컬 스코프(정적 스코프): 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 어디에 정의했는지에 따라 상위 스코프를 결정
- 렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정

<br>

#### 함수 객체의 내부 슬롯 [[ Environment ]]

- 렉시컬 스코프가 가능하려면 함수는 자신이 정의된 환경(즉, 상위 스코프)를 기억해야 한다.
- 이를 위해 함수는 자신의 내부 슬롯 [[ Environment ]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장
- 함수 정의가 평가되어 함수 객체를 생성할 때 자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 [[ Environment ]]에 저장
- 자신의 내부 슬롯 [[ Environment ]]에 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.
- 따라서 함수 객체의 내부 슬롯 [[ Environment ]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 상위 스코프
- 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 '외부 렉시컬 환경에 대한 참조'에 저장될 참조값
- 함수 객체는 내부 슬롯 [[ Environment ]]에 저장한 렉시컬 환경의 참조(즉, 상위 스코프)를 자신이 존재하는 한 기억한다.
- 함수 렉시컬 환경의 구성 요소인 외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯 [[ Environment ]]에 저장된 렉시컬 환경의 참조가 결정된다(그림 2와 3)
- ![image](https://user-images.githubusercontent.com/77482972/175233429-3b246dc1-329a-4898-80bb-38eb0905ac11.png)



<br>

#### 클로저와 렉시컬 환경

```javascript
const x = 1;

function outer() {
    const x = 10;
    const inner = function() { console.log(x) };
    return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

- outer 함수를 호출 → outer는 중첩함수 inner를 반환하고 생명주기 종료 → outer 함수 실행 컨텍스트에서 제거(pop) → 따라서 outer 함수의 지역변수 x 또한 생명주기 마감
- 그러나 위 코드의 실행 결과는 10
- 이처럼 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 **중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다.** (=클로저)
- inner 함수는 자신이 평가될 때 자신이 정의된 위치에 의해 결정된 상위 스코프를 [[ Environment ]] 내부 슬롯에 저장하고 이때 저장된 상위 스코프는 함수가 존재하는 한 유지
- outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 **outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다.**
- outer 함수의 렉시컬 환경은 inner 함수의 [[ Environment ]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않는다.
- ![image](https://user-images.githubusercontent.com/77482972/175239227-86633f60-418e-4966-939e-c2357e2b38f7.png)
- 상위 스코프의 어떤 식별자도 참조하지 않는 경우 모던 브라우저는 최적화를 통해 상위 스코프를 기억하지 않는다 → 클로저라고 할 수 없다.
- 상위 스코프의 식별자를 참조하더라도 외부함수보다 중첩 함수의 생명주기가 짧다면 중첩함수는 클로저였지만 외부 함수보다 일찍 소멸하기 때문에 클로저의 본질에 부합하지 않는다.
- 즉, **클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적**이다.
- 클로저에 의해 참조되는 상위스코프의 변수를 **자유 변수**라고 부른다.
- 클로저(closure): 함수가 자유 변수에 의해 닫혀있다(closed) = 자유 변수에 묶여 있는 함수

<br>

#### 클로저의 활용

- 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용

- 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용

- ```javascript
  const counter = (function() {
      let num = 0;
      
      return {
          increase() {
          	return ++num;
          },
          decrease() {
              return --num;
          }
      }
  }());
  
  console.log(counter.increase()); // 1
  console.log(counter.increase()); // 2
  console.log(counter.decrease()); // 1
  ```

  - 즉시 실행 함수는 호출된 이후 소멸
  - 하지만 즉시 실행 함수가 반환한 클로저는 상위 스코프인 즉시 실행함수의 렉시컬 환경을 기억하고 있다.
  - 위 예제의 increase, decrease 메서드의 상위 스코프는 increase, decrease 메서드가 평가되는 시점에 실행 중인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다.
  - 따라서 increase, decrease 메서드가 어디서 호출되든 상관없이 즉시 실행 함수의 스코프의 식별자를 참조할 수 있다.

- ```javascript
  const Counter = (function() {
      let num = 0;
      
      function Counter() {}
      
      Counter.prototype.increase = function() {
          return ++num;
      };
      
      Counter.prototype.decrease = function() {
          return --num;
      };
      
      return Counter;
  })
  
  const counter = new Counter();
  
  console.log(counter.increase()); // 1
  console.log(counter.decrease()); // 1
  ```

- ```javascript
  // 함수를 인수로 전달받고 함수를 반환하는 고차 함수
  function makeCounter(aux) {
      let counter = 0;
      
      return function() {
          counter = aux(counter);
          return counter;
      };
  }
  
  function increase(n) {
      return ++n;
  }
  
  function decrease(n) {
      return --n;
  }
  
  const increaser = makeCounter(increase);
  const decreaser = makeCounter(decrease);
  
  console.log(increaser()); // 1
  console.log(decreaser()); // -1
  // makeCounter 함수를 호출해 함수를 반환할 때 반환한 함수는 자신만의 독립된 렉시컬 환경을 갖는다.
  ```

  - ![image](https://user-images.githubusercontent.com/77482972/175249266-1e9b3366-47b6-4952-8e5b-6926d954c3ab.png)
  - 독립된 렉시컬 환경을 갖기 때문에 자유 변수 counter를 공유하지 않는다.

- ```javascript
  const counter = (function(){
      let counter = 0;
      
      return function(aux) {
          counter = aux(counter);
          return counter;
      };
  }());
  
  function increase(n) {
      return ++n;
  }
  
  function decrease(n) {
      return --n;
  }
  
  console.log(counter(increase)); // 1
  console.log(counter(decrease)); // 0
  ```

<br>

#### 캡슐화와 정보 은닉

- 캡슐화: 프로퍼티와 메서드를 하나로 묶는 것
- 정보 은닉: 객체의 특정 프로퍼티나 메서드를 감출 목적으로 캡슐화를 사용
- 자바스크립트 객체의 모든 프로퍼티와 메서드는 기본적으로 public

<br>

#### 자주 발생하는 실수

