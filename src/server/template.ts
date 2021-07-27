import { HelmetData } from 'react-helmet-async';

export function buildTemplate(template: string, appHtml: string, seo: HelmetData, state: any): string {
  const helmetData: HelmetData = seo;
  const meta = helmetData.meta
    .toString()
    .split(/(?=<meta)/g)
    .join('\n    ');
  const link = helmetData.link
    .toString()
    .split(/(?=<link)/g)
    .join('\n    ');
  const title = helmetData.title.toString();
  const html = template
    .replace('__LANG__', 'en') // TODO: ddo not forget to avoid it
    .replace('<!--SEO-->', `${title}\n    ${meta}\n    ${link}`)
    .replace('<!--__STATE__-->', `window.__STATE=${JSON.stringify(state)};`)
    .replace('<!--app-html-->', appHtml);

  return html;
}
