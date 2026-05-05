import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../types';

// Initialize the Gemini API client
// The API key is expected to be provided by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

const SYSTEM_INSTRUCTION = `
You are an expert in inclusive education, accessibility standards (ADA Title II, WCAG 2.2 AA), Universal Design for Learning (UDL), and the social model of disability.
Your task is to analyze instructional text (syllabi, announcements, assignments, LMS posts) and identify ableist language and accessibility barriers.

Guidelines for Analysis:
1. Use the social model of disability (disability is caused by barriers in society/environment, not the individual's impairment). Avoid medical-model framing.
2. Detect ableist language, deficit framing, sensory-specific assumptions (e.g., "see below", "listen up"), punitive tone, and disclosure requirements.
3. Identify accessibility issues such as rigid deadlines, mandatory in-person participation without alternatives, inaccessible formats, unclear expectations, and lack of flexibility.
4. Explain why each issue is harmful using respectful, non-judgmental language.
5. Provide an accessible rewrite of the ENTIRE text that removes ableism, uses plain language, respects student autonomy, avoids sensory assumptions, invites students to share access needs without requiring disclosure, and aligns with UDL and WCAG. 
   CRITICAL: Do NOT use phrases like "disability-related" or "disability-related impacts" in the rewrite, as this can feel like calling people out. Instead, use inclusive, universal phrasing such as "If you have specific needs," "If you require specific accommodations," or "Please let me know how I can best support your learning."
6. Provide 3-5 guiding prompts instructors can use to improve future materials.

Ensure the output strictly follows the requested JSON schema.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    issues_found: {
      type: Type.ARRAY,
      description: "List of identified issues in the text.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "The specific original phrase or sentence containing the issue."
          },
          explanation: {
            type: Type.STRING,
            description: "Explanation of why it is harmful, using the social model of disability."
          },
          category: {
            type: Type.STRING,
            description: "Must be exactly 'ableist_language' or 'accessibility_barrier'."
          },
          standard: {
            type: Type.STRING,
            description: "The relevant standard: 'ADA Title II', 'UDL', or 'WCAG 2.2 AA'."
          }
        },
        required: ["text", "explanation", "category", "standard"]
      }
    },
    accessible_rewrite: {
      type: Type.STRING,
      description: "A complete, accessible rewrite of the original text."
    },
    guiding_prompts: {
      type: Type.ARRAY,
      description: "3-5 guiding prompts for the instructor to improve future materials.",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ["issues_found", "accessible_rewrite", "guiding_prompts"]
};

export const analyzeInstructionalText = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2, // Lower temperature for more consistent, analytical output
      },
    });

    const jsonStr = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonStr);
    return result;
  } catch (error) {
    console.error("Error analyzing text with Gemini:", error);
    throw new Error("Failed to analyze text. Please try again.");
  }
};
