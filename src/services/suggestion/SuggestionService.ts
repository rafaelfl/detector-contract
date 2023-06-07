import fetch from 'node-fetch';

class SuggestionService {
  static async getSuggestion(object: { sourceCode: string }) {
    const API_KEY = process.env.OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `summary in bullet points a list of vulnerabilities found in the following smart contract, including the line number for each vulnerability: '''${object.sourceCode}'''`,
          },
        ],
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await response.json()) as any;

    let answer = (data?.choices?.[0]?.message?.content ?? '') as string;

    // remove any pre text before the bullets
    if (answer.indexOf('-') >= 0) {
      answer = answer.substring(answer.indexOf('-'));
    }

    const details = answer.split('\n').map(d => d.replace('- ', ''));

    return { suggestion: details };
  }
}

export default SuggestionService;
