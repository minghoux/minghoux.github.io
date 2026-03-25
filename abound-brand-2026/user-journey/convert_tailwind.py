import re

with open("abound-journey-rebrand.html", "r", encoding="utf-8") as f:
    html = f.read()

# Remove the entire <style> block
html = re.sub(r"<style>.*?</style>", "", html, flags=re.DOTALL)

# Insert the Tailwind config script
tailwind_script = """<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          forest: '#0E4533', charcoal: '#201F1D', white: '#FFFFFF', 'off-white': '#F4F8F3', 'pale-yellow': '#F7F7E9',
          'teal-sage': '#B8DCD2', khaki: '#EDEABE', lime: '#D4F19B', n50: '#F4F7F4', n100: '#E8EDEA', n200: '#D3DCCF',
          n300: '#B4C2B0', n400: '#829080', n500: '#586858', n600: '#3F4F3F',
          success: { DEFAULT: '#0A5C3A', bg: '#EBF5EF' }, info: { DEFAULT: '#1A6B73', bg: '#EDF6F5' },
          bg: '#F4F8F3', surface: '#FFFFFF', 'brand-subtle': '#EBF2ED', t1: '#201F1D', t2: '#3F4F3F',
          t3: '#586858', tp: '#829080', b1: '#B4C2B0', b2: '#D3DCCF',
        },
        borderRadius: { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '9999px' },
        boxShadow: { sm: '0 1px 3px rgba(32,31,29,.08), 0 1px 2px rgba(32,31,29,.05)', md: '0 4px 12px rgba(32,31,29,.09), 0 1px 4px rgba(32,31,29,.05)' },
        fontFamily: { sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'] },
        keyframes: {
          slideFwd: { '0%': { opacity: '0.4', transform: 'translateX(28px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
          slideBck: { '0%': { opacity: '0.4', transform: 'translateX(-28px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } }
        },
        animation: { 'slide-fwd': 'slideFwd 240ms cubic-bezier(.22,.84,.44,1) both', 'slide-bck': 'slideBck 240ms cubic-bezier(.22,.84,.44,1) both' }
      }
    }
  }
</script>
<style type="text/tailwindcss">
  @layer base {
    html { overscroll-behavior: none; }
    body { overscroll-behavior: none; @apply min-h-screen flex flex-col font-sans text-[16px] antialiased text-t1 bg-bg; }
    a { @apply text-forest; }
    button { font-family: inherit; }
    :focus { @apply outline-none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .step.slide-fwd, .step.slide-bck { opacity: 1 !important; transform: none !important; animation: none !important; }
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
</style>"""

html = html.replace("</head>", f"{tailwind_script}\n</head>")

