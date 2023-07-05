/* Recebe uma string 'numero' como parâmetro e retorna esse número com 3 casas, adicionando "0" antes do número. Exemplo: 4 -> 004 | 53 -> 053 */
export const formataNumero = (numero) => {
  return String(numero).padStart(3, 0);
};

export const formataNome = (nome) => {
  return String(nome).replace(/\-/g, " ");
};
