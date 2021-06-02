import { outdent } from "outdent";
import refractor from "refractor";
import { noColor as inspect } from "unist-util-inspect";
import groupByLines from "./index";

test("simple", () => {
  // language=JavaScript
  const javascript = outdent`
    /* MULTIPLE
       LINE
       COMMENT */
    \`MULTIPLE
      LINE
      STRING\`;
    Many.Tokens.In.A.Single.Line;
  `;
  const tree = refractor.highlight(javascript, "js");
  expect(stringify(tree)).toMatchInlineSnapshot(`
"root[17]
├─0 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"comment\\"]}
│   └─0 text \\"/* MULTIPLE\\\\n   LINE\\\\n   COMMENT */\\"
├─1 text \\"\\\\n\\"
├─2 element<span>[3]
│   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\"]}
│   ├─0 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"template-punctuation\\",\\"string\\"]}
│   │   └─0 text \\"\`\\"
│   ├─1 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"string\\"]}
│   │   └─0 text \\"MULTIPLE\\\\n  LINE\\\\n  STRING\\"
│   └─2 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"template-punctuation\\",\\"string\\"]}
│       └─0 text \\"\`\\"
├─3 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   └─0 text \\";\\"
├─4 text \\"\\\\n\\"
├─5 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"maybe-class-name\\"]}
│   └─0 text \\"Many\\"
├─6 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   └─0 text \\".\\"
├─7 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\"]}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"maybe-class-name\\"]}
│       └─0 text \\"Tokens\\"
├─8 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   └─0 text \\".\\"
├─9 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\"]}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"maybe-class-name\\"]}
│       └─0 text \\"In\\"
├─10 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   └─0 text \\".\\"
├─11 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"constant\\"]}
│   └─0 text \\"A\\"
├─12 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   └─0 text \\".\\"
├─13 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\"]}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"maybe-class-name\\"]}
│       └─0 text \\"Single\\"
├─14 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   └─0 text \\".\\"
├─15 element<span>[1]
│   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\"]}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"maybe-class-name\\"]}
│       └─0 text \\"Line\\"
└─16 element<span>[1]
    │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
    └─0 text \\";\\""
`);
  const newTree = groupByLines(tree);
  expect(stringify(newTree)).toMatchInlineSnapshot(`
"root[7]
├─0 element<span>[1]
│   │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":1}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"comment\\"]}
│       └─0 text \\"/* MULTIPLE\\\\n\\"
├─1 element<span>[1]
│   │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":2}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"comment\\"]}
│       └─0 text \\"   LINE\\\\n\\"
├─2 element<span>[2]
│   │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":3}
│   ├─0 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"comment\\"]}
│   │   └─0 text \\"   COMMENT */\\"
│   └─1 text \\"\\\\n\\"
├─3 element<span>[2]
│   │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":4}
│   ├─0 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"template-punctuation\\",\\"string\\"]}
│   │   └─0 text \\"\`\\"
│   └─1 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"string\\"]}
│       └─0 text \\"MULTIPLE\\\\n\\"
├─4 element<span>[1]
│   │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":5}
│   └─0 element<span>[1]
│       │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"string\\"]}
│       └─0 text \\"  LINE\\\\n\\"
├─5 element<span>[4]
│   │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":6}
│   ├─0 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"string\\"]}
│   │   └─0 text \\"  STRING\\"
│   ├─1 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"template-string\\",\\"template-punctuation\\",\\"string\\"]}
│   │   └─0 text \\"\`\\"
│   ├─2 element<span>[1]
│   │   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
│   │   └─0 text \\";\\"
│   └─3 text \\"\\\\n\\"
└─6 element<span>[12]
    │ properties: {\\"className\\":[\\"line\\"],\\"data-line-number\\":7}
    ├─0 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"maybe-class-name\\"]}
    │   └─0 text \\"Many\\"
    ├─1 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
    │   └─0 text \\".\\"
    ├─2 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\",\\"maybe-class-name\\"]}
    │   └─0 text \\"Tokens\\"
    ├─3 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
    │   └─0 text \\".\\"
    ├─4 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\",\\"maybe-class-name\\"]}
    │   └─0 text \\"In\\"
    ├─5 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
    │   └─0 text \\".\\"
    ├─6 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"constant\\"]}
    │   └─0 text \\"A\\"
    ├─7 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
    │   └─0 text \\".\\"
    ├─8 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\",\\"maybe-class-name\\"]}
    │   └─0 text \\"Single\\"
    ├─9 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
    │   └─0 text \\".\\"
    ├─10 element<span>[1]
    │   │ properties: {\\"className\\":[\\"token\\",\\"property-access\\",\\"maybe-class-name\\"]}
    │   └─0 text \\"Line\\"
    └─11 element<span>[1]
        │ properties: {\\"className\\":[\\"token\\",\\"punctuation\\"]}
        └─0 text \\";\\""
`);
});

function stringify(nodes: any): string {
  return inspect({ type: "root", children: nodes });
}
