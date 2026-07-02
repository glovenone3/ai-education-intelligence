const App = (() => {
  const nav = [
    ["index.html", "首页"],
    ["policies.html", "政策库"],
    ["experts.html", "专家库"],
    ["papers.html", "文献库"],
    ["briefs.html", "内容素材"],
    ["sources.html", "来源配置"],
    ["admin.html", "专家维护"],
    ["all.html", "全部资料"]
  ];

  function esc(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function tags(values, extraClass = "") {
    return (values || []).map((value) => `<span class="tag ${extraClass}">${esc(value)}</span>`).join("");
  }

  function pageName() {
    const file = location.pathname.split("/").pop() || "index.html";
    return file === "" ? "index.html" : file;
  }

  function shell(title, subtitle) {
    document.body.insertAdjacentHTML("afterbegin", `
      <header>
        <div class="header-inner">
          <div>
            <h1>${esc(title)}</h1>
            <p class="subtitle">${esc(subtitle)}</p>
          </div>
          <div class="updated" id="updated"></div>
        </div>
      </header>
      <nav class="topnav" aria-label="主导航">
        <div class="wrap">
          ${nav.map(([href, label]) => `<a class="${pageName() === href ? "active" : ""}" href="${href}">${label}</a>`).join("")}
        </div>
      </nav>
    `);
  }

  async function load() {
    const response = await fetch("./data.json");
    return response.json();
  }

  function dateValue(value) {
    const text = String(value || "");
    if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
    if (/^\d{4}-\d{2}$/.test(text)) return `${text}-00`;
    if (/^\d{4}$/.test(text)) return `${text}-00-00`;
    if (text === "持续更新") return "9999-12-31";
    return "0000-00-00";
  }

  function sortByDate(items) {
    return [...(items || [])].sort((left, right) => dateValue(right.date) > dateValue(left.date) ? 1 : -1);
  }

  function setUpdated(data) {
    const node = document.querySelector("#updated");
    if (node) node.textContent = `更新：${data.generatedAt || ""}`;
  }

  function resourceCard(item) {
    const encoded = encodeURIComponent(item.url || item.title || "");
    return `
      <article class="resource">
        <div class="resource-header">
          <div>
            <h3>${esc(item.title)}</h3>
            <div class="meta">
              <span class="tag type">${esc(item.type)}</span>
              <span class="tag">${esc(item.date || "日期待补")}</span>
              <span class="tag">${esc(item.region || "其他")}</span>
              <span class="tag">${esc(item.source)}</span>
            </div>
          </div>
          <div class="actions">
            <a href="${esc(item.url)}" target="_blank" rel="noopener">原文</a>
            <button type="button" data-download-resource="${encoded}" data-format="md">下载MD</button>
            <button type="button" data-download-resource="${encoded}" data-format="doc">下载Word</button>
          </div>
        </div>
        <p>${esc(item.summary)}</p>
        <div class="relation"><strong>怎么用：</strong>${esc(item.businessRelation)}</div>
        <div class="tags">${tags(item.topics)}${tags(item.keywords, "use")}</div>
      </article>
    `;
  }

  function expertCard(expert) {
    const count = (expert.resources || []).length;
    return `
      <article class="expert">
        <div class="expert-top">
          <div>
            <div class="expert-name">${esc(expert.name)}</div>
            <div class="resource-count">${count} 条相关资料</div>
          </div>
          <a href="expert.html?id=${encodeURIComponent(expert.id || expert.name)}">进入专家页</a>
        </div>
        <p>${esc(expert.profile)}</p>
        <div class="tags">${tags(expert.focus)}</div>
        <p><strong>为什么相关：</strong>${esc(expert.whyRelevant)}</p>
        <p><strong>售后用法：</strong>${esc(expert.salesUse)}</p>
      </article>
    `;
  }

  function expertResource(resource) {
    const encoded = encodeURIComponent(resource.url || resource.title || "");
    return `
      <article class="resource">
        <div class="resource-header">
          <div>
            <h3>${esc(resource.title)}</h3>
            <div class="meta">
              <span class="tag type">${esc(resource.kind || "资料")}</span>
              <span class="tag">${esc(resource.date || "日期待补")}</span>
              <span class="tag">${esc(resource.source || "来源待补")}</span>
            </div>
          </div>
          <div class="actions">
            <a href="${esc(resource.url)}" target="_blank" rel="noopener">原文</a>
            <button type="button" data-download-expert-resource="${encoded}" data-format="md">下载MD</button>
            <button type="button" data-download-expert-resource="${encoded}" data-format="doc">下载Word</button>
          </div>
        </div>
        <p>${esc(resource.note || "")}</p>
        <div class="tags">${tags(resource.tags || [])}</div>
      </article>
    `;
  }

  function filterItems(items, filters) {
    const query = (filters.search || "").trim().toLowerCase();
    return items.filter((item) => {
      const text = [
        item.title,
        item.source,
        item.summary,
        item.businessRelation,
        ...(item.keywords || []),
        ...(item.topics || [])
      ].join(" ").toLowerCase();
      if (query && !text.includes(query)) return false;
      if (filters.type && item.type !== filters.type) return false;
      if (filters.topic && !(item.topics || []).includes(filters.topic)) return false;
      return true;
    });
  }

  function slug(value) {
    return String(value || "document")
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, "-")
      .slice(0, 80) || "document";
  }

  function resourceMarkdown(item) {
    const lines = [
      `# ${item.title || "未命名资料"}`,
      "",
      `- 类型：${item.type || item.kind || "资料"}`,
      `- 日期：${item.date || "日期待补"}`,
      `- 来源：${item.source || "来源待补"}`,
      `- 链接：${item.url || ""}`,
      `- 地区：${item.region || "其他"}`,
      `- 方向：${(item.topics || item.tags || []).join("、")}`,
      `- 关键词：${(item.keywords || []).join("、")}`,
      "",
      "## 摘要",
      "",
      item.summary || item.note || "",
      "",
      "## 内部使用建议",
      "",
      item.businessRelation || item.note || "",
      "",
      "## 来源",
      "",
      item.url || ""
    ];
    return lines.join("\n");
  }

  function resourceDocHtml(item) {
    const md = resourceMarkdown(item)
      .replace(/^# (.*)$/m, "<h1>$1</h1>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^- (.*)$/gm, "<p>• $1</p>")
      .replace(/\n\n/g, "\n");
    return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(item.title)}</title></head><body>${md.replace(/\n/g, "<br>")}</body></html>`;
  }

  function downloadText(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function downloadResource(item, format = "md") {
    const filename = `${slug(item.date)}-${slug(item.title)}.${format === "doc" ? "doc" : "md"}`;
    if (format === "doc") {
      downloadText(filename, resourceDocHtml(item), "application/msword;charset=utf-8");
      return;
    }
    downloadText(filename, resourceMarkdown(item), "text/markdown;charset=utf-8");
  }

  function bindResourceDownloads(container, resources) {
    const list = resources || [];
    container.addEventListener("click", (event) => {
      const resourceButton = event.target.closest("[data-download-resource]");
      const expertButton = event.target.closest("[data-download-expert-resource]");
      const button = resourceButton || expertButton;
      if (!button) return;
      const key = decodeURIComponent(button.dataset.downloadResource || button.dataset.downloadExpertResource || "");
      const item = list.find((resource) => String(resource.url || resource.title || "") === key);
      if (item) downloadResource(item, button.dataset.format || "md");
    });
  }

  function bindCollectionDownload(button, title, resources, format = "md") {
    button.addEventListener("click", () => {
      const list = typeof resources === "function" ? resources() : (resources || []);
      const text = list.map(resourceMarkdown).join("\n\n---\n\n");
      const filename = `${slug(title)}.${format === "doc" ? "doc" : "md"}`;
      if (format === "doc") {
        const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title></head><body>${text
          .replace(/^# (.*)$/gm, "<h1>$1</h1>")
          .replace(/^## (.*)$/gm, "<h2>$1</h2>")
          .replace(/^- (.*)$/gm, "<p>• $1</p>")
          .replace(/\n/g, "<br>")}</body></html>`;
        downloadText(filename, html, "application/msword;charset=utf-8");
        return;
      }
      downloadText(filename, text, "text/markdown;charset=utf-8");
    });
  }

  return {
    esc,
    tags,
    shell,
    load,
    setUpdated,
    sortByDate,
    resourceCard,
    expertCard,
    expertResource,
    filterItems,
    downloadResource,
    bindResourceDownloads,
    bindCollectionDownload
  };
})();
