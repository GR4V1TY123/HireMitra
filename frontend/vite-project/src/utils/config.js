const dev = {
    BASE_URL: "http://localhost:3000",
  };
  
  const prod = {
    BASE_URL: "https://hiremitra.onrender.com",
  };
  
  export const config = process.env.NODE_ENV === "development" ? dev : prod;
  