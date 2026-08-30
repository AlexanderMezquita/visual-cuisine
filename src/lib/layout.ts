// Shared by the header's centered content and its absolutely-positioned
// controls overlay, so both always line up with the footer's own container.
export const CONTAINER_WIDTH_CLASS = "mx-auto max-w-6xl px-6";

// Wider than CONTAINER_WIDTH_CLASS, deliberately — used by content (like the
// gallery) that should read bigger than the header/footer's text column.
export const WIDE_CONTAINER_CLASS = "mx-auto w-full max-w-[88rem] px-3 sm:px-6";
