export const IntegrationGuideCard = ({ href, title, src, alt, children }) => (
  <a
    href={href}
    className="not-prose my-2 block w-full overflow-hidden rounded-2xl border border-gray-950/10 bg-white no-underline hover:border-primary dark:border-white/10 dark:bg-background-dark dark:hover:border-primary-light"
  >
    <img src={src} alt={alt} noZoom className="block w-full object-cover object-center" />
    <div className="px-6 py-5">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h2>
      <div className="mt-1 text-base leading-6 text-gray-600 dark:text-gray-400">{children}</div>
    </div>
  </a>
)
