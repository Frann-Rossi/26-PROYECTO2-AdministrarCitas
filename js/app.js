// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emialInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#formulario-cita");

// Eventos
pacienteInput.addEventListener("change", datosCitas);
propietarioInput.addEventListener("change", datosCitas);
emialInput.addEventListener("change", datosCitas);
fechaInput.addEventListener("change", datosCitas);
sintomasInput.addEventListener("change", datosCitas);

formulario.addEventListener("submit", submitCita);

// Obj de Cita
const citaObj = {
	paciente: "",
	propietario: "",
	email: "",
	fecha: "",
	sintomas: "",
};

function datosCitas(e) {
	citaObj[e.target.name] = e.target.value;
	console.log(citaObj);
}

function submitCita(e) {
	e.preventDefault();

	if (Object.values(citaObj).some((valor) => valor.trim() === "")) {
		new Notificacion({
			text: "Todos los campos son obligatorios",
			tipo: "error",
		});
		return;
	}
}

class Notificacion {
	constructor({ text, tipo }) {
		this.text = text;
		this.tipo = tipo;

		this.mostrar();
	}

	mostrar() {
		//Crear la notifiacion
		const alerta = document.createElement("DIV");
		alerta.classList.add(
			"text-center",
			"w-full",
			"p-3",
			"text-white",
			"my-5",
			"alert",
			"uppercase",
			"font-bold",
			"text-sm"
		);

		// Si es de tipo erro, agregamos una clase
		this.tipo === "error"
			? alerta.classList.add("bg-red-500")
			: alerta.classList.add("bg-green-500");

		// Msj de error
		alerta.textContent = this.text;

		// Insertar en el DOM
		formulario.parentElement.insertBefore(alerta, formulario);

		// Eliminar la notificación después de 3 segundos (3000 ms)
		setTimeout(() => {
			alerta.remove(); // Elimina el elemento del DOM
		}, 3000);
	}
}
