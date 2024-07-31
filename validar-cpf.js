export default class validarCpf {
  constructor(element) {
    this.element = element;
  }
  limparCpf(cpf) {
    return cpf.replace(/\D/g, "");
  }
  construirCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }
  formatarCpf(cpf) {
    const cpflimpo = this.limparCpf(cpf);
    return this.construirCpf(cpflimpo);
  }
  validar(cpf) {
    const matchCpf = cpf.match(/(?:\d{3}[-. \s]?){3}\d{2}/g);
    return matchCpf && matchCpf[0] === cpf;
  }

  validarNaMudanca(cpfElement) {
    if (this.validar(cpfElement.value)) {
      cpfElement.value = this.formatarCpf(cpfElement.value);
      cpfElement.classList.remove("erro");
      cpfElement.classList.add("valido");
      cpfElement.nextElementSibling.classList.remove("ativar");
    } else {
      cpfElement.classList.add("erro");
      cpfElement.classList.remove("valido");
      cpfElement.nextElementSibling.classList.add("ativar");
    }
  }

  adicionarEvento() {
    this.element.addEventListener("change", () => {
      this.validarNaMudanca(this.element);
    });
  }

  adicionarErroSpan() {
    const erroElement = document.createElement("span");
    console.log(erroElement);
    erroElement.classList.add("erro-text");
    erroElement.innerText = "CPF inválido";
    this.element.parentElement.insertBefore(
      erroElement,
      this.element.nextElementSibling
    );
  }

  iniciar() {
    this.adicionarEvento();
    this.adicionarErroSpan();
    return this;
  }
}
