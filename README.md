# AI Image Alt Text Generator (Joplin Plugin)

Proof-of-concept plugin for Joplin that automatically generates accessibility alt text for images using AI vision models.

Developed as part of a proposal for **Google Summer of Code 2026**.

---

## Motivation

Images embedded in Joplin notes often have empty alt text:

![](:/resourceId)

This makes them inaccessible to screen readers and invisible to search.

This plugin automatically generates meaningful alt text descriptions using AI.

---


Workflow:

1. Insert image into Joplin note
2. Run command **Tools → Generate Alt Text (AI)**
3. Plugin analyzes image using AI
4. Generated description inserted as Markdown alt text

Example:

Before PoC: ![Screenshot 2025-05-25 163343.png](:/cb4f2043718048c5931e86e5f1325db3)
After PoC:
![A screenshot of a webpage displaying an image of a pair of sneakers and product information.](:/e74e0355ee6b425eb82f1a1d00b4bce5)

---

## Features

- Detect images inside notes
- Generate AI-based alt text
- Insert alt text into Markdown automatically
- Improve accessibility for screen readers
- Make image content searchable

---

## AI Providers

### Ollama (Local)

- Runs completely on device
- Uses **LLaVA vision model**
- No internet required
- Privacy friendly

### OpenAI (Optional)

- Uses GPT vision models
- Requires API key
- Faster and higher accuracy

---

## Tech Stack

- TypeScript
- Joplin Plugin API
- Ollama (LLaVA)
- OpenAI Vision API

---

## Installation (Development)

Clone the repository:


git clone https://github.com/Vinayreddy765/joplin-plugin-image-alt-text


Build the plugin:


npm install
npm run dist


Then load the plugin in Joplin development mode.

---

## Status

This repository contains a **Proof of Concept implementation** for the project:

**Automatically label images using AI – Joplin GSoC Idea**

---

## Author

Vinay Reddy  
Information Science & Engineering  
Global Academy of Technology, Bengaluru
