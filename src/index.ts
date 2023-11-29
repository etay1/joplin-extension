import joplin from 'api';

class HighlightTextPlugin {
    constructor() {
        // The name of your plugin
        this.pluginName = 'Highlight Text Plugin';

        // Register the plugin
        joplin.plugins.register({
            onStart: async () => this.onStart(),
        });
    }

    async onStart() {
        // eslint-disable-next-line no-console
        console.info(`${this.pluginName} started!`);

        // Register the command to highlight selected text
        joplin.commands.register({
            name: `${this.pluginName}.highlightText`,
            label: 'Highlight Selected Text',
            iconName: 'fas fa-highlighter', // Font Awesome highlighter icon
            execute: async () => this.highlightSelectedText(),
        });

        // Bind the command to a keyboard shortcut (optional)
        joplin.commands.bindKey('Ctrl+Alt+H', `${this.pluginName}.highlightText`);
    }

    async highlightSelectedText() {
        try {
            // Get the current editor content
            const editor = await joplin.views.editors.active();
            const selectedText = await editor.selection();

            // Apply the highlighting style
            const highlightedText = `<span style="background-color: yellow;">${selectedText}</span>`;
            await editor.replaceSelection(highlightedText);
        } catch (error) {
            console.error('Error highlighting text:', error);
        }
    }
}

// Create an instance of the plugin
const highlightTextPlugin = new HighlightTextPlugin();

