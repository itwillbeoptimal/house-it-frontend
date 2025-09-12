import { Global, css } from '@emotion/react';
import theme from '@/styles/theme';

const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

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
    min-height: 44px;
  }

  input,
  textarea,
  select {
    outline: none;
    touch-action: manipulation;
    min-height: 44px;
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
