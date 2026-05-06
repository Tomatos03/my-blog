# TCP

TCP（Transmission Control Protocol，传输控制协议）是 TCP/IP 协议栈中的核心协议之一，位于传输层，提供面向连接的、可靠的字节流服务。

## 基本特点

**面向连接**：在数据传输前，需要通过三次握手建立连接，数据传输结束后通过四次挥手释放连接。

**可靠传输**：通过序列号、确认应答、超时重传等机制保证数据可靠到达目的地。

**字节流服务**：TCP 将数据视为连续的字节流，而不是独立的数据报。

**全双工通信**：允许通信双方同时发送和接收数据。

> [!NOTE]
> 默认端口：http(80)、https(443)、ftp(21)、ssh(22)、telnet(23)、smtp(25)

## 三次握手

三次握手是 TCP 建立连接的过程，确保双方都能正常通信。

```plantuml
skinparam backgroundColor white
skinparam componentStyle rectangle
skinparam defaultFontName "Microsoft YaHei"
skinparam defaultFontSize 14

actor Client
actor Server

== 建立连接 ==

Client -> Server: SYN\n(seq=x)
note right: 客户端发送 SYN 包，\n进入 SYN_SENT 状态\n\nSYN=1: 请求建立连接

Server -> Client: SYN, ACK\n(seq=y, ack=x+1)
note left: 服务器发送 SYN+ACK 包，\n进入 SYN_RCVD 状态\n\nSYN=1: 同意建立连接\nACK=1: 确认收到客户端的 SYN

Client -> Server: ACK\n(seq=x+1, ack=y+1)
note right: 客户端发送 ACK 包，\n双方进入 ESTABLISHED 状态\n\nACK=1: 确认收到服务器的 SYN+ACK
```

**为什么需要三次握手?**

三次握手的核心目标是通过双方的相互确认，建立一个可靠的连接，确保双方都能正常收发数据，并防止网络中的旧报文导致错误的连接建立。

- **通信能力的三层确认**

两次握手无法完成对双方通信能力的全面确认。下表展示了不同阶段的确认情况：

| 握手阶段 | 客户端状态 | 服务器状态 | 已确认的能力 |
|---------|----------|----------|----------|
| 第一次后 | SYN_SENT | - | ✓ 客户端→服务器：发送能力；服务器→客户端：接收能力 |
| 第二次后 | **等待中** | SYN_RCVD | ✓ 再加上：服务器→客户端：发送能力；客户端→服务器：接收能力 |
| **两次握手的问题** | **客户端未确认** | 服务器不知道客户端是否真正收到 SYN+ACK | ❌ 缺少对客户端真实接收能力的确认 |
| 第三次后 | ESTABLISHED | ESTABLISHED | ✓ 完整确认：双方都已验证对方的收发能力 |

如果只有两次握手，**服务器无法确认：客户端是否真的收到了自己的 SYN+ACK 报文**。这会导致严重的问题。

- **防止失效的连接请求报文导致资源浪费**

由于网络延迟或拥堵，客户端发送的旧 SYN 报文可能在网络中滞留，随后到达服务器。具体场景：

1. 客户端发送 SYN 报文（seq=100），但网络延迟
2. 客户端超时，重新建立新连接，发送新的 SYN（seq=200）
3. 新连接建立并完成三次握手，开始传输数据
4. 此时，**旧的 SYN（seq=100）才到达服务器**
5. 服务器收到 SYN，如果只用两次握手，会直接回复 SYN+ACK
6. 但客户端已经建立了新连接，不会响应这个 ACK
7. **服务器被迫开启一个半开连接，占用资源，直到超时才释放**

> [!NOTE]
> 三次握手的第三步解决了这个问题：  
> 当服务器发送 SYN+ACK 后，**等待客户端的 ACK**。如果收不到 ACK（客户端根本没发这个 SYN），连接会因为超时而被服务器主动关闭，不会浪费资源。


```plantuml
skinparam backgroundColor white
skinparam componentStyle rectangle
skinparam defaultFontName "Microsoft YaHei"
skinparam defaultFontSize 14

actor Client
actor Server

== 旧报文问题与三次握手的解决方案 ==

Client -> Server: SYN\n(seq=100)\n【延迟的旧报文】
note right: 客户端早先发送，\n在网络中被延迟

note over Client: 客户端超时，\n建立新连接

Client -> Server: SYN\n(seq=200)\n【新连接请求】

Server -> Client: SYN, ACK\n(seq=300, ack=201)
note left: 服务器收到新 SYN，\n建立新连接

Client -> Server: ACK\n(seq=201, ack=301)
note right: 客户端确认，\n新连接建立完成

note over Server: 【此时旧报文到达】

Server -> Client: SYN, ACK\n(seq=400, ack=101)
note left: 服务器收到旧 SYN，\n两次握手会直接建立连接\n三次握手会等待 ACK

note over Client: 客户端不认识这个连接\n不会发送 ACK\n服务器最终超时释放

note over Client: 新连接正常通信\n不受旧报文影响
```

