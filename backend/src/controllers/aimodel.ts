import { Request, Response } from "express";
import * as natural from "natural";
import cosineSimilarity from "cosine-similarity";
import * as readlineSync from "readline-sync";

export const aimodelController = async (req: Request, res: Response) => {

  // --- Knowledge Base (Corpus) ---
  const corpus: string[] = [
    "Murang’a University offers programs in Computer Science, IT, Engineering, Business, and Education.",
    "Murang’a University is located along the Murang’a–Sagana road, about 1.5 km from Murang’a Town.",
    "Admissions are handled through KUCCPS or direct application via the MUT website: www.mut.ac.ke/admissions.",
    "Fees vary by program, but undergraduate fees start at around Ksh 60,000 per semester.",
    "The university offers on-campus hostels and supports nearby private accommodations for students.",
    "You can contact MUT via email at info@mut.ac.ke or call +254 712 345 678.",
    "The vision of Murang’a University is 'To be a leading University in Technological Innovation for Prosperity.'",
    "The mission of MUT is 'To advance knowledge and technological transfer through teaching, training, research, and innovation for sustainable development.'",
  ];

  // --- Greetings ---
  const greetings = ["hello", "hi", "hey", "good morning", "good afternoon"];
  const greetResponses = [
    "Hello there! 😊",
    "Hi! How can I assist you today?",
    "Hey! What would you like to know about Murang’a University?",
  ];

  // --- Helper: Greet Detection ---
  function greet(sentence: string): string | undefined {
    for (const word of sentence.split(" ")) {
      if (greetings.includes(word.toLowerCase())) {
        return greetResponses[
          Math.floor(Math.random() * greetResponses.length)
        ];
      }
    }
  }

  // --- Cosine Similarity Based Response ---
  const tfidf = new natural.TfIdf();
  corpus.forEach((text) => tfidf.addDocument(text));

  function aiResponse(userInput: string): string {
    // Convert user input into vector
    const userVector: number[] = [];
    const vocabulary = tfidf.documents
      .flatMap((doc: any) => Object.keys(doc))
      .filter((v, i, a) => a.indexOf(v) === i);

    vocabulary.forEach((term) => {
      const tfidfValue = tfidf.tfidf(term, corpus.length - 1);
      userVector.push(tfidfValue);
    });

    let bestScore = 0;
    let bestResponse =
      "I'm not sure about that. Could you please rephrase or ask about courses, fees, or admissions?";

    corpus.forEach((doc, index) => {
      const docVector: number[] = [];
      vocabulary.forEach((term) => {
        docVector.push(tfidf.tfidf(term, index));
      });

      const similarity = cosineSimilarity(userVector, docVector);
      if (similarity > bestScore) {
        bestScore = similarity;
        bestResponse = doc;
      }
    });

    return bestResponse;
  }

  while (true) {
    const userInput = readlineSync.question("You: ").toLowerCase();

    if (userInput === "bye") {
      res.status(200).send({ message: "Goodbye! 👋" });
      break;
    }

    const greetMsg = greet(userInput);
    if (greetMsg) {
      res.status(200).send({ message: greetMsg });
    } else {
      res.status(200).send({ message: aiResponse(userInput) });
    }
  }
};
