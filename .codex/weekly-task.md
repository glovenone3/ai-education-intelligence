# Codex 每周计划任务

## 执行时间

每周一 09:00，东八区时间。

推荐时区写法：

```text
Asia/Shanghai
```

下一次执行时间示例：2026-07-06 09:00 Asia/Shanghai。

## 任务目标

更新这个仓库中的 AI 教育内部资料库，并推送到 GitHub。

## 执行步骤

1. 检索最近一周公开资料，优先查找以下方向：
   - 中小学人工智能教育
   - AI 教育
   - AI 素养
   - 教育数字化
   - 信息科技课程
   - 过程性评价
   - 综合素质评价
   - 五育并举
   - 德智体美劳
   - 教师数字素养

2. 优先来源：
   - 教育部、中国政府网、国家智慧教育公共服务平台
   - 各省教育厅、市教育局、教科院
   - 权威教育媒体
   - 高校、研究机构、期刊官网
   - 专家本人或所在机构公开页面

3. 每条资料必须保留：
   - title: 标题
   - date: 发布日期，格式 YYYY-MM-DD，无法确认时留空并在周报标记
   - type: 政策 / 专家观点 / 文献 / 报道
   - source: 来源单位或网站
   - url: 原文链接
   - region: 国家 / 省级 / 市级 / 其他
   - keywords: 关键词数组
   - topics: 方向数组，可选 AI教育、AI素养、过程性评价、综合素质评价、五育、教育数字化
   - summary: 100-200 字摘要
   - businessRelation: 与中小学 AI 素养评价、过程性行为记录、五育指标映射的关系

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
   - generatedAt

7. 本地检查：
   - 确认 `docs/data.json` 是合法 JSON。
   - 确认所有新增条目有来源链接。
   - 确认页面能从 `docs/index.html` 读取 `data.json`。

8. 提交并推送：
   - commit message: `weekly update: YYYY-MM-DD`
   - push 到默认远程分支。

## 注意

- 不复制外部文章全文，只做摘要、分类和来源链接。
- 资料是内部收集整理使用，尽量保持客观，不写过度营销化表达。
- 无法确认真实性或日期的内容，不要放入正式条目；可以写入周报的“待确认资料”。

