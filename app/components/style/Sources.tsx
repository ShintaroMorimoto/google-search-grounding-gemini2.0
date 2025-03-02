import { useState } from 'react';
import type { FC } from 'react';
import type { GroundingSource } from '../../types/googleSearchGrounding';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

const Sources: FC<{ sources: GroundingSource[] }> = ({ sources }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='flex flex-col gap-4'>
      <Button onClick={() => setIsVisible(!isVisible)}>Sources</Button>
      {isVisible && (
        <ScrollArea>
          {sources.map((source) => (
            <Card key={source.uri}>
              <CardContent>
                <a
                  href={source.uri}
                  className='text-inherit hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <h2 className='text-xl font-semibold mb-4 truncate'>
                    {source.title}
                  </h2>
                </a>
                <Avatar className='w-4 h-4'>
                  <AvatarImage
                    src={source.faviconUrl}
                    alt={`${source.domain} favicon`}
                  />
                </Avatar>
                <p className='text-sm text-gray-600'>{source.domain}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default Sources;
