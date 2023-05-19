import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { makeChain } from '../utils/makechain-milvus';
import { PINECONE_NAME_SPACE } from '../config/pinecone';
import { Milvus } from "langchain/vectorstores/milvus";


export const getAns = async (question: string, history: any, source_count: number, bank_name: string) => {
    /*
    Response DS:
    {
        text: Return output text,
        sourceDocuments: [
            Document {
                pageContent: source page content,
                metadata: {
                    'loc.lines.from': 1,
                    'loc.lines.to': 17,
                    pdf_numpages: 2,
                    source: 'xyz.pdf'
                }
            }
        ]
    }
    */
    console.log('question', question);
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

    try {
        /* create vectorstore*/
        // const vectorStore = await PineconeStore.fromExistingIndex(
        // new OpenAIEmbeddings({}),
        // {
        //     pineconeIndex: index,
        //     textKey: 'text',
        //     namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
        // },
        // );
        console.log('=======================coll: ', bank_name, PINECONE_NAME_SPACE, typeof(PINECONE_NAME_SPACE))
        const vectorStore = await Milvus.fromExistingCollection(
            new OpenAIEmbeddings(),
            {
              collectionName: bank_name,
            }
          );
        //create chain
        const chain = makeChain(vectorStore, source_count);
        //Ask a question using chat history
        const response = await chain.call({
        question: sanitizedQuestion,
        chat_history: history || [],
        });

        const d = response.sourceDocuments[0];
        // console.log('response', response);
        return response
        // console.log('response', d.Document.metadata);
    } catch (error: any) {
        console.log('error', error);
    }

}

// try {
//     (async () => {
//         // const question = "What documents do I require for full time income with (insert bank, try all banks)";
//         // const question = "List down all git commands.";
//         const question = "What I need to get the loan?";
//         let history: any[] = [];
//         await getAns(question, history);
//     })();
// } catch(e) {
//     console.log("Error", e);
// }