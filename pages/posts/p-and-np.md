---
title: 'P and NP'
date: '2021-04-01'
---

## Time Complexity

*Idea:* Does Nondeterminism (*Magic*) help?

### P and NP

**Def:** P is the class of languages that are decidable in polynomial time on a deterministic Turing Machine.
$$P = \cup_k TIME(O(n^k))$$
*Easy for Authur*


**Def:** NP is the class of languages that are decidable in polynomial time on a nondeterministic Turing Machine.
$$NP = \cup_k UTIME(O(n^k))$$
*Easy for Merlin*
*Alternative:* NP is the class of languages whose YES instances can be verified by Authur in polynomial time.

**Def:** coNP is the class of languages 
    - whose complements are in NP
    - whose NO instances can be verified by Arthur in polynomial time
**Theorem:** $P \subseteq coNP$
    *Proof:* if $L$ be a language of $P$, by switching accept and reject states, we get a deterministic TM that decides $\overline{L}\in P \subseteq NP \Rightarrow L \in coNP$. 

**Question:** Is matching problem in P? (Yes but it's shown in CS260...)

- Matching $\in NP$
    By a NTM: for each knight 
    1. Check that they are only matched to one task
    2. Check that the task they are matched to is on their list
    3. Check that the task they are matched to is not matched by any other knight
- Matching $\in coNP$ (by Hall's Theorem)

**Is P = NP?** (Does Arthur need Merlin?) We don't know.

**Def:** A problem $X$ is **NP-Hard** (actually hard for Arthur) if $X\in P \Rightarrow P = NP$.

**Def:** A problem $X$ is **NP-Complete** if both $X\in NP$ and $X$ is NP-Hard.

**Theorem (Hall's Theorem):**
Let $G$ be a bipartite graph with bipartition ($X, Y$) and $|X| = |Y|$. Then $G$ contains a perfect matching if and only if $|N_G(S)| \geq |S|$ for all $S \subseteq X$.
*Proof:*
($\Rightarrow$) By Pigeonhole principle
($\Leftarrow$) Suppose $|N_G(S)| \geq |S|$ for all $S\subseteq X$, but $G$ does not have a perfect matching. 

> Alternating path: every other edge is contained in $M^*$
Augmenting path: alternating path in which first and last edges are unmatched

Let $M^*$ be the maximum cardinality matching in $G$, and let $u \in X$ be unmathced in $M^*$.
Let $T = N_G(S)$. Lemma: $M^*$ matches $T$ perfectly with $S \setminus \{u\}$.
The alternating paths reach $Y$ along edges not in $M^*$ and reach $u$ along edges in $M^*$

...

>1. Initialize $M := \{\}$. // Empty matching.
>2. Assert: $M$ is a matching in $G$.
>3. If $M$ saturates all vertices of $X$, then return the X-perfect matching $M$
>4. Let $u$ be an unmatched vertex (a vertex in $X \setminus V(M)$).
>5. Using the Hall violator algorithm ($|N_G(S)| < |S|$), find either a Hall violator or an $M$-augmenting path.
>6. In the first case, return the Hall violator.
>7. In the second case, use the M-augmenting path to increase the size of M (by one edge), and go back to step 2.
>At each iteration, M grows by one edge.

$\Rightarrow$ **Theorem:**  $\overline{MATCHGING}\in coNP$

---

### NP Problems

$CLIQUE$ is in NP
The following is a verifier $V$ for $CLIQUE$:
$V =$ On input <<$G, k$>, $c$>:
1. Test whether $c$ is a subgraph with $k$ nodes in $G$
2. Test whether $G$ contains all edges connecting nodes in $c$
3. Both pass, accept; otherwise reject



### The Cook-Levin Theorem

A boolean formula is **satisfiable** if there is at least one "T" row in the truth table.
$$SAT = \{\phi | \phi \text{ is a satisfiable boolean formula}\}$$

**Theorem:** $SAT$ is *NP-Complete*: If $SAT\in P$, then $P=NP$.

Suppose $A\in NP$. Let N be a NTM that decides $A$ in $Cn^k$ time.
Convert N's computation to boolean formula that is satisfiable iff there is an accepting computation for N.
Represent the accepting computation as a **tableu** an $Cn^k\times Cn^k$ of all configurations of $A$ from start to acceptance.

Construct formula $\phi = \phi_{cell} \wedge \phi_{start} \wedge \phi_{move} \wedge \phi_{accept}$ to represent N's accepting computation
where variable $x_{i,j,s} = 1 \Leftrightarrow cell[i,j] = s$.

$$\phi_{cell} = \bigwedge_{1 \leq i,j \leq Cn^k}\bigg[\bigg(\bigvee_{s\in C}x_{i,j,s}\bigg)\wedge\bigg(\bigwedge_{s,t\in  C \\ s\neq t}(\overline{x_{i,j,s}}\vee\overline{x_{i,j,t}})\bigg)\bigg]$$
is true iff one variable is turned on per cell
$$\phi_{start} = x_{1,1,\$}\wedge x_{1,2,q_0}\wedge x_{1,3,w_1} \wedge ... \wedge x_{1, Cn^k-1,\#}\wedge x_{1, Cn^k, \$}$$
is true iff the first configuration is a start configuration
$$\phi_{accept} = \bigvee_{1\leq i,j\leq Cn^k}x_{i,j,q_{accept}}$$
is true iff somewhere $q_{accept}$ appears in one of the cells
Finally, $\phi_{move}$ guarantees each row of the tableau corresponds to a configuration that legally follows the preceding row according to N's transition function, by maintaining a valid $2\times 3$ "window"
$$\phi_{move} = \bigwedge_{1\leq i,j \leq Cn^k}\big(\text{the (i,j) window is valid}\big)$$

*Need to review...*

---

### The whole NP-Hard, NP-Complete...

- Is $P=NP$? We don't know
- Prove $\in P \Rightarrow$ easy for Arthur
- Prove $\in NP \Rightarrow$ easy for Merlin
- Prove $NP-Hard \Rightarrow$ hard for Arthur
- Prove $NP-Complete \Rightarrow$ easy for Merlin and hard for Arthur

![](pnp.jpg)