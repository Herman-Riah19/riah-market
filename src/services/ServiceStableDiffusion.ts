"use server";

export const generateImageByIA = async (data: FormData) => {
  try {
    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`,
          Accept: "image/*",
        },
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const imageUrl = `data:image/png;base64,${base64}`;

    return { imageUrl };
  } catch (error) {
    console.error("Error generating image:", error);
    return { error: "Failed to generate image" };
  }
};
