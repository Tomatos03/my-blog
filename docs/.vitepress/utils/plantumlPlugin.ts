import { createRequire } from 'node:module';
import type MarkdownIt from 'markdown-it';

const require = createRequire(import.meta.url);
const deflate = require('markdown-it-plantuml/lib/deflate.js');

const server = 'https://www.plantuml.com/plantuml';
const imageFormat = 'svg';

export function plantUmlPlugin(md: MarkdownIt) {
    md.block.ruler.before('fence', 'plantuml_fence', function (state, startLine, endLine, silent) {
        const pos = state.bMarks[startLine] + state.tShift[startLine];
        const max = state.eMarks[startLine];
        const lineText = state.src.slice(pos, max);

        if (!lineText.startsWith('```plantuml')) return false;
        if (silent) return true;

        let nextLine = startLine + 1;
        while (nextLine < endLine) {
            const np = state.bMarks[nextLine] + state.tShift[nextLine];
            const nm = state.eMarks[nextLine];
            if (state.src.slice(np, nm).startsWith('```')) break;
            nextLine++;
        }

        const content = state.src.split('\n').slice(startLine + 1, nextLine).join('\n');
        const fullContent = '@startuml\n' + content + '\n@enduml';
        const zipped = deflate.encode64(
            deflate.zip_deflate(unescape(encodeURIComponent(fullContent)), 9)
        );

        const token = state.push('plantuml_fence_img', 'img', 0);
        token.attrs = [['src', `${server}/${imageFormat}/${zipped}`], ['alt', 'PlantUML']];
        token.block = true;
        token.map = [startLine, nextLine + 1];

        state.line = nextLine + 1;
        return true;
    });

    md.renderer.rules.plantuml_fence_img = function (tokens, idx) {
        const src = tokens[idx].attrGet('src');
        return `<img src="${src}" alt="PlantUML" loading="lazy">`;
    };
}
