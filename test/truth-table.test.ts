import { simplify } from '../src/pages/truth-table'
import { Expression } from "../src/classes/expression";
import { Operator } from "../src/classes/operator";

test("Equals", () => {
    const innerExp1 = new Expression("A", null, null, { isAtomic: true });
    const innerExp2 = new Expression("B", null, null, { isAtomic: true });

    const exp1 = new Expression(innerExp1, Operator.and, innerExp2, {});
    const exp2 = new Expression(innerExp1, Operator.and, innerExp2, {});

    expect(exp1.equals(exp2)).toBeTruthy();
    expect(exp2.equals(exp1)).toBeTruthy();
});

test("Absorption w/ same values", () => {
    expect(simplify("A&A", true)?.toString()).toBe("A");
    expect(simplify("A|A&A", true)?.toString()).toBe("A");
    expect(simplify("A>A&A|A", true)?.toString()).toBe("A");
    expect(simplify("(A&A)|(A&A)", true)?.toString()).toBe("A");
    expect(simplify("((A|A)>(A&(A|A)))", true)?.toString()).toBe("A");
    expect(simplify("A|A|(A>A)&(A|A&A)>A", true)?.toString()).toBe("A");
});

test("Absorption w/ different values", () => {
    expect(simplify("A&B|A", true)?.toString()).toBe("A");
    expect(simplify("A&(B|B)&C", true)?.toString()).toBe("A & B & C");
    expect(simplify("A&B|A&B", true)?.toString()).toBe("A & B");
    expect(simplify("A&B&A&B", true)?.toString()).toBe("A & B");
    expect(simplify("(A&B|C&D)&(A&B|C&D)", true)?.toString()).toBe("A & B | C & D");
    expect(simplify("A>A&B", true)?.toString()).toBe("!A | B");
    expect(simplify("A>A|B", true)?.toString()).toBe("!A | A");
    expect(simplify("A&B&A", true)?.toString()).toBe("A & B");
    expect(simplify("A|B|A&B", true)?.toString()).toBe("A | B");
    expect(simplify("A|B|A|B", true)?.toString()).toBe("A | B");
    expect(simplify("A|B|C|A", true)?.toString()).toBe("A | B | C");
});

test("Distributivity", () => {
    expect(simplify("A&B|B&C", true)?.toString()).toBe("B & (A | C)");
    expect(simplify("(A|B)&(B|C)", true)?.toString()).toBe("B | A & C");
    expect(simplify("(A|B)&(B|C)&D|(A|B)&(B|C)&E", true)?.toString()).toBe("(B | A & C) & (D | E)");
});

test("Elimination of implication", () => {
    expect(simplify("A>B", true)?.toString()).toBe("!A | B");
    expect(simplify("A&C>B", true)?.toString()).toBe("!(A & C) | B");
    expect(simplify("!(A|B)>C", true)?.toString()).toBe("(A | B) | C");
});

test("De Morgan's law", () => {
    expect(simplify("!A&!B", true)?.toString()).toBe("!(A | B)");
    expect(simplify("!A|!B", true)?.toString()).toBe("!(A & B)");
    expect(simplify("!(A|B)&!(C|D)", true)?.toString()).toBe("!((A | B) | (C | D))");
});

test("Parenthesis", () => {
    expect(simplify("A&(B|C)&D", true)?.toString()).toBe("A & (B | C) & D");
    expect(simplify("(!(A&B)|(C>D))&E", true)?.toString()).toBe("(!(A & B) | (!C | D)) & E");
});

test("Commutative", () => {
    expect(simplify("B&A", true)?.toString()).toBe("A & B");
    expect(simplify("B|A", true)?.toString()).toBe("A | B");
    expect(simplify("G&(H|B)>A&(J|C)", true)?.toString()).toBe("!(G & (B | H)) | A & (C | J)");
});

test("Operator weight", () => {
    expect(simplify("A&B&C|D", true)?.operator).toBe(Operator.or);
    expect(simplify("A|B&C&D", true)?.operator).toBe(Operator.or);
    expect(simplify("A>B&C|D", true)?.exp1?.toString()).toBe("!A");
    expect(simplify("A>B|C&D|E>F&G", true)?.exp2?.toString()).toBe("F & G");
});

test("Several", () => {
    expect(simplify("A&B|C>C&A", true)?.toString()).toBe("!(A & B | C) | A & C");
});

test("Always true / false", () => {
    expect(simplify("A&!A", true)?.toString()).toBe("A & !A"); // FIXME absorbtion?
    expect(simplify("A|!A", true)?.toString()).toBe("A | !A");
});
