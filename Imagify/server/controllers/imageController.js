import axios from "axios"
import userModel from "../models/userModel.js"



export const generateImage = async (req, res) => {
  try {
        const { prompt } = req.body;
        const userId = req.user;

        const user = await userModel.findById(userId);
        if (!user || !prompt) {
        return res.json({ success: false, message: "Missing Details" });
        }
        if (user.creditBalance <= 0) {
        return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance });
        }

        console.log("Calling Hugging Face API...");

        const response = await axios.post(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        { inputs: prompt },
        {
            headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
            "Accept": "image/png", // explicitly request image
            },
            responseType: "arraybuffer", // now expect raw image bytes
        }
        );

        const base64Image = Buffer.from(response.data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        await userModel.findByIdAndUpdate(user._id, {
        creditBalance: user.creditBalance - 1,
        });

        res.json({
        success: true,
        message: "Image Generated",
        creditBalance: user.creditBalance - 1,
        resultImage,
        });
    } catch (error) {
        let errorDetails = "";
        if (error.response?.data) {
        errorDetails = Buffer.isBuffer(error.response.data)
            ? error.response.data.toString()
            : JSON.stringify(error.response.data);
        console.error("Hugging Face Error Response:", errorDetails);
        }
        res.json({
        success: false,
        message: error.response?.data?.error || error.message || "Unknown error",
        details: errorDetails,
        });
    }
    };
