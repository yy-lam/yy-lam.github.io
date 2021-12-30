---
title: 'Regular Languages'
date: '2021-02-04'
---

## Regular Languages

### Deterministic Finite Automata
**Def:**
$M = (Q, \Sigma, \delta, q_0, F)$ be a deterministic finite automata, and let $w = w_1w_2...w_n$ be a string where $w_i \in \Sigma$. $M$ **accepts** $w$ if a sequence of states $r_0, r_1, ..., r_n$ in Q exists with 3 conditions:
1. (starts in start state) $r_0 = q_0$
2. (state transition according to $\delta$) $\delta(r_i, w_i+1) = r_{i+1}$ for $i=0,...,n-1$
3. (input ends in accept state) $r_n \in F$

$M$ **recognizes language** $A$ if $A = \{w | M \text{ accepts } w\}$.

$$w\in L \text{ ends in } F \Leftrightarrow M \text{ accepts } w$$
$$L = \{w | w \text{ is accepted by } M \}\Leftrightarrow M \text{ recognizes } L$$

**Def**: A language is called *regular language* if some finite automaton recognizes it.

---

### Design Finite Automata
**3 Operations on Languages (Closed under regular operations)**

Let $A, B$ be languages,

- Union: $A \cup B = \{x | x\in A \text{ or } x\in B \}$
- Concatenation: $A \circ B = \{ xy | x \in A \text{ and } y\in B\}$
- Star: $A^* = \{ x_1x_2...x_k | k \geq 0 \text{ and each } x_i \in A \}$
	- Empty string $\varepsilon$ is always in a member of $A^*$
	
**Closed under Operations**
$A_1, A_2$ are regular $\Rightarrow A_1\cup A_2$ is regular
*Proof:*
Let $M_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$ recognizes $A_1$, $M_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$ recognizes $A_2$.
Construct $M = (Q, \Sigma, \delta, q_0, F)$ to recognize $A_1\cup A_2$.
- $Q = Q_1\times Q_2 = \{(r_1, r_2) | r_1 \in Q_1\wedge r_2\in Q_2\}$
- Union of two alphabets (true if two are different)
- $\delta((r_1, r_2), a) = (\delta_1(r_1, a), \delta(r_2, a))$
- $q_0 = (q_1, q_2)$
- $F = \{(r_1, r_2) | r_1\in F_1 \vee r_2\in F_2\} (aka. (F_1\times Q_2)\cup (F_2\times Q_1))$
---
$A_1, A_2$ are regular $\Rightarrow A_1\circ A_2$ is regular
*Proof needs Nonderminism* to break input into two pieces

### Nonderminism
**Def:**
$M = (Q, \Sigma, \delta, q_0, F)$ is a nondeterministic finite automata, where
1. $Q$ is finite set of states
2. $\Sigma$ is a finite alphabet
3. $\delta: Q\times (\Sigma\cup \varepsilon)\rightarrow \mathcal{P}(Q)$ is the transition function
4. $q_0\in Q$ is the start state
5. $F\subseteq Q$ is the end state

Differences bewteen DFA:
- For one single input, transition funciton of NFA can have zero, one or multiple output states
- $\varepsilon$ transition: transition without reading any input
- The machine splits into multiple copies of itself and follows all the possibilities in parallel. Finally, if any one of these copies of the machine is in an accept state at the end of the input, the NFA accepts the input string.

*Think about Nonderminism computation as a tree of all possibilities*

**Equivalence between NFAs and DFAs**
Two machines are equivalent if they recognize the same language.
Let $N = (Q, \Sigma, \delta, q_0, F)$ be the NFA recognizing the same language, construct the DFA counterpart $M = (Q', \Sigma, \delta', q_0', F')$ by construction:
*Proof:*
- $Q' = \mathcal{P}(Q)$
- For $R\in \mathcal{P}(Q)$ and $a\in\Sigma$, let $\delta'(R, a) = \{q\in Q | q\in \delta(r, a) \text{ for some } r\in R\}$, aka:
$$\delta'(R, a) = \cup_{r\in R}\delta(r, a)$$
- $q_0' = \{q_0\}$
- $F' = \{R\in \mathcal{P}(Q) | R \text{ contains an accept state}\}$

