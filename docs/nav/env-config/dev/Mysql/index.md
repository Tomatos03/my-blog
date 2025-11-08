# 索引

索引（index）是MySQL为了提高数据检索效率而创建的数据结构。

## 索引查看

索引总是针对某个表创建的，可以通过以下命令查看表对应的索引信息:

```sql
SHOW INDEX FROM table_name;
```

## 索引失效

在执行 SQL 查询时，MySQL 优化器会根据查询条件选择合适的索引来加速数据检索。在一些特殊的场景下，索引可能会失效，导致查询性能下降。以下是一些常见的索引失效情况：

假设表 `users` 有组合索引：`INDEX idx_name_age_email (name, age, email)`，在下面的情况下索引会失效：

### 不满足最左前缀原则

最左前缀原则（Leftmost Prefix Principle）是指在使用**联合索引**时，MySQL 查询优化器会从索引的最左列开始匹配。只有当左边的列被用于条件匹配时，右边的列索引才能被使用。换句话说，组合索引必须按照**定义时的列顺序**从左到右进行匹配，不能跳过左边的列。

```sql
-- ✓ 使用索引的所有列
SELECT * FROM users WHERE name = '张三' AND age = 25 AND email = 'zhangsan@example.com';

-- ✓ 使用索引的前两列
SELECT * FROM users WHERE name = '张三' AND age = 25;

-- ✓ 使用索引的第一列
SELECT * FROM users WHERE name = '张三';

-- 不满足最左前缀原则的查询，索引完全失效或部分失效
-- ✗ 跳过 age 直接查询 email，age 及之后的列无法使用索引
SELECT * FROM users WHERE name = '张三' AND email = 'zhangsan@example.com';
-- 实际只用到 name 列的索引，email 列索引失效

-- ✗ 不包含第一列，索引完全失效
SELECT * FROM users WHERE age = 25 AND email = 'zhangsan@example.com';
```

> where书写顺序不会影响索引使用，索引匹配顺序依赖于索引定义顺序。

### 范围查询

**联合索引中**的字段在进行范围查询时（如使用 `>`, `<`, `BETWEEN`, `LIKE` 等操作符），MySQL 优化器只能使用范围查询列之前的索引列（包含当前列），之后的索引列将无法使用。

> 单列索引的范围查询不会导致索引失效。

```sql
-- ✓ 范围查询在最后一列，前面列正常使用
SELECT * FROM users WHERE name = '张三' AND age > 20 AND age < 30;

-- ✗ 范围查询在中间列，之后的列索引失效
SELECT * FROM users WHERE name = '张三' AND age > 20 AND email = 'zhangsan@example.com';
-- 实际只用到 name 和 age 列，email 列因范围查询而失效

-- ✓ 使用>=或<=范围查询，解决索引部分失效问题
SELECT * FROM users WHERE name = '张三' AND age >= 20 AND age <= 30 AND email = 'zhang@example.com'
```

### 索引列运算

在查询条件中对索引列进行运算（如加减乘除、函数调用等）会导致索引失效，因为 MySQL 无法直接利用索引进行匹配。

```sql
-- 下面两个例子仅有 name 列索引被使用，age 和 email 列索引失效 
-- ✗ 索引列 age 进行了加法运算，索引失效
SELECT * FROM users WHERE name = '张三' AND (age + 1) = 26;

-- ✗ 索引列 email 进行了函数调用，索引失效
SELECT * FROM users WHERE name = '张三' AND LOWER(email) = 'zhang';
```

### 隐式类型转换

当查询条件中的数据类型与索引列的数据类型不匹配时，MySQL 可能会进行隐式类型转换，导致索引失效。

> 并不是所有的隐式类型转换都会导致索引失效，例如 INT 和 BIGINT 之间的转换不会导致索引失效。

- 字符串列传数字

```sql
-- 假设 age 列是 varchar 类型
-- ✗ 隐式类型转换导致索引失效
SELECT * FROM users WHERE name = '张三' AND age = 25; -- age 列是 varchar, 25是 INT
```

