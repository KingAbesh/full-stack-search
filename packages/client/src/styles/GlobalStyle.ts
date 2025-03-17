import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surface};
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.hover.primary};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  code {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  pre {
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.border};
    padding-left: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textLight};
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.xl} 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  th, td {
    padding: ${({ theme }) => theme.spacing.sm};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
  }
`;
