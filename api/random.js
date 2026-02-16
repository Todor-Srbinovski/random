export default async function handler(req, res) {
  // We now accept a 'count' parameter. If not provided, it defaults to 1.
  const { min, max, count = 1 } = req.query;

  if (!min || !max) {
    return res.status(400).json({ error: 'Min and Max are required' });
  }

  // We limit the count to 50 to prevent abuse
  const safeCount = Math.min(parseInt(count), 50);

  // Update URL to use the dynamic 'num' (count)
  const randomUrl = `https://www.random.org/integers/?num=${safeCount}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

  try {
    const response = await fetch(randomUrl);
    const text = await response.text();
    
    // Random.org returns numbers separated by newlines (\n)
    // We split them into an array so the frontend can use them easily
    const numbers = text.trim().split('\n').filter(n => n);

    // If we only asked for 1, return it like before (keeps old apps working)
    if (safeCount === 1) {
        res.status(200).json({ result: numbers[0] });
    } else {
        // If we asked for a list, return the whole list
        res.status(200).json({ result: numbers });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch randomness' });
  }
}
