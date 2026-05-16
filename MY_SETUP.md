# 我的专属操作手册：零基础 GitHub Actions 部署指南

> 本文件是为你量身定制的操作手册，用大白话解释这个项目能做什么、怎么免费跑起来。
> 不需要服务器，不需要编程基础，只需要一个 GitHub 账号。

---

## 一、这个项目能做什么？

这是一个**AI 股票自动分析系统**，支持 A 股、港股、美股。

每个工作日下午 6 点，它会自动：

1. 抓取你关注股票的行情数据、K 线、技术指标
2. 搜索最新相关新闻和舆情
3. 调用 AI 大模型（如 Gemini、DeepSeek）综合分析
4. 生成一份"决策仪表盘"报告，包含：一句话结论、买卖点位、操作检查清单
5. 把报告推送到你指定的渠道（Telegram、邮件、微信、飞书等）

**完全免费、无需服务器**，利用 GitHub Actions 的免费计算资源自动运行。

---

## 二、需要什么前置条件？

| 必须有 | 说明 |
|--------|------|
| GitHub 账号 | 注册地址：https://github.com |
| AI 模型 API Key | 至少一个，见第三节 |
| 通知渠道 | 至少一个，见第三节 |
| 你想分析的股票代码 | A股如 `600519`，美股如 `AAPL`，港股如 `hk00700` |

不需要：服务器、Python 环境、命令行操作、编程经验。

---

## 三、最简部署路径（5 步完成）

### 第 1 步：Fork 仓库

1. 打开原始仓库页面（GitHub 搜索 `ZhuLinsen/daily_stock_analysis`）
2. 点击右上角 **Fork** 按钮
3. 点击 **Create fork**，等待几秒
4. 你的 GitHub 主页现在有了一份自己的副本

### 第 2 步：配置 Secrets（密钥）

> Secrets 是 GitHub 提供的加密存储，用来安全保存 API Key 等敏感信息。

进入你 Fork 的仓库，按以下路径操作：

```
你的仓库页面 → Settings → Secrets and variables → Actions → New repository secret
```

每次点 "New repository secret"，填写名称（Name）和值（Secret），然后点 "Add secret"。

**需要填写的 Secrets 见第四节清单。**

### 第 3 步：启用 GitHub Actions

1. 点击你仓库顶部的 **Actions** 标签
2. 如果看到黄色提示，点击 **"I understand my workflows, go ahead and enable them"**

### 第 4 步：手动测试一次

1. 点击 **Actions** 标签
2. 左侧找到 **"每日股票分析"**
3. 点击右侧 **"Run workflow"** 按钮
4. 点击绿色 **"Run workflow"** 确认
5. 等待 2–10 分钟，看 Actions 运行日志是否显示绿色 ✅

### 第 5 步：完成！

之后每个工作日（周一到周五）**北京时间 18:00** 自动运行，结果发送到你配置的通知渠道。

---

## 四、需要配置的清单

### 4.1 必填项（缺少则无法运行）

| Secret 名称 | 填什么 | 怎么获取 |
|-------------|--------|----------|
| `STOCK_LIST` | 你想分析的股票代码，逗号分隔 | 自己写，例如：`600519,AAPL,hk00700` |

A股用6位数字代码（如 `600519` 贵州茅台），美股用英文代码（如 `AAPL`），港股在代码前加 `hk`（如 `hk00700` 腾讯）。

---

### 4.2 AI 模型（至少选一个）

> 系统需要调用 AI 来生成分析报告，必须配置至少一个。

#### 推荐选项 A：Google Gemini（有免费额度，最省钱）

| Secret 名称 | 填什么 |
|-------------|--------|
| `GEMINI_API_KEY` | 你的 Gemini API Key |

获取方式：
1. 打开 https://aistudio.google.com/
2. 登录 Google 账号
3. 点击 "Get API key" → "Create API key"
4. 复制生成的 Key（以 `AIza` 开头）

> 注意：Google AI Studio 在中国大陆需要科学上网才能访问。

---

#### 推荐选项 B：AIHubMix（无需科学上网，一个 Key 用多个模型）

| Secret 名称 | 填什么 |
|-------------|--------|
| `AIHUBMIX_KEY` | 你的 AIHubMix API Key |

获取方式：
1. 打开 https://aihubmix.com/
2. 注册账号（有免费模型可用）
3. 进入控制台 → API Keys → 创建 Key
4. 复制 Key

---

#### 推荐选项 C：DeepSeek（国内直接访问，性价比极高）

| Secret 名称 | 填什么 |
|-------------|--------|
| `OPENAI_API_KEY` | 你的 DeepSeek API Key |
| `OPENAI_BASE_URL` | `https://api.deepseek.com/v1` |
| `OPENAI_MODEL` | `deepseek-chat` |

获取方式：
1. 打开 https://platform.deepseek.com/
2. 注册账号
3. 进入 API Keys → 创建 Key
4. 复制 Key（以 `sk-` 开头）

---

### 4.3 通知渠道（至少选一个）

> 没有通知渠道，分析结果就没地方发送。至少配置一个。

#### 选项 A：Telegram（最推荐，消息格式最好）

| Secret 名称 | 填什么 |
|-------------|--------|
| `TELEGRAM_BOT_TOKEN` | Telegram 机器人的 Token |
| `TELEGRAM_CHAT_ID` | 你的 Telegram 聊天 ID |

获取 Bot Token：
1. 在 Telegram 中搜索 `@BotFather`
2. 发送 `/newbot`
3. 按提示设置名字和用户名
4. BotFather 会给你一个 Token（格式如 `123456789:AABBccDD...`）

