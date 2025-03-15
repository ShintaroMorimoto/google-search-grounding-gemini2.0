import { createRoute } from 'honox/factory';
import ChatArea from '../islands/chatArea';
import {
  addCitations,
  getWebsiteMetadata,
  extractStyleContent,
} from '../lib/googleSearchGrounding';
import type {
  GroundingCitation,
  GroundingSource,
} from '../types/googleSearchGrounding';
import callGemini from '@/lib/gemini';

export const POST = createRoute(async (c) => {
  console.log('POST request received');
  const body = await c.req.json();
  if (!body.messages) {
    return c.json({ error: 'No messages provided' }, 400);
  }

  const response = await callGemini(body.messages);
  if (response[0]?.error?.code === 401) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  if (response[0]?.error?.code === 403) {
    return c.json({ error: 'Permission denied' }, 403);
  }

  let text = '';
  let searchEntryPointWithoutDarkMode = '';
  const groundingCitations: GroundingCitation[] = [];
  const groundingSources: GroundingSource[] = [];

  for (const candidate of response) {
    text = text + candidate.candidates[0].content.parts[0].text;

    if (candidate.candidates[0].groundingMetadata?.groundingChunks) {
      const searchEntryPoint =
        candidate.candidates[0].groundingMetadata.searchEntryPoint
          .renderedContent;
      searchEntryPointWithoutDarkMode = extractStyleContent(searchEntryPoint);

      for (const groundingChunk of candidate.candidates[0].groundingMetadata
        .groundingChunks) {
        if (groundingChunk.web) {
          const { title, faviconUrl } = await getWebsiteMetadata(
            groundingChunk.web.uri,
            groundingChunk.web.title
          );
          groundingSources.push({
            title,
            domain: groundingChunk.web.title,
            uri: groundingChunk.web.uri,
            faviconUrl: faviconUrl,
          });
        }
      }

      for (const groundingSupport of candidate.candidates[0].groundingMetadata
        .groundingSupports) {
        groundingCitations.push({
          referenceNumber: groundingSupport.groundingChunkIndices,
          correspondingText: groundingSupport.segment.text,
        });
      }
    }
  }

  const parsedMessage = addCitations(
    text,
    groundingSources,
    groundingCitations
  );

  return c.json({
    message: parsedMessage,
    searchEntryPointWithoutDarkMode,
    groundingSources,
  });
});

export default createRoute((c) => {
  return c.render(
    <div className='h-screen flex flex-col bg-white'>
      <header className='bg-white px-4 py-3'>
        <h1 className='text-gray-900 font-medium'>
          Gemini 2.0 Grounding with Google Search
        </h1>
      </header>
      <div className='flex-1 overflow-hidden'>
        <ChatArea />
      </div>
    </div>
  );
});
