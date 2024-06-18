export function warn(message: string) {
  console.warn(`[${import.meta.env.VITE_GLOB_APP_TITLE} warn]:${message}`);
}
