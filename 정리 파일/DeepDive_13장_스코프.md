## 13장 스코프

#### 스코프

- 모든 식별자는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정됨
- 즉, 스코프는 식별자가 유효한 범위를 말함

- 스코프는 함수의 중첩에 의해 계층적 구조를 가짐
- 스코프가 계층적으로 연결된 것을 스코프 체인이라고 함(최상위 스코프는 전역 스코프)
- 변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색
- 자바스크립트는 렉시컬 스코프를 따르므로 함수를 어디서 호출했는지가 아니라 어디서 정의했는지에 따라 상위 스코프를 결정
- 함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다.
- 함수의 상위 스코프는 언제나 자신이 정의된 스코프
- 함수의 상위 스코프는 함수 정의가 실행될 때 정적으로 결정

```javascript
var x = 1;

function foo () {
    var x = 10;
    console.log(x);
}

function bar () {
    console.log(x);
}

foo(); // 1
bar(); // 1 → 함수의 상위 스코프는 정의된 곳에 의해 결정되므로 여기서의 상위 스코프는 전역
```

