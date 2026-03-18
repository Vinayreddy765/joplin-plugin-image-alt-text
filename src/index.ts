import joplin from 'api';
import { MenuItemLocation } from 'api/types';

joplin.plugins.register({
  onStart: async () => {

    await joplin.commands.register({
      name: 'generateAltText',
      label: 'Generate Alt Text (AI)',
      execute: async () => {

        const note = await joplin.workspace.selectedNote();

        if (!note) {
          await joplin.views.dialogs.showMessageBox("No note selected.");
          return;
        }

        const body = note.body;

        // Find image resource IDs inside the note
        const imageMatches = [...body.matchAll(/\(:\/([a-f0-9]{32})\)/g)];

        if (imageMatches.length === 0) {
          await joplin.views.dialogs.showMessageBox("No images found in this note.");
          return;
        }

        let updatedBody = body;

        for (const match of imageMatches) {

          const resourceId = match[1];

          // Get image binary
          const file: any = await joplin.data.get(['resources', resourceId, 'file']);

          const base64 = Buffer.from(file.body).toString('base64');

          // Send to Ollama
          const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            body: JSON.stringify({
              model: 'llava',
              prompt: "Generate a short accessibility alt-text description of this image in one concise sentence.",
              images: [base64],
              stream: false
            })
          });

          const result = await response.json();

          const description = String(result.response).trim();

          // Replace the alt text safely
          const regex = new RegExp(`!\\[[^\\]]*\\]\\(:\\/${resourceId}\\)`, "g");

          updatedBody = updatedBody.replace(
            regex,
            `![${description}](:/${resourceId})`
          );

        }

        await joplin.data.put(['notes', note.id], null, {
          body: updatedBody
        });

        await joplin.views.dialogs.showMessageBox("AI alt text generated and inserted!");

      }
    });

    await joplin.views.menuItems.create(
      'generateAltTextMenu',
      'generateAltText',
      MenuItemLocation.Tools
    );

  }
});