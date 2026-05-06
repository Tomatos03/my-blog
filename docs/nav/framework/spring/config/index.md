# Spring 配置文件

## 默认规则

Spring Boot 默认会在项目的 `classpath` 根目录下查找名为 `application.properties` 或 `application.yml` 的配置文件.

> [!NOTE]
>
> - `classpath` 的默认路径是 `src/main/resources/` 目录
> - 同名的情况下`properties` 结尾的配置文件优先级 > `yml` 结尾的配置文件

## 优先级

在 Spring 应用开发中，配置文件的优先级直接影响属性的覆盖与加载顺序.

配置文件优先级为: **命令行指定 > 系统变量 > 外部文件 > 内部文件**

### 命令行指定

通过添加程序参数的方式指定配置项，例如：

```bash
java -jar myapp.jar --server.port=9999 --spring.profiles.active=prod
```

> [!TIP]
> - 如果内部配置文件`application.yml`或`application.properties`有与命令行之中设置的key-value同名的key, 会直接覆盖其value. 
> - 如果没有同名key, 又需要在程序中使用key对应的value时, 可以使用占位符引用`${keyName}`先占位, 启动程序的时候在指定对应的程序参数

### 环境变量

在操作系统中设置环境变量，例如：

```bash
# Linux 系统下设置如下两个系统变量
export SERVER_PORT=8888
export SPRING_PROFILES_ACTIVE=dev

# application配置文件中直接使用占位符读取系统变量
spring.profiles.active=${SPRING_PROFILES_ACTIVE} # dev
```

### 外部文件

在启动命令中通过 `--spring.config.location` 指定外部配置文件，例如：

```bash
java -jar myapp.jar --spring.config.location=/etc/myapp/application-prod.yml
```

> [!TIP]
> 这种方式和命令行指定的方式都是在Java程序启动的时候使用命令, 区别是外部文件的方式使用的命令是指定一整个配置文件, 而命令行指定的方式仅仅设置了一个key-value

### 内部文件

项目 `src/main/resources/` 目录下的 `application.properties` 或 `application.yml` 文件

```properties
# src/main/resources/application.properties
server.port=8080
spring.profiles.active=local
```

##### 多模块

在多模块项目中，如果存在同名的配置文件，Spring Boot 会优先加载启动类所在模块的配置文件，其他模块中的同名配置文件不会被加载。

```yml
# 项目结构示例
myapp/
├── myapp-common/              # 公共模块
│   └── src/main/resources/
│       └── application.yml     # 同名配置文件（会被忽略）
├── myapp-web/                 # 主启动模块
│   └── src/main/resources/
│       └── application.yml     # 优先加载此文件
└── myapp-service/             # 服务模块
    └── src/main/resources/
        └── application.yml     # 同名配置文件（会被忽略）
```

> [!NOTE]
> 此规则同样适用于使用`include`导入的文件

> [!WARNING]
>
> 这意味着在多模块项目结构中，只有主启动模块（包含 `@SpringBootApplication` 或 `main` 方法的模块）的 `src/main/resources/` 目录下的配置文件会被优先读取。依赖模块中的同名配置文件会被忽略。
