# Docker 容器

## 基础操作

Docker 提供了一系列命令用于对容器进行生命周期管理，包括创建、启动、暂停、恢复、重启、停止、杀死和删除等操作。

| 操作       | 命令         | 说明                                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| 创建       | `run`        | 基于镜像新建并启动容器，若本地无镜像会自动拉取               |
| 启动       | `start`      | 启动已停止的容器                                             |
| 暂停       | `pause`      | 挂起容器内所有进程，状态变为 `paused`                        |
| 恢复       | `unpause`    | 恢复已暂停的容器，进程继续运行，状态变为 `running`           |
| 重启       | `restart`    | 停止并重新启动容器，适用于已存在的容器                       |
| 停止       | `stop`       | 优雅停止容器，发送 SIGTERM 信号，状态变为 `exited`           |
| 杀死       | `kill`       | 立即终止容器进程，发送 SIGKILL，可能导致数据丢失             |
| 删除       | `rm`         | 删除已停止的容器，若需强制删除运行中容器可加 `-f` 参数       |

> [!TIP]
> - `run` 用于新建并启动容器，`start` 仅用于启动已存在但停止的容器。
> - `pause`/`unpause` 用于临时挂起/恢复容器进程。
> - `stop` 优雅停止，`kill` 强制终止，`rm` 删除容器（需先停止）。
> - 删除容器不会影响镜像和数据卷，但容器内未持久化数据会丢失，请提前备份。

> [!WARNING]
> 使用 `kill` 或 `rm -f` 可能导致数据丢失或应用状态不一致，生产环境请谨慎操作。

使用语法以及示例:

**创建并启动容器**

```bash
docker run [选项] [镜像名称]

# 创建并启动一个 nginx 容器
docker run nginx

# 以交互模式启动 Ubuntu 容器
docker run -it ubuntu
```

**启动已停止的容器**

```bash
docker start [容器名称 | 容器ID]

# 启动名为 my-nginx 的容器
docker start my-nginx
```

**暂停容器**

```bash
docker pause [容器名称 | 容器ID]...

# 暂停多个容器
docker pause my-nginx my-ubuntu
```

**恢复已暂停的容器**

```bash
docker unpause [容器名称 | 容器ID]...

# 恢复多个容器
docker unpause my-nginx my-ubuntu
```

**重启容器**

```bash
docker restart [容器名称 | 容器ID]...

# 重启所有容器
docker restart $(docker ps -aq)
```

**停止容器**

```bash
docker stop [容器名称 | 容器ID]...

# 停止所有运行中的容器
docker stop $(docker ps -q)
```

**杀死容器**

```bash
docker kill [容器名称 | 容器ID]...

# 杀死名为 my-nginx 的容器
docker kill my-nginx
```

**删除容器**

```bash
docker rm [选项] [容器名称 | 容器ID]...

# 删除所有已停止的容器
docker rm $(docker ps -aq -f status=exited)

# 强制删除正在运行的容器
docker rm -f my-nginx
```

**批量删除所有已停止的容器**

```bash
docker container prune
```

## 环境变量

Docker 允许在创建容器时设置环境变量，这对于配置应用程序行为非常有用：

```bash
# 使用 -e 参数设置单个环境变量
docker run -e KEY=VALUE [镜像名称]

# 示例：设置环境变量 MYSQL_ROOT_PASSWORD
docker run -e MYSQL_ROOT_PASSWORD=secret mysql

# 设置多个环境变量
docker run -e KEY1=VALUE1 -e KEY2=VALUE2 [镜像名称]

# 示例：设置多个环境变量
docker run -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=mydb mysql

# 从文件加载环境变量
docker run --env-file=[文件路径] [镜像名称]

# 示例：从 .env 文件加载环境变量
docker run --env-file=.env postgres
```

从文件加载环境变量时, 文件格式示例:

```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret
POSTGRES_DB=myapp
```

## 重启策略

Docker 支持多种重启策略，用于控制容器在退出时是否自动重启。

- 基本语法

```bash
# 在创建容器时设置重启策略
docker run --restart=[策略] [镜像名称]

# 修改已存在容器的重启策略
docker update --restart=[策略] [容器ID或名称]
```
> [!NOTE]
> 默认的重启策略为 `no`，即容器退出后不会自动重启。

> [!TIP]
> Docker 提供的重启策略会在以下情况下生效：
>
> 1. 容器异常退出（如进程崩溃）。
> 2. Docker 服务重启。
> 3. 主机重启（Docker 服务随主机启动）。

重启策略参考表:

| 策略                       | 作用                                                   |
| -------------------------- | ------------------------------------------------------ |
| `no`                       | 默认策略，容器退出时不自动重启                         |
| `on-failure[:max-retries]` | 仅当容器以非零状态码退出时重启，可选择设置最大重试次数 |
| `always`                   | 始终重启容器，无论退出状态如何                         |
| `unless-stopped`           | 始终重启容器，除非容器被明确停止或 Docker 本身停止     |

- 参数使用示例

```bash
# 容器退出时不自动重启（默认行为）
docker run --restart=no nginx

# 容器非正常退出时重启，最多尝试 5 次
docker run --restart=on-failure:5 nginx

# 容器退出时始终自动重启
docker run --restart=always nginx

# 容器退出时始终自动重启，除非被明确停止
docker run --restart=unless-stopped nginx

# 修改已存在容器的重启策略为 always
docker update --restart=always my-nginx
```

