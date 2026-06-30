// backend/services/aiService.js
// Wrapper around OpenAI API (or alternative) for generating interview content

import fetch from 'node-fetch';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

const AI_MODEL = process.env.AI_MODEL || 'gemini-1.5-flash';

/**
 * Generic function to call the LLM with a system and user prompt
 * @param {string} systemPrompt - Instructions for the model
 * @param {string} userPrompt - Dynamic user content
 * @returns {Promise<string>} - Model generated text
 */
export async function callLLM(systemPrompt, userPrompt) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY or OPENAI_API_KEY not configured');
  }
  const payload = {
    contents: [
      {
        parts: [
          { text: userPrompt }
        ]
      }
    ],
    systemInstruction: {
      parts: [
        { text: systemPrompt }
      ]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000
    }
  };
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${err}`);
  }
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini API");
  }
  return text.trim();
}

/**
 * Prompt templates used by the controller
 */
export const prompts = {
  generateQuestions: (category, role, difficulty, count) => `
You are an expert AI interview coach. Generate exactly ${count} unique, highly realistic interview questions for a candidate.
Interview Setup:
- Category: ${category}
- Target Job Role: ${role}
- Difficulty Level: ${difficulty}

Please return the questions as a JSON array of strings (e.g., ["Question 1", "Question 2", ...]). Do not wrap the JSON in markdown formatting blocks, and do not provide any extra explanation or text.
`,
  dailyTip: `
Provide a concise interview preparation tip (max 150 words) and a single "Question of the Day" (technical). Return JSON with keys: tip, questionOfDay.
`,
  answerUser: (question) => `
You are an expert interview coach. Provide a helpful, concise answer to the following user query:
${question}
Answer in plain text, no markdown.
`
};
