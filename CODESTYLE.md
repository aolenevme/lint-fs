# CODE STYLE

1. [Golang-like error handling.](https://go.dev/blog/error-handling-and-go)
```
execWithResult :: any -> [NonNullable<any>]
const execWithResult = (...arguments) => ([{}]);

execWithErrorMessage :: any -> [undefined, string]
const execWithErrorMessage = (...arguments) => ([undefined, "errorMessage"]);
```

2. [Ala Golang-like ok idiom.](https://blog.toshima.ru/2019/07/21/go-comma-ok-idiom.html)
```
execWithOk :: any -> [string | undefined]
const execWithOk = (...arguments) => (["errorMessage"]);
```

3. `try {...} catch {...} finally {...}` only for NodeJS APIs.

4. [The strictest eslint without /\* eslint-disable \*/.](https://github.com/gajus/eslint-config-canonical)

5. [Mindset framework](https://www.aolenev.me/blog/mindset-framework.html).

6. [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

7. No libraries excluding code quality tools and the most essential ones.

8. Functional [scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope) mutability and utilisation of [composition over inheritance principle](https://en.wikipedia.org/wiki/Composition_over_inheritance) to get both speed and maintainability. To get benefits from both [FP / OOP](https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html) and procedural programming.

9. [TDD with 100% code coverage](https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html).

10. [No Typescript](https://youtu.be/H9-F8uhKMRk?t=250).

11. Regular updates of **ALL** libraries and [engines](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#engines).
