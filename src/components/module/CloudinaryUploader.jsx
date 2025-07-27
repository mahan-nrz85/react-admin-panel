const CloudinaryUploader = async (file) => {
  const url = 'https://api.cloudinary.com/v1_1/dfjb672tb/image/upload';
  const method = 'POST';

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "admin_preset");

    const response = await fetch(url, {
      method,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || 'خطا در آپلود تصویر');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(error.message || 'مشکلی پیش آمد');
  }
};

export default CloudinaryUploader;
