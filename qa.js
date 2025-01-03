import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { openai } from "./openai.js";

const question = process.argv[2] || 'hi'
const video = "youtube_url_here"

export const createStore = (docs) =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

export const docsFromYTVideo = async (video) => {
  const loader = YoutubeLoader.createFromUrl(video, {
    language: "en",
    addVideoInfo: true,
  });
  const loadedDoc = await loader.load();
  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 2500,
    chunkOverlap: 100,
  });
  return await splitter.splitDocuments(loadedDoc);
};

export const docsFromPDF = async () => {
  const loader = new PDFLoader("pdf_path_here");
  const loadedDoc = await loader.load();
  const splitter = new CharacterTextSplitter({
    separator: ". ",
    chunkSize: 2500,
    chunkOverlap: 200,
  });
  return await splitter.splitDocuments(loadedDoc);
};

const loadStore = async () => {
  const videoDocs = await docsFromYTVideo(video)
  const pdfDocs = await docsFromPDF()

  return createStore([...videoDocs, ...pdfDocs])
}

const query = async () => {
  const store = await loadStore()
  const results = await store.similaritySearch(question, 2)

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content:
          'You are a helpful AI assistant. Answser questions to your best ability.',
      },
      {
        role: 'user',
        content: `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
        Question: ${question}
  
        Context: ${results.map((r) => r.pageContent).join('\n')}`,
      },
    ],
  })
  console.log(
    `Answer: ${response.choices[0].message.content}\n\nSources: ${results
      .map((r) => r.metadata.source)
      .join(', ')}`
  )
}

query()
