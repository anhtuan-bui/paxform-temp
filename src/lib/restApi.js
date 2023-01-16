const API_URL = process.env.REACT_APP_WP_API_URL;

const post = async (endpoint, object) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify(object),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getToken = async () => {
  return localStorage.getItem("clientToken");
};

export default post;
