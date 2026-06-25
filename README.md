# Fomi — AI Visual Content Curation & Generation Board

Welcome to the frontend technical assessment implementation for **Tarum's Fomi platform** — a next-generation AI creative workbench built with Next.js, React, Tailwind CSS v4, and Framer Motion. 

This implementation is designed to meet and exceed all requirements of the developer technical assessment, featuring two unique visual directions: a minimalist warm-cream editorial portfolio theme (inspired by **Pinterest** and **Apple** brand design) and a luxury dark mode theme.

---

## Architectural Design Decisions & Themes

We established a dynamic system that allows users to toggle between two highly curated visual layouts at runtime:

### 1. Light Mode: Warm Minimalist Editorial Portfolio (Pinterest x Apple)
* **Color Canvas**: Warm alabaster cream vellum (`#FAF8F5`) with crisp charcoal-black ink typography (`#121212`) and thin gray boundaries (`rgba(18, 18, 18, 0.08)`).
* **Grid Layout**: Fluid, grid-centric spacing where content is the focal point. Card summaries hover as elegant frosted glass tags rather than heavy background gradients.
* **Notebook Texture**: A static architectural dot-grid background (`.bg-dot-grid`) with a subtle film noise overlay, framing the screen with a 24px artboard frame border.

### 2. Dark Mode: Luxury Exhibition Gallery (Black & Gold)
* **Color Canvas**: Rich obsidian matte black (`#0B0B0C`) with high-contrast ivory text (`#F7F4EE`) and subtle gold/copper indicators.
* **Contrast & Boundaries**: Deep card containers (`#1C1C1E`) with low-opacity borders (`rgba(247, 244, 238, 0.08)`).
* **Grid Texture**: Darkened, ultra-subtle architectural grid dot overlay suited for cinematic visuals.

### 3. AI Copylines Sanitization
We replaced typical tech jargon and glowing SaaS wrapper buzzwords with industry creative agency copy:
* *Next Gen Creative Engine* **Studio Board v2.5**
* *The Studio Workspace*  **Visual Workspace**
* *Explore Visual Latencies* **Explore Curated Feed**
* *Latent Space Synthesis* **Visual Curation & Reference Boards**

---

##  Key Platform Features

1. **Visual Workspace Generator**: A split layout control panel modeled after Lightroom and Figma. Allows users to write subject inputs, toggle between image/video formats, select aspect ratios (1:1, 16:9, 4:5, 9:16), choose camera film stocks (35mm, Brutalism, Studio Portraits), and customize rendering speeds.
2. **Dynamic Mock Curation API**: Runs on `/api/generate` and hooks into a mock database utility to return actual simulated images or high-definition loops depending on format selection.
3. **Curated Showcase**: A masonry grid feed displaying variable height cards. On hover, details slide in as frosted gallery labels, allowing users to copy seeds and prompt directions to their clipboard.
4. **Detail Resolution Slider (Upscaler)**: An interactive vertical comparison slider comparing standard and upscaled frames with a minimalist dividing line and grab handles.
5. **Direct Typography Carousel**: Client reviews structured directly on the canvas as spacious typography quotation slides with indicator dots and transition controls.



##  Running the Project Locally

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### 1. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Development Server
Run the local hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Production Build
Ensure code compiles cleanly and builds optimized bundles:
```bash
npm run build
```
Start the compiled production server:
```bash
npm run start
```

---

##  Responsiveness & Verification

This project is built from a mobile-first philosophy and is fully responsive at all major breakpoints:
* **Mobile (320px - 640px)**: Columns stack cleanly, control sidebars collapse into vertical blocks, font sizes shrink proportionally, and header navigates via a slide-in drawer.
* **Tablet (768px - 1024px)**: Workspace maps side-by-side using grids, and features adapt to alternating inline components.
* **Desktop (1024px - 1440px)**: Double-column split workspace, masonry grid showcases, and full-resolution compare slider.
* **Large Screens (1440px+)**: Maximized grid layouts capped inside a `max-w-7xl` container to prevent visual stretch.


