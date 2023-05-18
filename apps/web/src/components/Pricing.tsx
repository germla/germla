type Pricing = "monthly" | "annually";

export default function Pricing({ type }: { type: Pricing }) {
  return (
    <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-6">
      <div className="mx-auto flex w-80 max-w-lg flex-col rounded-lg border border-gray-100 bg-gradient-to-r from-slate-800/50 to-slate-800/20 p-6 text-left text-gray-900 shadow dark:border-gray-600 dark:text-white xl:p-8">
        <h3 className="mb-2.5 justify-start text-2xl font-semibold">Starter</h3>
        <div className="mb-4">
          <div className="inline-flex items-baseline justify-center">
            <span className="font-primary mr-2 text-5xl font-extrabold">$0</span>
          </div>
          <div className="text-sm text-slate-400">/month - billed {type}</div>
        </div>
        <span className="mb-3 text-sm font-medium text-slate-200">For trying out the software</span>
        <ul role="list" className="mb-12 flex-grow space-y-3 text-sm text-slate-400">
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>50 feedback requests</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>3 Boards (Public)</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>3 members</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Any 3 integrations</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Subdomain of your choice</span>
          </li>
        </ul>
      </div>
      <div className="mx-auto flex w-80 max-w-lg flex-col rounded-lg border border-gray-100 bg-gradient-to-r from-slate-800/50 to-slate-800/20 p-6 text-left text-gray-900 shadow dark:border-gray-600 dark:text-white xl:p-8">
        <h3 className="mb-2.5 justify-start text-2xl font-semibold">Plus</h3>
        <div className="mb-4">
          <div className="inline-flex items-baseline justify-center">
            <span className="font-primary mr-2 text-5xl font-extrabold">
              ${type == "monthly" ? "12" : "10"}
            </span>
          </div>
          <div className="text-sm text-slate-400">/month - billed {type}</div>
        </div>
        <span className="mb-3 text-sm font-medium text-slate-200">
          For individual entrepreneurs
        </span>
        <ul role="list" className="mb-12 flex-grow space-y-3 text-sm text-slate-400">
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>{type === "monthly" ? "100" : "120"} feedback requests</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>{type === "monthly" ? "5" : "7"} Boards (Can be Public/Private)</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>{type === "monthly" ? "5" : "7"} members</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Any {type === "monthly" ? "10" : "15"} integrations</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Subdomain of your choice</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Webhooks</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Custom domain</span>
          </li>
        </ul>
      </div>
      <div className="mx-auto flex w-80 max-w-lg flex-col rounded-lg border border-gray-100 bg-gradient-to-r from-slate-800/50 to-slate-800/20 p-6 text-left text-gray-900 shadow dark:border-gray-600 dark:text-white xl:p-8">
        <h3 className="mb-2.5 justify-start text-2xl font-semibold">Pro</h3>
        <div className="mb-4">
          <div className="inline-flex items-baseline justify-center">
            <span className="font-primary mr-2 text-5xl font-extrabold">
              ${type === "monthly" ? "125" : "110"}
            </span>
          </div>
          <div className="text-sm text-slate-400">/month - billed {type}</div>
        </div>
        <span className="mb-3 text-sm font-medium text-slate-200">For scaling businesses</span>
        <ul role="list" className="mb-12 flex-grow space-y-3 text-sm text-slate-400">
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Unlimited feedback requests</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Unlimited Boards</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Unlimited members</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Unlimited integrations</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Subdomain of your choice</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Custom Domain</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Webhooks</span>
          </li>
          <li className="flex items-center">
            <svg
              className="mr-3 h-3 w-3 flex-shrink-0 fill-current text-green-300"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <span>Priority Support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
