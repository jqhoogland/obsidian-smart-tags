import { App, Editor, MarkdownView, Modal, Plugin, PluginSettingTab } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	config: {
		enumerations: {
			primary: string[][],
			secondary: string[][]
		},
		aliases: Record<string, string[]>,
		types: Record<string, string[]>
	}
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	config: {
		enumerations: {
			primary: [
				[
					"m1",
					"m2",
					"m3"
				],
				[
					"s1",
					"s2",
					"s3"
				],
				[
					"c1",
					"c2",
					"c3"
				]
			],
			secondary: [
				[
					"m1",
					"s1",
					"c1"
				],
				[
					"m2",
					"s2",
					"c2"
				],
				[
					"m3",
					"s3",
					"c3"
				]
			]
		},
		aliases: {
			book: [
				"📕"
			],
			movie: [
				"🎬"
			],
			science: [
				"💭",
				"Sciences",
				"Science",
				"sciences"
			]
		},
		types: {
			type: [
				"book",
				"movie",
				"article"
			]
		}
	}
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

	}
}
