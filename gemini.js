// Gemini.js
import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); 

export const config = { api: { bodyParser: false } }; // penting untuk handle upload file

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan metode POST." });
  }

  // JANGAN gunakan kunci API secara langsung di kode production. Gunakan process.env.
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
  if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Kunci API Gemini tidak ditemukan di variabel lingkungan." });
  }
  
  // Direkomendasikan menggunakan model terbaru yang tersedia
  const MODEL = "gemini-2.5-flash"; 
  const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const userPrompt = fields.prompt?.[0] || "";
    let parts = [];
    
    // 1. Tambahkan bagian gambar (jika ada)
    if (files.image?.[0]) {
      const file = files.image[0];
      const fileBuffer = fs.readFileSync(file.filepath);
      const base64Data = fileBuffer.toString("base64");
      parts.push({
        inlineData: { mimeType: file.mimetype, data: base64Data }
      });
      
      // 2. Tentukan prompt default jika hanya ada gambar
      if (!userPrompt) {
          parts.push({
              text: "Jelaskan gambar ini secara detail dan informatif."
          });
      }
    }
    
    // 3. Tambahkan prompt teks dari pengguna (jika ada)
    if (userPrompt) {
        parts.push({ text: userPrompt });
    }

    // 4. Pastikan ada content sebelum memanggil API (Ini dihandle di Front-end, tapi baik untuk validasi)
    if (parts.length === 0) {
        return res.status(400).json({ error: "Tidak ada konten (teks atau gambar) untuk diproses." });
    }

    // Panggil Gemini API
    const response = await fetch(`${BASE_URL}/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] })
    });

    const data = await response.json();
    
    // Penanganan Error dari API (misalnya API Key salah atau request tidak valid)
    if (data.error) {
        return res.status(data.error.code || 500).json({ error: `API Error: ${data.error.message}` });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini tidak dapat memberikan respons. Coba lagi.";

    res.status(200).json({ result: text });
  } catch (err) {
    res.status(500).json({ error: `Kesalahan Internal Server: ${err.message}` });
  }
}