# Define class mapping
mapping = {
    'class="site-header"': 'class="sticky top-0 z-[100] bg-white/94 backdrop-blur-[14px] border-b border-b2"',
    'class="header-inner"': 'class="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between"',
    'class="logo"': 'class="flex items-center gap-[9px] no-underline focus-visible:outline-forest focus-visible:outline-[2px] focus-visible:outline-offset-[2px] focus-visible:rounded-[4px]"',
    'class="logo-mark"': 'class="w-[30px] h-[30px] bg-forest rounded-[8px] flex items-center justify-center text-white text-[14px] font-bold shrink-0"',
    'class="logo-name"': 'class="text-[18px] font-bold text-forest tracking-[-0.025em]"',
    'class="header-actions"': 'class="flex items-center gap-2"',
    'class="header-link"': 'class="text-[14px] font-medium text-t2 no-underline py-[6px] px-3 rounded-md transition-colors hover:bg-n100 hover:text-t1 focus-visible:outline-forest focus-visible:outline-[2px] focus-visible:outline-offset-[2px]"',
    'class="header-signin"': 'class="text-[14px] font-semibold text-forest bg-brand-subtle border-none cursor-pointer py-[7px] px-4 rounded-pill transition-colors hover:bg-teal-sage focus-visible:outline-forest focus-visible:outline-[2.5px] focus-visible:outline-offset-[3px] focus-visible:ring-[5px] focus-visible:ring-[rgba(14,69,51,.15)]"',
    'class="referral-bar"': 'class="bg-pale-yellow border-b border-khaki py-[9px] px-6 flex items-center justify-center gap-3 text-[13px]"',
    'class="ref-from"': 'class="flex items-center gap-[5px] font-semibold text-t2"',
    'class="ref-arrow"': 'class="text-n400"',
    'class="ref-to"': 'class="text-[15px] font-bold text-forest tracking-[-0.02em]"',
    'class="step-progress"': 'class="flex gap-[6px] items-center mb-9"',
    'class="progress-seg done"': 'class="flex-1 h-[3px] rounded-[2px] bg-forest"',
    'class="progress-seg pulse"': 'class="flex-1 h-[3px] rounded-[2px] bg-gradient-to-r from-forest from-55% to-n200 to-100%"',
    'class="progress-seg"': 'class="flex-1 h-[3px] rounded-[2px] bg-n200"',
    'class="progress-label"': 'class="text-[11px] font-bold text-t3 whitespace-nowrap ml-[6px] shrink-0 tracking-[0.03em]"',
    'class="page-wrap"': 'class="flex-1 flex justify-center pt-12 px-6 pb-20"',
    'class="step-layout"': 'class="w-full max-w-[520px]"',
    'class="step-layout-wide"': 'class="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-[1fr_340px] gap-5 md:gap-10 items-start"',
    'class="s5-head"': 'class="order-1 md:order-none md:col-start-1"',
    'class="s5-form"': 'class="order-3 md:order-none md:col-start-1"',
    'class="sidebar"': 'class="order-2 md:order-none md:col-start-2 md:row-start-2 md:row-span-2"',
    'class="card"': 'class="bg-surface border-[1.5px] border-b2 rounded-xl p-6 shadow-sm"',
    'class="card-title"': 'class="text-[11px] font-bold text-t3 uppercase tracking-[0.06em] mb-4"',
    'class="step-header"': 'class="mb-7"',
    'class="step-eyebrow"': 'class="inline-flex items-center gap-[5px] bg-brand-subtle text-forest text-[11px] font-bold py-[3px] px-[10px] rounded-pill tracking-[0.05em] uppercase mb-3"',
    'class="eyebrow-dot"': 'class="w-[5px] h-[5px] rounded-full bg-lime"',
    'class="step-title"': 'class="text-[26px] sm:text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-t1 mb-[10px]"',
    'class="step-body"': 'class="text-[16px] leading-[1.65] text-t2"',
    'class="loan-grid"': 'class="grid grid-cols-2 gap-[1px] bg-b2 border-[1.5px] border-b2 rounded-xl overflow-hidden mt-6"',
    'class="loan-cell"': 'class="bg-surface py-[18px] px-5"',
    'class="loan-val"': 'class="flex items-center gap-2 text-[22px] font-bold text-t1 tracking-[-0.025em] mb-1"',
    'class="loan-lbl"': 'class="text-[13px] text-t3"',
    'class="edit-chip"': 'class="w-5 h-5 shrink-0 bg-brand-subtle rounded-[5px] border-none flex items-center justify-center cursor-pointer transition-colors hover:bg-teal-sage focus-visible:outline-[2px] focus-visible:outline-forest focus-visible:outline-offset-[2px]"',
    'class="email-card"': 'class="flex items-center gap-[14px] bg-surface border-[1.5px] border-b1 rounded-xl py-[18px] px-5 mt-5"',
    'class="email-icon"': 'class="w-10 h-10 bg-brand-subtle rounded-lg flex items-center justify-center text-[18px] shrink-0"',
    'class="email-primary"': 'class="text-[15px] font-semibold text-forest"',
    'class="email-secondary"': 'class="text-[13px] text-t3 mt-[2px]"',
    'class="q-block"': 'class="bg-surface border-[1.5px] border-b1 rounded-xl pt-5 px-5 pb-4 mt-3"',
    'class="q-text"': 'class="text-[16px] font-semibold text-t1 leading-[1.4] mb-2"',
    'class="q-hint"': 'class="text-[13px] text-t3 leading-[1.5] mb-4"',
    'class="yesno"': 'class="grid grid-cols-2 gap-[10px]"',
    'class="trust-list"': 'class="border-[1.5px] border-b1 rounded-xl overflow-hidden mt-5"',
    'class="trust-item"': 'class="flex items-start gap-[14px] p-4 px-5 bg-surface border-b border-b2 last:border-b-0"',
    'class="t-icon ti-lime"': 'class="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] shrink-0 bg-lime"',
    'class="t-icon ti-teal"': 'class="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] shrink-0 bg-info-bg"',
    'class="t-icon ti-green"': 'class="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] shrink-0 bg-success-bg"',
    'class="t-title"': 'class="text-[14px] font-semibold text-t1 mb-[3px]"',
    'class="t-desc"': 'class="text-[13px] text-t3 leading-[1.4]"',
    'class="review-stats"': 'class="grid grid-cols-3 mt-1"',
    'class="r-stat"': 'class="px-4 border-r border-b2 first:pl-0 last:border-r-0"',
    'class="r-val"': 'class="text-[19px] font-bold text-t1 tracking-[-0.02em] mb-1"',
    'class="r-lbl"': 'class="text-[12px] text-t3"',
    'class="apr-row"': 'class="flex justify-between items-center py-4 px-5 bg-brand-subtle rounded-lg mt-3"',
    'class="apr-val"': 'class="text-[20px] font-bold text-forest tracking-[-0.02em]"',
    'class="apr-total"': 'class="text-[20px] font-bold text-t1 tracking-[-0.02em]"',
    'class="apr-lbl"': 'class="text-[12px] text-t3 mb-1"',
    'class="sidebar-card"': 'class="bg-forest rounded-xl p-6 sticky top-20"',
    'class="sb-label"': 'class="text-[11px] font-bold tracking-[0.06em] uppercase text-white/70 mb-[6px]"',
    'class="sb-amount"': 'class="text-[44px] font-bold text-white tracking-[-0.04em] leading-none mb-6"',
    'class="sb-rows"': 'class="flex flex-col gap-3"',
    'class="sb-row"': 'class="flex justify-between items-center text-[14px]"',
    'class="sb-rl"': 'class="text-white/70"',
    'class="sb-rv"': 'class="font-semibold text-white"',
    'class="sb-divider"': 'class="border-none border-t border-white/20 my-4"',
    'class="sb-total-lbl"': 'class="text-[13px] text-white/70 mb-1"',
    'class="sb-total-val"': 'class="text-[22px] font-bold text-white tracking-[-0.025em]"',
    'class="success-banner"': 'class="bg-forest pt-12 pb-[44px] px-6 text-center"',
    'class="success-banner-inner"': 'class="max-w-[520px] mx-auto"',
    'class="success-check"': 'class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5"',
    'class="success-title"': 'class="text-[26px] font-bold text-white leading-[1.25] tracking-[-0.025em]"',
    'class="hi"': 'class="text-lime"',
    'class="success-subtitle"': 'class="text-[15px] text-white/80 mt-[10px] leading-[1.55]"',
    'class="next-card-title"': 'class="text-[17px] font-bold text-t1 mb-[14px]"',
    'class="next-item"': 'class="flex gap-3 py-[10px] border-b border-b2 text-[14px] text-t2 leading-[1.55] first:pt-0 last:border-b-0 last:pb-0"',
    'class="ni-icon"': 'class="text-[16px] shrink-0 mt-[1px]"',
    'class="phone-row"': 'class="flex gap-2 mb-[14px]"',
    'class="phone-prefix"': 'class="flex items-center gap-[6px] px-[14px] h-12 bg-surface border-[1.5px] border-b1 rounded-md text-[13px] font-semibold text-t2 whitespace-nowrap shrink-0"',
    'class="phone-field"': 'class="flex-1 h-12 px-4 border-[1.5px] border-b1 rounded-md text-[15px] text-t1 bg-surface tracking-[0.05em] transition-all focus:border-forest focus:border-2 focus:shadow-[0_0_0_4px_rgba(14,69,51,.10)]"',
    'class="btn-row"': 'class="flex flex-col gap-[10px] mt-7"',
    'class="btn btn-primary"': 'class="flex items-center justify-center gap-2 w-full h-[52px] rounded-pill font-sans text-base font-semibold border-none cursor-pointer tracking-[-0.01em] transition-all duration-[160ms] ease-out will-change-transform bg-forest text-white hover:bg-[#0a3325] hover:-translate-y-[1px] hover:shadow-md active:bg-[#071f17] active:translate-y-0 focus-visible:outline-forest focus-visible:outline-[2.5px] focus-visible:outline-offset-[3px] focus-visible:ring-[5px] focus-visible:ring-[rgba(14,69,51,.15)]"',
    'class="btn-ghost"': 'class="flex items-center justify-center gap-2 w-full rounded-pill font-sans font-semibold border-none cursor-pointer tracking-[-0.01em] transition-all duration-[160ms] ease-out will-change-transform bg-transparent text-t3 h-[44px] text-[14px] hover:text-t1 hover:bg-n100"',
    'class="back-btn"': 'class="inline-flex items-center gap-[6px] text-[13px] font-semibold text-t3 bg-transparent border-none cursor-pointer px-2 min-h-[44px] -ml-2 mb-3 transition-colors duration-[160ms] ease-out hover:text-t1 focus-visible:outline-forest focus-visible:outline-[2.5px] focus-visible:outline-offset-[3px] focus-visible:ring-[5px] focus-visible:ring-[rgba(14,69,51,.15)] focus-visible:rounded-md"',
    'class="badge-lime"': 'class="inline-flex items-center gap-[5px] bg-lime text-forest text-[11px] font-bold py-[3px] px-[10px] rounded-pill tracking-[0.04em] uppercase mb-[14px]"',
    'class="badge-dot"': 'class="w-[5px] h-[5px] rounded-full bg-forest"',
    'class="legal"': 'class="text-[12px] text-t3 leading-[1.6] mt-[14px]"',
    'class="bank-logos"': 'class="flex gap-[10px] flex-wrap items-center mb-5"',
    'class="bank-chip"': 'class="flex items-center gap-[7px] bg-surface border-[1.5px] border-b2 rounded-md py-[7px] px-3 text-[12px] font-bold text-t2 whitespace-nowrap"',
    'class="bank-dot"': 'class="w-2 h-2 rounded-full shrink-0"',
    'class="yb"': 'class="yb h-[44px] rounded-pill font-sans text-[14px] font-semibold flex items-center justify-center cursor-pointer transition-all duration-[160ms] ease-out border-[1.5px] border-forest bg-transparent text-forest hover:bg-brand-subtle focus-visible:outline-forest focus-visible:outline-[2.5px] focus-visible:outline-offset-[3px] focus-visible:ring-[5px] focus-visible:ring-[rgba(14,69,51,.15)] focus-visible:rounded-md"',
    'class="step active"': 'class="step block"',
    'class="step"': 'class="step hidden"',
}

