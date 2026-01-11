# EyrieCare Web App

EyrieCare is a modern medical student education platform designed to master clinical cases and facilitate collaboration.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Eyrie-Nigeria/eyriecare-webapp-fe.git
   cd eyriecare-webapp-fe
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contribution Workflow

We follow a strict branching model to maintain code quality and stability.

## 📄 Pull Request Template

Please use our [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) when submitting a PR.

### 1. Initial Setup

Ensure you are always working with the latest code from the `dev` branch.

```bash
git checkout dev
git pull origin dev
```

### 2. Create a Feature Branch

Always create your branches from `dev`. Use a descriptive name (e.g., `feat/login-page`, `fix/header-alignment`).

```bash
git checkout -b your-branch-name
```

### 3. Development

Make your changes following the project's coding standards.

- Use TypeScript for all new code.
- Ensure proper linting (`npm run lint`).
- Verify types (`npm run type-check`).

### 4. Commit Changes

Use clear and descriptive commit messages.

```bash
git add .
git commit -m "feat: add clinical dashboard section"
```

### 5. Pull Request (PR)

Push your branch and open a Pull Request targeting the **`dev`** branch.

```bash
git push origin your-branch-name
```

- **Target Branch**: Always target `dev`.
- **Review**: Await feedback and make necessary adjustments.
- **Merge**: Once approved, the PR will be merged into `dev`.

## 📜 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler checks

## 🧪 Quality Checks Before Commit/PR

Before pushing or opening a Pull Request, please ensure you have run and passed all of the following:

- **Lint:**  
   `npm run lint`
- **Format Check:**  
   `npm run format -- --check`
- **Type Check:**  
   `npm run type-check`
- **Build:**  
   `npm run build`
- **Tests (if available):**  
   `npm test`
- **Security Audit (optional):**  
   `npm audit --audit-level=moderate`

> **Tip:** Pre-commit hooks (Husky + lint-staged) will automatically lint and format staged files on commit.

## 🛡️ Continuous Integration

All Pull Requests and pushes to `main`, `dev`, `staging`, and all branches are automatically checked by GitHub Actions for:

- Linting
- Formatting
- Type checking
- Build
- Tests (if present)
- Security audit

---

Built with ❤️ for Medical Excellence.
