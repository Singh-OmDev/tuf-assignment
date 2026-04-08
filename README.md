# 📅 Interactive Wall Calendar - Frontend Challenge

A polished, high-fidelity React/Next.js calendar component that bridges the gap between a physical wall calendar and a modern digital planning tool. Built as part of a Frontend Engineering Challenge.

![Calendar Desktop Preview](https://via.placeholder.com/900x600?text=Interactive+Wall+Calendar+Desktop+View)

## 🚀 Key Features

### **🎨 Physical Wall Aesthetic**
- **Tactile Details**: spiral binder rings at the top with realistic shadows and paper textures.
- **Dynamic Imagery**: High-resolution hero sections that serve as the visual anchor.
- **Geometric Design**: Custom CSS `clip-path` overlays for a clean, modern transition between imagery and interactive grid.

### **✨ Interactive Range Selector**
- **Fluid Selection**: Click a start and end date to define an interval.
- **Visual Sweep**: Real-time highlighting of intermediate days during selection.
- **Persistence**: Selections are saved to `localStorage`, so your plans persist across sessions.

### **📓 Integrated Dual-Notes System**
- **Lined Paper UI**: A "General Memos" section styled like authentic ruled paper.
- **Per-Date Journaling**: A "Daily Note" system that allows unique logs for every single date in the month.
- **Auto-Save**: Everything you type is persisted instantly without a backend.

### **🌈 Premium Experience**
- **Theme Switching**: Toggle between **Adventure** (Mountain Blue), **Forest** (Teal), and **Sunset** (Warm Orange) palettes.
- **Holiday System**: Pre-loaded 2026 holiday markers (e.g., Earth Day) with custom icons.
- **PDF/Print Engine**: Optimized `@media print` styles for generating professional-grade wall calendar printouts.
- **Animations**: Subtle 3D "flip-in" transition on page load for a physical feel.

---

## 🛠️ Technical Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (for maximum design control and flexibility)
- **Date Logic**: [date-fns](https://date-fns.org/)
- **State**: React Hooks (useState, useEffect) with LocalStorage sync

---

## 📦 Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/interactive-calendar.git
cd interactive-calendar
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Run the development server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🎨 Design Decisions

- **Why Vanilla CSS?**: To achieve the highly specific "Wall Calendar" aesthetic (rings, geometric cuts, paper textures), Vanilla CSS Modules were chosen over Tailwind to ensure pixel-perfect control and to demonstrate deep CSS architecture skills.
- **Responsive Strategy**: The layout uses CSS Grid to seamlessly pivot from a side-by-side Desktop view to a vertically stacked Mobile view without losing feature parity.
- **Zero Backend**: To focus purely on frontend engineering, persistence is handled via `localStorage`, making the app fully functional and portable.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
