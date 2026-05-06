import { defineConfig } from 'vitepress';
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import tailwindcss from '@tailwindcss/vite'
import mathjax3 from 'markdown-it-mathjax3';
import { plantUmlPlugin } from './utils/plantumlPlugin';

export default defineConfig({
    markdown: {
        theme: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-macchiato',
        },
        config(md) {
            md.use(MermaidMarkdown);
            md.use(mathjax3);
            md.use(plantUmlPlugin);
        },
    },
    vite: {
        plugins: [MermaidPlugin(), tailwindcss()],
        optimizeDeps: {
            include: ['mermaid'],
        },
        ssr: {
            noExternal: ['mermaid'],
        },
    },
    lang: 'zh-cn',
    title: "Tomatos's Blog",
    description: 'Welcome',
    head: [['link', { rel: 'icon', href: '/logo.png' }]],
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.png',
        search: {
            provider: 'local',
        },
        outline: {
            level: [2, 6],
            label: '大纲',
        },
        nav: [
            {
                text: '操作系统',
                items: [
                    {
                        text: 'Linux',
                        link: 'nav/os/linux/linux-desktop-env-config.md',
                    },
                    {
                        text: 'Windows',
                        link: 'nav/os/windows/windows-skill.md',
                    },
                ],
            },
            {
                text: 'UML',
                link: '/nav/uml/structure-diagrams/class-diagram/',
            },
            {
                text: '设计模式',
                link: '/nav/design-pattern/builder.md',
            },
            {
                text: '框架',
                items: [
                    {
                        text: 'Spring',
                        link: '/nav/framework/spring/spring-aop.md',
                    },
                ],
            },
            {
                text: '开发工具',
                items: [
                    {
                        text: 'VSCode',
                        link: 'nav/dev-tools/vscode/vscode.md',
                    },
                    {
                        text: 'Jmeter',
                        link: 'nav/dev-tools/jmeter/jmeter.md',
                    },
                    {
                        text: 'IDEA',
                        link: 'nav/dev-tools/idea/idea.md',
                    },
                    {
                        text: 'Clash Party',
                        link: 'nav/dev-tools/clash-party/clash-party.md',
                    },
                ],
            },
            {
                text: '版本控制',
                items: [
                    {
                        text: 'Git',
                        link: '/nav/version-control/git/git-config.md',
                    },
                ],
            },
            {
                text: '编程组件',
                items: [
                    {
                        text: '数据库',
                        items: [
                            {
                                text: 'MySQL',
                                link: 'nav/env-config/dev/mysql/mysql.md',
                            },
                            {
                                text: 'Redis',
                                link: 'nav/env-config/tools/Redis.md',
                            },
                        ],
                    },
                    {
                        text: '容器化平台',
                        items: [
                            {
                                text: 'Docker',
                                link: 'nav/env-config/deploy/docker/docker-container.md',
                            },
                        ],
                    },
                    {
                        text: 'Web服务器',
                        items: [
                            {
                                text: 'Nginx',
                                link: 'nav/env-config/deploy/Nginx.md',
                            },
                        ],
                    },
                ],
            },
            {
                text: '编程基础',
                items: [
                    { text: '协议', link: '/nav/fundamentals/protocol/http/http-protocol.md' },
                    { text: '算法', link: '/nav/fundamentals/algorithm/algorithm.md' },
                    { text: '技术名词', link: '/nav/fundamentals/terminology/terminology.md' },
                    { text: '伪代码', link: '/nav/fundamentals/pseudocode.md' },
                    { text: '缓存', link: '/nav/fundamentals/cache.md' },
                    { text: '数学', link: '/nav/fundamentals/math/matrix.md' },
                ],
            },
            {
                text: '系统架构',
                items: [
                    { text: '分布式系统', link: '/nav/system-architecture/distributed/distributed-system.md' },
                    { text: '集中式系统', link: '/nav/system-architecture/centralized-system.md' },
                ],
            },
            {
                text: '编程语言',
                items: [
                    {
                        text: 'Java',
                        link: 'nav/languages/java/java-data-type.md',
                    },
                    {
                        text: 'Ts',
                        link: 'nav/languages/ts/ts-data-types.md',
                    },
                    {
                        text: 'Js',
                        link: 'nav/languages/js/js-data-types.md',
                    },
                    {
                        text: 'CSS',
                        link: 'nav/languages/css/css-selector.md',
                    },
                    {
                        text: 'Rust',
                        link: 'nav/languages/rust/ownership.md',
                    },
                    {
                        text: 'Python',
                        link: 'nav/languages/python/python-data-type.md',
                    },
                ],
            },
            {
                text: 'AI 工具',
                items: [
                    {
                        text: 'Claude Code',
                        link: 'nav/ai-tools/claude-code/custom-commands.md',
                    },
                ],
            },
            {
                text: '关于',
                link: 'nav/about.md',
            },
        ],
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        sidebar: {
            '/nav/uml/': [
                {
                    text: '结构图',
                    collapsed: false,
                    items: [
                        { text: '类图', link: '/nav/uml/structure-diagrams/class-diagram/' },
                        { text: '对象图', link: '/nav/uml/structure-diagrams/object-diagram/' },
                        { text: '组件图', link: '/nav/uml/structure-diagrams/component-diagram/' },
                        { text: '部署图', link: '/nav/uml/structure-diagrams/deployment-diagram/' },
                        { text: '包图', link: '/nav/uml/structure-diagrams/package-diagram/' },
                    ],
                },
                {
                    text: '行为图',
                    collapsed: false,
                    items: [
                        { text: '用例图', link: '/nav/uml/behavior-diagrams/use-case-diagram/' },
                        { text: '活动图', link: '/nav/uml/behavior-diagrams/activity-diagram/' },
                        {
                            text: '状态机图',
                            link: '/nav/uml/behavior-diagrams/state-machine-diagram/',
                        },
                        { text: '时序图', link: '/nav/uml/behavior-diagrams/sequence-diagram/' },
                        { text: '定时图', link: '/nav/uml/behavior-diagrams/timing-diagram/' },
                    ],
                },
            ],
            '/nav/system-architecture/distributed/': [
                {
                    text: '分布式系统',
                    link: '/nav/system-architecture/distributed/distributed-system.md',
                },
                {
                    text: '集群架构',
                    link: '/nav/system-architecture/distributed/cluster-architecture.md',
                },
                {
                    text: '微服务架构',
                    link: '/nav/system-architecture/distributed/microservice-architecture/microservice-architecture.md',
                },
            ],

            '/nav/version-control/': [
                {
                    text: 'Git',
                    collapsed: false,
                    items: [
                        {
                            text: 'Git 配置',
                            link: '/nav/version-control/git/git-config.md',
                        },
                        {
                            text: 'Git 仓库管理',
                            link: '/nav/version-control/git/git-repository-management.md',
                        },
                        {
                            text: 'Git 分支',
                            link: '/nav/version-control/git/git-branch.md',
                        },
                        {
                            text: 'Git Worktree',
                            link: '/nav/version-control/git/git-worktree.md',
                        },
                        {
                            text: 'Git 恢复与重置',
                            link: '/nav/version-control/git/git-restore-and-reset.md',
                        },
                        {
                            text: 'Git 日志管理',
                            link: '/nav/version-control/git/git-log-management.md',
                        },
                        {
                            text: 'Git 高级',
                            link: '/nav/version-control/git/git-advanced.md',
                        },
                    ],
                },
            ],
            '/nav/design-pattern/': [
                {
                    text: '设计模式',
                    collapsed: false,
                    items: [
                        { text: '建造者模式', link: '/nav/design-pattern/builder.md' },
                        { text: '单例模式', link: '/nav/design-pattern/singleton.md' },
                        // { text: '工厂模式', link: '/nav/design-pattern/factory.md' },
                        // { text: '代理模式', link: '/nav/design-pattern/proxy.md' },
                        // { text: '观察者模式', link: '/nav/design-pattern/observer.md' },
                        // { text: '策略模式', link: '/nav/design-pattern/strategy.md' },
                        // { text: '模板方法模式', link: '/nav/design-pattern/template-method.md' },
                        // { text: '适配器模式', link: '/nav/design-pattern/adapter.md' },
                        // { text: '装饰器模式', link: '/nav/design-pattern/decorator.md' }
                    ],
                },
                {
                    text: '多线程设计模式',
                    collapsed: false,
                    items: [
                        {
                            text: '顺序控制',
                            link: '/nav/design-pattern/thread/sequencing-control.md',
                        },
                        { text: '犹豫模式', link: '/nav/design-pattern/thread/balking-pattern.md' },
                        {
                            text: '单例模式',
                            link: '/nav/design-pattern/thread/singleton-pattern.md',
                        },
                        {
                            text: '生产者消费者模式',
                            link: '/nav/design-pattern/thread/producer-consumer.md',
                        },
                        {
                            text: '保护性暂停',
                            link: '/nav/design-pattern/thread/guarded-suspension.md',
                        },
                        {
                            text: '两阶段终止',
                            link: '/nav/design-pattern/thread/two-phase-termination.md',
                        },
                    ],
                },
            ],
            '/nav/fundamentals/protocol/': [
                {
                    text: '计算机协议',
                    collapsed: false,
                    items: [
                        {
                            text: 'HTTP',
                            collapsed: false,
                            items: [
                                { text: '概述', link: '/nav/fundamentals/protocol/http/http-protocol.md' },
                                { text: 'Basic Auth', link: '/nav/fundamentals/protocol/http/http-basic-auth.md' },
                            ],
                        },
                        { text: 'SSH', link: '/nav/fundamentals/protocol/ssh/ssh-protocol.md' },
                        { text: 'OAuth', link: '/nav/fundamentals/protocol/oauth/oauth-protocol.md' },
                        { text: 'TCP', link: '/nav/fundamentals/protocol/tcp/tcp-protocol.md' },
                        { text: 'UDP', link: '/nav/fundamentals/protocol/udp/udp-protocol.md' },
                    ],
                },
            ],
            '/nav/fundamentals/math/': [
                {
                    text: '数学',
                    collapsed: false,
                    items: [
                        { text: '不等式', link: '/nav/fundamentals/math/inequality.md' },
                        { text: '矩阵', link: '/nav/fundamentals/math/matrix.md' },
                    ],
                },
            ],
            '/nav/os/windows/': [
                {
                    text: 'Windows',
                    collapsed: false,
                    items: [{ text: '技巧', link: '/nav/os/windows/windows-skill.md' }],
                },
            ],
            '/nav/os/linux/': [
                {
                    text: 'Linux',
                    collapsed: false,
                    items: [
                        { text: '终端', link: '/nav/os/linux/linux-terminal.md' },
                        { text: '按键映射', link: '/nav/os/linux/linux-key-mapping.md' },
                        { text: '桌面环境配置', link: '/nav/os/linux/linux-desktop-env-config.md' },
                        { text: '系统设置', link: '/nav/os/linux/linux-system-settings.md' },
                        { text: '网络配置', link: '/nav/os/linux/linux-network-config.md' },
                        { text: '系统文件', link: '/nav/os/linux/linux-system-files.md' },
                        { text: '疑难杂症', link: '/nav/os/linux/linux-troubleshooting.md' },
                    ],
                },
            ],
            '/nav/languages/rust/': [
                {
                    text: 'Rust',
                    collapsed: false,
                    items: [
                        { text: '所有权', link: '/nav/languages/rust/ownership.md' },
                        { text: '生命周期', link: '/nav/languages/rust/lifetime.md' },
                        { text: '控制流', link: '/nav/languages/rust/control-flow.md' },
                    ],
                },
            ],
            '/nav/languages/ts/': [
                {
                    text: 'Ts基础',
                    collapsed: false,
                    items: [
                        { text: 'Ts环境配置', link: '/nav/languages/ts/ts-env-config.md' },
                        { text: 'Ts数据类型', link: '/nav/languages/ts/ts-data-types.md' },
                        { text: 'Ts修饰符', link: '/nav/languages/ts/ts-modifiers.md' },
                        { text: 'Ts高级特性', link: '/nav/languages/ts/ts-advanced-features.md' },
                        { text: 'Ts类', link: '/nav/languages/ts/ts-class.md' },
                        { text: 'Ts函数', link: '/nav/languages/ts/ts-function.md' },
                        { text: 'Ts正则表达式', link: '/nav/languages/ts/ts-regexp.md' },
                    ],
                },
            ],
            '/nav/languages/js/': [
                {
                    text: 'Js基础',
                    collapsed: false,
                    items: [
                        { text: 'Js数据类型', link: '/nav/languages/js/js-data-types.md' },
                        { text: 'Js正则表达式', link: '/nav/languages/js/js-regex.md' },
                        {
                            text: 'Js变量与作用域',
                            link: '/nav/languages/js/js-variables-and-scope.md',
                        },
                        { text: 'Js运算符', link: '/nav/languages/js/js-operators.md' },
                        { text: 'Js流程控制', link: '/nav/languages/js/js-control-flow.md' },
                        { text: 'Js函数', link: '/nav/languages/js/js-function.md' },
                        { text: 'Js字符串', link: '/nav/languages/js/js-string.md' },
                        { text: 'Js数组', link: '/nav/languages/js/js-array.md' },
                        { text: 'Js对象', link: '/nav/languages/js/js-object.md' },
                        { text: 'Js类', link: '/nav/languages/js/js-class.md' },
                        { text: 'Js异步编程', link: '/nav/languages/js/js-async.md' },
                        { text: 'Js事件循环', link: '/nav/languages/js/js-event-loop.md' },
                        { text: 'Js错误处理', link: '/nav/languages/js/js-error-handling.md' },
                        { text: 'Js模块化', link: '/nav/languages/js/js-module.md' },
                    ],
                },
            ],
            '/nav/languages/css/': [
                {
                    text: 'CSS基础',
                    collapsed: false,
                    items: [
                        { text: 'CSS选择器', link: '/nav/languages/css/css-selector.md' },
                        { text: 'CSS盒子模型', link: '/nav/languages/css/css-box-model.md' },
                        { text: 'CSS布局', link: '/nav/languages/css/css-layout.md' },
                    ],
                },
            ],
            '/nav/languages/python/': [
                {
                    text: 'Python基础',
                    collapsed: false,
                    items: [
                        { text: 'Python数据类型', link: '/nav/languages/python/python-data-type.md' },
                        { text: 'Python字符串', link: '/nav/languages/python/python-string.md' },
                        { text: 'Python运算符', link: '/nav/languages/python/python-operator.md' },
                        { text: 'Python流程控制', link: '/nav/languages/python/python-control-flow.md' },
                        { text: 'Python函数', link: '/nav/languages/python/python-function.md' },
                        { text: 'Python容器类型', link: '/nav/languages/python/python-compound-types.md' },
                        { text: 'Python类', link: '/nav/languages/python/python-class.md' },
                        { text: 'Python异常处理', link: '/nav/languages/python/python-exception.md' },
                        { text: 'Python模块与包', link: '/nav/languages/python/python-module.md' },
                        { text: 'Python IO编程', link: '/nav/languages/python/python-io-stream.md' },
                        { text: 'Python正则表达式', link: '/nav/languages/python/python-regex.md' },
                    ],
                },
                {
                    text: '进阶特性',
                    collapsed: false,
                    items: [
                        { text: '迭代器与生成器', link: '/nav/languages/python/python-iterator-generator.md' },
                        { text: '装饰器', link: '/nav/languages/python/python-decorator.md' },
                        { text: '上下文管理器', link: '/nav/languages/python/python-context-manager.md' },
                        { text: '并发编程', link: '/nav/languages/python/python-concurrency.md' },
                        { text: '类型提示', link: '/nav/languages/python/python-type-hints.md' },
                        { text: '魔术方法', link: '/nav/languages/python/python-magic-methods.md' },
                    ],
                },
                {
                    text: 'Python工具链',
                    collapsed: false,
                    items: [
                        { text: 'pip', link: '/nav/languages/python/tool-chains/pip.md' },
                        { text: '虚拟环境', link: '/nav/languages/python/tool-chains/virtualenv.md' },
                    ],
                },
            ],
            '/nav/languages/java/': [
                {
                    text: 'Java基础',
                    collapsed: false,
                    items: [
                        { text: 'Java数据类型', link: '/nav/languages/java/java-data-type.md' },
                        { text: 'Java修饰符', link: '/nav/languages/java/java-modifiers.md' },
                        {
                            text: 'Java默认行为',
                            link: '/nav/languages/java/java-default-behavior.md',
                        },
                        { text: 'Java字符串', link: '/nav/languages/java/java-string.md' },
                        { text: 'Java类', link: '/nav/languages/java/java-class.md' },
                        { text: 'Java接口', link: '/nav/languages/java/java-interface.md' },
                        { text: 'Java枚举', link: '/nav/languages/java/java-enum.md' },
                        { text: 'Java方法', link: '/nav/languages/java/java-methods.md' },
                        { text: 'Java异常', link: '/nav/languages/java/java-exception.md' },
                        { text: 'Java集合', link: '/nav/languages/java/java-collections/' },
                        { text: 'Java IO流', link: '/nav/languages/java/java-io-stream.md' },
                        { text: 'Java正则表达式', link: '/nav/languages/java/java-regex.md' },
                    ],
                },
                {
                    text: '进阶特性',
                    collapsed: false,
                    items: [
                        { text: 'Java多线程', link: '/nav/languages/java/java-multithreading/java-multithreading.md' },
                        { text: 'Java JUC', link: '/nav/languages/java/java-juc.md' },
                        {
                            text: 'Java内存结构',
                            link: '/nav/languages/java/java-memoery-struct.md',
                        },
                        { text: 'Java泛型', link: '/nav/languages/java/java-generics.md' },
                        { text: 'Java注解', link: '/nav/languages/java/java-annotation.md' },
                        {
                            text: 'Java核心机制',
                            link: '/nav/languages/java/java-core-mechanism.md',
                        },
                        {
                            text: 'Java版本特性',
                            link: '/nav/languages/java/java-version-features.md',
                        },
                        { text: 'Java Jar 包', link: '/nav/languages/java/java-jar.md' },
                        { text: 'Java虚拟机', link: '/nav/languages/java/java-jvm.md' },
                    ],
                },
                {
                    text: 'Java工具链',
                    collapsed: false,
                    items: [
                        { text: 'Maven', link: '/nav/languages/java/tool-chains/maven.md' },
                        { text: 'Lombok', link: '/nav/languages/java/tool-chains/lombok.md' },
                    ],
                },
            ],
            '/nav/env-config/deploy/docker/': [
                {
                    text: 'Docker 基础',
                    collapsed: false,
                    items: [
                        { text: '容器', link: '/nav/env-config/deploy/docker/docker-container.md' },
                        { text: '镜像', link: '/nav/env-config/deploy/docker/docker-image.md' },
                        { text: '端口映射', link: '/nav/env-config/deploy/docker/docker-port.md' },
                        { text: '数据卷', link: '/nav/env-config/deploy/docker/docker-volume.md' },
                        { text: '网络', link: '/nav/env-config/deploy/docker/docker-network.md' },
                    ],
                },
                {
                    text: 'Docker 高级',
                    collapsed: false,
                    items: [
                        { text: 'Dockerfile', link: '/nav/env-config/deploy/docker/docker-dockerfile.md' },
                        { text: 'Docker Compose', link: '/nav/env-config/deploy/docker/docker-compose.md' },
                    ],
                },
            ],
            '/nav/env-config/dev/mysql/': [
                {
                    text: 'MySQL',
                    collapsed: false,
                    items: [
                        { text: '概述', link: '/nav/env-config/dev/mysql/mysql.md' },
                        { text: 'SQL操作', link: '/nav/env-config/dev/mysql/sql-operate.md' },
                        { text: '事务', link: '/nav/env-config/dev/mysql/transaction.md' },
                        { text: '索引', link: '/nav/env-config/dev/mysql/index.md' },
                        { text: '日志', link: '/nav/env-config/dev/mysql/log.md' },
                        { text: '信息查询', link: '/nav/env-config/dev/mysql/info-query.md' },
                        { text: 'SQL优化', link: '/nav/env-config/dev/mysql/sql-refine.md' },
                    ],
                },
            ],
            '/nav/framework/spring/': [
                {
                    text: 'Spring',
                    collapsed: false,
                    items: [
                        { text: 'Spring Bean', link: '/nav/framework/spring/spring-bean.md' },
                        { text: 'Spring AOP', link: '/nav/framework/spring/spring-aop.md' },
                        { text: 'Spring Event', link: '/nav/framework/spring/spring-event.md' },
                        {
                            text: 'Spring Transaction',
                            link: '/nav/framework/spring/spring-transaction.md',
                        },
                        { text: 'Spring Config', link: '/nav/framework/spring/spring-config.md' },
                    ],
                },
            ],
            '/nav/ai-tools/': [
                {
                    text: 'Claude Code',
                    collapsed: false,
                    items: [
                        {
                            text: '自定义 Commands',
                            link: '/nav/ai-tools/claude-code/custom-commands.md',
                        },
                        {
                            text: 'Rules 规则系统',
                            link: '/nav/ai-tools/claude-code/rules.md',
                        },
                        {
                            text: 'MCP 集成',
                            link: '/nav/ai-tools/claude-code/mcp-integration.md',
                        },
                        {
                            text: 'Skills',
                            link: '/nav/ai-tools/claude-code/skills.md',
                        },
                        {
                            text: '命令白名单',
                            link: '/nav/ai-tools/claude-code/command-allowlist.md',
                        },
                    ],
                },
            ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/Tomatos03' }],
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2025-${new Date().getFullYear()} present Tomatos`,
        },
    },
});
