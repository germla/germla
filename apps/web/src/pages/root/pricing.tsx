import Seo from "@/components/SEO";
import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function Pricing() {
  const [annually, setAnnually] = useState(true);
  return (
    <>
      <Seo title="Pricing" description="Pricing for Germla." />
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden ">
          <div className="absolute left-2/4 top-0 flex aspect-square w-2/6 -tranzinc-x-2/4 -tranzinc-y-2/4 items-center justify-center">
            <div className="pricing-gradient absolute inset-0 rounded-full bg-indigo-500 opacity-50 blur-[120px]" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
              <div>
                <div className="inline-flex bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text pb-3 font-medium text-transparent">
                  Pricing Plans
                </div>
                <h2 className="pricing-heading bg-gradient-to-r from-zinc-950/60 via-zinc-950 to-zinc-950/60 bg-clip-text pb-4 text-transparent">
                  Flexible plans and features
                </h2>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute bottom-0 left-2/3 -mb-20 -tranzinc-x-2/4 opacity-70 backdrop-blur-[40px]" />
              <div className="pricing-tabs c6kmo c0wh7 c1zsb cyara cdaqh cy78w cn9ih c11pb c3508 c9hqb cz5uy c7xar cb7qe csixx coqyr czetz ci38e c0im3 cvvj2 clijk c5zlb cp28w ckam3 cazi3 cthht c7z5n chaby cpa4l ccmry ctdge grid md:grid-cols-5">
                {/* Pricing Toggle */}
                <div className="flex flex-col items-center justify-end bg-transparent px-6 py-10">
                  <div className="border-zinc-200 pb-5 md:border-b">
                    <Switch.Group>
                      <div className="flex items-center">
                        <Switch.Label className="mr-4" passive>
                          Monthly
                        </Switch.Label>
                        <Switch
                          checked={annually}
                          onChange={setAnnually}
                          className={`${
                            annually ? "bg-indigo-500" : "bg-zinc-300"
                          } relative flex h-6 w-11 cursor-pointer items-center rounded-full outline-zinc-400 transition-colors duration-150`}>
                          <span
                            className={`${
                              annually ? "tranzinc-x-6" : "tranzinc-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                        <Switch.Label className="ml-4" passive>
                          Yearly
                        </Switch.Label>
                      </div>
                    </Switch.Group>
                  </div>
                </div>
                {/* Pricing Card Free */}
                <div className="flex flex-col justify-end border-r border-zinc-200 bg-white/75 px-6 py-6 md:rounded-tl-3xl">
                  <div className="mb-4 flex-grow border-b border-zinc-200 pb-4">
                    <div className="inline-flex bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                      Free
                    </div>
                    <div className="mb-1">
                      <span className="dollar-sign font-medium text-zinc-500">$</span>
                      <span className="price font-bold text-zinc-800">{annually ? 0 : 0}</span>
                      <span className="font-medium text-zinc-500">{annually ? "/yr" : "/mo"}</span>
                    </div>
                  </div>
                </div>
                {/* Pricing Card Basic */}
                <div className="mt-5 flex flex-col justify-end bg-white/75 px-6 py-6 md:mt-0">
                  <div className="mb-4 flex-grow border-b border-zinc-200 pb-4">
                    <div className="inline-flex bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                      Basic
                    </div>
                    <div className="mb-1">
                      <span className="dollar-sign font-medium text-zinc-500">$</span>
                      <span className="price font-bold text-zinc-800">{annually ? 0 : 0}</span>
                      <span className="font-medium text-zinc-500">{annually ? "/yr" : "/mo"}</span>
                    </div>
                  </div>
                </div>
                {/* Pricing Card Pro */}
                <div className="mt-5 flex flex-col justify-end bg-white/75 px-6 py-6 md:mt-0 md:border-l-2 md:border-r-2 md:border-t-2 md:border-indigo-500">
                  <div className="mb-4 flex-grow border-b border-zinc-200 pb-4">
                    <div className="inline-flex bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                      Pro
                    </div>
                    <div className="mb-1">
                      <span className="dollar-sign font-medium text-zinc-500">$</span>
                      <span className="price font-bold text-zinc-800">{annually ? 0 : 0}</span>
                      <span className="font-medium text-zinc-500">{annually ? "/yr" : "/mo"}</span>
                    </div>
                  </div>
                </div>
                {/* Pricing Card Business */}
                <div className="mt-5 flex flex-col justify-end bg-white/75 px-6 py-6 md:mt-0 md:rounded-tr-3xl">
                  <div className="mb-4 flex-grow border-b border-zinc-200 pb-4">
                    <div className="inline-flex bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                      Business
                    </div>
                    <div className="mb-1">
                      <span className="dollar-sign font-medium text-zinc-500">$</span>
                      <span className="price font-bold text-zinc-800">{annually ? 0 : 0}</span>
                      <span className="font-medium text-zinc-500">{annually ? "/yr" : "/mo"}</span>
                    </div>
                  </div>
                </div>
                {/* Feedback */}
                <div className="hidden flex-col justify-end bg-transparent px-6 md:flex">
                  <div className="mt-4 py-2 text-sm font-medium">Feedback</div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6 md:border-r md:border-zinc-200">
                  <div className="mt-4 py-2 font-medium text-zinc-500 md:hidden">Feedback</div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6">
                  <div className="mt-4 py-2 font-medium text-zinc-500 md:hidden">Feedback</div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6 md:border-l-2 md:border-r-2 md:border-indigo-500">
                  <div className="mt-4 py-2 font-medium text-zinc-500 md:hidden">Feedback</div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6">
                  <div className="mt-4 py-2 font-medium text-zinc-800 md:hidden">Feedback</div>
                </div>
                {/* Sentiment Analysis */}
                <div className="hidden flex-col justify-end bg-transparent px-6 md:flex">
                  <div className="border-b border-zinc-300 py-2 text-sm font-medium">
                    Sentiment Analysis
                  </div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6 md:border-r md:border-zinc-200">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6 md:border-l-2 md:border-r-2 md:border-indigo-500">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-end bg-white/75 px-6">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="hidden flex-col justify-end bg-transparent px-6 pb-6 md:flex">
                  <div className="border-b border-zinc-300 py-2 text-sm font-medium">
                    Sentiment Analysis
                  </div>
                </div>
                <div className="flex flex-col justify-end rounded-bl-3xl rounded-br-3xl bg-white/75 px-6 pb-6 md:rounded-br-none md:border-r md:border-zinc-200">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-end rounded-bl-3xl rounded-br-3xl bg-white/75 px-6 pb-6 md:rounded-bl-none md:rounded-br-none">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-end rounded-bl-3xl rounded-br-3xl bg-white/75 px-6 pb-6 md:rounded-bl-none md:rounded-br-none md:border-b-2 md:border-l-2 md:border-r-2 md:border-indigo-500">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-end rounded-bl-3xl rounded-br-3xl bg-white/75 px-6 pb-6 md:rounded-bl-none">
                  <div className="mt-4 border-b border-zinc-300 py-2 font-medium text-zinc-500">
                    <svg
                      className="mr-3 flex-shrink-0 fill-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="9">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
