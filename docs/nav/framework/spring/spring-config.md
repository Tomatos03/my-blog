# Spring 配置文件

## 默认规则

Spring Boot 默认会在项目的 `classpath` 根目录下查找名为 `application.properties` 或 `application.yml` 的配置文件.

> [!NOTE]
>
> - `classpath` 的默认路径是 `src/main/resources/` 目录
> - 同名的情况下`properties` 结尾的配置文件优先级 > `yml` 结尾的配置文件
> - 当存在多个配置文件的时候, 如果配置文件之间的属性没有冲突则共同生效, 如果存在冲突, 优先级高覆盖优先级低的配置项

## 优先级

在 Spring 应用开发中，配置文件的优先级直接影响属性的覆盖与加载顺序.

配置文件加载优先级为: **命令行指定 > 系统变量 > 外部文件 > 内部文件**

- 命令行指定:

```bash
java -jar myapp.jar --server.port=9999 --spring.profiles.active=prod
```

> [!TIP]
> 如果内部配置文件`application.yml`或`application.properties`有与命令行之中设置的key-value同名的key, 会直接覆盖其value. 如果没有同名key需要使用占位符引用`${keyName}`

- 系统变量（环境变量）:

在操作系统中设置环境变量，例如：

```bash
# Linux 系统下设置如下两个系统变量
export SERVER_PORT=8888
export SPRING_PROFILES_ACTIVE=dev

# application配置文件中直接使用占位符读取系统变量
spring.profiles.active=${SPRING_PROFILES_ACTIVE} # dev
```

- 外部文件:

在启动命令中通过 `--spring.config.location` 指定外部配置文件，例如：

```bash
java -jar myapp.jar --spring.config.location=/etc/myapp/application-prod.yml
```

> [!TIP]
> 这种方式和命令行指定的方式都是在Java程序启动的时候使用命令, 区别是外部文件的方式使用的命令是指定一整个配置文件, 而命令行指定的方式仅仅设置了一个key-value

- 内部文件:

项目 `src/main/resources/` 目录下的 `application.properties` 或 `application.yml` 文件

```properties
# src/main/resources/application.properties
server.port=8080
spring.profiles.active=local
```
