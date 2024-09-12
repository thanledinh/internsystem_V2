import { axiosClientVer2 } from '../configs/axiosInterceptor';

export const getAllInternships = async () => {
  try {
    const response = await axiosClientVer2.get('internship/get-all-internship');
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy tất cả thực tập:', error);
    throw error;
  }
};
export const getinternshipbyid = async (id) => {
  try {
    const response = await axiosClientVer2.get(`internship/get-internship-by-id/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy id', error);
    throw error;
  }
};

export const postAllInternships = async (internshipData) => {
  try {
    const response = await axiosClientVer2.post('internship/create-internship', internshipData);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi tạo kỳ thực tập:', error);
    throw error;
  }
};
export const deleteInternshipById = async (id) => {
  try {
    const response = await axiosClientVer2.put(`internship/delete-internship-by-id/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi xóa kỳ thực tập:', error);
    throw error;
  }
};
export const UpdateInternshipById = async (id, internshipData) => {
  try {
    const response = await axiosClientVer2.put(`internship/update-internship-by-id/${id}`, internshipData);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật kỳ thực tập:', error);
    throw error;
  }
};