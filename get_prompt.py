import openai
import os

#openai.api_key = os.environ['OPENAI_API_KEY']
client = openai.OpenAI()

def get_query(excerpt: str):

  query = f"""
  Create an image prompt for the following excerpt. Only output the prompt itself: "{excerpt}"
  """
  completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      temperature=0.1,
      messages=[
          {
              "role":
              "system",
              "content":
              "You are an AI prompt generator who takes in a passage from a book, and outputs a one-line, comma-separated descriptor which can then be used by an artist to generate an image of the scene. Focus more on the scene itself using evocative and descriptive words, leave out specific names and proper nouns"
          },
          {
              "role": "user",
              "content": query
          },
      ])
  return completion.choices[0].message.content

def generate_image(prompt):
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt + " In the style of sketchbook watercolor art on a white canvas, fade out with splashes of watercolor and leave all four margins white",
            size="1024x1024",
            quality="standard",
            n=1,
        )
        
        return response.data[0].url

    except Exception as e:
        print(f"Error generating image: {e}")
        return None

excerpt = """In the heat of the deep desert, a huge spice harvester throbbed and thrummed as enormous treads crawled along the crest of a dune. Intake machinery chewed up the sand and digested the powder through a complex interplay of centrifuges and electromagnetic separators. The harvester vomited out a cloud of exhaust dust, sand, and debris that settled onto the disturbed dunes behind the moving machine, while the bins filled up with the rare spice melange.
The droning operation sent pulsing vibrations beneath the desert, sure to call a sandworm . . . and very soon. The noise also drowned out the sounds of Fremen violence inside the great machine."""

prompt = get_query(excerpt).lower()
print(prompt)

image_url = generate_image(prompt)
print(f"Generated image URL: {image_url}")