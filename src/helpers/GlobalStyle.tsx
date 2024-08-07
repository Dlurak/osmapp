import { createGlobalStyle } from 'styled-components';
import {
  isDesktopResolution,
  isMobileMode,
  isTabletResolution,
} from '../components/helpers';
import { convertHexToRgba } from '../components/utils/colorUtils';

export const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    margin: 0;
    padding: 0;
    height: 100%;
    border: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.palette.background.default};

    // disable pulling the page around on mobile
    overscroll-behavior: none;
  }

  body {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  a, .linkLikeButton {
    color: ${({ theme }) => theme.palette.tertiary.main};
    text-decoration: none;
    border: 0;
    padding: 0;
    font: inherit;
    background: transparent;
    outline: 0;
    cursor: pointer;

    &.colorInherit {
      color: inherit;
    }

    &:hover {
      text-decoration: underline;
    }

    &:focus {
      text-decoration: underline;
    }

    .MuiTooltip-tooltip & {
      color: #82dcff;
    }
  }

  ul {
    margin-top: 0;
  }

  .maplibregl-map {
    user-select: none;
    -webkit-user-select: none;
  }

  .maplibregl-ctrl-group {
    background-color: ${({ theme }) =>
      convertHexToRgba(theme.palette.background.paper, 0.7)} !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    .maplibregl-ctrl-icon {
      filter: ${({ theme }) => theme.palette.invertFilter};
    }

    @media ${isMobileMode} {
      border-radius: 50% !important;

      button {
        width: 44px !important;
        height: 44px !important;
      }
    }
    button + button {
      border-top: 1px solid ${({ theme }) => theme.palette.divider} !important;
    }
  }

  .maplibregl-ctrl-top-right {
    top: 114px !important;

    @media ${isTabletResolution} {
      top: 54px !important;
    }

    @media ${isDesktopResolution} {
      top: 83px !important;
    }

  }

  .maplibregl-canvas:not(:focus) {
    outline: 0;
  }

  @keyframes blink {
    50% {
      color: transparent
    }
  }

  .dotloader {
    animation: 1s blink infinite
  }

  .dotloader:nth-child(2) {
    animation-delay: 250ms
  }

  .dotloader:nth-child(3) {
    animation-delay: 500ms
  }

  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.2) !important;
  }

  /* Hide compass by default - selects .maplibregl-ctrl which holds [+,-,compass] */
  .hidden-compass .maplibregl-ctrl:has(> .maplibregl-ctrl-compass) {
    display: none;
  }

`;
