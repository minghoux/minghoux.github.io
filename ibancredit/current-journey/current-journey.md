# Ibancar Journey UI Text & Flow Extraction

Based on the Figma flow analysis (`1:125`) and the individual UX screens, here is the structured step-by-step breakdown of the current journey.

## Overview Flow Sequence
1. **Initial Details** (Lead Capture)
2. **Step 1: Calculator** (`StepCuotas.vue`)
3. **Step 2: Reason** (`StepMotivo.vue`)
4. **Step 3: Employment Status** (`StepSituacionLaboral.vue`)
5. **Step 4: Housing Status** (`StepVivienda.vue`)
6. **Step 5: Personal Details** (`StepNacimiento.vue` / `Datos personales`)
7. **Step 6: Select Bank** (`StepBancos.vue`)
8. **Step 7: Confirm Banks** (`StepCuentas.vue`)
9. **Outcome / Thank You** (Approved, Rejected, or Submitted)

---

## Detailed Screen Text

### Initial Details & Personal Data (Datos Personales)
*Note: Depending on the specific variant, these inputs are asked upfront or right after the calculator.*
- **Title:** Datos personales
- **Fields:**
  - Nombre (e.g. Camila)
  - DNI/NIE (e.g. Z1342909J)
  - Código Postal (e.g. 29640)
  - Teléfono (e.g. 697265474)
  - Email (e.g. camila.rainero@ibancar.cc)
  - Fecha de nacimiento (e.g. 06/05/1997)
- **Checkbox:** Seleccionar / deseleccionar todo (Privacy Consent)
- **Primary Button:** Solicitar préstamo
- **Floating Action Button:** WhatsApp Chat

### Step 1: Loan Calculator (`StepCuotas.vue`)
- **Title:** Solicita tu préstamo con Ibancredit. ¿Qué importe necesitas?
- **Link Text:** ¿Cómo funciona?
- **Label:** Necesito un préstamo de:
- **Value Display:** 3.000€ (Controlled by slider from 1000€ to 5000€)
- **Dropdown:** Número de cuotas [ 36 ]
- **Calculated Display:** Importe cuota [ 136,63 € ]
- **Primary Button:** Solicitar ahora

### Step 2: Loan Purpose (`StepMotivo.vue`)
- **Title:** ¿Cuál es el motivo del préstamo que solicita?
- **Options (Grid of 6 with icons):**
  1. Consolidación de deudas
  2. Reforma de vivienda
  3. Adquisición de vehículo
  4. Evento: boda, comunión...
  5. Vacaciones
  6. Estudios
- **Custom Input:** O escribe el tuyo aquí (With submit arrow)

### Step 3: Employment Status (`StepSituacionLaboral.vue`)
- **Title:** ¿Cuál es tu situación laboral actual?
- **Options (List of 6 with icons):**
  1. Trabajo a tiempo completo
  2. Trabajo a tiempo parcial
  3. Autónomo
  4. Estudiante
  5. Recibo pensión
  6. No trabajo
- **Footer Section:**
  - ¿Necesitas ayuda?
  - Consulta nuestras Preguntas Frecuentes

### Step 4: Housing Status (`StepVivienda.vue`)
- **Title:** ¿Cuál es tu situación de vivienda actual?
- **Options (List of 5 with icons):**
  1. Pago hipoteca
  2. Pago alquiler (por banco)
  3. Pago alquiler (en efectivo)
  4. No pago por vivienda
  5. Otra situación
- **Footer Section:** Same help footer as Step 3.

### Step 6 & 7: Bank Selection (`StepBancos.vue` & `StepCuentas.vue`)
- **Top Summary Panel:** Importe: 3000€ | Plazos: 36 | Cuota: 136,63€
- **Title 1 (Select):** Selecciona tu banco principal
  - **Link:** ¿Cómo funciona?
  - **Input:** Buscar banco
  - **Grid:** Layout of bank logos (e.g., ABANCA, ActivoBank, Andbank)
- **Title 2 (Confirm):** ¿Has conectado todos tus bancos activos?
  - **Description:** Por favor, asegúrate de haber conectado todas las cuentas donde recibes ingresos y pagas tus gastos. Esto nos ayuda a verificar si el préstamo es asequible para ti y agiliza el proceso de aprobación. Haz clic en el botón "Continuar" para avanzar con tu solicitud.
  - **Label:** Cuentas Conectadas
  - **Secondary Button:** Conectar otra cuenta
  - **Primary Button:** Continuar

### Step 8: Outcome Screens (`ThankYou.vue`)
**Common Header for all outcomes:** Hola [Name], Solicitud: [ID], DNI: [ID]

**Outcome A: Submitted (In Review)**
- **Header Icon:** Clock/Pending
- **Title:** ¡Solicitud recibida correctamente!
- **Subtitle:** Tu solicitud está siendo analizada por nuestro equipo de expertos.
- **Section Title:** ¿Qué ocurre ahora?
  1. Solicitud recibida (Enviada el 15/10/2025, 09:34)
  2. Análisis en curso (Verificando información y capacidad financiera)
  3. Respuesta por WhatsApp (En máximo 48 horas laborables)

**Outcome B: Approved**
- **Header Icon:** Green Check
- **Title:** ¡Enhorabuena! Tu solicitud ha sido aprobada
- **Next Step Box:** Siguiente paso: Ponte en contacto con nosotros para finalizar el proceso y recibir tu préstamo.
- **Action Buttons:**
  - Contactar por WhatsApp
  - Llamar al 900 752 280
- **Summary Section:** Resumen de tu solicitud (Importe solicitado...)

**Outcome C: Rejected**
- **Header Icon:** Red Cross
- **Title:** Tu solicitud ha sido denegada
- **Message:** Lamentablemente, tu solicitud no ha sido aprobada en esta ocasión. No te preocupes, tenemos una alternativa que puede ayudarte.
- **Promo:** [Creditilia Logo/Offer]
- **Timer text:** Te redirigiremos automáticamente en: X segundos
- **Primary Button:** Ver alternativas disponibles ahora