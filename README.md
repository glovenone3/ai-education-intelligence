# AI 教育资料收集库

这是一个内部资料整理库，用来每周收集中小学 AI 教育、AI 素养评价、教育数字化、过程性评价、综合素质评价、五育并举相关资料。

目标很简单：

- 保留来源和出处
- 按政策、专家观点、文献、报道分类
- 用 GitHub 保存版本
- 用 GitHub Pages 查看 `docs/` 页面
- 由 Codex 每周一上午 9 点，按东八区时间更新

## 目录

```text
docs/
  index.html      # GitHub Pages 页面
  data.json       # 展示用结构化资料

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

