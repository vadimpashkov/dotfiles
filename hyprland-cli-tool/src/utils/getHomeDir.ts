export function getHomeDir() {
  return (process.env.HOME || process.env.USERPROFILE) as string;
}
