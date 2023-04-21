/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.querySelector("#generate-btn");
  const textInput = document.querySelector("#text-input");
  const apiKeyInput = document.querySelector("#api-key-input");
  const imageContainer = document.querySelector("#image-container");

  generateBtn.addEventListener("click", async () => {
    const text = textInput.value; //prompt for image
    const apiKey = apiKeyInput.value; //api key
    apiKeyInput.disabled = true;

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
      imageContainer.innerHTML = `<img src="${image}">`;
      generateBtn.innerText = "Done";
    } catch (error) {
      console.log("Error:", error);
      imageContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
});
