import ReactDOMClient from "../../node_modules/react-dom/client.js";

type ReactDomClientCompat = {
  createRoot: typeof import("react-dom/client")["createRoot"];
  hydrateRoot: typeof import("react-dom/client")["hydrateRoot"];
};

const compat = ReactDOMClient as unknown as ReactDomClientCompat;

export const createRoot = compat.createRoot;
export const hydrateRoot = compat.hydrateRoot;
