import * as vscode from "vscode";
import { TimeTracker } from "./timetracker";

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private timeTracker: TimeTracker;

  constructor(timeTracker: TimeTracker) {
    this.timeTracker = timeTracker;
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
    this.statusBarItem.show();
    this.startUpdateLoop();
  }

  private startUpdateLoop() {
    // Update every second
    setInterval(() => {
      this.updateStatusBar();
    }, 1000);
  }

  private updateStatusBar() {
    const icon = this.timeTracker.isTimerRunning()
      ? "$(debug-pause)"
      : "$(play)";
    this.statusBarItem.text = `${icon} ${this.timeTracker.getFormattedTime()}`;

    // Make it clickable to toggle timer
    this.statusBarItem.command = this.timeTracker.isTimerRunning()
      ? "longlivedev.pauseTimer"
      : "longlivedev.startTimer";

    this.statusBarItem.tooltip = this.timeTracker.isTimerRunning()
      ? "Click to pause timer"
      : "Click to start timer";
  }

  dispose() {
    this.statusBarItem.dispose();
  }
}
