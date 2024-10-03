declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const pngSrc: string;
  export default pngSrc;
}

declare module "*.jpg" {
  const jpgSrc: string;
  export default jpgSrc;
}

declare module "*.jpeg" {
  const jpegSrc: string;
  export default jpegSrc;
}

declare module "*.pdf" {
  const pdfSrc: string;
  export default pdfSrc;
}
