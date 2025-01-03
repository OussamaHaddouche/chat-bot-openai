# Node AI Project

This project is a Node.js application that integrates AI functionalities. It leverages openAI AI models and libraries to provide intelligent features.

## Prerequisites

Make sure you have Node.js installed on your machine. The minimum required version is Node.js 18.

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

After installing the dependencies, add your OpenAI API key to an `.env` file at the root of the project:

```env
OPENAI_API_KEY=your-api-key-here
```

## Usage

To start the application, use the following commands based on the functionality you want to use:

- To chat with the AI assistant:
  ```bash
  node chat.js
  ```

- To perform semantic search:
  ```bash
  node search.js
  ```

- To ask questions and get answers:
  ```bash
  node qa.js "your question here"
  ```

- To use the AI assistant enhanced with functions:
  ```bash
  node functions.js "your question here"
  ```

## Features

- **Chat with AI assistant**: Engage in natural language conversations with an AI assistant powered by OpenAI's language model.
- **Semantic search prompt**: Perform semantic searches to find relevant information based on the context of your query.
- **QA**: Ask questions and get accurate answers from the AI model.
- **AI assistant enhanced with functions**: Utilize functions to enhance the capabilities of the AI assistant, in this case, to perform complex math or to generate images.
