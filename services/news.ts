import { Artifact } from '../types';

const NEWS_API_URL = 'https://api.spaceflightnewsapi.net/v4/articles';

export const fetchSpaceNews = async (filter: string = 'All'): Promise<Artifact[]> => {
  try {
    let url = `${NEWS_API_URL}?limit=40`;
    
    if (filter !== 'All') {
      // Map countries/regions to major agencies for better search relevance
      const queryMap: Record<string, string> = {
        'USA': 'NASA',
        'Europe': 'ESA',
        'Russia': 'Roscosmos',
        'China': 'CNSA',
        'India': 'ISRO',
        'Japan': 'JAXA'
      };
      
      const searchQuery = queryMap[filter] || filter;
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch news');
    
    const data = await response.json();
    
    return data.results.map((item: any) => ({
      id: `news-${item.id}`,
      title: item.title,
      description: item.summary,
      imageUrl: item.image_url,
      date: new Date(item.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      keywords: [item.news_site, 'News', 'Transmission'],
      sourceUrl: item.url,
      type: 'news'
    }));
  } catch (error) {
    console.error("News fetch error", error);
    return [];
  }
};