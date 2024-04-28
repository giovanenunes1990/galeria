
export const converter_para_real = (valor) => {
    var formatado = new Number(valor).toLocaleString("pt-BR", {
      minimumFractionDigits: 2
    });
    return (valor != null) ? formatado : null;
  }