from langchain.agents import create_agent

def get_weather(city:str)->str:
    "Get Wather for a given city,"""
    return f"The weather in {city} is sunny with a high of 75°F."

agent=create_agent(
    model="gpt-4o",
    tools=[get_weather],
    system_prompt="You are helpful weather assistant.",
)

agent.invoke({
    "messages":[{"role":"user","content":"What's the weather like in New York City?"}]
})