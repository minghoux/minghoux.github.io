const JOURNEY_CONTENT = {
  stepInitial: {
    title: "Datos personales",
    description: "Para comenzar con tu solicitud, por favor completa los siguientes datos para verificar tu identidad de forma segura.",
    fields: {
      nombre: { label: "Nombre", placeholder: "p. ej. Camila" },
      dni: { label: "DNI / NIE", placeholder: "p. ej. Z1342909J", inputClass: "uppercase" },
      postal: { label: "Código Postal", placeholder: "p. ej. 29640" },
      fecha: { label: "Fecha de nacimiento", type: "date", inputClass: "text-neutral-500" },
      telefono: { label: "Teléfono", type: "tel", placeholder: "p. ej. 697265474" },
      email: { label: "Email", type: "email", placeholder: "tu@correo.com" }
    },
    privacyLabel: "Acepto la",
    privacyLinkText: "Política de Privacidad",
    privacySuffix: "y consiento el tratamiento de mis datos personales para evaluar la viabilidad del préstamo.",
    cta: "Solicitar préstamo"
  },
  stepCalculator: {
    title: "Solicita tu préstamo con Ibancredit. ¿Qué importe necesitas?",
    howItWorksText: "¿Cómo funciona?",
    amountLabel: "Necesito un préstamo de:",
    amountMin: 1000,
    amountMax: 5000,
    amountStep: 100,
    termLabel: "Número de cuotas",
    termOptions: [
      { value: 12, label: "12" },
      { value: 24, label: "24" },
      { value: 36, label: "36" },
      { value: 48, label: "48" },
      { value: 60, label: "60" }
    ],
    calculationLabel: "Importe cuota",
    cta: "Solicitar ahora",
    apr: 0.35 // ~34.9% APR maps exactly to the 3000 -> 36 mo -> 136.63€ prototype sample
  },
  stepMotivo: {
    title: "¿Cuál es el motivo del préstamo que solicita?",
    options: [
      { id: 'deudas', label: 'Consolidación de deudas', icon: 'fa-solid fa-file-invoice-dollar' },
      { id: 'reforma', label: 'Reforma de vivienda', icon: 'fa-solid fa-house-chimney-window' },
      { id: 'vehiculo', label: 'Adquisición de vehículo', icon: 'fa-solid fa-car-side' },
      { id: 'evento', label: 'Evento: boda, comunión...', icon: 'fa-solid fa-champagne-glasses' },
      { id: 'vacaciones', label: 'Vacaciones', icon: 'fa-solid fa-umbrella-beach' },
      { id: 'estudios', label: 'Estudios', icon: 'fa-solid fa-user-graduate' }
    ],
    customLabel: "O escribe el tuyo aquí",
    cta: "Continuar"
  },
  stepEmployment: {
    title: "¿Cuál es tu situación laboral actual?",
    options: [
      { id: 'full-time', label: 'Trabajo a tiempo completo', icon: 'fa-solid fa-briefcase' },
      { id: 'part-time', label: 'Trabajo a tiempo parcial', icon: 'fa-solid fa-business-time' },
      { id: 'freelance', label: 'Autónomo', icon: 'fa-solid fa-user-gear' },
      { id: 'student', label: 'Estudiante', icon: 'fa-solid fa-book-open-reader' },
      { id: 'pension', label: 'Recibo pensión', icon: 'fa-solid fa-hand-holding-dollar' },
      { id: 'none', label: 'No trabajo', icon: 'fa-solid fa-user-slash' }
    ],
    cta: "Continuar"
  },
  stepHousing: {
    title: "¿Cuál es tu situación de vivienda actual?",
    options: [
      { id: 'mortgage', label: 'Pago hipoteca', icon: 'fa-solid fa-house-circle-check' },
      { id: 'rent-bank', label: 'Pago alquiler (por banco)', icon: 'fa-solid fa-building-user' },
      { id: 'rent-cash', label: 'Pago alquiler (en efectivo)', icon: 'fa-solid fa-money-bill-wave' },
      { id: 'none', label: 'No pago por vivienda', icon: 'fa-solid fa-house-lock' },
      { id: 'other', label: 'Otra situación', icon: 'fa-solid fa-ellipsis' }
    ],
    cta: "Continuar"
  },
  stepBancos: {
    summaryLabel: "Resumen de solicitud",
    title: "Selecciona tu banco principal",
    searchPlaceholder: "Buscar banco",
    howItWorksText: "¿Cómo funciona?",
    banks: [
      { id: 'abanca', name: 'ABANCA' },
      { id: 'activobank', name: 'ActivoBank' },
      { id: 'andbank', name: 'Andbank' },
      { id: 'bbva', name: 'BBVA' },
      { id: 'bankinter', name: 'Bankinter' },
      { id: 'caixa', name: 'CaixaBank' }
    ],
    cta: "Continuar"
  },
  stepOutcome: {
    userName: "Camila", // Mock from current-journey.md
    requestId: "125678",
    userDni: "Z1342909J",
    title: "¡Enhorabuena! Tu solicitud ha sido aprobada",
    description: "Siguiente paso: Ponte en contacto con nosotros para finalizar el proceso y recibir tu préstamo.",
    ctaWhatsapp: "Contactar por WhatsApp",
    ctaCall: "Llamar al 900 752 280",
    summaryTitle: "Resumen de tu solicitud"
  }
};

export default JOURNEY_CONTENT;
