# 🚀 小千的个人博客 - 自动化维护指南

这个博客系统使用了 **Astro + GitHub Actions** 实现。你只需要编写 **Markdown** 文章，剩下的交给 GitHub 自动处理。

---

## 📂 核心目录说明

- `src/content/blog/` : **【重要】** 你写文章的地方，只放 `.md` 文件。
- `src/pages/` : 网站页面模板（首页、文章列表等）。
- `src/layouts/` : 网站公共布局（导航栏、页脚、暗黑模式等）。
- `legacy_static_site/` : **【已归档】** 之前旧版的纯 HTML 网页文件。
- `.github/workflows/` : 自动部署脚本，不要删除。

---

## ✍️ 如何发布新文章？

你可以使用以下两种方式发布新文章：

### 方法 A：使用 Word 文档（推荐，最快）

1.  **准备 Word 文档**：将你的 `.docx` 文章拖拽到 `uploads` 文件夹中。
2.  **一键转换**：双击运行项目根目录下的 `一键转换Word.bat`。
3.  **输入文件名**：在弹出的窗口中输入你的 Word 文件名（例如：`我的旅行记.docx`）。
4.  **完成转换**：程序会自动在 `src/content/blog/` 生成对应的 Markdown 文件。
5.  **提交发布**：运行以下 Git 命令：
    ```bash
    git add .
    git commit -m "发布新文章"
    git push
    ```

### 方法 B：手动创建 Markdown 文件

1.  **创建文件**：在 `src/content/blog/` 目录下创建一个新的 `.md` 文件（例如：`my-story.md`）。
2.  **填写格式**：文件开头必须包含以下格式（Frontmatter）：

```markdown
---
title: "这里是文章标题"
description: "这里是文章的简短摘要"
pubDate: "2026-03-20"
---
```
3.  **提交发布**：同上。

---

## 🛠️ 首次部署必做 (GitHub 设置)

1. **GitHub Actions 权限**：
   - `Settings` -> `Actions` -> `General` -> 底部 **Workflow permissions** 选 **Read and write permissions** -> `Save`。

2. **GitHub Pages 设置**：
   - `Settings` -> `Pages` -> **Build and deployment** -> **Source** 选 **GitHub Actions**。

3. **配置文件修改**：
   - 打开项目根目录下的 `astro.config.mjs`，修改 `site` 为你的域名，`base` 为你的仓库名。

---

## 💡 常用提示
- **图片**：如果需要本地图片，请放在 `public/` 目录下，然后在文章中引用。
- **预览**：在 Trae 中点击右上角的预览图标可以实时看到效果。
- **更新**：每次修改 `src/` 下的内容并上传，网站都会自动同步。

---

## 🕒 版本管理与回溯

GitHub 会自动记录你每一次的上传：

1. **查看历史**：点击仓库主页右上角的 `XX commits`。
2. **查看旧版**：在提交记录中点击 `< >` 图标，即可查看当时的代码状态。
3. **对比差异**：点击提交标题，可以清晰看到哪些代码被修改了（红色代表删除，绿色代表新增）。

祝你写作愉快！✨
