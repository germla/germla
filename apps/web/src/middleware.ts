import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "germla.com";
  const path = url.pathname;
  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.germla.com`, "")
          .replace(`.germla.com:3000`, "")
      : hostname.replace(`.localhost:3000`, "");
  if (currentHost == "app") {
    // if (
    //   url.pathname === "/signup" || url.pathname === "/login" &&
    //   (req.cookies.get("next-auth.session-token") ||
    //     req.cookies.get("__Secure-next-auth.session-token"))
    // ) {
    //   url.pathname = "/";
    //   return NextResponse.redirect(url);
    // }
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Serve base pages from /root
  if (currentHost === "localhost:3000" || currentHost === "platformize.vercel.app") {
    url.pathname = `/root${url.pathname}`;
    return NextResponse.rewrite(url);
  } 

  // rewrite everything else to `/_workspaces/[workspace] dynamic route
  return NextResponse.rewrite(
    new URL(`/_workspaces/${currentHost}${path}`, req.url)
  );
}