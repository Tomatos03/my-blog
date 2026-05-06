# Docker 镜像

Docker 镜像是用于创建 Docker 容器的只读模板，包含了运行应用程序所需的所有文件、环境变量和配置。镜像可以从公共或私有的镜像仓库中拉取，也可以通过编写 Dockerfile 自定义构建。

## 搜索镜像

Docker 提供了 `docker search` 命令，用于在 [Docker Hub](https://hub.docker.com/) 上搜索镜像：

```bash
# 搜索镜像，将 [镜像名称] 替换为你想要搜索的镜像名称
docker search [镜像名称]

# 示例：搜索 nginx 镜像
docker search nginx
```

## 拉取镜像

Docker 提供了 `docker pull` 命令，用于从 [Docker Hub](https://hub.docker.com/) 或其他镜像仓库中拉取镜像：

```bash
# 拉取镜像，将 [镜像名称] 替换为镜像名称，[标签] 替换为具体的镜像标签（如 latest）
docker pull [镜像名称]:[标签]

# 示例：拉取 nginx 的最新版本
docker pull nginx

# 示例：拉取指定版本的镜像，如 nginx:1.21
docker pull nginx:1.21
```

## 查看镜像

Docker 提供了一组与镜像管理相关的命令，用于查看、删除和管理本地镜像：

```bash
# 查看本地镜像
docker images

# 展示所有镜像，包括隐藏镜像
docker images -a

# 仅展示镜像的 ID 信息
docker images -q

# 组合参数，列出所有镜像的 ID，包括隐藏镜像
docker images -aq

# 查看镜像详情，将 [镜像ID或名称] 替换为镜像的 ID 或名称
docker inspect [镜像ID或名称]
```

## 删除镜像

Docker 提供了 `docker rmi` 命令，用于删除本地的 Docker 镜像。

```bash
# 删除镜像，将 [镜像ID或名称] 替换为目标镜像的 ID 或名称
docker rmi [镜像ID或名称]
# 示例：删除名为 nginx 的镜像
docker rmi nginx

# 强制删除镜像
docker rmi -f [镜像ID或名称]
# 示例：强制删除名为 nginx 的镜像
docker rmi -f nginx

# 删除所有未使用的镜像
docker image prune

# 示例：删除所有未使用的镜像并释放空间
docker image prune -a
```

> [!WARNING]
> 删除镜像时，请确保没有容器正在使用该镜像，否则需要先删除相关容器。

## 推送镜像

Docker 提供了 `docker push` 命令，用于将本地镜像推送到远程镜像仓库（如 Docker Hub 或私有仓库）。

```bash
# 登录到目标镜像仓库
# 不填写仓库地址时，默认登录到 Docker Hub
docker login [仓库地址]

# 为镜像打标签
docker tag [镜像ID或名称] [DockerHub用户名]/[镜像名称]:[标签]

# 示例：为本地镜像 my-app 打标签，推送到 Docker Hub 的 my-namespace 命名空间
# docker tag my-app my-namespace/my-app:latest

# 推送镜像到远程仓库
# 当执行 docker push 时，Docker 会根据镜像的标签信息将镜像推送到对应的远程仓库。
# 如果推动的镜像没有标签，Docker 会默认使用 latest 标签。
# 如果镜像在远程仓库中不存在，Docker 会自动创建一个新的镜像
docker push [DockerHub用户名]/[镜像名称]:[标签]
```

> [!TIP]
> 在推送镜像之前，确保镜像名称和标签符合目标仓库的命名规则。

> [!WARNING]
> 推送到公共仓库的镜像会被公开访问，请确保镜像中不包含敏感信息。
