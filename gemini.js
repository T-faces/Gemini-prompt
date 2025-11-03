// Gemini.js 
import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const config = { api: { bodyParser: false } }; // penting untuk handle upload file

export default async function handler(req, res) {
  // ====== METHOD GET → TEST DATABASE ======
  if (req.method === "GET") {
    try {
      const result = await pool.query("SELECT NOW()");
      console.log("✅ Koneksi database berhasil!");
      console.log("🕒 Waktu server:", result.rows[0].now);
      res.status(200).send("Tes koneksi berhasil, cek log di Vercel!");
    } catch (err) {
      console.log("❌ Gagal konek DB:", err.message);
      res.status(500).send("Koneksi DB gagal, cek log!");
    }
    return;
  }

  // ====== METHOD POST → GEMINI PROCESS ======
  if (req.method === "POST") {
    console.log("🚀 Memulai proses Gemini...");
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.log("❌ Kunci API Gemini tidak ditemukan di .env");
      res.status(500).send("Kunci API tidak ditemukan");
      return;
    }

    const MODEL = "gemini-2.5-flash";
    const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

    try {
      const form = formidable({});
      const [fields, files] = await form.parse(req);

      const userPrompt = fields.prompt?.[0] || "";
      let parts = [];

      if (files.image?.[0]) {
        const file = files.image[0];
        const fileBuffer = fs.readFileSync(file.filepath);
        const base64Data = fileBuffer.toString("base64");
        parts.push({
          inlineData: { mimeType: file.mimetype, data: base64Data },
        });

        if (!userPrompt) {
          parts.push({
            text: "Jelaskan gambar ini secara detail dan informatif.",
          });
        }
      }

      if (userPrompt) {
        parts.push({ text: userPrompt });
      }

      if (parts.length === 0) {
        console.log("⚠️ Tidak ada konten (teks/gambar) yang dikirim.");
        res.status(400).send("Tidak ada konten untuk diproses");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts }] }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.log("❌ API Error:", data.error.message);
        res.status(data.error.code || 500).send("API Error");
        return;
      }

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Gemini tidak dapat memberikan respons.";

      console.log("✅ Respons Gemini:", text);
      res.status(200).json({ result: text });
    } catch (err) {
      console.log("❌ Kesalahan internal:", err.message);
      res.status(500).send("Kesalahan internal server");
    }
    return;
  }

  // ====== METHOD LAIN ======
  console.log("⚠️ Metode tidak diizinkan:", req.method);
  res.status(405).send("Gunakan GET atau POST.");
}
