import React, { useEffect, useState } from "react";
import Modal from ".";
import { getGeminiResponse } from "../../api";
import Mockrecommendation from "../mockrecommentation";
import HTMLRenderer from "../renderer";
import Loader from "../loader";
import Button from "../button";
import { CheckCircle, XCircle, Info } from "lucide-react";

interface Props {
  shown: boolean;
  results: Record<string, number>;
  close: () => void;
}

const ResultModal: React.FC<Props> = ({ shown, close, results }) => {
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendations, setRecommendations] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  


  useEffect(() => {
    if (showRecommendation && Object.keys(results).length > 0) {
      setLoading(true);
      setError(false);

      getGeminiResponse(generateSkincarePrompt(results))
        .then((res) => {
          setRecommendations(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [showRecommendation, results]);

  return (
    <Modal shown={shown} close={close} title=" Your Skin Analysis Report ">

      <table className="table table-hover table-bordered align-middle shadow-sm rounded-3" >
        <thead className="table-primary">
          <tr>
            <th scope="col" style={{ width: "35%" }}>Labels</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
    {Object.entries(results).length === 0 ? (
      <tr>
        <td colSpan={2} className="text-center text-muted">
          <Info size={18} className="me-2 text-secondary" />
          No data available
        </td>
      </tr>
    ) : (
      Object.entries(results).map(([key, value]) => (
        <tr key={key} className="align-middle">
          <th scope="row" className="fw-semibold text-primary">
            <CheckCircle size={18} className="me-2 text-success" />
            {key}
          </th>
          <td>
            {typeof value === "string" ?  (
              <span className="text-danger fw-medium">
                <XCircle size={18} className="me-2 text-danger" />
                {value}
              </span>
            ) : (
              <span className="text-dark">{value}</span>
            )}
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
      {!showRecommendation && (
        <div className="mt-3 text-center">
          <Button onClick={() => setShowRecommendation(true)}>
            Do you want to get recommendation?
          </Button>
        </div>
      )}

      {showRecommendation && (
        <div className="mt-4  text-success text-center">
          <h3>𝙿𝚎𝚛𝚜𝚘𝚗𝚊𝚕𝚒𝚣𝚎𝚍 𝚂𝚔𝚒𝚗𝚌𝚊𝚛𝚎 𝚁𝚎𝚌𝚘𝚖𝚖𝚎𝚗𝚍𝚊𝚝𝚒𝚘𝚗 👇</h3>
          {loading ? (
            <Loader />
          ) : error ? (
            <Mockrecommendation />
          ) : (
            <HTMLRenderer
              htmlString={recommendations
                .replace(/```/g, "")
                .replace("html", "")}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ResultModal;

export function generateSkincarePrompt(results: Record<string, number>): string {
  return `
You are a skincare expert.
I will give you the results of a skin analysis in the form of a JSON object, where:
- The keys represent different skin conditions (e.g., wrinkles, acne, dryness, dark_spots, redness, oiliness, etc.).
- The values represent the confidence/probability (from 0 to 1) that the condition is present.

Your task is to:
1. Analyze the object and identify the top 2–3 most significant conditions (highest probabilities).
2. Suggest a personalized skincare routine (morning and night) tailored to these conditions and at home  how can you 
resolve your  face skin problems  by remedies.
3. Recommend specific types of skincare products (not brand names, just categories, e.g., "hydrating cleanser," "vitamin C serum," "broad-spectrum sunscreen SPF 50," "retinol cream," etc.).
4. If multiple conditions overlap, prioritize solutions that address them together.
5. Present the answer in plain HTML with  inline bootstrap classes with proper styling.
6. Make sure to return only plain HTML so that the exact response can be used to render output.

Input:
${JSON.stringify(results, null, 2)}
`;
}