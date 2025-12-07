# Docker 数据卷

Docker 提供了数据卷（Volume）功能，用于持久化容器中的数据。数据卷可以在容器之间共享，并且独立于容器的生命周期。

## 创建数据卷

```bash
# 创建数据卷，将 <卷名称> 替换为自定义的卷名称
docker volume create <卷名称>

# 示例：创建一个名为 my-volume 的数据卷
docker volume create my-volume
```

> [!NOTE]
> 默认情况下，创建一个数据卷之后, 会自动在主机`/var/lib/docker/volumes/` 目录下创建一个与数据卷同名的文件夹用于存储数据

## 查看数据卷

```bash
# 列出所有数据卷
docker volume ls
```

## 挂载数据卷

挂载数据卷是在启动容器时，将数据卷映射到容器内的指定目录，从而实现数据持久化和共享。

```bash
# 使用 -v 参数挂载数据卷
docker run -v <卷名称>:<容器路径> <镜像名称>
# 示例：将 my-volume 数据卷挂载到容器的 /app 目录
# 如果挂载的数据卷不存在,docker会自动创建
docker run -v my-volume:/app nginx

# 使用 --mount 参数挂载数据卷
docker run --mount source=<卷名称>,target=<容器路径> <镜像名称>
# 示例：将 my-volume 数据卷挂载到容器的 /app 目录
docker run --mount source=my-volume,target=/app nginx
```

> [!NOTE]
> 挂载数据卷后, 如果宿主机的文件系统发生变化, 需要重新启动容器才会看到挂载文件的变化

## 查看数据卷详情

```bash
# 查看数据卷详情，将 <卷名称> 替换为目标数据卷的名称
docker volume inspect <卷名称>

# 示例：查看 my-volume 数据卷的详情
docker volume inspect my-volume
```

## 删除数据卷

```bash
# 删除数据卷，将 <卷名称> 替换为目标数据卷的名称
docker volume rm <卷名称>

# 示例：删除 my-volume 数据卷
docker volume rm my-volume
```

> [!TIP]
> 无法删除正在使用中的数据卷，必须先停止并删除使用该数据卷的容器。

> [!WARNING]
> 删除数据卷时，请确保数据卷不再被任何容器使用，否则可能会导致数据丢失。

## 清理未使用数据卷

```bash
# 清理未使用的数据卷
docker volume prune
```

> [!WARNING]
> 清理操作不可逆，请谨慎执行。

## 绑定挂载

绑定挂载是将主机上的指定目录直接挂载到容器内的某个目录，实现主机与容器之间的数据同步和共享。与数据卷不同，绑定挂载可以自定义主机目录的位置。

```bash
# 使用 -v 参数进行绑定挂载
docker run -v [主机目录]:[容器目录] [镜像名称]
# 示例：将主机 /home/user/data 目录挂载到容器的 /app 目录
docker run -v /home/user/data:/app nginx

# 使用 --mount 参数进行绑定挂载（推荐新项目）
docker run --mount type=bind,source=[主机目录],target=[容器目录] [镜像名称]
# 示例：将主机 /home/user/data 目录挂载到容器的 /app 目录
docker run --mount type=bind,source=/home/user/data,target=/app nginx
```

> [!NOTE]
> 绑定挂载时，主机目录必须已存在，否则 Docker 会自动创建一个空目录。  
> 绑定挂载适合需要直接操作主机文件的场景，如开发调试、日志同步、配置文件共享等。
