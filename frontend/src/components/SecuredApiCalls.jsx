const getTodos = async (token) => {
  try {
    const response = await fetch('/api/todos', {
      headers: {
        token: `Bearer ${token}`,
      },
    });

    // Handle the response
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Handle any errors
    console.log(error);
  }
};

export { getTodos };
