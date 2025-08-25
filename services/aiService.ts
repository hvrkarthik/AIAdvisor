const GEMINI_API_KEY = 'AIzaSyAQ6xdRomE-sH2i3eb1NUUFrXKsRGdLE8k';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface AIRecommendation {
  productId: string;
  confidence: number;
  reasoning: string;
  matchedFeatures: string[];
}

export interface AIResponse {
  recommendations: AIRecommendation[];
  summary: string;
}

export class AIService {
  static async getProductRecommendations(
    userQuery: string,
    productCatalog: any[]
  ): Promise<AIResponse> {
    const prompt = this.createPrompt(userQuery, productCatalog);

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiText) {
        throw new Error('No response from AI');
      }

      return this.parseAIResponse(aiText);
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get AI recommendations. Please try again.');
    }
  }

  private static createPrompt(userQuery: string, productCatalog: any[]): string {
    const catalogText = productCatalog.map(product => `
ID: ${product.id}
Name: ${product.name}
Category: ${product.category}
Price: $${product.price}
Description: ${product.description}
Specifications: ${JSON.stringify(product.specifications)}
Rating: ${product.rating}/5 (${product.reviews} reviews)
Tags: ${product.tags.join(', ')}
---`).join('\n');

    return `
You are an expert product advisor. Analyze the user's query and recommend the best matching products from the catalog.

User Query: "${userQuery}"

Product Catalog:
${catalogText}

Instructions:
1. Recommend 1-3 products that best match the user's needs
2. For each recommendation, provide:
   - Product ID
   - Confidence score (0-100)
   - Detailed reasoning explaining why this product matches
   - Specific features that match the user's requirements
3. Provide a brief summary of your recommendations

Respond ONLY in the following JSON format:
{
  "recommendations": [
    {
      "productId": "product-id",
      "confidence": 95,
      "reasoning": "Detailed explanation of why this product matches the user's needs",
      "matchedFeatures": ["feature1", "feature2", "feature3"]
    }
  ],
  "summary": "Brief summary of recommendations and key considerations"
}

Make sure your response is valid JSON and nothing else.
`;
  }

  private static parseAIResponse(aiText: string): AIResponse {
    try {
      // Clean the response text
      const cleanedText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanedText);
      
      return {
        recommendations: parsed.recommendations || [],
        summary: parsed.summary || 'No summary provided'
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Failed to parse AI recommendations');
    }
  }
}