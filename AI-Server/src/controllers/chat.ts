
import { NextFunction, Request, Response } from "express";
import { responseSuccess } from "../utils/JsonResponse";
import { getAns } from "../scripts/chatMilvus";


export const chat = async (_req: Request, res: Response, next: NextFunction) => {
    /* Name of directory to retrieve your files from */
    try {
        //embed the PDF documents
        // const question = "What I need to get the loan?";
        // const question = _req.query.query;
        const question = _req.body.prompt;
        const source_count = _req.body.k;
        const bank_name = _req.body.bank_name;
        let history: any[] = [];
        const answer = await getAns(question, history, source_count, bank_name)
        const result_data = {
            'text': "answer from api.",
            'result': answer
        }
        // console.log("=======query: ", answer)
        return responseSuccess(res, 'success', 'result', answer);
      } catch (e) {
        console.log('error', e);
        next(e);
      }
}


// export OPENAI_API_KEY=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
// export MILVUS_URL=http://localhost:19530
// export PINECONE_INDEX_NAME=policy-pal

// sudo docker-compose up -d