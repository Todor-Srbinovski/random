export default async function handler(req, res) {
  // 1. Get the numbers the user typed from the URL query
  const { min, max } = req.query;

  // 2. Validate that we have numbers
  if (!min || !max) {
    return res.status(400).json({ error: 'Min and Max are required' });
  }

  // 3. Construct the Random.org URL
  // We use the basic integer API which is free and simple
  const randomUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

  try {
    // 4. Fetch the data from Random.org
    const response = await fetch(randomUrl);
    const text = await response.text();

    // 5. Send the result back to your frontend
    res.status(200).json({ result: text.trim() });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch randomness' });
  }
}
