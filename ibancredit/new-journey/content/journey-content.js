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
      { id: 'deudas', label: 'Consolidación de deudas' },
      { id: 'reforma', label: 'Reforma de vivienda' },
      { id: 'vehiculo', label: 'Adquisición de vehículo' },
      { id: 'evento', label: 'Evento: boda, comunión...' },
      { id: 'vacaciones', label: 'Vacaciones' },
      { id: 'estudios', label: 'Estudios' }
    ],
    customLabel: "O escribe el tuyo aquí",
    cta: "Continuar"
  },
  stepEmployment: {
    title: "¿Cuál es tu situación laboral actual?",
    options: [
      { id: 'full-time', label: 'Trabajo a tiempo completo' },
      { id: 'part-time', label: 'Trabajo a tiempo parcial' },
      { id: 'freelance', label: 'Autónomo' },
      { id: 'student', label: 'Estudiante' },
      { id: 'pension', label: 'Recibo pensión' },
      { id: 'none', label: 'No trabajo' }
    ],
    cta: "Continuar"
  },
  stepHousing: {
    title: "¿Cuál es tu situación de vivienda actual?",
    options: [
      { id: 'mortgage', label: 'Pago hipoteca' },
      { id: 'rent-bank', label: 'Pago alquiler (por banco)' },
      { id: 'rent-cash', label: 'Pago alquiler (en efectivo)' },
      { id: 'none', label: 'No pago por vivienda' },
      { id: 'other', label: 'Otra situación' }
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
