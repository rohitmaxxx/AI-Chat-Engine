import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CustomPDFLoader } from '../utils/customPDFLoader';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../config/pinecone';
import { Milvus } from "langchain/vectorstores/milvus";


/* Name of directory to retrieve your files from */
const filePath = 'docs3';

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    // for (const doc_data in docs) {
    //   docs[doc_data].metadata.id = Number(doc_data)+1
    // }
    // return;
    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    // const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    //embed the PDF documents
    // await PineconeStore.fromDocuments(docs, embeddings, {
    //   pineconeIndex: index,
    //   namespace: PINECONE_NAME_SPACE,
    //   textKey: 'text',
    // });
    const vectorStore = await Milvus.fromDocuments(docs, embeddings, {
      collectionName: PINECONE_NAME_SPACE,
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