### 模糊查询

当条件使用通配符 `%` 开头时，索引将无法使用，因为 MySQL 需要扫描整个索引来查找匹配项。

```sql
-- ✗ 通配符 _ 在开头，索引失效
SELECT * FROM users WHERE name LIKE '_张三';
-- ✗ 通配符 % 在开头，索引失效
SELECT * FROM users WHERE name LIKE '%张三';
-- ✓ 通配符 % 在结尾，索引可用
SELECT * FROM users WHERE name LIKE '张三%';
```

### 或运算

在使用 `OR` 连接多个条件时，如果其中一个条件无法使用索引，整个查询索引可能会失效。

```sql
-- 每一个Or条件都必须能使用索引，否则整个查询索引失效
-- ✗ 第一个条件无法使用索引，导致整个查询索引失效
SELECT * FROM users WHERE age > 20 OR email = 'test@example'
-- ✓ 两个条件都能使用索引
SELECT * FROM users WHERE name = '张三' OR email = 'test@example'
```

### 负优化

建立索引就是为了优化检索效率，在某些情况下，使用索引可能比全表扫描更慢，MySQL 优化器会选择不使用索引，这种情况称为负优化。

```sql
-- 假设表 users 有 100 万条记录，id 列有索引
-- ✗ 优化器选择全表扫描，忽略索引
SELECT * FROM users WHERE id >= 1;
```

## 索引分类

### 按功能分类

| 索引类型 | 说明 | 使用场景 |
|---|---|---|
| 主键索引（Primary Key） | 唯一标识表中每条记录，不允许重复或 NULL | 表的唯一标识符 |
| 唯一索引（Unique Index） | 保证索引列的值唯一，允许一个 NULL | 用户邮箱、用户名等唯一字段 |
| 普通索引（Normal Index） | 最基本的索引，仅用于加快查询速度 | 频繁查询的字段 |
| 全文索引（Full-text Index） | 用于全文搜索，支持模糊匹配和关键词搜索 | 文章内容、描述字段的搜索 |

### 按列数分类

| 索引类型 | 说明 | 使用场景 |
|---|---|---|
| 单列索引（Single Column Index） | 基于表中单个列创建的索引 | 单一字段的查询条件 |
| 组合索引（Composite Index/Compound Index） | 基于表中多个列创建的索引 | 多字段联合查询条件 |

### 按数据结构分类

| 索引类型 | 说明 | 优点 | 缺点 |
|---|---|---|---|
| B-Tree 索引 | MySQL 默认索引类型，适用于大多数查询 | 平衡、查询稳定、范围查询效率高 | 不适合模糊查询前缀匹配 |
| Hash 索引 | 使用哈希表实现，仅适用于等值查询 | 等值查询快速、内存占用少 | 不支持范围查询、易产生哈希冲突 |
| Full-Text 索引 | 专用于全文搜索 | 支持模糊和关键词搜索 | 占用空间大、维护成本高 |

### 按物理存储分类

| 索引类型 | 说明 | 特点 |
|---|---|---|
| 聚集索引（Clustered Index） | 索引的叶子节点存储数据页，决定表的物理排序方式 | 一个表只能有一个聚集索引，通常是主键 |
| 非聚集索引（Non-Clustered Index） | 索引的叶子节点存储索引键值和行定位符，通过指针指向数据 | 一个表可以有多个非聚集索引 |

## 索引使用分析

MySQL 提供 `EXPLAIN` 命令来分析 SQL 语句的执行计划，帮助判断查询是否使用了索引。

```sql
# 语法
EXPLAIN + 对应的 SQL 语句

# 示例
EXPLAIN SELECT * FROM table_name WHERE column_name = 'value';
```

**EXPLAIN 输出字段说明：**

