# Docker 网络

Docker 网络是指用于管理容器之间以及容器与外部系统之间通信的虚拟网络。通过 Docker 网络，用户可以让不同的容器安全地互相访问，也可以控制容器如何与主机或外部网络进行连接。

## 创建网络

Docker之中使用如下命令创建一个网络

```bash
# 基本语法
docker network create [网络名称]

# 示例：创建一个名为 my-network 的网络
docker network create my-network
```

### 网络模式

Docker 之中每一个网络都有其唯一对应的网络模式，网络模式决定了容器之间以及容器与外部网络的通信方式。Docker网络模式参考表如下:

| 网络模式   | 描述                                                          |
| --------- | ------------------------------------------------------------- |
| `bridge`  | 默认模式，容器通过桥接网络与主机通信。                        |
| `host`    | 容器与主机共享网络堆栈，性能较高，但隔离性较差。              |
| `none`    | 容器没有网络连接，适用于完全隔离的场景。                      |
| `overlay` | 用于跨主机的容器通信，通常在 Swarm 或 Kubernetes 中使用。      |
| `macvlan` | 为容器分配独立的 MAC 地址，使其像物理设备一样直接连接到网络。 |

> [!NOTE]
> 创建网络时, 默认的网络模式为 `bridge`  

- 指定网络模式

```bash
# 创建指定网络模式的网络
docker network create --driver [网络模式] [网络名称]

# 示例：创建一个名为 my-host-network 的 host 模式网络
docker network create --driver host my-host-network
```

## 加入网络

Docker之中加入一个网络有如下两种方式：

- 方式一  
创建容器时直接指定要加入的网络.

```bash
# 使用 --network 参数指定网络
docker run --network [网络名称] [镜像名称]

# 示例：在 my-network 网络中运行一个 nginx 容器
docker run --network my-network nginx
```

- 方式二  
将已存在的容器添加到新建的网络.

```bash
# 基本语法
docker network connect [网络名称] [容器ID | 容器名称]

# 示例：将名为 my-container 的容器添加到 my-network 网络
docker network connect my-network my-container
```

> [!TIP]
> 同一个网络的容器可以通过容器名称互相访问，而不需要使用 IP 地址。

## 删除网络

```bash
# 删除网络，将 [网络名称] 替换为目标网络的名称
docker network rm [网络名称]

# 示例：删除名为 my-network 的网络
docker network rm my-network
```

> [!WARNING]
> 无法删除正在使用中的网络，必须先停止并移除使用该网络的容器。

## 网络列表

docker之中使用如下命令查看所有网络：

```bash
# 列出所有网络
docker network ls
```

## 网络详情

```bash
# 查看网络的详细信息，将 [网络名称] 替换为目标网络的名称
docker network inspect [网络名称]

# 示例：查看 my-network 网络的详情
docker network inspect my-network
```

## 从网络中删除容器

```bash
# 将容器从指定网络断开，将 [容器ID | 容器名称] 和 [网络名称] 替换为实际值
docker network disconnect [网络名称] [容器ID | 容器名称]

# 示例：将名为 my-container 的容器从 my-network 网络断开
docker network disconnect my-network my-container
```

## 清理未使用的网络

```bash
# 清理未使用的网络
docker network prune
```

> [!WARNING]
> 清理操作不可逆，请确保未使用的网络不再需要。
