---
title: 'Turing Machines'
date: '2021-03-03'
---

## Turing Machine

A Turing Machine (TM) is a 7-tuple: $(Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})$ where $Q, \Sigma, \Gamma$ are finite sets and,
- $Q$ is the set of states
- $\Sigma$ is the input alphabet not including blank symbol #
- $\Gamma$ is the tape alphabet, where $\Sigma\cup\{\#\} \subseteq \Gamma$
- $\delta: Q\times\Gamma\rightarrow Q\times\Gamma\times\{L, R\}$
- $q_0\in Q$ is the start state
- $q_{accept}\in Q$ is the accept state
- $q_{reject}\in Q$ is the reject state

*Note:* 
- TM can both write and read from the tape
- The read-write head can move to both left and right
- The tape is infinite
- States for rejecting and accepting take effect immediately
- Input $w = w_1...w_n$ is written on the first $n$ entry on the left side of the tape, and all the rest boxes contains blank symbol #
- It is assumed (in this class) that we know when we are pointing at the first tape square
- TM is deterministic if not stated
- Notation: write $uqv$ for the *configuration* where the current state is $q$, current tape content is $uv$ and head location is $v$
- Start configuration: $q_0w...$

TM $M$ accepts input $w$ if a sequence of of configuration $C_1, ..., C_k$ exists where:
1. $C_1$ is the start configuration of $M$
2. each $C_i$ yields $C_{i+1}$ with a transition function
3. $C_k$ is the accept configuration

**Def:** A language is Turing-recognizable if some TM $M$ recognizes it, denoted $L(M)$.
**Def:** A language is Turing-decidable if some TM decides it (leading to either acceptance or rejecting).

---

### Variants of Turing Machine

**Multi-tape Turing Machine** with $k$ tapes
Transition function allows for reading, writing, and moving all $k$ heads simultaneously.
$$\delta(q_i, x_1,...,x_k) = (q_j, x_1',...,x_k', L, R, ..., L)$$
**Theorem:** Multi-tape Turing Machine has an equivalent single tape Turing Machine.
$M$ has $k$ tapes. Sinlge tape TM $S$ simulates the effect of $k$ tapes by using a new symbol $\$$ as a delimiter to separate the content of different tapes. $S$ keeps track of the heads using "virtual heads": by writing dots to mark where the heads would be.
 
**Nondeterministic Turing Machine**
Transition function:
$$\delta: Q\times \Gamma \rightarrow \mathcal{P}(Q\times\Gamma\times\{L, R\})$$
We say NTM $N = (Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})$ accepts $w$ if there's some way to compute that ends up in an accept configuration.
**Theorem:** Every NTM can be simulated by a corresponding deterministic TM that accepts the same language.

*Proof:* 
Simulate any NTM $N$ with a deterministic TM $D$ (breath-first search): 
- Tape 1: input string that is not altered
- Tape 2: copy of $N$'s tape on some branch
- Tape 3: keep track of $D$'s location and $N$'s nondeterministic computation tree
231 meaning go to second child, then third child in the next level, and the first child next.

Let $D$ try all branches of $N$'s computation on tape 2 with finite number of steps (indexed by tape 3). If no more symbols remain on tape 3 or if this nondeterministic choice is invalid, abort this branch, increment the number on tape 3 and simulate the next branch. 
If one branch accepts, $D$ accept. Otherwise $D$ does not terminate.

**Idea:** For each NTM, construct a 3-tape deterministic TM.

**Theorem:** A language is **Turing recognizable** $\Leftrightarrow$ some NTM recognizes it.

**Def:** A NTM is a *decider* if and only if halts and answers accept or reject on *all* branches of computation.

**Theorem:** $L$ is decidable if and only if both $L$ and $\overline{L}$ are recognizable.
*Proof:*  
($\Rightarrow$) Decider is automatically a decider.
($\Leftarrow$) Build a decider $T$: Let $M$ recognizes $L$ and $M'$ recognizes $\overline{L}$. Simulate $T$ with $M$ and $M'$ on two tapes. One of the tapes must halt and accept. If $M$ accepts then $T$ accepts. If $M'$ accepts then $T$ reject. 

---

### Universal Turing Machine

A Universal TM to run any DFA:
$$A_{DFA} = \{<D,w> | D \text { is a DFA and D accepts } w\}$$
*Intuition:* Can we write a program to do what DFA does? $\Leftrightarrow$ is $A_{DFA}$ recognizable?
*Proof:* Construct 2-tape TM $M$, one tape with the input and the rules of $D$ on another tape. 
1. On input <$D,w$>, $M$ first check that $D$ is in the right form and $w\in\Sigma$. Otherwise reject.
2. While the symbol on the input tape (head) is not blank, if DFA is in $q_i$ and reading $a$, go to $q_j$ where $\delta(q_i, a) = q_j$ and move right.
3. When symbol is blank, if DFA is in an accept state, $M$ accepts. Otherwise halts and rejects.

---
**Theorem:** $E_{DFA}$ is decidable.
$$E_{DFA} = \{D \text{ is a DFA and } L(D) = \emptyset \}$$
*Proof idea:* check if any accept state is reachable, by path finding.

---
**Theorem:** $EQ_{DFA}$ is decidable.
$$EQ_{DFA} = \{<A, B> | A, B \text{ are DFAs, and } L(A) = L(B)\}$$
Construct DFA $C$ such that $C$ accept strings $w$ iff both $A,B$ reject it: $L(C) = \big(L(A)\cap\overline{L(B)}\big)\cup\big(\overline{L(A)}\cap L(B)\big)$
$$L(A) = L(B) \Leftrightarrow L(C) = \emptyset$$
Thus, to prove $EQ_{DFA}$ is decidable, prove $E_{DFA}$ is decidable where $C$ is the input of $E_{DFA}$.

Run TM $T$ on $C$ described above. If $T$ accepts, accepts. If $T$ rejects, rejects.

---



