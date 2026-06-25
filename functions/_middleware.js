export async function onRequest(context) {
  const { env, next } = context;
  const response = await next();

  const isHTML = (response.headers.get("content-type") || "").includes("text/html");
  if (!isHTML || env.ANALYTICS !== "true") return response;

  const tag =
    '<script defer data-domain="renda-fixa-x-parcelado.pages.dev" ' +
    'src="https://analytics.altamind.com/js/script.js"></script>';

  return new HTMLRewriter()
    .on("head", { element(head) { head.append(tag, { html: true }); } })
    .transform(response);
}