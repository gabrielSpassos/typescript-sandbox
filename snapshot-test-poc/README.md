# Snapshot Test POC

* Contract Tests for the Front-End
* Check if the components of the design system are correctly implemented
* Need to have access to the design system
* Should be fast
* Jest is the tool to use
* Coverage
    * what the component implements following the design system

## Architecture

```
frontend-snapshot-poc/
├── src/
│   ├── components/
│   │   └── Button.tsx
│   ├── design-system/
│   │   └── colors.ts
│   └── tests/
│       └── Button.snapshot.test.tsx
├── jest.config.ts
├── jest.setup.ts
├── tsconfig.json
├── package.json
└── babel.config.js
```

## Tests

* Update snapshots `npm test -- -u`

```shell
npm test

> snapshot-test-poc@1.0.0 test
> jest

 PASS  src/tests/Button.snapshot.test.tsx
  Button snapshot contract
    ✓ should match component snapshot (38 ms)
    ✓ should respect design system blue color (62 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   1 passed, 1 total
Time:        2.262 s
Ran all test suites.
```

```shell
➜  snapshot-test-poc git:(main) npm test

> snapshot-test-poc@1.0.0 test
> jest

 FAIL  src/tests/Button.snapshot.test.tsx
  Button snapshot contract
    ✕ should match component snapshot (36 ms)
    ✓ should respect design system blue color (60 ms)

  ● Button snapshot contract › should match component snapshot

    expect(received).toMatchSnapshot()

    Snapshot name: `Button snapshot contract should match component snapshot 1`

    - Snapshot  - 1
    + Received  + 1

    @@ -1,8 +1,8 @@
      .c0 {
        background-color: #0055FF;
    -   color: #FFFFFF;
    +   color: #0055FF;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;

      14 |     );
      15 |
    > 16 |     expect(container.firstChild).toMatchSnapshot();
         |                                  ^
      17 |   });
      18 |
      19 |   it("should respect design system blue color", () => {

      at Object.<anonymous> (src/tests/Button.snapshot.test.tsx:16:34)

 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `npm test -- -u` to update them.

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   1 failed, 1 total
Time:        3.334 s
Ran all test suites.
```

```shell
➜  snapshot-test-poc git:(main) ✗ npm test

> snapshot-test-poc@1.0.0 test
> jest

 PASS  src/tests/Button.snapshot.test.tsx
  Button snapshot contract
    ✓ should match primary snapshot (37 ms)
    ✓ should match danger snapshot (7 ms)
    ✓ should respect primary design token (58 ms)
    ✓ should respect danger design token (9 ms)
    ✓ should respect primary design token (7 ms)
    ✓ should match dark mode snapshot (3 ms)

 › 3 snapshots written.
 › 1 snapshot obsolete.
   • Button snapshot contract should match component snapshot 1
Snapshot Summary
 › 3 snapshots written from 1 test suite.
 › 1 snapshot obsolete from 1 test suite. To remove it, run `npm test -- -u`.
   ↳ src/tests/Button.snapshot.test.tsx
       • Button snapshot contract should match component snapshot 1

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   1 obsolete, 3 written, 3 total
Time:        3.487 s
Ran all test suites.
```