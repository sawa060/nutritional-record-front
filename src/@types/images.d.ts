/* =============== refactor lint rules =============== */
/* eslint-disable import/no-default-export */
/* =============== refactor lint rules =============== */
declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

/**
 * svgをcomponentとして取り込む場合はここを修正する
 */
declare module '*.svg' {
  const src: string;
  export default src;
}
