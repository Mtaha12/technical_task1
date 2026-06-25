// Mock database of styled assets
const MOCK_ASSETS = {
  fashion: [
    '/images/fashion.png',
    '/images/portrait.png'
  ],
  architecture: [
    '/images/architecture.png',
    '/images/cinematic.png'
  ],
  product: [
    '/images/product.png',
    '/images/fantasy.png'
  ],
  cinematic: [
    '/images/cinematic.png',
    '/images/portrait.png',
    '/images/architecture.png'
  ],
  fantasy: [
    '/images/fantasy.png',
    '/images/product.png'
  ],
  portrait: [
    '/images/portrait.png',
    '/images/fashion.png'
  ]
};

// Default fallback list of all images
const ALL_IMAGES = [
  '/images/fashion.png',
  '/images/architecture.png',
  '/images/product.png',
  '/images/cinematic.png',
  '/images/fantasy.png',
  '/images/portrait.png'
];

// High-end cinematic stock video loops for mock video generation
const MOCK_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

/**
 * Simulates an API call to generate AI assets.
 * Supports simulating progress, success, and error states.
 */
export async function generateContent({ prompt, style = 'cinematic', aspectRatio = '16:9', quality = 'balanced', type = 'image' }) {
  // Simulate network latency (2.5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Validation
  if (!prompt || prompt.trim() === '') {
    throw new Error('Prompt is required to initialize creative rendering.');
  }

  // Simulate rare random error (1% chance) or trigger error if prompt contains specific debug keywords
  if (prompt.toLowerCase().includes('trigger error')) {
    throw new Error('The neural model encountered an out-of-memory exception while rendering details. Please reduce resolution or change aspect ratio.');
  }

  const selectedStyle = style.toLowerCase();
  
  if (type === 'video') {
    // Generate simulated video responses
    return {
      success: true,
      images: [],
      videos: [
        {
          id: `vid-${Date.now()}-1`,
          url: MOCK_VIDEOS[Math.floor(Math.random() * MOCK_VIDEOS.length)],
          prompt,
          style,
          aspectRatio,
          quality,
          createdAt: new Date().toISOString()
        }
      ]
    };
  }

  // Generate simulated image responses
  const styleImages = MOCK_ASSETS[selectedStyle] || ALL_IMAGES;
  
  // Create 2 generated images based on the prompt/style
  const generatedImages = styleImages.map((imgUrl, index) => {
    return {
      id: `img-${Date.now()}-${index}`,
      url: imgUrl,
      prompt,
      style,
      aspectRatio,
      quality,
      seed: Math.floor(Math.random() * 9999999999),
      createdAt: new Date().toISOString()
    };
  });

  return {
    success: true,
    images: generatedImages,
    videos: []
  };
}
