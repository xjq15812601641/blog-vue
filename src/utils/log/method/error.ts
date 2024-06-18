export function error(message: string) {
  throw new Error(`[${import.meta.env.VITE_GLOB_APP_TITLE} error]:${message}`);
}