> [!TIP]
> 在生产环境中，建议使用 `unless-stopped` 或 `always` 策略确保关键服务持续运行。

## 容器列表

Docker 提供了 `docker ps` 命令，用于查看已经创建的容器：

```bash
# 查看运行中的容器
docker ps
```

`docker ps`常用参数表:

| 参数                | 作用说明                                         |
|---------------------|--------------------------------------------------|
| `-a, --all`         | 显示所有容器（包括已停止的容器）                 |
| `-q, --quiet`       | 只显示容器ID                                     |
| `-l, --latest`      | 只显示最近创建的容器                             |
| `-n <数目>`         | 显示最近 n 个创建的容器                          |
| `--no-trunc`        | 不截断输出，显示完整信息                         |
| `--format`          | 使用 Go 模板格式化输出                           |
| `--filter, -f`      | 根据条件过滤输出（如状态、名称等）               |
| `-s, --size`        | 显示容器文件系统的大小                           |

- 参数使用示例

```bash
# 显示所有容器（包括已停止的容器）
docker ps -a

# 只显示容器ID
docker ps -q

# 只显示最近创建的容器
docker ps -l

# 显示最近 3 个创建的容器
docker ps -n 3

# 不截断输出，显示完整信息
docker ps --no-trunc

# 使用 Go 模板格式化输出（例如只显示容器名称和状态）
docker ps --format "table {{.Names}}\t{{.Status}}"

# 根据条件过滤输出（如只显示运行中的容器）
docker ps --filter "status=running"
# 或者
docker ps -f "name=my-nginx"

# 显示容器文件系统的大小
docker ps -s
```

Docker 容器运行状态参考表:

| 状态         | 描述                                           |
| ------------ | ---------------------------------------------- |
| `created`    | 容器已创建，但尚未启动。                       |
| `restarting` | 容器正在重启中。                               |
| `running`    | 容器正在运行中。                               |
| `paused`     | 容器已暂停，所有进程被挂起。                   |
| `exited`     | 容器已停止，退出状态码可用于诊断问题。         |
| `dead`       | 容器处于非正常状态，可能由于错误导致无法恢复。 |

## 容器日志

Docker 提供了 `docker logs` 命令，用于查看容器的日志输出：

```bash
# 单次使用，执行完成之后退出
# 查看容器日志，将 [容器ID或名称] 替换为目标容器
docker logs [容器ID或名称]

# 实时查看容器日志
docker logs -f [容器ID或名称]

# 查看最近输出的n条日志
# 限制显示的日志行数，将 [行数] 替换为具体的行数
docker logs --tail [行数] [容器ID或名称]
# 或者使用
docker logs -n [行数] [容器ID或名称]

# 示例：查看名为 my-nginx 的容器的最近 100 行日志
docker logs --tail 100 my-nginx

# 查看指定时间范围的日志
docker logs --since [时间] [容器ID或名称]
docker logs --until [时间] [容器ID或名称]

# 示例：查看过去 10 分钟内的日志
docker logs --since 10m my-nginx
```

> [!NOTE]
> 日志内容取决于容器内运行的应用程序输出。

## 文件拷贝

在实际使用 Docker 时，经常需要在主机和容器之间传递文件或目录。Docker 提供了 `docker cp` 命令来实现这一功能，无论容器是否正在运行都可使用。

- **基本用法**

  - 主机->容器

  ```bash
  # 语法
  docker cp [主机路径] [容器ID或名称]:[容器内路径]
  # 将主机的 /data/file.txt 拷贝到容器 my-container 的 /app 目录下
  docker cp /data/file.txt my-container:/app
  ```

  - 容器->主机

  ```bash
  # 语法
  docker cp [容器ID或名称]:[容器内路径] [主机路径]
  
  # 将容器 my-container 的 /app/file.txt 拷贝到主机的 /data 目录
  docker cp my-container:/app/file.txt /data
  ```

> [!TIP]
> - 支持拷贝单个文件或整个目录，目录拷贝时会递归包含所有内容。
> - 目标路径必须存在且有相应的读写权限，否则操作会失败。
> - 可以跨平台（如 Windows 主机与 Linux 容器）进行文件拷贝，但注意文件权限和换行符等兼容性问题。
> - `docker cp` 不会自动覆盖已存在的同名文件，若目标路径下有同名文件会被直接替换。

> [!NOTE]
> `docker cp` 命令无需容器处于运行状态，停止的容器同样可以进行文件拷贝操作。

## 容器内命令执行

Docker 提供了 `docker exec` 命令，用于在运行中的容器内执行命令, 而不进入容器

```bash
# 在容器内执行命令，将 [容器ID或名称] 替换为目标容器，将 [命令] 替换为要执行的命令
docker exec [容器ID或名称] [命令]

# 示例：在名为 my-nginx 的容器内列出 / 目录的内容
docker exec my-nginx ls /

# 以交互模式执行命令
docker exec -it [容器ID或名称] [命令]

# 示例：以交互模式进入名为 my-ubuntu 的容器，并启动 bash
docker exec -it my-ubuntu bash
```

> [!NOTE]
> 使用 `docker exec` 执行命令时，目标容器必须处于运行状态。
