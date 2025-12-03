# TypeScript 环境配置

TypeScript 是一种由微软开发的强类型 JavaScript 超集，广泛应用于前端和 Node.js 项目。

要使用 TypeScript，可以按照以下步骤进行环境配置：

1. **安装 Node.js和 npm**

一般情况下，安装 Node.js 后会带有npm，不需要额外手动安装npm

2. **使用如下命令，安装 TypeScript**

```bash
# 全局安装
npm install -g typescript

# 或者在项目中本地安装
npm install --save-dev typescript
# 简化指令
npm install -D typescript
```
3. **使用如下命令，在需要使用ts的项目中初始化一个默认的 `tsconfig.json` 配置文件**

```bash
tsc --init
```

> [!TIP]
> 这个文件是必须的，它告诉 TypeScript 编译器如何编译项目。

4. **按顺序执行如下命令， 运行ts文件**

```bash
# 将ts文件编译成js文件
npx tsc 文件名.ts

# 运行生成的js文件
node 文件名.js
```

或使用`ts-node`

```bash
# 第一次使用需要先安装ts-ndoe
npm install -D ts-node

npx ts-node 文件名.ts
```

> [!NOTE]
> 运行ts文件实际上就是运行js文件. ts文件并不能够单独运行, 需要先被编译成js文件，再运行js文件
