import { useState } from 'react';
import type { FC } from 'react';
import type { GroundingSource } from '../../types/googleSearchGrounding';
import { Button } from '../ui/button';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';

const Sources: FC<{ sources: GroundingSource[] }> = ({ sources }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-left'>
        <Button
          onClick={() => setIsVisible(!isVisible)}
          variant='ghost'
          className='hover:bg-transparent hover:opacity-100 focus-visible:ring-0 focus-visible:ring-offset-0'
        >
          Sources
        </Button>
      </span>
      {isVisible && (
        <ScrollArea className='w-full whitespace-nowrap'>
          <div className='flex space-x-2 py-1'>
            {sources.map((source) => (
              <Card key={source.uri} className='min-w-fit'>
                <CardContent className='p-2'>
                  <a
                    href={source.uri}
                    className='flex flex-col space-y-1'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <p className='text-sm font-medium leading-none'>
                      {source.title}
                    </p>
                    <div className='flex items-center space-x-2'>
                      <Avatar className='h-4 w-4'>
                        <AvatarImage
                          src={source.faviconUrl}
                          alt={`${source.domain} favicon`}
                        />
                      </Avatar>
                      <p className='text-xs text-muted-foreground'>
                        {source.domain}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation='horizontal' className='opacity-0' />
        </ScrollArea>
      )}
    </div>
  );
};

export default Sources;
