import { NasaApiResponse, Artifact } from '../types';

const BASE_URL = 'https://images-api.nasa.gov';

// Clean text to remove HTML tags sometimes returned by NASA API
const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const searchNasaArchive = async (query: string): Promise<Artifact[]> => {
  try {
    // We restrict media_type to image to keep the gallery clean
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&media_type=image`);
    
    if (!response.ok) {
      throw new Error(`NASA Archive Error: ${response.statusText}`);
    }

    const data: NasaApiResponse = await response.json();
    
    // Map the complex NASA structure to our clean Artifact interface
    const items = data.collection.items
      .filter(item => item.links && item.links.length > 0 && item.data && item.data.length > 0)
      .slice(0, 50) // Limit to 50 items for performance
      .map(item => {
        const datum = item.data[0];
        const link = item.links?.find(l => l.rel === 'preview') || item.links?.[0];
        
        return {
          id: datum.nasa_id,
          title: datum.title,
          description: stripHtml(datum.description || datum.description_508 || 'No description available in the archives.'),
          imageUrl: link?.href || '',
          date: new Date(datum.date_created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          keywords: datum.keywords || [],
          type: 'archive' as const,
          sourceUrl: `https://images.nasa.gov/details/${datum.nasa_id}`
        };
      });

    return items;
  } catch (error) {
    console.error("Failed to retrieve artifacts", error);
    return [];
  }
};