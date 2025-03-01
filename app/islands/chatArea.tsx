import { v4 as uuid } from 'uuid';
import { parseMessage } from '../lib/parseMessage';
import { sanitizeHtml } from '../lib/sanitize';
import { ChatTurn, ChatMessage } from '../types/googleSearchGrounding';
import Sources from '../components/Sources';
import { FormEvent, useState } from 'react';

export default function ChatArea() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('message in handleSubmit', message);

    // ユーザーメッセージを追加
    setMessages([...messages, { content: message, isUser: true }]);

    // チャット履歴にユーザーメッセージを追加
    const newHistory = [
      ...chatHistory,
      {
        role: 'user' as const,
        parts: [{ text: message }],
      },
    ];
    setChatHistory(newHistory);

    setMessage('');

    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: newHistory,
      }),
    });

    if (!res.ok) {
      console.error('Error:', res.status);
      return;
    }

    const data = await res.json();

    // チャット履歴にAIの応答を追加
    setChatHistory((prev) => [
      ...prev,
      {
        role: 'model' as const,
        parts: [{ text: data.message }],
      },
    ]);

    // 表示用メッセージリストに追加
    setMessages((prev) => [
      ...prev,
      {
        content: data.message,
        isUser: false,
        groundingSources: data.groundingSources,
        searchEntryPoint: data.searchEntryPoint,
      },
    ]);
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1 bg-gray-100 p-4 overflow-y-auto'>
        {messages.map((msg) => (
          <div
            key={uuid()}
            className={`flex ${
              msg.isUser ? 'justify-start' : 'justify-end'
            } mb-2`}
          >
            <div className='rounded-lg p-3 max-w-[70%] bg-white text-black'>
              <div className='break-words'>
                {msg.isUser
                  ? sanitizeHtml(msg.content)
                  : parseMessage(msg.content).map((part) =>
                      part.type === 'link' ? (
                        <a
                          key={`link-${uuid()}`}
                          href={part.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-500 underline break-all'
                        >
                          {part.content}
                        </a>
                      ) : (
                        <span key={`text-${uuid()}`}>{part.content}</span>
                      )
                    )}
              </div>
              {!msg.isUser && msg.groundingSources && (
                <div className='mt-4 overflow-x-auto'>
                  <Sources sources={msg.groundingSources} />
                </div>
              )}
              {!msg.isUser && msg.searchEntryPoint && (
                <div className='mt-4'>
                  {parseMessage(msg.searchEntryPoint).map((part) =>
                    part.type === 'link' ? (
                      <a
                        key={`search-link-${uuid()}`}
                        href={part.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 underline break-all'
                      >
                        {part.content}
                      </a>
                    ) : (
                      <span key={`search-text-${uuid()}`}>{part.content}</span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='p-4 bg-white border-t'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='メッセージを入力してください...'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
