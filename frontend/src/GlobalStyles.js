import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	:root {
		--purple: #5b059a;
		--light-purple: #8f2ed6;
		--pink: #ffa69e;
		--darker-pink: #e5989b;
		--beige: #faf3dd;
		--slate: #aed9e0;
		--select-grey: #fff4f4;
		--off-white: #edf6f9;
		--light-brown: #e29578;
		--font-body: 'Tajawal', sans-serif;
	}

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
h1 {
	font-size: 30px;
}
body {
	line-height: 1;
	font-family: var(--font-body);
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;
