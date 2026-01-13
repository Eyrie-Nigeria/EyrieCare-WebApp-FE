"use client";

export function SocialLogins() {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative flex items-center py-2">
        <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
        <span className="shrink-0 mx-4 text-gray-400 dark:text-text-auth-light-green/60 text-sm font-medium">
          Or continue with
        </span>
        <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-border-auth-green/40 bg-white dark:bg-surface-auth-dark py-3 transition-colors hover:bg-gray-50 dark:hover:bg-surface-auth-dark/80 group">
          <img
            alt="Google"
            className="h-5 w-5"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjNAERv_UpXYqvw8pE4OhoegQBJbOBe4F5Fltwl4eoLl90COjxFjuug2jLGV4g62APfeQ1jsKNfHC5HYtnHN_U897odSlno_At0D_99VJcg_Ty8jtBn_ys-rJVQMwGUx0RmUPd0N1q-ruDEYtFGo-h4rBUHJhBOizixLw1WwAYocszkK42Y9Mk1an0kIgvfe3hdb5QTS82J6lJFwlvof4GyOE4lyIuVCu56lyOfB3CRZWNbFTJRZG9qx_Sft1ZuAHdbI-76uEzbZ0"
          />
          <span className="text-sm font-semibold text-gray-700 dark:text-white">
            Google
          </span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-border-auth-green/40 bg-white dark:bg-surface-auth-dark py-3 transition-colors hover:bg-gray-50 dark:hover:bg-surface-auth-dark/80 group">
          <svg
            className="h-5 w-5 text-black dark:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.51 12.09 1.011 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
          </svg>
          <span className="text-sm font-semibold text-gray-700 dark:text-white">
            Apple
          </span>
        </button>
      </div>
    </div>
  );
}
