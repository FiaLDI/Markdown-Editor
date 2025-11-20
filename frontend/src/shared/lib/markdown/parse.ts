import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const emojiMap: Record<string, string> = {
  smile: "😄",
  wink: "😉",
  grin: "😁",
  fire: "🔥",
  star: "⭐",
  heart: "❤️",
  thumbs_up: "👍",
  thumbs_down: "👎",
  warning: "⚠️",
  check: "✅",
  x: "❌",
  rocket: "🚀",
  eyes: "👀",
};

const replaceEmoji = (text: string): string =>
  text.replace(/:([a-z_]+):/g, (_, name) => emojiMap[name] || `:${name}:`);

const renderer = new marked.Renderer();

renderer.link = ({ href, tokens }) => {
  const text = tokens.map((t) => ("raw" in t ? t.raw : "")).join("");
  return `<a href="${href}" target="_blank" rel="noopener noreferrer"
    class="text-blue-500 hover:underline">${text}</a>`;
};

renderer.heading = ({ depth, text }) => {
  const id = text.toLowerCase().replace(/\s+/g, "-");
  const size =
    depth === 1
      ? "text-4xl"
      : depth === 2
      ? "text-3xl"
      : depth === 3
      ? "text-2xl"
      : depth === 4
      ? "text-xl"
      : depth === 5
      ? "text-lg"
      : "text-base";

  return `<h${depth} id="${id}" class="mt-6 mb-2 font-bold ${size} border-b border-gray-700 pb-1">${replaceEmoji(
    text
  )}</h${depth}>`;
};

renderer.list = ({ items, ordered }) => {
  const tag = ordered ? "ol" : "ul";
  const content = items
    .map((i) => {
      const raw = marked.parser(i.tokens);
      const checked = raw.match(/^\[x\]/i);
      const unchecked = raw.match(/^\[ \]/);

      if (checked || unchecked) {
        return `<li class="flex items-center gap-2">
          <input type="checkbox" disabled ${checked ? "checked" : ""} />
          <span>${replaceEmoji(raw.replace(/^\[.\]\s*/, ""))}</span>
        </li>`;
      }

      return `<li>${replaceEmoji(raw)}</li>`;
    })
    .join("");

  return `<${tag} class="${
    ordered ? "list-decimal" : "list-disc"
  } ml-6 space-y-1">${content}</${tag}>`;
};

renderer.codespan = ({ text }) => {
  const clean = text.replace(/"/g, "&quot;");
  return `<code class="inline-code" onclick="
    navigator.clipboard.writeText('${clean}');
    const toast = document.createElement('div');
    toast.innerText = 'Copied!';
    toast.className = 'toast';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1500);
  ">${text}</code>`;
};

renderer.hr = () => {
  return `<hr class="my-6 border-gray-700" />`;
};

marked.use({
  extensions: [
    {
      name: "code",
      renderer({ text, lang }) {
        const codeId = `code-${Math.random().toString(36).slice(2, 8)}`;
        return `
    <div class="relative group">
      <button
        class="copy-btn"
        onclick="navigator.clipboard.writeText(document.getElementById('${codeId}').innerText)
          .then(() => {
            const toast = document.createElement('div');
            toast.innerText = 'Copied!';
            toast.className = 'toast';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 1500);
          })">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save-icon lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
      </button>
      <pre><code id="${codeId}" class="hljs language-${lang ?? "plaintext"}">${hljs
              .highlightAuto(text, lang ? [lang] : undefined)
              .value}</code></pre>
    </div>`;
      },
    },
  ],
});

renderer.table = ({ header, rows }: any) => {
  const tableId = `table-${Math.random().toString(36).slice(2, 8)}`;

  // Преобразуем таблицу обратно в Markdown для копирования
  const headerCells = header.map((cell: any) => cell.text.trim());
  const divider = headerCells.map(() => "---");
  const bodyRows = rows.map((r: any) =>
    r.map((cell: any) => cell.text.trim()).join(" | ")
  );

  const markdownTable = [
    headerCells.join(" | "),
    divider.join(" | "),
    ...bodyRows,
  ].join("\n");

  const headerHtml = `<tr>${header
    .map((h: any) => `<th class="border border-gray-700 px-3 py-2">${replaceEmoji(h.text)}</th>`)
    .join("")}</tr>`;

  const rowsHtml = rows
    .map(
      (r: any) =>
        `<tr>${r
          .map(
            (cell: any) =>
              `<td class="border border-gray-700 px-3 py-2">${replaceEmoji(cell.text)}</td>`
          )
          .join("")}</tr>`
    )
    .join("");

  return `
  <div class="relative group overflow-x-auto my-4 border border-gray-700 rounded-lg bg-gray-900/40">
    <button
      class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded border border-gray-600 hover:bg-gray-700"
      onclick="navigator.clipboard.writeText(\`${markdownTable}\`)
        .then(() => {
          const toast = document.createElement('div');
          toast.innerText = '✅ Markdown table copied!';
          toast.className = 'toast';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 1500);
        })">
      📋 Copy Table
    </button>
    <table id="${tableId}" class="w-full text-sm border-collapse">
      <thead class="bg-gray-800 text-gray-100">${headerHtml}</thead>
      <tbody>${rowsHtml}</tbody>
    </table>
  </div>`;
};




marked.use({
  renderer,
  gfm: true,
  breaks: true,
  async: false,
});

export const parse = (content: string): string => {
  try {
    return marked.parse(replaceEmoji(content)) as string;
  } catch (err) {
    console.error("Ошибка разбора Markdown:", err);
    return "<p style='color:red'>Ошибка разбора Markdown</p>";
  }
};
