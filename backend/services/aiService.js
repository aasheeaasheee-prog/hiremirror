// backend/services/aiService.js
// Wrapper around OpenAI API (or alternative) for generating interview content

import fetch from 'node-fetch';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

/**
 * Generic function to call the LLM with a system and user prompt
 * @param {string} systemPrompt - Instructions for the model
 * @param {string} userPrompt - Dynamic user content
 * @returns {Promise<string>} - Model generated text
 */
export async function callLLM(systemPrompt, userPrompt) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  const payload = {
    model: AI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 1000
  };
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`LLM request failed: ${response.status} ${err}`);
  }
  const data = await response.json();
  return data.choices[0].message.content.trim();
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
