const GetUserData = async () => {
    try {
      const response = await fetch('/api/profil', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Error fetching user data:", error.message);
        return null; // Handle the error gracefully
      }
  
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Network error:", error);
      return null; // Return null in case of a failure
    }
  };
  
  export default GetUserData;
  