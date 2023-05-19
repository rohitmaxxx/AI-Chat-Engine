import axiosClient from "./axios.client";

export const chatCompletion = async ({ prompt }) => {
  try {
    let bank_name = "";
    bank_name = "pdf_bankw1";
    bank_name = "pdf_all1";
    bank_name = "pdf_adel1";
    const returned_res = await axiosClient.post("chat", { prompt, k: 4, bank_name: bank_name });
    const response = returned_res.result;
    return { response };
  } catch (err) {
    return { err };
  }
};