To take $\varepsilon$ transition into account,
**Definition:** $E(R) = \{q | q \text{ can be reached from $R$ by traveling along 0 or more } \varepsilon\}$.
Modify $\delta'$ by incorporating $E(R)$: 
$$\delta'(R, a) = \{q\in Q | q\in E(\delta,a)) \text{ for some }r\in R\}$$
And $q_0' = E(\{q_0\})$

**Corollary**
A language is regular if and only if some nondeterministic finite automaton recognizes it, for
1. NFA DFA equivalence
2. A language is regular if and only if it is recognized by a DFA

###Closed under Operations
$N_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$ recognizes $A_1$, and $N_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$ recognizes $A_2$.
**Closed under union**
Construct $N = (Q, \Sigma, \delta, q_0, F)$ to recognize $A_1\cup A_2$
1. $Q = \{q_0\} \cup A_1 \cup A_2$
2. special start state $q_0$ that has arrows to $q_1$ and $q_2$
3. $F = F_1\cup F_2$
4. 
$$
    \delta(q, a)= 
	\begin{cases}
    	\delta_1(q, a)& q\in Q_1\\
		\delta_2(q, a)& q\in Q_2\\
		\{q_1, q_2\}& q=q_0 \text{ and } a=\varepsilon\\
		\emptyset& q=q_0 \text{ and } a\neq\varepsilon
	\end{cases}
$$

*Note: Think about the new NFA as the root with two children $N_1$ and $N_2$*

**Closed under concatenation**
Construct $N = (Q, \Sigma, \delta, q_0, F)$ to recognize $A_1\circ A_2$
1. $Q = A_1 \cup A_2$
2. $q = q_1$
3. $F = F_2$
4. 
$$
    \delta(q, a)= 
	\begin{cases}
    	\delta_1(q, a)& q\in Q_1 \text{ and } q\not\in F_1\\
		\delta_1(q, a)& q\in F \text{ and } a\neq\varepsilon\\
		\delta_1(q, a)\cup\{q_2\}& q\in F \text{ and } a=\varepsilon\\
		\delta_2(q, a)& q\in F_2
	\end{cases}
$$
*Note: Think about concatenation of two linked lists by connecting final state(s) of $N_1$ and $q_2$ by $\varepsilon$ transition*

**Closed under star operation**
$A_1$ is recognized by NFA $N_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$, construct $N = (Q, \Sigma, \delta, q_0, F)$ to recognize $A_1^*$
1. $Q = \{q_0\} \cup Q_1$
2. $q_0$ is the new start state that $\delta(q_0, \varepsilon) = q_1$ which is the old start state
3. $F = \{q_0\}\cup F_1$ accepts both the new and old start state
4. 
$$
    \delta(q, a)= 
	\begin{cases}
    	\delta_1(q, a)& q\in Q_1 \text{ and } q\not\in F_1\\
		\delta_1(q, a)& q\in F \text{ and } a\neq\varepsilon\\
		\delta_1(q, a)\cup\{q_1\}& q\in F \text{ and } a=\varepsilon\\
		\{q_1\}& q = q_0 \text{ and } a = \varepsilon\\
		\emptyset& q = q_0 \text{ and } a\neq \varepsilon
	\end{cases}
$$

--- 

### Regular Expression

$R$ is a *regular expression* if $R$ is:
1. $a \in \Sigma \rightarrow R = \{a\}$
2. empty string $\varepsilon \rightarrow R = \{\varepsilon\}$
3. empty language $\emptyset$: doesn't contain any string
4. $R_1 \cup R_2$, where $R_1, R_2$ are regular expression
5. $R_1 \circ R_2$, where $R_1, R_2$ are regular expression
6. $R_1^*$, where $R_1$ is regular expression

*Note:* 
- $R\circ \emptyset = \emptyset$. Concatenating the empty set to any set yields the empty set
- $\emptyset^* = \{\varepsilon\}$. Empty string is always in a member of $R^*$. If the language is empty, the star operation can put together 0 strings, giving only the empty string.
- $R\cup \emptyset = R$
- $R\circ \varepsilon = R$

#### Equivalence with Finite Automata

**Theorem:** A language is regular if and only if some regular expression describes it.
**Lemma** $(\Rightarrow)$ If a language is described by a regular expression, then it is regular.
*Proof:* $R$ describes language $A$. Let's convert $R$ into an NFA $N$. Consider six cases in regular expression:
1. $a \in \Sigma \rightarrow L(R) = \{a\}$
	$$N = (\{q_1, q_2\}, \Sigma, \delta, q_1, \{q_2\})$$
	where $\delta(q_1, a) = \{q_2\}$ and $\delta(r, b) = \emptyset$ for $r\neq q_1, b\neq a$
