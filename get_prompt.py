import openai
import os

openai.api_key = os.environ['OPENAI_API_KEY']


def get_query(excerpt: str):

  query = f"""
  Create a prompt which summarizes the following scene: {excerpt}.
  """

  completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      temperature=0.1,
      messages=[
          {
              "role":
              "system",
              "content":
              "You are an extractor to get a scene or character from a book passage."
          },
          {
              "role": "user",
              "content": query
          },
      ])
  return completion.choices[0].message.content

prompt = get_query(excerpt).lower()
print(prompt)
