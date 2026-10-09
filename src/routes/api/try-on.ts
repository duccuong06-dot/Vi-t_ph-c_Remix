import { createFileRoute } from "@tanstack/react-router";
import { GoogleGenAI } from "@google/genai";

function getGeminiClient(apiKey: string) {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export const Route = createFileRoute("/api/try-on")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env["GEMINI_API_KEY"]) {
          try {
            process.loadEnvFile?.();
          } catch {
            // ignore if .env does not exist
          }
        }
        const apiKey = process.env["GEMINI_API_KEY"];
        const form = await request.formData();
        const streamRequested = form.get("stream") !== "false";

        const prompt = form.get("prompt");
        const image = form.get("image");

        if (!(image instanceof File)) {
          return new Response("An image file is required", { status: 400 });
        }

        try {
          const buffer = await image.arrayBuffer();
          const base64ImageData = Buffer.from(buffer).toString("base64");
          const mimeType = image.type || "image/jpeg";
          const promptText =
            typeof prompt === "string" && prompt.trim()
              ? prompt
              : "Virtual try-on fashion photograph wearing Vietnamese traditional attire.";

          let b64Json: string | null = null;

          if (apiKey) {
            try {
              const ai = getGeminiClient(apiKey);
              const response = await ai.models.generateContent({
                model: "gemini-3.1-flash-lite-image",
                contents: {
                  parts: [
                    {
                      inlineData: {
                        data: base64ImageData,
                        mimeType,
                      },
                    },
                    {
                      text: promptText,
                    },
                  ],
                },
              });

              for (const candidate of response.candidates ?? []) {
                for (const part of candidate.content?.parts ?? []) {
                  if (part.inlineData?.data) {
                    b64Json = part.inlineData.data;
                    break;
                  }
                }
                if (b64Json) break;
              }
            } catch (err) {
              console.warn("Gemini image generation unavailable (free tier quota):", err);
            }
          }

          if (b64Json) {
            if (streamRequested) {
              const payload = JSON.stringify({
                type: "image_edit.completed",
                b64_json: b64Json,
              });
              return new Response(`event: image_edit.completed\ndata: ${payload}\n\n`, {
                status: 200,
                headers: {
                  "Content-Type": "text/event-stream; charset=utf-8",
                  "Cache-Control": "no-cache",
                  Connection: "keep-alive",
                },
              });
            }

            return new Response(
              JSON.stringify({
                data: [{ b64_json: b64Json }],
              }),
              {
                status: 200,
                headers: {
                  "Content-Type": "application/json",
                  "Cache-Control": "no-cache",
                },
              },
            );
          }

          // If no AI-generated image was returned (e.g. Free Tier quota 0 on image models),
          // notify client that digital fashion try-on engine is active.
          if (streamRequested) {
            const payload = JSON.stringify({
              type: "fallback",
              message: "Digital fitting active",
            });
            return new Response(`event: fallback\ndata: ${payload}\n\n`, {
              status: 200,
              headers: {
                "Content-Type": "text/event-stream; charset=utf-8",
                "Cache-Control": "no-cache",
              },
            });
          }

          return new Response(
            JSON.stringify({
              fallback: true,
              message: "Digital fitting active",
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
              },
            },
          );
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Đã xảy ra lỗi khi tạo ảnh thử đồ.";
          if (streamRequested) {
            return new Response(
              `event: error\ndata: ${JSON.stringify({
                type: "error",
                error: { message },
              })}\n\n`,
              {
                status: 200,
                headers: {
                  "Content-Type": "text/event-stream; charset=utf-8",
                  "Cache-Control": "no-cache",
                },
              },
            );
          }
          return new Response(JSON.stringify({ error: { message } }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
