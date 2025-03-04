import { v4 as uuid } from 'uuid';
import { parseMessage } from '../lib/parseMessage';
import type { ChatTurn, ChatMessage } from '../types/chat';
import Sources from '../components/style/Sources';
import ChatInput from '../components/style/ChatInput';
import type { FormEvent } from 'react';
import { useState } from 'react';

const ChatArea = () => {
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
        searchEntryPoint: data.searchEntryPointWithoutDarkMode,
      },
    ]);
  };

  return (
    <div className='h-full flex flex-col bg-white'>
      <div className='flex-1 p-4 overflow-y-auto'>
        {messages.map((msg, index) => (
          <div
            key={uuid()}
            className={`flex ${
              msg.isUser ? 'justify-end pr-8' : 'justify-start pl-8'
            } mb-4 mx-auto max-w-[50%]`}
          >
            <div
              className={`rounded-lg p-4 ${
                msg.isUser
                  ? 'bg-[#10a37f] text-white max-w-[80%]'
                  : 'bg-gray-50 border text-gray-900 max-w-[80%]'
              }`}
            >
              <div className='break-words'>
                {msg.isUser
                  ? msg.content
                  : parseMessage(msg.content).map((part) =>
                      part.type === 'link' ? (
                        <a
                          key={uuid()}
                          href={part.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={
                            part.className ||
                            'text-blue-600 underline break-all hover:text-blue-800'
                          }
                        >
                          {part.content}
                        </a>
                      ) : (
                        <span key={uuid()}>{part.content}</span>
                      )
                    )}
              </div>
              {!msg.isUser && msg.groundingSources && (
                <div className='mt-4 overflow-x-auto text-gray-700'>
                  {msg.groundingSources.length > 0 && (
                    <Sources sources={msg.groundingSources} />
                  )}
                </div>
              )}
              {!msg.isUser && msg.searchEntryPoint && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.searchEntryPoint,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatArea;
