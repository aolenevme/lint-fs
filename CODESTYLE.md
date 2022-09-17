# CODE STYLE

1. [Golang-like error handling between modules.](https://go.dev/blog/error-handling-and-go)
```
execWithResult :: any -> [NonNullable<any>]
const execWithResult = (...arguments) => ([{}]);

execWithErrorMessage :: any -> [undefined, string]
const execWithErrorMessage = (...arguments) => ([undefined, "errorMessage"]);
```

2. `try {...} catch {...} finally {...}` only for NodeJS APIs.

3. [The strictest eslint without /\* eslint-disable \*/.](https://github.com/gajus/eslint-config-canonical)

4. [Mindset framework](https://www.aolenev.me/blog/mindset-framework.html).

5. [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

6. No libraries excluding code quality tools and the most essential ones.

7. Functional [scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope) mutability and utilisation of [composition over inheritance principle](https://en.wikipedia.org/wiki/Composition_over_inheritance) to get both speed and maintainability. To get benefits from both [FP / OOP](https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html) and procedural programming.

8. [TDD with 100% code coverage](https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html).

9. [No Typescript](https://youtu.be/H9-F8uhKMRk?t=250).

10. Regular updates of **ALL** libraries and [engines](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#engines).