# The javascript relies on exactly matching `.yb`, `.step`, `.slide-fwd` etc.
# We will ensure those core class tokens remain.
html = html.replace('.yb.selected', '.yb.selected { @apply bg-forest text-white shadow-[0_0_0_3px_rgba(14,69,51,.18)] hover:bg-[#0a3325]; }')

# Append dynamic states to style blocks
html = html.replace(
    '</style>', 
    '.yb.selected { background-color: #0E4533; color: white; box-shadow: 0 0 0 3px rgba(14,69,51,.18); }\n    .yb.selected:hover { background-color: #0a3325; }\n    .step { display: none; }\n    .step.active { display: block; }\n    .step.slide-fwd { animation: slideFwd 240ms cubic-bezier(.22,.84,.44,1) both; }\n    .step.slide-bck { animation: slideBck 240ms cubic-bezier(.22,.84,.44,1) both; }\n  </style>'
)

for old_cls, new_cls in mapping.items():
    html = html.replace(old_cls, new_cls)

# Additional tweaks for elements combining classes
html = html.replace('class="card mt12"', 'class="bg-surface border-[1.5px] border-b2 rounded-xl p-6 shadow-sm mt-3"')
html = html.replace('class="q-block mt12"', 'class="bg-surface border-[1.5px] border-b1 rounded-xl pt-5 px-5 pb-4 mt-3"')
html = html.replace('class="btn-row" id="s3-continue" style="display:none; margin-top:28px;"', 'class="flex flex-col gap-[10px] mt-7 hidden" id="s3-continue"')

with open("abound-journey-rebrand-tailwind.html", "w", encoding="utf-8") as f:
    f.write(html)