获取 Chat ID：
1. 启动你刚创建的机器人（搜索它的用户名，点 Start）
2. 在 Telegram 中搜索 `@userinfobot`，发送 `/start`
3. 它会告诉你你的 Chat ID（一个数字）

---

#### 选项 B：邮件（用 QQ 邮箱最简单）

| Secret 名称 | 填什么 |
|-------------|--------|
| `EMAIL_SENDER` | 你的发件邮箱，如 `123456@qq.com` |
| `EMAIL_PASSWORD` | 邮箱**授权码**（不是登录密码，见下方说明） |
| `EMAIL_RECEIVERS` | 收件邮箱，留空则发给自己 |

QQ 邮箱授权码获取方式：
1. 登录 QQ 邮箱网页版
2. 点击右上角 **设置** → **账户**
3. 找到"POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务"
4. 开启 SMTP 服务，按提示发短信验证
5. 获得授权码（16位字母）

---

#### 选项 C：企业微信群机器人

| Secret 名称 | 填什么 |
|-------------|--------|
| `WECHAT_WEBHOOK_URL` | 企业微信群机器人的 Webhook 地址 |

获取方式：在企业微信群 → 右键 → 添加机器人 → 复制 Webhook 地址。

---

#### 选项 D：飞书群机器人

| Secret 名称 | 填什么 |
|-------------|--------|
| `FEISHU_WEBHOOK_URL` | 飞书群机器人的 Webhook 地址 |

获取方式：在飞书群 → 设置 → 机器人 → 添加机器人 → 自定义机器人 → 复制 Webhook 地址。

---

### 4.4 新闻搜索（强烈推荐，显著提升分析质量）

配置搜索 API 后，AI 能看到股票相关的最新新闻，分析更准确。

| Secret 名称 | 填什么 | 获取方式 |
|-------------|--------|----------|
| `TAVILY_API_KEYS` | Tavily 搜索 API Key | 打开 https://tavily.com/ 注册，有免费额度 |

> 不配置也能运行，但 AI 分析时看不到最新新闻，质量会下降。

---

### 4.5 可选项（不填也能正常运行）

以下配置可以不填，等基础运行稳定后再按需添加：

| Secret 名称 | 用途 | 是否紧急 |
|-------------|------|----------|
| `TUSHARE_TOKEN` | 增强 A 股数据源（港股需要付费权限） | 不急 |
| `ANSPIRE_API_KEYS` | 中文新闻搜索优化，增强 A 股分析 | 不急 |
| `BOCHA_API_KEYS` | 博查中文搜索，适合 A 股 | 不急 |
| `DISCORD_WEBHOOK_URL` | Discord 通知 | 按需 |
| `SLACK_WEBHOOK_URL` | Slack 通知 | 按需 |
| `PUSHPLUS_TOKEN` | PushPlus 国内推送（手机 App） | 按需 |
| `SERVERCHAN3_SENDKEY` | Server酱 手机推送 | 按需 |

---

## 五、需要改哪些文件？

**一个文件都不用改！**

所有配置都通过 GitHub Secrets 完成，不需要修改任何代码文件。

---

## 六、常见问题

**Q：Actions 运行失败，日志报错找不到环境变量？**

A：检查 Secret 名称是否拼写正确（区分大小写），确认填在 `Settings → Secrets and variables → Actions` 下，不是 Variables 而是 **Secrets**。

**Q：非工作日想手动测试怎么办？**

A：在 Actions → 每日股票分析 → Run workflow 时，勾选 **"强制运行（跳过交易日检查）"**，即可在任何一天触发一次分析。

**Q：分析结果什么时候发送？**

A：每个工作日北京时间 18:00 自动运行，通常 2–10 分钟内完成并推送。节假日会自动跳过。

**Q：A股、港股、美股代码怎么写？**

A：
- A 股：直接写数字代码，如 `600519`（贵州茅台）、`000001`（平安银行）
- 港股：代码前加 `hk`，如 `hk00700`（腾讯控股）、`hk09988`（阿里巴巴）
- 美股：直接写英文代码，如 `AAPL`（苹果）、`TSLA`（特斯拉）
- 多只股票用英文逗号分隔：`600519,hk00700,AAPL,TSLA`

**Q：Gemini 免费额度够用吗？**

A：个人日常分析（10 只以内股票）通常够用。如果超出免费额度，系统会报错，届时切换 DeepSeek 或 AIHubMix 即可。

**Q：想分析完立刻推送（而不是等所有股票都分析完再推送）？**

A：添加一个 Secret：`SINGLE_STOCK_NOTIFY` = `true`，这样每分析完一只股票就立即推送。

---

## 七、最简配置示例（抄作业版）

以下是最省事的 Secrets 配置组合（以 DeepSeek + Telegram 为例）：

| Secret 名称 | 填什么 |
|-------------|--------|
| `STOCK_LIST` | `600519,AAPL`（替换成你自己的股票） |
| `OPENAI_API_KEY` | 你的 DeepSeek Key（以 `sk-` 开头） |
| `OPENAI_BASE_URL` | `https://api.deepseek.com/v1` |
| `OPENAI_MODEL` | `deepseek-chat` |
| `TELEGRAM_BOT_TOKEN` | 你的 Telegram Bot Token |
| `TELEGRAM_CHAT_ID` | 你的 Telegram Chat ID |
| `TAVILY_API_KEYS` | 你的 Tavily Key（可选但推荐） |

配置完成后手动触发一次 Actions 验证，看到 Telegram 收到消息就说明成功了！

---

> 本手册根据仓库文档（README.md、docs/full-guide.md、docs/LLM_CONFIG_GUIDE.md 等）整理，仅供个人使用参考。股市有风险，AI 分析仅供参考，不构成投资建议。