- **连接建立的原子性和状态一致性**

三次握手确保了连接建立的完整性：

- **第一次握手**：客户端从 CLOSED → SYN_SENT，发出建立连接的意图
- **第二次握手**：服务器从 LISTEN → SYN_RCVD，表示同意建立，并告知自己的初始序列号
- **第三次握手**：
  - 客户端从 SYN_SENT → **ESTABLISHED**（连接就绪，可发送数据）
  - 服务器从 SYN_RCVD → **ESTABLISHED**（连接就绪，可发送数据）
  - **双方同时进入就绪状态**

只有三次握手完成后，双方才能开始交换数据。如果只有两次握手：

- 客户端在第二次握手后已进入 ESTABLISHED
- 但服务器仍在 SYN_RCVD 状态，还没真正确认客户端能接收数据
- 这种不对称的状态容易导致竞态条件和数据丢失

## 四次挥手

四次挥手是 TCP 释放连接的过程，确保数据完整传输。

```plantuml
skinparam backgroundColor white
skinparam componentStyle rectangle
skinparam defaultFontName "Microsoft YaHei"
skinparam defaultFontSize 14

actor Client
actor Server

== 关闭连接 ==

Client -> Server: FIN\n(seq=u)
note right: 客户端发送 FIN 包，\n进入 FIN_WAIT_1 状态\n\nFIN=1: 请求关闭连接

Server -> Client: ACK\n(ack=u+1)
note left: 服务器发送 ACK 包，\n客户端进入 FIN_WAIT_2 状态\n\nACK=1: 确认收到 FIN

Server -> Client: FIN\n(seq=v)
note left: 服务器数据发送完毕，\n发送 FIN 包，进入 LAST_ACK 状态\n\nFIN=1: 请求关闭连接

Client -> Server: ACK\n(ack=v+1)
note right: 客户端发送 ACK 包，\n进入 TIME_WAIT 状态\n\nACK=1: 确认收到 FIN

note over Client: 等待 2MSL 后\n进入 CLOSED 状态

note over Server: 收到 ACK 后\n进入 CLOSED 状态
```

**挥手说明**

- **FIN**：表示发送方不再发送数据
- **TIME_WAIT**：等待 2MSL（Maximum Segment Lifetime，最大报文存活时间），确保服务器收到最后的 ACK
- **CLOSE_WAIT**：服务器等待应用关闭连接

## TCP 头部结构

TCP 头部最小为 20 字节，包含以下主要字段：

![TCP头部结构](assets/tcp-header.svg)

**字段说明**

| 字段 | 长度 | 说明 |
|------|------|------|
| 源端口 | 16 位 | 发送方端口号 |
| 目标端口 | 16 位 | 接收方端口号 |
| 序列号 | 32 位 | 标识数据的字节序号 |
| 确认号 | 32 位 | 期望收到的下一个字节序号 |
| 数据偏移 | 4 位 | TCP 头部长度 |
| 标志位 | 6 位 | URG、ACK、PSH、RST、SYN、FIN |
| 窗口大小 | 16 位 | 接收方窗口大小 |
| 校验和 | 16 位 | 头部和
数据校验 |
| 紧急指针 | 16 位 | 紧急数据位置 |

**标志位说明**

| 标志位 | 名称 | 说明 |
|--------|------|------|
| SYN | 同步 | 用于建立连接 |
| ACK | 确认 | 确认应答有效 |
| FIN | 结束 | 关闭连接 |
| RST | 重置 | 复位连接 |
| PSH | 推送 | 立即推送数据 |
| URG | 紧急 | 紧急指针有效 |

## 常见状态

| 状态 | 说明 |
|------|------|
| LISTEN | 服务器监听连接 |
| SYN_SENT | 客户端已发送 SYN |
| SYN_RCVD | 服务器收到 SYN |
| ESTABLISHED | 连接已建立 |
| FIN_WAIT_1 | 主动关闭，已发送 FIN |
| FIN_WAIT_2 | 等待对方 FIN |
| CLOSE_WAIT | 被动关闭，等待关闭 |
| TIME_WAIT | 等待最后 ACK |
| CLOSED | 连接已关闭 |
