# Java Jar 包

**JAR（Java ARchive）包**是一种用于打包 Java 类、资源文件（如图片、配置文件等）和元数据（如清单文件）的压缩文件格式。它本质上是一个 ZIP 文件，但专门用于 Java 项目。

## 通过 Jar 生成 Jar 包

利用 JDK 自带的 `jar` 命令行工具可以将编译后的 `.class` 文件打包成 `.jar` 文件。

在项目根目录执行:

```bash
# 如果项目还没有编译, 可以使用下面的命令编译:
javac -d out $(find . -name "*.java")

# 将编译后的 所有.class 文件打包成 Jar 文件
jar cvf jar_name.jar -C out .
```
参数详解:

- `c`：创建新的 Jar 包（create）
- `v`：显示详细输出（verbose）
- `jar_name.jar`：生成的 Jar 文件名（如 myapp.jar）
- `-C out .`：切换到指定目录（此处为 out 目录），并打包该目录下所有内容（点号表示目录下所有内容）

> [!NOTE]
> 上述命令默认生成的jar包是普通的jar包, 如果需要生成可执行的jar包, 需要额外添加 `e` 参数自动创建清单文件, 并指定主类:
> `jar cvef MainClassName jar_name.jar -C out .`

使用 `jar` 或 `unzip` 命令查看 Jar 包中的内容：

```bash
jar tf jar_name.jar
# 或
unzip -l jar_name.jar
```


## 通过 Maven 生成 Jar 包

在项目根目录（有 `pom.xml` 的地方）执行:

```bash
# maven项目默认打包格式是 jar
# 清理项目旧的输出, 重新编译打包成 Jar 文件:
mvn clean package
```
> [!NOTE]
> 这个命令生成的jar包是普通的jar包, 如果需要生成可执行的jar包, 可以使用Maven的 `maven-assembly-plugin` 插件来创建包含所有依赖项的可执行jar包。

## 生成可运行Jar

在使用 **Spring Boot** 项目时,可以通过 `spring-boot-maven-plugin` 插件来生成可执行的 Jar 包。该插件会将项目所有依赖项打包进一个单一的 Jar 文件中。

在 `pom.xml` 中添加插件配置:

```xml
<plugins>
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <!-- <version>如果使用spring-boot-parent可以省略版本号 -->
    </plugin>
</plugins>
```

打包命令:

```bash
# 打包成可执行Jar
# 默认执行测试代码. 如果不想执行测试, 可以添加 -DskipTests 参数
mvn clean package

# 跳过测试打包
mvn clean package -DskipTests
```

> [!NOTE]
> mvn会使用当前工作目录中的 `pom.xml` 作为项目描述文件, 请确保在正确的目录下执行命令, 或显示指定`pom.xml`路径

打包完成后,在 `target` 目录下会生成一个 `xxx.jar` 文件,运行方式如下:

```bash
java -jar target/your-app.jar
```
