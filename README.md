# @suin/refractor-group-by-lines

A utility to embed line information to [Refractor](https://github.com/wooorm/refractor) ASTs.

## Installation

```bash
yarn add @suin/refractor-group-by-lines
# or
npm install @suin/refractor-group-by-lines
```

## Usage

### Basic Usage

code.js:

```js
/* MULTIPLE
   LINE
   COMMENT */
`MULTIPLE
  LINE
  STRING`;
Many.Tokens.In.A.Single.Line;
```

```typescript
import refractor from "refractor";
import groupByLines from "@suin/refractor-group-by-lines";

const code = fs.readFileSync("./code.js", "utf-8");
const tree = refractor.highlight(code, "js");
const newTree = groupByLines(tree);
```

The structure of `tree` is:

```
root[17]
├─0 element<span>[1]
│   │ properties: {"className":["token","comment"]}
│   └─0 text "/* MULTIPLE\n   LINE\n   COMMENT */"
├─1 text "\n"
├─2 element<span>[3]
│   │ properties: {"className":["token","template-string"]}
│   ├─0 element<span>[1]
│   │   │ properties: {"className":["token","template-punctuation","string"]}
│   │   └─0 text "`"
│   ├─1 element<span>[1]
│   │   │ properties: {"className":["token","string"]}
│   │   └─0 text "MULTIPLE\n  LINE\n  STRING"
│   └─2 element<span>[1]
│       │ properties: {"className":["token","template-punctuation","string"]}
│       └─0 text "`"
├─3 element<span>[1]
│   │ properties: {"className":["token","punctuation"]}
│   └─0 text ";"
├─4 text "\n"
├─5 element<span>[1]
│   │ properties: {"className":["token","maybe-class-name"]}
│   └─0 text "Many"
├─6 element<span>[1]
│   │ properties: {"className":["token","punctuation"]}
│   └─0 text "."
├─7 element<span>[1]
│   │ properties: {"className":["token","property-access"]}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","maybe-class-name"]}
│       └─0 text "Tokens"
├─8 element<span>[1]
│   │ properties: {"className":["token","punctuation"]}
│   └─0 text "."
├─9 element<span>[1]
│   │ properties: {"className":["token","property-access"]}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","maybe-class-name"]}
│       └─0 text "In"
├─10 element<span>[1]
│   │ properties: {"className":["token","punctuation"]}
│   └─0 text "."
├─11 element<span>[1]
│   │ properties: {"className":["token","constant"]}
│   └─0 text "A"
├─12 element<span>[1]
│   │ properties: {"className":["token","punctuation"]}
│   └─0 text "."
├─13 element<span>[1]
│   │ properties: {"className":["token","property-access"]}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","maybe-class-name"]}
│       └─0 text "Single"
├─14 element<span>[1]
│   │ properties: {"className":["token","punctuation"]}
│   └─0 text "."
├─15 element<span>[1]
│   │ properties: {"className":["token","property-access"]}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","maybe-class-name"]}
│       └─0 text "Line"
└─16 element<span>[1]
    │ properties: {"className":["token","punctuation"]}
    └─0 text ";"
```

The structure of the `newTree` above becomes:

```
root[7]
├─0 element<span>[1]
│   │ properties: {"className":["line"],"data-line-number":1}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","comment"]}
│       └─0 text "/* MULTIPLE\n"
├─1 element<span>[1]
│   │ properties: {"className":["line"],"data-line-number":2}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","comment"]}
│       └─0 text "   LINE\n"
├─2 element<span>[2]
│   │ properties: {"className":["line"],"data-line-number":3}
│   ├─0 element<span>[1]
│   │   │ properties: {"className":["token","comment"]}
│   │   └─0 text "   COMMENT */"
│   └─1 text "\n"
├─3 element<span>[2]
│   │ properties: {"className":["line"],"data-line-number":4}
│   ├─0 element<span>[1]
│   │   │ properties: {"className":["token","template-string","template-punctuation","string"]}
│   │   └─0 text "`"
│   └─1 element<span>[1]
│       │ properties: {"className":["token","template-string","string"]}
│       └─0 text "MULTIPLE\n"
├─4 element<span>[1]
│   │ properties: {"className":["line"],"data-line-number":5}
│   └─0 element<span>[1]
│       │ properties: {"className":["token","template-string","string"]}
│       └─0 text "  LINE\n"
├─5 element<span>[4]
│   │ properties: {"className":["line"],"data-line-number":6}
│   ├─0 element<span>[1]
│   │   │ properties: {"className":["token","template-string","string"]}
│   │   └─0 text "  STRING"
│   ├─1 element<span>[1]
│   │   │ properties: {"className":["token","template-string","template-punctuation","string"]}
│   │   └─0 text "`"
│   ├─2 element<span>[1]
│   │   │ properties: {"className":["token","punctuation"]}
│   │   └─0 text ";"
│   └─3 text "\n"
└─6 element<span>[12]
    │ properties: {"className":["line"],"data-line-number":7}
    ├─0 element<span>[1]
    │   │ properties: {"className":["token","maybe-class-name"]}
    │   └─0 text "Many"
    ├─1 element<span>[1]
    │   │ properties: {"className":["token","punctuation"]}
    │   └─0 text "."
    ├─2 element<span>[1]
    │   │ properties: {"className":["token","property-access","maybe-class-name"]}
    │   └─0 text "Tokens"
    ├─3 element<span>[1]
    │   │ properties: {"className":["token","punctuation"]}
    │   └─0 text "."
    ├─4 element<span>[1]
    │   │ properties: {"className":["token","property-access","maybe-class-name"]}
    │   └─0 text "In"
    ├─5 element<span>[1]
    │   │ properties: {"className":["token","punctuation"]}
    │   └─0 text "."
    ├─6 element<span>[1]
    │   │ properties: {"className":["token","constant"]}
    │   └─0 text "A"
    ├─7 element<span>[1]
    │   │ properties: {"className":["token","punctuation"]}
    │   └─0 text "."
    ├─8 element<span>[1]
    │   │ properties: {"className":["token","property-access","maybe-class-name"]}
    │   └─0 text "Single"
    ├─9 element<span>[1]
    │   │ properties: {"className":["token","punctuation"]}
    │   └─0 text "."
    ├─10 element<span>[1]
    │   │ properties: {"className":["token","property-access","maybe-class-name"]}
    │   └─0 text "Line"
    └─11 element<span>[1]
        │ properties: {"className":["token","punctuation"]}
        └─0 text ";"
```

HTML would be like this:

```html
<span class="line" data-line-number="1"
  ><span class="token comment">/* MULTIPLE\n</span></span
><span class="line" data-line-number="2"
  ><span class="token comment"> LINE\n</span></span
><span class="line" data-line-number="3"
  ><span class="token comment"> COMMENT */</span>\n</span
><span class="line" data-line-number="4"
  ><span class="token template-string template-punctuation string">`</span
  ><span class="token template-string string">MULTIPLE\n</span></span
><span class="line" data-line-number="5"
  ><span class="token template-string string"> LINE\n</span></span
><span class="line" data-line-number="6"
  ><span class="token template-string string"> STRING</span
  ><span class="token template-string template-punctuation string">`</span
  ><span class="token punctuation">;</span>\n</span
><span class="line" data-line-number="7"
  ><span class="token maybe-class-name">Many</span
  ><span class="token punctuation">.</span
  ><span class="token property-access maybe-class-name">Tokens</span
  ><span class="token punctuation">.</span
  ><span class="token property-access maybe-class-name">In</span
  ><span class="token punctuation">.</span><span class="token constant">A</span
  ><span class="token punctuation">.</span
  ><span class="token property-access maybe-class-name">Single</span
  ><span class="token punctuation">.</span
  ><span class="token property-access maybe-class-name">Line</span
  ><span class="token punctuation">;</span></span
>
```

## API Reference

https://suin.github.io/refractor-group-by-lines/
