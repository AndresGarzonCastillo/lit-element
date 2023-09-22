import { LitElement, html } from "lit-element";

class MiElemento extends LitElement {
  // Define una propiedad para almacenar los datos del formulario
  static properties = {
    formData: { type: Array },
  };

  constructor() {
    super();
    // Inicializa la propiedad formData como un arreglo vacío
    this.formData = [];
    this.addEventListener("submit", this.handleSubmit.bind(this));
  }

  // Manejador de eventos para el envío del formulario
  handleSubmit(event) {
    event.preventDefault(); // Evita que se recargue la página
    const form = event.target;
    if (form.checkValidity() === false) {
      form.classList.add("was-validated");
      return;
    }
    form.classList.remove("was-validated");
    const formData = new FormData(form);

    // Convierte los datos del formulario en un objeto JavaScript
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Agrega el objeto de datos del formulario al arreglo
    this.formData.push(formDataObject);

    // Limpia el formulario
    form.reset();

    // Imprime los datos en la consola (puedes eliminar esta línea después)
    console.log("Datos del formulario:", formDataObject);

    // Emite un evento personalizado para notificar que se han almacenado los datos
    this.dispatchEvent(
      new CustomEvent("formDataUpdated", { detail: this.formData })
    );
  }

  render() {
    return html`
      <form class="row g-2 needs-validation" style="width: 680px;" novalidate id="registroForm">
        <div class="col-md-5">
          <label for="validationCustom01" class="form-label">Nombres</label>
          <input type="text" class="form-control" id="validationCustom01" value="" required/>
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-5">
          <label for="validationCustom02" class="form-label">Apellidos</label>
          <input type="text" class="form-control" id="validationCustom02" value="" required/>
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-10">
          <label for="validationCustomUsername" class="form-label">Email</label>
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
            <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
        </div>
        <div class="col-md-5">
          <label for="validationCustom04" class="form-label">Ciudad</label>
          <select class="form-select" id="validationCustom04" required>
            <option selected disabled value="">Elegir...</option>
            <option>Bogotá</option>
            <option>Medellín</option>
            <option>Barranquilla</option>
          </select>
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-md-5">
          <label for="validationCustom04" class="form-label">Departamento</label>
          <select class="form-select" id="validationCustom04" required>
            <option selected disabled value="">Elegir...</option>
            <option>Cundinamarca</option>
            <option>Antioquia</option>
            <option>Atlántico</option>
          </select>
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
            <label class="form-check-label" for="invalidCheck">
              Acepto terminos y condiciones
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div class="col-10 d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">Registrarme</button>
        </div>
      </form>
      <!-- Muestra los datos almacenados (puedes personalizar cómo se muestran) -->
      <div>
        <h3>Datos almacenados:</h3>
        <ul>
          ${this.formData.map(
            (data, index) =>
              html`<li key="${index}">${JSON.stringify(data)}</li>`
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define("mi-elemento", MiElemento);
