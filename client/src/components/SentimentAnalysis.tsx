export default function SentimentAnalysis() {
  return <div>SentimentAnalysis</div>;
}

// import { useState } from "react";
// import { AzureKeyCredential } from "@azure/ai-text-analytics";
// import { TextAnalysisClient } from "@azure/ai-language-text";
// import { Result, Sentence } from "../interfaces/SentimentResult";

// const SentimentAnalysisComponent = () => {
//   const [results, setResults] = useState<Result | null>([]);
//   const [document, setDocument] = useState("");

//   const analyzeSentiment = async () => {
//     const endpoint = "https://awesomeapp.cognitiveservices.azure.com/";
//     const key = "6a1bd94f29464e5a9a1420ae820aeb23";

//     const client = new TextAnalysisClient(
//       endpoint,
//       new AzureKeyCredential(key)
//     );

//     const documents = [
//       {
//         text: document, // Use the entered text from the state
//         id: "0",
//         language: "en",
//       },
//     ];

//     try {
//       const analysisResults = await client.analyze(
//         "SentimentAnalysis",
//         documents,
//         {
//           includeOpinionMining: true,
//         }
//       );
//       setResults(analysisResults);
//     } catch (error) {
//       console.error("Error analyzing sentiment:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Sentiment Analysis Results</h1>
//       <label>
//         Enter Text:
//         <textarea
//           value={document}
//           onChange={(e) => setDocument(e.target.value)}
//         />
//       </label>
//       <button onClick={analyzeSentiment}>Analyze Sentiment</button>

//       {results?.map((result: Result, index: number) => (
//         <div key={index}>
//           <p>Document {result.id}</p>
//           {!result.error ? (
//             <>
//               <p>Document text: {result.sentences[0].text}</p>
//               <p>Overall Sentiment: {result.sentiment}</p>
//               <p>
//                 Sentiment confidence scores:{" "}
//                 {JSON.stringify(result.confidenceScores)}
//               </p>
//               <p>Sentences:</p>
//               {result.sentences.map(
//                 (sentence: Sentence, sentenceIndex: number) => (
//                   <div key={sentenceIndex}>
//                     <p>Sentence sentiment: {sentence.sentiment}</p>
//                     <p>Sentence text: {sentence.text}</p>
//                     <p>
//                       Confidence scores:{" "}
//                       {JSON.stringify(sentence.confidenceScores)}
//                     </p>
//                     <p>Mined opinions:</p>
//                     {sentence.opinions.map((opinion, opinionIndex) => (
//                       <div key={opinionIndex}>
//                         <p>Target text: {opinion.target.text}</p>
//                         <p>Target sentiment: {opinion.target.sentiment}</p>
//                         <p>
//                           Target confidence scores:{" "}
//                           {JSON.stringify(opinion.target.confidenceScores)}
//                         </p>
//                         <p>Target assessments:</p>
//                         {opinion.assessments.map(
//                           (assessment, assessmentIndex) => (
//                             <div key={assessmentIndex}>
//                               <p>Text: {assessment.text}</p>
//                               <p>Sentiment: {assessment.sentiment}</p>
//                             </div>
//                           )
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )
//               )}
//             </>
//           ) : (
//             <p>Error: {result.error}</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SentimentAnalysisComponent;
