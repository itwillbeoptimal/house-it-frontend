import React from 'react';
import styled from '@emotion/styled';

interface HTMLContentProps {
  content: string;
  className?: string;
}

const StyledHTMLContent = styled.div`
  position: relative;
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 12px 0;
  }

  h1 {
    font-size: 28px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 16px;
  }
  h6 {
    font-size: 15px;
  }

  p {
    margin: 8px 0;
    line-height: 1.6;
  }

  ul,
  ol {
    padding-left: 20px;
    margin: 8px 0;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul ul {
    list-style-type: circle;
  }

  ul ul ul {
    list-style-type: square;
  }

  ol ol {
    list-style-type: lower-alpha;
  }

  ol ol ol {
    list-style-type: lower-roman;
  }

  li {
    display: list-item;
    margin: 4px 0;
    line-height: 1.5;
  }

  strong,
  b {
    font-weight: 600;
  }

  em,
  i {
    font-style: italic;
  }

  blockquote {
    margin: 16px 0;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.COLORS.GRAY[0]};
    border-left: 4px solid ${(props) => props.theme.COLORS.MAIN.SECONDARY};

    p {
      margin: 0;
      opacity: 0.7;
    }
  }

  a {
    color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  table {
    width: 100%;
    margin: 16px 0;
    border-collapse: collapse;
  }

  table,
  th,
  td {
    border: 1px solid ${(props) => props.theme.COLORS.GRAY[3]};
  }

  th,
  td {
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: ${(props) => props.theme.COLORS.GRAY[2]};
    font-weight: 600;
  }

  code {
    padding: 2px 4px;
    background-color: ${(props) => props.theme.COLORS.GRAY[2]};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    border-radius: 4px;
  }

  pre {
    padding: 16px;
    margin: 16px 0;
    background-color: ${(props) => props.theme.COLORS.GRAY[2]};
    border-radius: 8px;
    overflow-x: auto;

    code {
      padding: 0;
      background: none;
    }
  }

  hr {
    margin: 20px 0;
    border: 0.5px solid ${(props) => props.theme.COLORS.GRAY[2]};
  }
`;

const HTMLContent: React.FC<HTMLContentProps> = ({ content, className }) => {
  return (
    <StyledHTMLContent
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTMLContent;
