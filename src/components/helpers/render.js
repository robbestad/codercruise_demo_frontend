// @flow
import InfernoServer from "inferno-server";
import Inferno from "inferno";
export const toString = (input: string) => InfernoServer.renderToString(JSON.parse(input));
export const asString = (html: string) => <div dangerouslySetInnerHTML={{ __html: html }} />;
export const asKey = (input: string) =>
  input
    .toLocaleString()
    .toLowerCase()
    .replace(/[\W_]+/g, "")
    .replace(/\./g, "")
    .replace(/[æøåÆØÅ]/g, "")
    .replace(/![a-z]/g, "");
