# 乐途智学“AI+教育”政策文献知识库

这是一个内部资料整理库，用来每周收集“AI+教育”相关政策、专家观点、文献和报道。范围不只限于 AI 素养评价，也包括人工智能、学生素养、教学改革、教师发展、教育数字化、智慧教育、科技教育、教育评价改革等方向。

目标很简单：

- 保留来源和出处
- 按政策、专家观点、文献、报道分类
- 默认按发布日期由新到旧展示
- 支持根网站名单定向检索
- 支持专家名单维护并导出数据
- 支持点击后转写并下载 Markdown / Word 文档
- 用 GitHub 保存版本
- 用 GitHub Pages 查看 `docs/` 页面
- 由本机 LaunchAgent 在每周一东八区上午 9 点左右触发 Codex 更新

## 目录

```text
docs/
  index.html      # GitHub Pages 首页
  data.json       # 展示用结构化资料
  sources.html    # 根网站名单和关键词
  admin.html      # 专家维护与数据导出

records/
  weekly/         # 每周更新记录
  policies.md     # 政策资料汇总
  experts.md      # 专家观点汇总
  papers.md       # 文献资料汇总

config/
  keywords.yaml   # 检索关键词
  sources.yaml    # 推荐来源

.codex/
  weekly-task.md  # Codex 计划任务说明
```

## 每周更新流程

1. Codex 按 `.codex/weekly-task.md` 的要求检索最近一周资料。
2. 将新增条目写入 `docs/data.json`。
3. 将本周摘要写入 `records/weekly/YYYY-MM-DD.md`。
4. 同步更新 `records/policies.md`、`records/experts.md`、`records/papers.md`。
5. `git commit` 并推送到 GitHub。

## GitHub Pages

建议在 GitHub 仓库设置里启用 Pages：

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`
