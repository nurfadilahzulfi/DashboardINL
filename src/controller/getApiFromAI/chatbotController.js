// Import variabel URL_AI dari file konfigurasi kamu
import { URL_AI } from '@/api/http/dataVariable';

/**
 * Mengirim pesan ke AI dan menerima respons secara streaming.
 * Menggunakan Endpoint dari dataVariable: http://192.168.1.65:3000/chat
 */
export const chatStreamAI = async ({ question, onChunk, onDone }) => {
    try {
        console.log("Mengirim request ke:", URL_AI); // Debugging log

        // Perhatikan: Kita pakai URL_AI langsung karena isinya sudah full path termasuk '/chat'
        const response = await fetch(URL_AI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Pastikan key 'question' sesuai dengan yang diminta backend Python kamu
            body: JSON.stringify({ question: question }) 
        });

        if (!response.ok) {
            throw new Error(`Gagal menghubungi AI. Status: ${response.status}`);
        }

        // --- Logika Streaming Response ---
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
                const chunk = decoder.decode(value, { stream: true });
                if (onChunk) onChunk(chunk);
            }
        }

        if (onDone) onDone();
        return { status: 200, message: 'Stream finished' };

    } catch (error) {
        console.error("Error chatbotController:", error);
        
        let errorMsg = `[Error]: Gagal terhubung ke AI.`;
        if (error.message.includes('Failed to fetch')) {
             errorMsg += "\n(Cek koneksi internet atau pastikan Backend Python sudah jalan di IP tersebut)";
        } else {
             errorMsg += `\nDetail: ${error.message}`;
        }

        if (onChunk) onChunk(errorMsg);
        if (onDone) onDone();
        
        return { status: 400, message: error.message };
    }
};