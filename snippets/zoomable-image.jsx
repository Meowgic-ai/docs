export const ZoomableImage = ({
  src,
  alt,
  zoomLabel = "Enlarge image",
  closeLabel = "Close image",
}) => {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)
  const closeTimerRef = useRef(null)
  const isClosingRef = useRef(false)

  useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    closeButtonRef.current?.focus()

    return () => {
      window.clearTimeout(closeTimerRef.current)
      dialog.classList.remove("is-closing")
      if (dialog.open) dialog.close()
      isClosingRef.current = false
      triggerRef.current?.focus()
    }
  }, [open])

  const closeImage = () => {
    const dialog = dialogRef.current
    if (!dialog?.open || isClosingRef.current) return

    isClosingRef.current = true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false)
      return
    }

    dialog.classList.add("is-closing")
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 350)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={zoomLabel}
        className="block w-full cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} noZoom className="block h-auto w-full" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        className="toggle-zoom-dialog fixed inset-0 m-0 h-screen max-h-none w-screen max-w-none border-0 bg-black/95 p-6 text-white"
        onCancel={(event) => {
          event.preventDefault()
          closeImage()
        }}
        onClose={() => setOpen(false)}
        onAnimationEnd={(event) => {
          if (event.target === dialogRef.current && isClosingRef.current) {
            setOpen(false)
          }
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeImage()
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="toggle-zoom-panel relative inline-flex items-center justify-center"
            style={{ maxWidth: "min(1100px, calc(100vw - 48px))" }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={closeLabel}
              className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/90 text-white shadow-lg"
              onClick={closeImage}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={src}
              alt={alt}
              noZoom
              className="block max-h-[78vh] max-w-full cursor-zoom-out rounded-lg border border-white/20 object-contain shadow-2xl"
              onClick={closeImage}
            />
          </div>
        </div>
      </dialog>
    </>
  )
}
