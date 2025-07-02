import axiosInstance from "../../utils/Axios"

export const postComment = async({id , text})=>{
    const res = await axiosInstance.post(`/doubt/comment/${id}` , {text})
    console.log("Comment posted -> " , res.data.comment);
    return res.data.comment
}

export const getAllComments = async(id)=>{
    const res = await axiosInstance.get(`/doubt/comment/${id}`)
    console.log("Comments fetched",res.data.allComments);
    return res.data.allComments
}

export const deleteComment = async (id) => {
  const res = await axiosInstance.delete(`/doubt/comment/${id}`);
  return res.data;
};
