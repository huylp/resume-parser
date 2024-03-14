import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { resumeSchema } from "@/app/schema";

export const runtime = "edge";

const SYSTEM_PROMPT_TEMPLATE = `You are an expert extraction algorithm.
Only extract relevant information from the text.
If you do not know the value of an attribute asked to extract, you may omit the attribute's value.`;

const prompt = ChatPromptTemplate.fromMessages([
  ["system", SYSTEM_PROMPT_TEMPLATE],
  ["human", "{text}"],
]);

const llm = new ChatOpenAI({
  modelName: "gpt-4-0125-preview",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY!,
});

const extractionRunnable = prompt.pipe(
  llm.withStructuredOutput(resumeSchema, { name: "resume" })
);

export const POST = async (req: Request) => {
  const { text } = await req.json();

  const result = await extractionRunnable.invoke({ text });

  return Response.json(result, { status: 200 });
};
