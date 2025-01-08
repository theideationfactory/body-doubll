export function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  const parts = [];
  if (hours > 0) parts.push(hours.toString().padStart(2, '0'));
  parts.push(minutes.toString().padStart(2, '0'));
  parts.push(seconds.toString().padStart(2, '0'));

  return parts.join(':');
}

export function parseTimeString(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return (hours * 3600000) + (minutes * 60000);
}

export function calculateDuration(startMs: number | undefined, endMs: number): number {
  if (!startMs) {
    const now = new Date();
    startMs = (now.getHours() * 3600000) + (now.getMinutes() * 60000);
  }
  return endMs > startMs ? endMs - startMs : (24 * 3600000) - startMs + endMs;
}