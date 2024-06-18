import markdown from "/@/components/Markdown/Markdown.vue";
import markdownViewer from "/@/components/Markdown/MarkdownViewer.vue";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";

export const MarkDown = initComponent(markdown);
export const MarkdownViewer = initComponent(markdownViewer);

