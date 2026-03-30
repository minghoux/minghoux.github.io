const JOURNEY_CONTENT = {
  stepQuote: {
    header: "Welcome to Abound",
    title: "Hi Adam,",
    subtitle: "Welcome to Abound! Finalise your loan application in under 2 minutes:",
    badge: "Pre-approved",
    stats: {
      amountLabel: "loan amount",
      termLabel: "months",
      aprLabel: "Guaranteed APR (Inc. fee)",
      monthlyLabel: "monthly payment"
    },
    amountMin: 2000,
    amountMax: 12000,
    amountStep: 100,
    termOptions: [
      { value: 12, label: "12" },
      { value: 24, label: "24" },
      { value: 36, label: "36" },
      { value: 48, label: "48" },
      { value: 60, label: "60" }
    ],
    legal: "By continuing, you agree to our Terms & Conditions and Privacy Policy.",
    cta: "Continue",
    apr: 0.258 // 25.8% as per Figma v5
  },
  stepVerifyEmail: {
    header: "Your email address",
    title: "Your email address",
    description: "We'll send important loan documents to this address. Please check that it's correct.",
    email: "ming@fintern.ai", // Mock from Figma
    updateLink: "Wrong email? Click to update",
    cta: "Continue"
  },
  stepFinance: {
    header: "Your finance",
    title: "Your finance",
    questions: [
      {
        id: "upcoming_changes",
        text: "Do you expect any upcoming changes that might affect your ability to make your monthly payments?",
        detail: "Consider potential life changes like unemployment, parental leave, illness, or other unforeseen challenges.",
        options: [
          { value: "yes", label: "Yes, I do" },
          { value: "no", label: "No, I don't" }
        ]
      },
      {
        id: "debt_solution",
        text: "Are you currently in or applying for any form of debt solution?",
        detail: "This includes formal arrangements such as an Individual Voluntary Arrangement (IVA), bankruptcy, Trust Deed or Sequestration (Scotland), Debt Relief Order, or structured Debt Management Plan.",
        options: [
          { value: "yes", label: "Yes, I do" },
          { value: "no", label: "No, I don't" }
        ]
      }
    ]
  },
  stepConnectBank: {
    header: "Connect your bank account",
    title: "Connect your bank account",
    description: "Please connect your main bank accounts where you receive income and pay bills. This gives us a snapshot of your finances, allowing us to make faster and fairer loan decisions tailored to your needs.",
    props: [
      { icon: "fa-solid fa-lock", title: "Secure connection", detail: "UK open banking standard encryption" },
      { icon: "fa-solid fa-rocket", title: "Complete in 2 minutes", detail: "No paperwork required" },
      { icon: "fa-solid fa-gauge-high", title: "No impact on credit score", detail: "Your score stays the same" }
    ],
    cta: "Connect bank account"
  },
  stepSubmit: {
    header: "Submit your application",
    title: "You're Almost Done! Review & Submit Your Loan Application",
    summaryTitle: "Your loan",
    legalDisclosure: "By clicking submit, you agree to us carrying out a “soft search” and a fraud check as part of your application. This won’t affect your credit score.",
    dataSharing: "The personal information we have collected from you will be shared with fraud prevention agencies who will use it to prevent fraud and money-laundering and to verify your identity.",
    cta: "Submit your application"
  },
  stepOutcome: {
    header: "Application summary",
    title: "Thank you for your application Adam!",
    nextStepsTitle: "What's next?",
    checklist: [
      { icon: "⏰", text: "We’re reviewing your application. This usually takes up to 2 working days" },
      { icon: "📋", text: "We’ve sent a summary of your application to adam@email.com" },
      { icon: "📧", text: "You can check your latest application status anytime using the link from the email" },
      { icon: "🔔", text: "You will receive email update about your application" },
      { icon: "👋", text: "You can safely close this page now" }
    ],
    updates: {
      title: "Want instant updates?",
      description: "Enter your mobile number below, and we'll send you a one-time code to verify. Once you're set up, you'll receive instant text updates whenever your application progresses.",
      cta: "Get instant updates"
    }
  }
};

export default JOURNEY_CONTENT;
