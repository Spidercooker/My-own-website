import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORD_DOC_PATH = process.argv[2];
const OUTPUT_DIR = path.join(__dirname, '../src/content/blog');

if (!WORD_DOC_PATH) {
    console.error('错误: 请提供 Word 文件路径！');
    console.log('使用方法: node scripts/word-to-md.mjs "你的文档.docx"');
    process.exit(1);
}

async function convertWordToMarkdown() {
    try {
        const fullPath = path.resolve(WORD_DOC_PATH);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`文件不存在: ${fullPath}`);
        }

        console.log(`正在读取: ${path.basename(fullPath)}...`);

        // 使用 mammoth 将 Word 转换为 HTML
        const result = await mammoth.convertToHtml({ path: fullPath });
        let html = result.value;
        const messages = result.messages;
        
        if (messages.length > 0) {
            console.log('转换提示:', messages);
        }

        // 简单的 HTML 转 Markdown 逻辑（Mammoth 转换出来的 HTML 比较干净）
        // 这里我们主要处理：h1-h6, p, strong, em, ul, ol, li
        let markdown = html
            .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
            .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
            .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
            .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
            .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
            .replace(/<em>(.*?)<\/em>/g, '*$1*')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '\n')
            .replace(/<ol>/g, '').replace(/<\/ol>/g, '\n')
            .replace(/<li>(.*?)<\/li>/g, '- $1\n')
            .replace(/&nbsp;/g, ' ')
            .trim();

        // 提取标题 (尝试从第一个 H1 或文件名获取)
        const titleMatch = html.match(/<h1>(.*?)<\/h1>/);
        const title = titleMatch ? titleMatch[1] : path.parse(fullPath).name;
        
        // 生成描述 (取前 100 个字符)
        const description = markdown.replace(/[#*`]/g, '').slice(0, 100).trim() + '...';
        
        // 生成发布日期 (今天)
        const pubDate = new Date().toISOString().split('T')[0];

        // 拼接 Frontmatter
        const finalMarkdown = `---
title: "${title}"
description: "${description}"
pubDate: "${pubDate}"
---

${markdown}`;

        // 确保输出目录存在
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        // 生成保存路径
        const safeFileName = path.parse(fullPath).name.replace(/\s+/g, '-').toLowerCase() + '.md';
        const outputPath = path.join(OUTPUT_DIR, safeFileName);

        fs.writeFileSync(outputPath, finalMarkdown);
        
        console.log('-----------------------------------');
        console.log('✅ 转换成功！');
        console.log(`📄 标题: ${title}`);
        console.log(`📂 已保存至: ${outputPath}`);
        console.log('-----------------------------------');
        console.log('提示: 您现在可以运行 "git add ." 然后提交并推送以发布。');

    } catch (error) {
        console.error('转换失败:', error.message);
        process.exit(1);
    }
}

convertWordToMarkdown();
