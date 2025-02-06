import { ChatMessages } from 'query/types/chatGPT';
import Config from 'react-native-config';
import axios from 'axios';

export const generateResponse = async (text: string, messages: ChatMessages[]) => {
  try {
    const response = await axios.post(
      Config.CHAT_GPT_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [...messages, { role: 'user', content: text }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Config.CHAT_GPT_API_KEY}`,
        },
      },
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
};
