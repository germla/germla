import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
      <div className="max-w-xl mx-auto lg:max-w-screen-xl">
        <div className="mb-16 lg:max-w-lg lg:mb-0">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-indigo-500 uppercase rounded-full bg-teal-accent-400">
                Manage your business with ease
              </p>
            </div>
            <h1 className="mx-auto max-w-4xl font-display text-3xl font-medium tracking-tight dark:text-zinc-100 text-zinc-900 sm:text-5xl">
              Customer experience{" "}
              <span className="relative whitespace-nowrap text-indigo-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute top-2/3 left-0 h-[0.58em] w-full fill-indigo-400/95"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative">just got enhanced</span>
              </span>{" "}
              for businesses.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight dark:text-zinc-200 text-zinc-700">
              Collect feedback and turn your customers into your biggest fans.
              We are here to help you grow your business. Get started today!
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center rounded-full transition-colors py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-zinc-100 active:bg-zinc-800 active:text-zinc-300 focus-visible:outline-zinc-900"
            >
              Get started
            </Link>
            <Link
              href={"https://feedback.resultism.com"}
              aria-label=""
              className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-zinc-200 text-zinc-700 hover:text-zinc-900 dark:text-white hover:ring-zinc-300 dark:hover:ring-zinc-200 active:bg-zinc-100 active:text-zinc-600 focus-visible:outline-blue-600 focus-visible:ring-zinc-300"
            >
              Demo
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
        <Image
          src="https://kitwind.io/assets/kometa/full-browser.png"
          className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
          alt=""
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};
