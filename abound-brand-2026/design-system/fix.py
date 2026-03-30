import re

filepath = r"c:\Users\MingHo\Github\minghoux.github.io\abound-brand-2026\design-system\abound-design-system.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Version Number
html = html.replace('v1.0', 'v2.0.26')
html = html.replace('v2.0.26.0', 'v2.0.26') # just in case

# 2. Add Gradients to Tailwind Config
tailwind_config = """        colors: {"""
tailwind_gradients = """        backgroundImage: {
          'gradient-1': 'linear-gradient(to bottom, #EAF1EA, #CBE4C8)',
          'gradient-2': 'linear-gradient(to top, #F0EDC3, #CBDAD9)',
          'gradient-3': 'linear-gradient(to bottom, #EAF1EA, #B8DCD2)',
          'gradient-4': 'linear-gradient(to bottom, #FFF9F4, #D4F19B)'
        },
        colors: {"""
if "backgroundImage" not in html:
    html = html.replace(tailwind_config, tailwind_gradients)

# 3. Hover Colors
html = html.replace('hover:bg-[#0A3325]', 'hover:bg-brand-hover')

# 4. Navigation Wordmark
nav_brand_old = """<a href="abound-design-system.html" class="flex items-center gap-2 text-2xl font-bold text-brand tracking-tighter no-underline">
        <span>abound</span>"""
nav_brand_new = """<a href="abound-design-system.html" class="flex items-center gap-2 text-2xl font-bold text-brand tracking-tighter no-underline">
        <img src="../brand-assest/wordmark.png" alt="Abound" class="h-6" />"""
html = html.replace(nav_brand_old, nav_brand_new)

# 5. Surface Card
# Note: In section 5f, the HTML says:
# <div class="p-6 rounded-xl bg-off-white border border-transparent">
# <h3 class="text-lg font-bold text-charcoal mb-2">Surface Card</h3>
# Wait, looking at view_file lines 1314:
# <div class="p-6 rounded-xl bg-off-white border border-transparent">
# So the Surface Card is ALREADY fixed in HTML!

# 6. Sidebar shadow mismatches
# The audit mentions rgba(16,24,40,... in a table. Let's fix that globally if it exists.
html = re.sub(r'rgba\(16,24,40,', r'rgba(32,31,29,', html)

# 7. JS bug .side-nav -> #sideNav
# Checking view_file lines 2676: `const navLinks = document.querySelectorAll('#sideNav a');`
# It's already fixed in JS! But let's replace any lingering .side-nav just in case.
html = html.replace("document.querySelector('.side-nav')", "document.querySelector('#sideNav')")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated successfully")
