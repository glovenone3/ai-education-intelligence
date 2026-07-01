const App = (() => {
  const nav = [
    ["index.html", "首页"],
    ["policies.html", "政策库"],
    ["experts.html", "专家库"],
    ["papers.html", "文献库"],
    ["briefs.html", "内容素材"],
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

  function setUpdated(data) {
    const node = document.querySelector("#updated");
    if (node) node.textContent = `更新：${data.generatedAt || ""}`;
  }

  function resourceCard(item) {
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
          <a href="${esc(item.url)}" target="_blank" rel="noopener">原文</a>
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
          <a href="${esc(resource.url)}" target="_blank" rel="noopener">原文</a>
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

  return {
    esc,
    tags,
    shell,
    load,
    setUpdated,
    resourceCard,
    expertCard,
    expertResource,
    filterItems
  };
})();

