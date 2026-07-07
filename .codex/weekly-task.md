# Codex 每周计划任务

## 执行时间

每周一 09:30，东八区时间。

推荐时区写法：

```text
Asia/Shanghai
```

下一次执行时间示例：2026-07-13 09:30 Asia/Shanghai。

## 任务目标

更新乐途智学“AI+教育”政策文献知识库，并推送到 GitHub。

## 执行步骤

1. 检索最近一周公开资料，优先查找以下方向：
   - 人工智能
   - AI+教育
   - 中小学人工智能教育
   - 学生素养 / 智能素养 / AI素养
   - 教学改革 / 课堂教学改革 / 科技教育
   - 教师发展 / 教师数字素养 / 教师人工智能素养
   - 教育数字化 / 智慧教育 / 教育治理
   - 信息科技课程
   - 过程性评价 / 综合素质评价 / 五育并举

2. 优先来源：
   - 先读取 `config/sources.yaml` 中的根网站名单并做定向检索
   - 教育部、中国政府网、国家智慧教育公共服务平台、国家数据局、国家发展改革委
   - 各省教育厅、市教育局、教科院，优先北京、上海、浙江、广东、江苏、山东
   - 权威教育媒体
   - 高校、研究机构、期刊官网
   - 专家本人或所在机构公开页面

3. 每条资料必须保留：
   - title: 标题
   - date: 发布日期，格式 YYYY-MM-DD，无法确认时留空并在周报标记
   - type: 政策 / 政策解读 / 专家观点 / 文献 / 报道
   - source: 来源单位或网站
   - url: 原文链接
   - region: 国家 / 省级 / 市级 / 其他
   - keywords: 关键词数组
   - topics: 方向数组，可选 AI+教育、学生素养、教学改革、教师发展、过程性评价、综合素质评价、五育、教育数字化、教育治理
   - summary: 100-200 字摘要
   - businessRelation: 与乐途智学业务、学校场景、售后推广、内容选题或产品方案的关系

4. 去重规则：
   - 如果 URL 已存在，不重复添加。
   - 如果标题高度相似且来源是转载，保留更权威或更原始的来源。

5. 更新文件：
   - `docs/data.json`
   - `records/weekly/YYYY-MM-DD.md`
   - `records/policies.md`
   - `records/experts.md`
   - `records/papers.md`

6. 更新统计：
   - total
   - thisWeek
   - policies
   - expertViews
   - papers
   - reports
   - policyInterpretations
   - latestDate
   - generatedAt

7. 本地检查：
   - 确认 `docs/data.json` 是合法 JSON。
   - 确认所有新增条目有来源链接。
   - 确认页面能从 `docs/index.html` 读取 `data.json`。
   - 确认所有列表按日期由新到旧展示。
   - 确认新增资料可下载为 Markdown / Word。

8. 提交并推送：
   - commit message: `weekly update: YYYY-MM-DD`
   - push 到默认远程分支。

## 注意

- 不复制外部文章全文，只做摘要、分类和来源链接。
- 资料是内部收集整理使用，尽量保持客观，不写过度营销化表达。
- 近期资料优先；历史资料只有在构成政策链路、专家背景或基础文献时保留。
- 无法确认真实性或日期的内容，不要放入正式条目；可以写入周报的“待确认资料”。
