/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.querySelector("#generate-btn");
  const textInput = document.querySelector("#text-input");
  const imageContainer = document.querySelector("#image-container");
  const apiKey = "Enter Your OpenAi API Key";
  generateBtn.addEventListener("click", async () => {
    const text = textInput.value;

    const data = {
      prompt: text,
      n: 2,
      size: "1024x1024",
    };

    try {
      generateBtn.innerText = "Loading...";
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Response not OK");
      }

      const result = await response.json();
      const image = result.data[0].url;
      generateBtn.innerText = "Done";
      imageContainer.innerHTML = `<img src="${image}">`;
    } catch (error) {
      console.log("Error:", error);
      imageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
});
