/* Recebe uma string 'numero' como parâmetro e retorna esse número com 3 casas, adicionando "0" antes do número. Exemplo: 4 -> 004 | 53 -> 053 */
export function formataNumero(numero) {
  return String(numero).padStart(3, 0);
}
