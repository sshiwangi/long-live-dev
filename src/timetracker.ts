export class TimeTracker {
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private isRunning: boolean = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {}

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = Date.now() - this.elapsedTime;
      this.intervalId = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
      }, 1000);
    }
  }

  pause(): void {
    if (this.isRunning && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
    }
  }

  reset(): void {
    this.pause();
    this.elapsedTime = 0;
    this.startTime = 0;
  }

  getFormattedTime(): string {
    const seconds = Math.floor((this.elapsedTime / 1000) % 60);
    const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor(this.elapsedTime / (1000 * 60 * 60));

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  isTimerRunning(): boolean {
    return this.isRunning;
  }
}
