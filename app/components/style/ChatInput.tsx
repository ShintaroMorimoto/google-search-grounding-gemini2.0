import type { FC, FormEvent } from 'react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const ChatInput: FC<ChatInputProps> = ({ message, setMessage, onSubmit }) => {
  return (
    <div className='p-4 bg-white'>
      <form onSubmit={onSubmit} className='flex gap-2 max-w-[50%] mx-auto'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='flex-1 p-3 bg-white border text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#10a37f] rounded-lg'
          placeholder='メッセージを入力してください...'
        />
        <button
          type='submit'
          className='bg-[#10a37f] text-white px-4 py-2 rounded-lg hover:bg-[#0e916f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!message.trim()}
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
