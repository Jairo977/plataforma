const fs = require('fs');
let css = fs.readFileSync('c:/Users/Dell/Documents/trae_projects/plataforma/oxford-platform/src/app/globals.css', 'utf8');

const lightTheme = `
[data-theme="light"] {
  --oxford-navy:    #f8fafc;
  --oxford-dark:    #ffffff;
  --oxford-surface: #f1f5f9;
  --oxford-card:    rgba(255, 255, 255, 0.9);
  --oxford-border:  rgba(0,0,0,0.1);
  --oxford-border-hover: rgba(0,0,0,0.2);

  --text-primary:   #0f172a;
  --text-secondary: #475569;
  --text-muted:     #64748b;
  --text-gold:      #d97706;

  --gradient-hero:   linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
  --gradient-card:   linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%);
  
  --shadow-sm:   0 2px 8px rgba(0,0,0,0.05);
  --shadow-md:   0 8px 32px rgba(0,0,0,0.08);
  --shadow-lg:   0 24px 64px rgba(0,0,0,0.12);
}
`;

if (!css.includes('[data-theme="light"]')) {
  css = css.replace('}', '}\n' + lightTheme);
  fs.writeFileSync('c:/Users/Dell/Documents/trae_projects/plataforma/oxford-platform/src/app/globals.css', css);
  console.log('Added light theme variables');
}
