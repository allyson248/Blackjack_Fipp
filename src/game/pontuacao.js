const VALORES = new Set(['ACE', 'KING', 'QUEEN', 'JACK', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

export function calcularPontuacao(cartas) {
  const valores = cartas.map((valor) => String(valor).toUpperCase());
  const invalido = valores.find((valor) => !VALORES.has(valor));
  if (invalido) throw new Error(`Valor de carta inválido: ${invalido}`);

  let total = 0;
  let ases = 0;

  for (const valor of valores) {
    if (valor === 'ACE') {
      total += 11;
      ases += 1;
    } else if (['KING', 'QUEEN', 'JACK'].includes(valor)) {
      total += 10;
    } else {
      total += Number(valor);
    }
  }

  while (total > 21 && ases > 0) {
    total -= 10;
    ases -= 1;
  }

  return { pontuacao: total, estourou: total > 21 };
}
