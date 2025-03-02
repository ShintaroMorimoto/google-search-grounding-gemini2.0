import type { FormEvent } from 'react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ChatInput({
  message,
  setMessage,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className='p-4 bg-white border-t'>
      <form onSubmit={onSubmit} className='flex gap-2'>
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
  );
}
