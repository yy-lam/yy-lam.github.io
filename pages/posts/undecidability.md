---
title: 'Undecidability'
date: '2021-03-21'
---

### Counting Argument
**Reviews**
- $\mathbb{N}$ is infinitely countable
- $\{x\in\mathbb{R} | 0 < x < 1\}$ is not countable: contradiction by diagonalization
- $\mathcal{P}(\mathbb{N})$ is not countable: contradiction by diagonalization

*Idea:* For any alphabet, there are *uncountable infinite many* languages, and *countable infinite many* Turing Machines to recognize them

The set of all possible languages over binary strings has the same cardinality as $\mathcal{P}(\mathbb{N})$, so it's uncountable.
Claim: the number of Turing Machines is countable.
Strategy: for each $k$ list all well-formed TMs that have less than $k$ characters in description: every TM can be encoded as a finite string of characters.
Let $\Sigma$ be the tape alphabet and there are at most $|\Sigma|^k$ many TMs. List them all and increment $k$. That list all TMs.

>Encoding of TM, <$M$> as "writing the 7-tuple as binary string", describing how TM works.

Prove by diagonalization.

**Undecidable Language**

$$A_{TM} = \{<M, w> | M \text{ is TM and $M$ accepts} w\}$$
**is recognizable, but not decidable.** There's no way to detect a loop.
Suppose by contradiction $A_{TM}$ is decidable by decider $H$ that decides $\{<M, w>| M\text{ accepts } w\}$.
Construct a new TM $D$ (kinda like diagonalization) when the input to $M$ is its own description. 
On input $X$ a TM, $D$ runs $H$ on <$X, <X>$> and output the opposite:
$$D(<M>) = \begin{cases}
accept & \text{if $M$ does not accept <$M$>}\\
reject & \text{if $M$ accepts <$M$>}
\end{cases}$$
However, when $D$ runs on its own description as input:
$$D(<D>) = \begin{cases}
accept & \text{if $M$ does not accept <$D$>}\\
reject & \text{if $M$ accepts <$D$>}
\end{cases}$$
Contradiction. $\square$

**$\overline{A_{TM}}$ is not recognizable.**
Suppose it is recognizable, then $A_{TM}$ is decidable which is in contradiction. $\square$

---

### Reducibility method for undecidability

$$HALT_{TM} = \{<M, w>| M \text{ is a TM and M halts on input } w\}$$
is undecidable.
*Idea:* By contradiction, assume $HALT_{TM}$ is decidable by TM $R$, and reduce $A_{TM}$ to $HALT_{TM}$: use $R$ to build TM $S$ to decide $A_{TM}$: On input <$M,w$>, $S =$
1. Run TM on $R$ on input <$M, w$>
2. If $R$ rejects, reject
3. If $R$ accepts, simulate $M$ on $w$ until it halts
4. If $M$ has accepted, accepts; if $M$ has rejected, reject
---
$$E_{TM} = \{<M> | M \text{ is a TM and } L(M)=\emptyset\}$$
is undecidable.
*Idea:* By contradiction, assume $E_{TM}$ is decidable by TM $R$, and reduce $A_{TM}$ to $E_{TM}$: use $R$ to build TM $S$ to decide $A_{TM}$: on input <$M, w$>,
1. Build modification of <$M$>: $M'$ reject all strings except $w$, and works as usual if not $w$
2. Run $R$ on <$M'$>
3. $R$ is decider, so if $R$ accepts <$M'$>, $x \neq w$ and $S$ rejects <$M, w$>
4. If $R$ rejects, $M'$ accepts an empty string and $S$ accepts

If $R$ is a decider for $E_{TM}$, $S$ is a decider for $A_{TM}$ $\square$

---
$$EQ_{TM} = \{<M_1, M_2> | M_1, M_2 \text{ are TMs and } L(M_1)=L(M_2)\}$$
is undecidable.
*Idea:* By contradiction, assume $EQ_{TM}$ is decidable by TM $R$, and reduce $E_{TM}$ to $EQ_{TM}$: use $R$ to build TM $S$ to decide $E_{TM}$: on input <$M$>,
1. Run $R$ on <$M, M_1$>, where $M_1$ is TM that rejects all inputs
2. If $R$ accepts, accepts; if $R$ rejects, rejects.

$\square$

---
### Post Correspondence Problem
> PCP
---

### Mapping Reducibility

Reducing problem $A$ to to problem $B$ by a mapping reducibility means that a computable function exists that converts instance of problem $A$ to instance of problem $B$.

**Def:** A function $f:\Sigma^*\rightarrow \Sigma^*$ us a **computable function** if some TM halts with $f(w)$ on its tape on every input $w$.

**Def:** Language $A$ is **mapping reducible** to language $B$, written $A \leq_m B$, if there is a computable function $f:\Sigma^*\rightarrow \Sigma^*$, where $\forall w$, 
$$w\in A \Leftrightarrow f(w)\in B$$
The function $f$ is called the reduction from $A$ to $B$.

*Idea:* Map reduce a target problem to a previously solved problem.

---
$$A_{TM}\leq_m HALT_{TM}$$
The following machine $F$ computes a reduction $f$ from $A_{TM}$ to $HALT_{TM}$.
$F$ = On input <$M, w$>:
1. Construct the following machine $M'$.
    $M'$ = On input $x$:
    1. Run $M$ on $x$
    2. If $M$ accepts, accepts
    3. If $M$ rejects, enter a loop
2. Output <$M', w$>

*Note:* improperly formed input are assumed to map to strings outside of the known problem.