2. empty string $\varepsilon \rightarrow L(R) = \{\varepsilon\}$
	$$N = (\{q_1\}, \Sigma, \delta, q_1, \{q_1\})$$
	where $\delta(r, b) = q_1$ for any $r, b$
3. empty language $\emptyset$: doesn't contain any string
	$$N = (\{q\}, \Sigma, \delta, q, \emptyset)$$
	where $\delta(r, b) = \emptyset$ for any $r, b$
	(Cases below are closed under operations)

4. $R_1 \cup R_2$, where $R_1, R_2$ are regular expression
5. $R_1 \circ R_2$, where $R_1, R_2$ are regular expression
6. $R_1^*$, where $R_1$ is regular expression


**Lemma** $(\Leftarrow)$ If a language is regular (a NFA that recognizes it), then it is described by a regular expression.
*Proof:* If a language $A$ is regular, it is recognized by a DFA. Convert the DFA into equivalent regular expression.
A new type of finite automata is needed: *generalized nondeterministic finite automata* (GNFA): NFA where transition arrows may have regular expression as labels.

*Idea:* Convert the GNFA with $k$ states $(k > 2)$ to an equivalent GNFA with $k-1$ states, call the state removed $q_{rip}$.
In the old machine, if
1. $q_i \xrightarrow{R_1} q_{rip}$
2. $q_{rip} \xrightarrow{R_2} q_{rip}$
3. $q_{rip} \xrightarrow{R_3} q_j$
4. $q_i \xrightarrow{R_4} q_j$

Then in the new machine,
$$q_i \xrightarrow{R_1R_2^*R_3\cup R_4} q_j$$
This machine recognizes the original language.

Formally, $GNFA = (Q, \Sigma, \delta, q_s, q_a)$ where
1. $Q$ is finite states
2. $\Sigma$ is the input alphabet
3. 
$$\delta: (Q-\{q_s\}) \times (Q-\{q_e\})\rightarrow \mathcal{R}$$
$\mathcal{R}$ is the collection of all regular expressions over $\Sigma$. If $\delta(q_i, q_j) = R$, the arrow from $q_i$ to $q_j$ has the regular expression R as its label

4. $q_s$ is the start state
5. $q_a$ is the accept state

$GNFA$ accepts a string $w = w_1...w_k$ if each $w_i\in \Sigma^*$ and a sequence of state $q_0, ..., q_k$ exists such that
1. $q_0 = q_s$
2. $q_k = q_a$
3. for each $i$, $w_i\in L(R_i)$, where $R_i=\delta(q_{i-1}, q_i)$

*Proof:*
...

### Nonregular Languages

#### Pumping lemma
If $A$ is a regular language, then there is a number $p$ (pumping length) where if $s$ is any string in $A$ of length at least $p$, then $s$ may be divided into three pieces, $s = xyz$ where
1. for each $i\geq 0$, $xy^iz \in A$
2. $|y| > 0$
3. $|xy| \leq p$

*Idea:* take a string $s$ of at least $p$. If length of $s$ is $n$, then the sequence of states $q_1, q_2, q_20, q_{12}, ..., q_{13}$ has length $n+1 > q$. By pigeonhole principle, there must be a state that is repeated.

#### Pumping lemma practice

$$V = \{x\in \{a, b\}^* | x \text{ has twice as many a's as b's}\}$$
Let $x=a^{2k}b^k = xyz$, y comprises of a only. $xyyz = a^{2k+j}b^k\not\in V$

$$D = \{1^{n^2} | n \geq 0\}$$
Let $s = 1^{p^2} = xyz$. Since $|y| \leq p$, and $|xyz| = p^2$, 
$$ p^2 < |xyyz| \leq p^2+p < (p+1)^2$$ 
Contradiction: no whole number between $p^2$ and $(p+1)^2$

**Pumping down:**
$$E = \{0^i1^j | i>j\}$$
Let $s = 0^{p+1}1^p = xyz$, y comprises of 0 only. $xy^0z = xz = 0^{p+1-k}1^p$. $|y| > 0 \overset{k > 1}{\Rightarrow}$ contradiction.