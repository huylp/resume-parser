import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { base64ToBlob } from "@/app/utils";

export const POST = async (req: Request) => {
  const { file } = await req.json();

  const blob = base64ToBlob(file, "application/pdf");

  const loader = new PDFLoader(blob, {
    splitPages: false,
    parsedItemSeparator: "",
  });

  const docs = await loader.load();

  const text = docs[0].pageContent;

  return Response.json(text, { status: 200 });
};
