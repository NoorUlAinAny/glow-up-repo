import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";


const BASEURL = "http://127.0.0.1:5000";
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API key. Set REACT_APP_GEMINI_API_KEY in your .env");
}
const genAI = new GoogleGenerativeAI(apiKey);


export interface AnalyzeResponse {
  [key: string]: any;
}

export const analyze = async (imageFile: File): Promise<AnalyzeResponse> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("model", 'multi_output');
    // formData.append("model", 'single_output');

    const response = await axios.post<AnalyzeResponse>(`${BASEURL}/analyze`, formData, {
      headers: {"Content-Type": "multipart/form-data"},
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
