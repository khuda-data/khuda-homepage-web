import Link from "next/link";

const NOT_FOUND_CONFIG = {
  title: "404",
  message: "Oops! Page not found",
  backToHome: "Return to Home",
} as const;

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{NOT_FOUND_CONFIG.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{NOT_FOUND_CONFIG.message}</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          {NOT_FOUND_CONFIG.backToHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
