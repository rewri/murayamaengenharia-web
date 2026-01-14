export default function PortfolioListSection() {
  return (
    <div className="flex gap-3 flex-wrap border-b border-[#f0f2f4] dark:border-gray-800 pb-6">
      <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-5 transition-transform hover:scale-105 active:scale-95 shadow-sm">
        <span className="text-sm font-bold leading-normal">Todos</span>
      </button>
      <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 px-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <span className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
          Residencial
        </span>
      </button>
      <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 px-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <span className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
          Comercial
        </span>
      </button>
      <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 px-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <span className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
          Industrial
        </span>
      </button>
      <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-[#e5e7eb] dark:border-gray-700 px-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <span className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
          Infraestrutura
        </span>
      </button>
    </div>
  );
}
