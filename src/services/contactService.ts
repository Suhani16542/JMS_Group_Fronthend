export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  referralNumber?: string;
  referralName?: string;
  referenceNumber?: string;
  referenceName?: string;
  counselingTopic?: string;
  [key: string]: any;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  return envUrl || 'https://jms-group-backend.onrender.com';
};

export const sendContactApi = async (payload: ContactPayload) => {
  const baseUrl = getApiUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      let errorMsg = responseData.message || responseData.error;
      if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        errorMsg = responseData.errors.join(' ');
      }
      throw new Error(errorMsg || `Submission failed with status ${response.status}`);
    }

    return responseData;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your network connection and try again.');
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network Error: Unable to reach backend server. Please check your connection.');
    }
    throw error;
  }
};

export default sendContactApi;
