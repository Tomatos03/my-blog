# 不等式

## `x * y >= k`

常见条件：

$$
x \cdot y \ge k
$$

当 `x > 0` 时，可等价改写为：

$$
y \ge \left\lceil \frac{k}{x} \right\rceil
$$

这样可以把“乘法比较”转换成“阈值比较”，便于后续配合有序数组做二分。

> [!WARNING]
> 如果 `x < 0`，不等号方向会反转；如果 `x = 0`，要单独讨论。  
> 下文默认 `x > 0`（也是多数题目的约束）。

对于 `y >= k / x`， 如果 k 不能够整除 x 会出现浮点数，推荐使用整数等价式：

$$
\left\lceil \frac{a}{b} \right\rceil
=
\left\lfloor \frac{a + b - 1}{b} \right\rfloor
=
\left\lfloor \frac{a - 1}{b} \right\rfloor + 1
\quad (a,b \in \mathbb{Z}^+, b > 0)
$$

代入 `a = k, b = x`，可得到三种常用阈值形式：

$$
y \ge \left\lceil \frac{k}{x} \right\rceil
$$

或

$$
y > \left\lfloor \frac{k-1}{x} \right\rfloor
$$

或

$$
y \ge \left\lfloor \frac{k-1}{x} \right\rfloor  + 1
$$

第二种写法常用于“找第一个大于某值”的二分场景
