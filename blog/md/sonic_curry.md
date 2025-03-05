# sonic proposed to mail me a curry

As this title hardly suggests, this post is about the Curry-Howard correspondence, propositional logic and function currying. However, it is not an introduction to any of those.

## Functions and implications

### Functions in rust

The Rust programming language is one of these \<sarcasm>outsiders\</sarcasm> that does not automatically curry its functions.

Here is an example of a function:

```rs
/// Get the dividend of a previously performed division such that
/// dividend / divisor = quotient, dividend % divisor = remainder
fn reverse_division(quotient: isize, divisor: isize, remainder: isize) -> isize {
    quotient * divisor + remainder
}
```

The type of `reverse_division` is represented in Rust by `fn(isize, isize, isize) -> isize`.

### Functions in ocaml

The OCaml programming language, on the other hand, does curry. (yum!)

Here is a *strictly equivalent* implementation of `reverse_division` in that language:

```ocaml
(** [reverse_division (quotient, divisor, remainder)] produces the dividend
    of a previously performed division such that:
    [dividend / divisor = quotient] and [dividend mod divisor = remainder] *)
let reverse_division (quotient, divisor, remainder : int * int * int) : int =
  quotient * divisor + remainder
```

The type of such function is represented in OCaml by `(int * int * int) -> int`.

## Products and conjunctions

> Hold on, you said that OCaml functions were curried. Why did you make it so that its signature is `(int * int * int) -> int` and not `int -> int -> int -> int`?

I said it would be *strictly* equivalent, so I matched up the signature. The revelation here is that in the curried world, there is no such thing as a function that takes more than one parameter. Indeed, from this perspective, the Rust implementation secretly takes a tuple of parameters.

You know what tuples are also called? Product types. In fact, that is why OCaml uses the `*` operator to represent them. And you know what else is called products? Propositional conjunctions. When the function expects its parameters, it effectively asks for a `quotient` AND a `divisor` AND a `remainder`. If you don't provide any of the three, you don't have the premise of the implication, so you don't deserve (sorry) the resulting `int`/`isize`.

## Curry or not curry... same thing

Okay, fine, I'll give you the curried OCaml implementation:

```ocaml
(** [reverse_division quotient divisor remainder] produces the dividend of
    a previously performed division such that:
    [dividend / divisor = quotient] and [dividend mod divisor = remainder] *)
let reverse_division (quotient : int) (divisor : int) (remainder : int) : int =
  quotient * divisor + remainder
```

But really, it is basically the same as the one that uses a tuple, and the insight comes from propositional logic.

### The proof (your girl's dinner)

Stating that they are "the same" is equivalent to showing that given p, q, r and s four variables,

```txt
A = ((p ∧ q ∧ r) → s) ≡ (p → (q → (r → s)))
```

Now, there are two simple ways to prove this logical equivalence. The easiest is probably to construct the truth table of both sides and see if they match ; however, given that we have four variables, it is going to give us a whopping set of 16 rows. A neater way (in my opinion) is to use rewriting rules, specifically the implication elimination (doesn't sing well enough) and the de Morgan laws.

#### The conjunctive

Let's start with the left handside:

```txt
Left  = (p ∧ q ∧ r) → s
      ≡ ¬(p ∧ q ∧ r) ∨ s        (1)
      ≡ (¬p ∨ ¬q ∨ ¬r) ∨ s      (2)
      ≡ ¬p ∨ ¬q ∨ ¬r ∨ s        (3)
```

(1) we eliminate the implication using `a → b ↔ ¬a ∨ b`.  
(2) we apply the de Morgan law `¬(p ∧ q) ↔ ¬p ∨ ¬q`.  
(3) we re-arrange the terms using ∨'s associativity.  

#### The curried

Since we can't go further as we have a disjunctive normal form, let's do the right handside.

```txt
Right = p → (q → (r → s))
      ≡ ¬p ∨ (¬q ∨ (¬r ∨ s))    (1)
      ≡ ¬p ∨ ¬q ∨ ¬r ∨ s        (2)
```

(1) we eliminate implications as for the left handside.  
(2) we re-arrange the terms using ∨'s associativity.  

#### Finalizing

So, the two formulæ share a syntactically identical disjunctive normal form.

We know two things:

- Formulæ are logically equivalent to their DNFs.
- Two formulæ F and G logically equivalent to the same formula H are equivalent with each other by transitivity.

In other words, we have effectively shown that the A equivalence is true.
Quel poulet !

#### Uhm I'll do the truth table anyway for fun lol

| p | q | r | s | Left | Right |
|---|---|---|---|------|-------|
| 0 | 0 | 0 | 0 |  1   |   1   |
| 1 | 0 | 0 | 0 |  1   |   1   |
| 0 | 1 | 0 | 0 |  1   |   1   |
| 1 | 1 | 0 | 0 |  1   |   1   |
| 0 | 0 | 1 | 0 |  1   |   1   |
| 1 | 0 | 1 | 0 |  1   |   1   |
| 0 | 1 | 1 | 0 |  1   |   1   |
| 1 | 1 | 1 | 0 |  0   |   0   |
| 0 | 0 | 0 | 1 |  1   |   1   |
| 1 | 0 | 0 | 1 |  1   |   1   |
| 0 | 1 | 0 | 1 |  1   |   1   |
| 1 | 1 | 0 | 1 |  1   |   1   |
| 0 | 0 | 1 | 1 |  1   |   1   |
| 1 | 0 | 1 | 1 |  1   |   1   |
| 0 | 1 | 1 | 1 |  1   |   1   |
| 1 | 1 | 1 | 1 |  1   |   1   |

Unsurprisingly, the `Left` and `Right` columns are identical.

## What gives?

We have shown that `(p ∧ q ∧ r) → s` and `p → (q → (r → s))` are equivalent using facts and logic (checkmate `lib-rs`). With the Curry-Howard correspondence, it gives us a fair intuition on why currying is possible in the first place.

### Let's curry some Python

This means we can implement `reverse_division` as such:

```py
from collections.abc import Callable

def reverse_division(quotient: int) -> Callable[[int], Callable[[int], int]]:
    """
    Get the dividend of a previously performed division such that
    dividend / divisor = quotient, dividend % divisor = remainder
    """

    def curry1(divisor: int) -> Callable[[int], int]:
        def curry2(remainder: int) -> int:
            return quotient * divisor + remainder

        return curry2

    return curry1

# ------------------------------------

print(reverse_division(3)(5)(2))  # 17
```

In fact, if we sacrifice type safety, we can even implement a function that curries other functions for us:

```py
import inspect

def curry(function):
    """
    Transform a function (a, ..., z) -> R into
    a -> (... -> (z -> R)).
    """

    if len(inspect.signature(function).parameters) <= 1:
        return function

    def curried(first):
        @curry
        def take_rest(*rest):
            return function(first, *rest)

        return take_rest

    return curried
```

We can then use it as a decorator on our uncurried functions to give them some taste:

```py
@curry
def add(a, b):
    return a + b

print(add(3)(5))  # 8
```

Et voilà, bon appétit !
