// Middleware disabled - using default user system
// No authentication required for development
export default function middleware() {
  // Pass through - no authentication checks
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


