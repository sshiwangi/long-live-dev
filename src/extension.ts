import * as vscode from "vscode";
import { TimeTracker } from "./timetracker";
import { StatusBarManager } from "./statusbarmanager";

console.log("Extension loading...");

let timeTracker: TimeTracker;
let statusBarManager: StatusBarManager;

// Create output channel for logging
const outputChannel = vscode.window.createOutputChannel("Long Live Dev");

export function activate(context: vscode.ExtensionContext) {
  console.log("Activating Long Live Dev extension");
  outputChannel.appendLine("Extension is being activated...");

  try {
    // Initialize the time tracker
    timeTracker = new TimeTracker();
    outputChannel.appendLine("TimeTracker initialized successfully");

    // Initialize StatusBarManager
    statusBarManager = new StatusBarManager(timeTracker);
    outputChannel.appendLine("StatusBarManager initialized successfully");

    // Register commands
    let startCommand = vscode.commands.registerCommand(
      "longlivedev.startTimer",
      () => {
        try {
          timeTracker.start();
          vscode.window.showInformationMessage("Timer started!");
          outputChannel.appendLine("Timer started successfully");
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to start timer: ${error}`);
          outputChannel.appendLine(`Error starting timer: ${error}`);
        }
      }
    );

    let pauseCommand = vscode.commands.registerCommand(
      "longlivedev.pauseTimer",
      () => {
        try {
          timeTracker.pause();
          vscode.window.showInformationMessage("Timer paused!");
          outputChannel.appendLine("Timer paused successfully");
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to pause timer: ${error}`);
          outputChannel.appendLine(`Error pausing timer: ${error}`);
        }
      }
    );

    let resetCommand = vscode.commands.registerCommand(
      "longlivedev.resetTimer",
      () => {
        try {
          timeTracker.reset();
          vscode.window.showInformationMessage("Timer reset!");
          outputChannel.appendLine("Timer reset successfully");
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to reset timer: ${error}`);
          outputChannel.appendLine(`Error resetting timer: ${error}`);
        }
      }
    );

    // Add to subscriptions
    context.subscriptions.push(
      startCommand,
      pauseCommand,
      resetCommand,
      statusBarManager
    );
    outputChannel.appendLine("All commands registered successfully");

    // Start timer automatically
    try {
      timeTracker.start();
      outputChannel.appendLine("Timer started automatically on activation");
    } catch (error) {
      outputChannel.appendLine(`Error in auto-start: ${error}`);
    }

    outputChannel.appendLine("Extension activated successfully!");
    vscode.window.showInformationMessage("Long Live Dev is now active!");
  } catch (error) {
    outputChannel.appendLine(`Error during activation: ${error}`);
    vscode.window.showErrorMessage(
      "Failed to activate Long Live Dev extension"
    );
  }
}

export function deactivate() {
  outputChannel.appendLine("Extension is being deactivated...");
  try {
    timeTracker.pause();
    outputChannel.appendLine("Timer paused during deactivation");
  } catch (error) {
    outputChannel.appendLine(`Error during deactivation: ${error}`);
  }
  outputChannel.appendLine("Extension deactivated");
}
