
import { NextFunction, Request, Response } from "express";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

import { pinecone } from '../utils/pinecone-client';
import { CustomPDFLoader } from '../utils/customPDFLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '../config/pinecone';
import { responseSuccess } from "../utils/JsonResponse";


export const uploadPdfDoc = async (_req: Request, res: Response, next: NextFunction) => {
    /* Name of directory to retrieve your files from */
    const filePath = 'docs';
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
    
        console.log('creating vector store...');
        /*create and store the embeddings in the vectorStore*/
        const embeddings = new OpenAIEmbeddings();
        const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name
    
        //embed the PDF documents
        const result_data = await PineconeStore.fromDocuments(docs, embeddings, {
          pineconeIndex: index,
          namespace: PINECONE_NAME_SPACE,
          textKey: 'text',
        });
        return responseSuccess(res, 'success', 'result', result_data);
      } catch (e) {
        console.log('error', e);
        next(e);
      }
}