| 字段 | 说明 |
|---|---|
| id | SELECT 查询的序列号 |
| select_type | SELECT 的类型（SIMPLE、PRIMARY、UNION 等） |
| table | 查询所涉及的表名 |
| type | 连接类型（system、const、eq_ref、ref、range、index、ALL 等） |
| possible_keys | 能够使用的索引（某一列可能既创建了单列索引，又属于某个联合索引） |
| key | 实际使用的索引 |
| key_len | 使用的索引长度 |
| ref | 与索引比较的列 |
| rows | 估计扫描的行数 |
| Extra | 额外信息（Using index、Using where 等） |

#### ref 字段参考值表

| ref 值 | 说明 |
|---|---|
| const | 用常量值做等值匹配（如 `WHERE id = 1`），通常用于主键或唯一索引查找。 |
| func | 用函数结果做索引查找（如 `WHERE id = FUNC(x)`）。 |
| field | 用某个字段做索引查找（如表关联时，`WHERE a.id = b.a_id`）。 |
| NULL | 没有用到索引。 |

> `explain` 输出 `ref` 列有多少个值，就表示有多少个索引列被使用，SQL整体为范围查询时，值为NULL，既然利用了索引。

#### id 字段参考值表

| id 值 | 说明 |
|---|---|
| 1, 2, 3... | SELECT 查询的序列号，数字越大执行优先级越高，如id相同执行顺序从上往下|
| NULL | 由 UNION 合并后的结果行 |

#### select_type 字段参考值表

| select_type 值 | 说明 |
|---|---|
| SIMPLE | 简单的 SELECT 查询，不含子查询或 UNION |
| PRIMARY | 主查询，包含子查询时最外层的查询 |
| SUBQUERY | 子查询中的 SELECT 语句 |
| DERIVED | FROM 子句中的子查询（派生表） |
| UNION | UNION 中第二个或后续的 SELECT 语句 |
| UNION RESULT | UNION 的结果集 |
| DEPENDENT UNION | UNION 中的第二个查询依赖于外部查询 |
| DEPENDENT SUBQUERY | 子查询依赖于外部查询的结果 |

#### type 字段参考值表

| type | 说明 | 性能 |
|---|---|---|
| NULL | 不需要访问表或索引就能得出结果 | 最优 |
| system | 表只有一行记录（系统表），这是 const 的特殊情况 | 最优 |
| const | 通过索引一次就能找到，如主键或唯一索引 | 最优 |
| eq_ref | 唯一性索引扫描，对于每个索引键，表中只有一条记录匹配 | 优 |
| ref | 非唯一性索引扫描，返回匹配某个单独值的所有行 | 良好 |
| range | 使用索引进行范围查询（如 BETWEEN、>、< 等） | 中等 |
| index | 遍历索引树，但不回表查询完整数据 | 一般 |
| ALL | 全表扫描，不使用任何索引 | 最差 |

#### Extra 字段参考值表

| Extra 值 | 说明 |
|---|---|
| Using index | 使用索引覆盖，无需回表查询 |
| Using where | WHERE 条件过滤 |
| Using index condition | 索引下推，先在索引中过滤部分数据 |
| Using filesort | 需要进行文件排序（性能较差） |
| Using temporary | 需要使用临时表（性能较差） |
| Impossible WHERE | WHERE 条件恒为假，查询无结果 |
| Select tables optimized away | 查询已被优化，无需访问表 |

## 覆盖索引

一个查询所需要的所有列都能从索引中直接获取，无需访问数据表的实际数据行（即无需“回表”），此时该索引称为**覆盖索引**。

假设表 users 有组合索引：INDEX idx_name_age_email (name, age, email)

```sql
-- ✓ 覆盖索引查询，只查询索引包含的列
SELECT name, age, email FROM users WHERE name = '张三' AND age = 25;
-- 执行计划的 Extra 字段显示 "Using index"，表示覆盖索引

-- ✗ 需要回表查询，不是覆盖索引
SELECT name, age, email, phone FROM users WHERE name = '张三' AND age = 25;
-- phone 列不在索引中，需要回表查询完整数据
```

> 利用覆盖索引可以避免回表查询，显著提升查询性能，特别是对于大表的查询。

---