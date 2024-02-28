import google.generativeai as genai
import textwrap
from colorama import Fore, Style
import re

genai.configure(api_key="AIzaSyDB3_gvzqKQ87rYPO4RkuSyKMEK2lyjVoI")

generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
]


model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[])

def wrap_text_by_words(text, num_words):
    words = re.findall(r'\b\w+\b', text.replace('\n', ' '))
    lines = []
    line = []
    count = 0

    for word in words:
        line.append(word)
        if word[-1] in '.!?':
            count += 2  # Count punctuation as a separate word
        else:
            count += 1
        if count >= num_words:
            lines.append(' '.join(line))
            line = []
            count = 0

    if line:  # Add any remaining words
        lines.append(' '.join(line))

    return '\n'.join(lines)

print(Fore.CYAN + Style.BRIGHT + "Talk to Shakespeare! \n" + Style.RESET_ALL)

while True:
    user_message = input(Fore.GREEN + "User: \n" + Style.RESET_ALL)
    shakespeare_prompt = "You are Shakespeare, and will speak in a old-fashioned/archaic shakespeare style. Do not add descriptions of voice in parenthesis. Only give the shakespeare dialogue in the response. Respond to \"" + user_message + "\" as if you were Shakespeare. Don't write the character name in the response DO NOT WRITE POEMS"
    response = convo.send_message(shakespeare_prompt)
    for chunk in response:
        for part in chunk.parts:
            wrapped_text = wrap_text_by_words(part.text, 10)  # Wrap text to 10 words per line
            print(Fore.CYAN + "\nWilliam Shakespeare: \n" + Style.RESET_ALL + wrapped_text)
        
    print("\n")