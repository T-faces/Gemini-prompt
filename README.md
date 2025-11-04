

# 🧠 Gemini-lab

## 🇺🇸 English  
### Gemini-lab: Simple Image Prompting Interface  
**Gemini-lab** is a lightweight web application that lets you generate prompts or analyze content directly from images using the **Gemini API**.  

Just upload an image, select the prompt type, and Gemini-lab will process it automatically.  
Built for creators, developers, and designers who need quick prompt generation from visuals.  

### ✨ Features  
- 🖼️ **Image Upload & Preview** — Drag & drop or select an image file (max 3MB).  
- ⚙️ **Prompt Type Selector** — Choose between:
  - **🎨 Design:** Convert UI mockups into HTML/CSS.
  - **🐞 Bug/Error:** Detect and describe issues or code errors in screenshots.
  - **💡 General:** Generate detailed text or JSON prompts for AI image generation.
- 🧩 **Output Format Options** — Automatically adjust based on selected type (HTML, CSS, JSON, or text).
- ⌨️ **Animated Typing Effect** — Interactive introduction that cycles between three descriptions:
  > “💡 Generate detailed prompts from your uploaded image...”  
  > “🐞 Detect and debug directly from an image...”  
  > “🎨 Recreate web designs from your screenshots...”
- 🔁 **Real-time Preview Update** — Replaces animation and displays processing status during uploads.
- 🚀 **Vercel Ready Deployment** — Works both locally (`.env`) and on Vercel using the same environment variable name:  
  ```bash
  GEMINI_API_KEY=your_api_key_here

🧱 Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js (Express)

API: Gemini 2.5 Flash (Google Generative Language API)

Hosting: Vercel


🧠 Usage Example

1. Upload your image.


2. Choose a type: General, Bug/Error, or Design.


3. Select the output format (HTML / CSS / JSON / Text).


4. Click “Generate” — the result will appear instantly below.







## 🇮🇩 Indonesian

## Gemini-lab: Antarmuka Prompt Gambar Sederhana

Gemini-lab adalah aplikasi web ringan yang memungkinkan Anda menghasilkan deskripsi (prompt) atau analisis langsung dari gambar menggunakan Gemini API.

Cukup unggah gambar Anda, pilih jenis prompt, dan sistem akan otomatis memprosesnya.
Dirancang untuk kreator, desainer, dan pengembang yang ingin membuat prompt dengan cepat dari visual.

✨ Fitur Utama

🖼️ Unggah & Pratinjau Gambar — Dukung drag & drop hingga 3MB.

⚙️ Pilihan Jenis Prompt:

🎨 Desain: Ubah tampilan UI menjadi HTML atau CSS.

🐞 Bug/Error: Deteksi kesalahan atau error dari tangkapan layar.

💡 Umum: Hasilkan deskripsi atau prompt detail dalam format JSON atau teks.


🧩 Format Output Otomatis — Menyesuaikan pilihan format sesuai jenis prompt.

⌨️ Efek Mengetik Interaktif — Menampilkan pesan berganti:

> “💡 Hasilkan prompt dari gambar yang kamu upload...”
“🐞 Deteksi bug langsung dari gambar...”
“🎨 Ubah desain menjadi website dengan sekali klik...”



🚀 Integrasi Vercel & .env Otomatis:
Jika file .env tidak ditemukan secara lokal, sistem otomatis menggunakan Environment Variable dari Vercel:

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ Kunci API Gemini tidak ditemukan di .env atau Environment Vercel");
}


🧱 Teknologi

Frontend: HTML, CSS, JavaScript

Backend: Node.js (Express)

API: Gemini 2.5 Flash

Hosting: Vercel


📖 Cara Penggunaan

1. Unggah gambar yang ingin dianalisis.


2. Pilih jenis prompt (Umum, Bug/Error, atau Desain).


3. Pilih format hasil (HTML / CSS / JSON / Teks).


4. Klik tombol “Generate” dan tunggu hasil di bawahnya.





⚡ Live Demo

Vercel Deployment (contoh):

👉 https://gemini-prompt.vercel.app

https://gemini-lab.vercel.app


🧩 License

MIT License © 2025 — Created and development by Daris Dar
