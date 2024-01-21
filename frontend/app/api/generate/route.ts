import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";
import Replicate from 'replicate';

export async function POST(req: Request) {
  try {
    const query = await req.text();
    const promptStartTime = Date.now();

    const openai = new OpenAI({apiKey: process.env["OPENAI_API_KEY"]});
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: "You are an AI prompt generator who takes in a passage from a book, and outputs a one-line, comma-separated descriptor which is used by MidJourney to generate an image of the scene. Focus on the scene using evocative and descriptive words, capturing colour and material and aesthetic."},
    {role: "user", content: query}],
      model: 'gpt-3.5-turbo',
    });
    
    const prompt = chatCompletion.choices[0].message.content
    const promptTimeElapsed = Date.now() - promptStartTime;


    // const imageStartTime = Date.now();
    // const imageGeneration = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt: prompt +  " In the style of sketchbook watercolor art on a white canvas, fade out with splashes of watercolor and leave all four margins white",
    //   size: "1024x1024",
    //   quality: "standard",
    //   n: 1
    // })
    // const url = imageGeneration.data[0].url 
    // const imageTimeElapsed = Date.now() - imageStartTime;


    const replicateStartTime = Date.now();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    console.log(prompt)
    const output: any = await replicate.run(
      "lucataco/sdxl-lcm:fbbd475b1084de80c47c35bfe4ae64b964294aa7e237e6537eed938cfd24903d",
      {
        input: {
          prompt: prompt + ", sketchbook watercolor art on white canvas, fade out with splashes of watercolor"
        }
      }
    );
    const replicateUrl = output[0]
    const replicateTimeElapsed = Date.now() - replicateStartTime;

    return Response.json({replicate: replicateTimeElapsed, replicateUrl: replicateUrl, openai: promptTimeElapsed})
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Error generating image' });
  }
}