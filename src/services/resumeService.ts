export interface ResumePayload {
  fullName: string;
  email: string;
  phone: string;
  highestQualification?: string;
  experience?: string;
  preferredJobRole?: string;
  resume: File;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  return envUrl || 'https://jms-group-backend.onrender.com';
};

export const uploadResumeApi = async (payload: ResumePayload) => {
  const baseUrl = getApiUrl();
  const formData = new FormData();

  formData.append('fullName', payload.fullName);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  if (payload.highestQualification) {
    formData.append('highestQualification', payload.highestQualification);
  }
  if (payload.experience) {
    formData.append('experience', payload.experience);
  }
  if (payload.preferredJobRole) {
    formData.append('preferredJobRole', payload.preferredJobRole);
  }
  formData.append('resume', payload.resume);

  const response = await fetch(`${baseUrl}/api/resume`, {
    method: 'POST',
    body: formData,
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(responseData.message || responseData.error || 'Failed to upload resume. Please try again.');
  }

  return responseData;
};
