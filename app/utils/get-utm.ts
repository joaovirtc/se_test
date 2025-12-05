export function getUTM(url: string = window.location.href): string {
  const [_, query] = url.split('?');
  return query || ""; // Retorna a query ou uma string vazia
}