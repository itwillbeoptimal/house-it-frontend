import { Global, css } from '@emotion/react';
import theme from '@/styles/theme';

const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-1Thin.woff2')
      format('woff2');
    font-weight: 100;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-2ExtraLight.woff2')
      format('woff2');
    font-weight: 200;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2')
      format('woff2');
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2')
      format('woff2');
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2')
      format('woff2');
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2')
      format('woff2');
    font-weight: 600;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2')
      format('woff2');
    font-weight: 800;
    font-display: swap;
  }

  @font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-9Black.woff2')
      format('woff2');
    font-weight: 900;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ol,
  ul {
    list-style: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    touch-action: manipulation;
  }

  input,
  textarea,
  select {
    outline: none;
    touch-action: manipulation;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  * {
    color: ${theme.COLORS.LABEL.PRIMARY};
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.03em;
    overscroll-behavior-y: none;
  }

  html {
    font-size: 14px;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    line-height: 1.5;
    margin: 0;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    width: 100%;
    max-width: 768px;
    min-height: 100dvh;
    margin: 0 auto;
    background: ${theme.COLORS.BACKGROUND};
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
  }
`;

export default function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
