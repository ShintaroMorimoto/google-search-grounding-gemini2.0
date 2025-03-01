const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const LOCATION = import.meta.env.VITE_LOCATION;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const MODEL_ID = import.meta.env.VITE_MODEL_ID;
const GENERATE_CONTENT_API = import.meta.env.VITE_GENERATE_CONTENT_API;

import { ChatTurn } from '../types/googleSearchGrounding';

const callGemini = async (messages: ChatTurn[]) => {
  const content = {
    contents: messages,
    generationConfig: {
      responseModalities: ['TEXT'],
      temperature: 1,
      maxOutputTokens: 8192,
      topP: 0.95,
    },
    tools: {
      googleSearch: {},
    },
  };

  const response = await fetch(
    `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:${GENERATE_CONTENT_API}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_GOOGLE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(content),
    }
  );
  console.log(response);

  const data = await response.json();
  return data;
};

export default callGemini;
