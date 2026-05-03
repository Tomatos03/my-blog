# Linux 系统文件

Linux 系统中的关键文件和目录遵循文件系统层次结构标准（FHS），了解这些文件的作用对于系统管理和故障排除至关重要。

**Linux 遵循 Unix 设计哲学：万物皆文件。硬件设备、进程信息、系统配置等都统一表示为文件。**

## 文件系统概览

| 目录 | 作用 |
|------|------|
| /bin | 基本命令二进制文件（如 ls, cp, mv） |
| /sbin | 系统管理命令二进制文件（如 fsck, ifconfig） |
| /etc | 系统配置文件目录 |
| /dev | 设备文件目录 |
| /proc | 内核和进程信息虚拟文件系统 |
| /var | 可变数据文件（日志、缓存、 spool） |
| /usr | 用户程序和数据（只读） |
| /home | 用户家目录 |
| /root | root 用户家目录 |
| /tmp | 临时文件 |
| /boot | 引导加载器文件 |
| /lib | 共享库和内核模块 |
| /mnt | 临时挂载点 |
| /media | 可移动媒体挂载点 |
| /opt | 可选应用软件包 |
| /srv | 服务数据目录 |

## 配置文件

### 用户管理配置

| 文件 | 作用 |
|------|------|
| /etc/passwd | 用户账户信息 |
| /etc/shadow | 加密的用户密码 |
| /etc/group | 用户组信息 |
| /etc/gshadow | 加密的用户组密码 |

### 系统配置

| 文件 | 作用 |
|------|------|
| /etc/hostname | 系统主机名 |
| /etc/issue | 登录前显示的系统信息 |
| /etc/issue.net | 通过网络登录时显示的系统信息 |
| /etc/profile | 系统级环境变量 |
| /etc/bashrc | 系统级 Bash 配置 |
| /etc/fstab | 文件系统表（开机自动挂载） |
| /etc/modules | 内核模块加载配置 |
| /etc/ld.so.conf | 动态链接器配置 |

### 网络配置

| 文件 | 作用 |
|------|------|
| /etc/hosts | 本地主机名解析 |
| /etc/resolv.conf | DNS 解析器配置 |

### 其他配置

| 文件 | 作用 |
|------|------|
| /etc/crontab | 系统级定时任务 |
| /etc/logrotate.conf | 日志轮转配置 |
| /etc/logrotate.d/ | 应用特定的日志轮转配置 |

## 日志系统

### 日志目录结构

| 目录 | 作用 |
|------|------|
| /var/log | 系统日志文件 |
| /var/log/messages | 通用系统日志 |
| /var/log/auth.log | 认证相关日志（Debian/Ubuntu） |
| /var/log/secure | 认证相关日志（RHEL/CentOS） |
| /var/log/kern.log | 内核日志 |
| /var/log/boot.log | 引导过程日志 |
| /var/log/yum.log | 包管理日志（RHEL/CentOS） |
| /var/log/apt/ | 包管理日志（Debian/Ubuntu） |

**查看日志相关命令:**

| 命令 | 说明 |
|------|------|
| cat /var/log/messages | 查看通用日志 |
| tail -f /var/log/auth.log | 实时查看认证日志 |
| journalctl | 查看 systemd 日志 |
| journalctl -u service-name | 查看特定服务日志 |
| dmesg | 查看内核环形缓冲区消息 |
| grep pattern /var/log/* | 在日志中搜索特定内容 |

### 日志轮转管理

logrotate 是 Linux 系统的日志管理工具，用于自动轮转、压缩和删除旧日志：

- **配置文件**：/etc/logrotate.conf
- **应用特定配置**：/etc/logrotate.d/ 目录
- **常用选项**：
  - daily/weekly/monthly/yearly - 轮转频率
  - rotate N - 保留 N 个旧日志
  - compress - 压缩旧日志
  - missingok - 日志文件缺失时不报错
  - notifempty - 日志文件为空时不轮转
  - create mode owner group - 轮转后创建新日志文件的权限

## 虚拟文件系统

### /proc 文件系统

/proc 是一个虚拟文件系统，提供对内核数据结构的窗口：

- **/proc/cpuinfo** - CPU 信息（核心数、频率等）
- **/proc/meminfo** - 内存信息（总内存、可用内存等）
- **/proc/version** - 内核版本
- **/proc/[pid]/** - 进程特定信息目录
- **/proc/filesystems** - 支持的文件系统类型
- **/proc/mounts** - 已挂载文件系统列表
- **/proc/loadavg** - 系统平均负载
- **/proc/uptime** - 系统运行时间

### /sys 文件系统

/sys 是另一个虚拟文件系统，提供设备和驱动信息：

- **/sys/block/** - 块设备信息
- **/sys/class/** - 设备类别（网络、声音、显示等）
- **/sys/devices/** - 设备层次结构
- **/sys/firmware/** - 固件接口
- **/sys/module/** - 内核模块参数

**系统查看相关命令**

| 命令 | 说明 |
|------|------|
| cat /etc/os-release | 查看操作系统版本信息 |
| uname -a | 查看内核和系统信息 |
| lsblk | 查看块设备信息 |
| df -h | 查看磁盘使用情况 |
| du -sh /* | 查看根目录各子目录占用空间 |
| mount | 查看已挂载的文件系统 |
| free -h | 查看内存使用情况 |
| top 或 htop | 实时查看系统进程资源占用 |
| ps aux | 查看所有进程 |

## 数据管理

### /var 目录结构

| 目录 | 作用 |
|------|------|
| /var/log | 系统和应用日志 |
| /var/spool | 任务队列（邮件、打印等） |
| /var/spool/cron | 用户定时任务 |
| /var/cache | 应用缓存数据 |
| /var/lib | 应用状态信息数据 |
| /var/www | 网页服务器默认根目录 |
| /var/ftp | FTP 服务器默认根目录 |

### 备份策略

建议定期备份以下关键文件和目录：

**系统配置**
- /etc/ - 系统配置文件
- /boot/ - 引导相关文件

**应用与用户数据**
- /home/ - 用户主目录
- /root/ - root 用户数据
- /usr/local/ - 本地安装的软件
- /opt/ - 第三方应用

**应用状态与数据**
- /var/lib/ - 应用状态信息
- /var/www/ - 网页服务器数据
- /var/lib/mysql/ - 数据库数据（如适用）

**备份建议**
- 频率：至少每周一次
- 存储：使用外部存储或远程备份
- 验证：定期测试备份的完整性
- 保留：至少保留最近4周的备份

---

了解这些系统文件的作用和位置，有助于快速定位问题、进行系统维护和执行故障排除操作。
