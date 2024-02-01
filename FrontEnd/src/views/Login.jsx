import { useState } from "react";

function Login() {
  const rout = "http://localhost:9999/api/users/login";

  async function formSubmitHandler(e) {
    e.preventDefault();
    fetch(rout, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then(async (response) => {
        // Handle the response from the server
        const jsonData = await response.json();
        console.log("recived data", jsonData);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error:", error);
      });
  }
  return (
    <>
      <form
        id="myForm"
        method="post"
        encType="multipart/form-data"
        className="flex-col justify-center text-center items-center w-96 max-sm:w-80 bg-neutral-800 p-8 m-8 rounded-xl"
        onSubmit={(e) => {
          formSubmitHandler(e);
        }}
      >
        <h1 className="text-6xl m-10">Login</h1>
        <input
          className="w-11/12 p-4 m-1 rounded-md"
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          required
        ></input>
        <input
          className="w-11/12 p-4 m-1 rounded-md"
          placeholder="password"
          type="password"
          id="password"
          name="password"
          autoComplete=""
          required
        ></input>

        <button
          className="bg-transparent hover:bg-neutral-700 border-2 border-neutral-500 hover:border-neutral-300 p-2 w-32 m-4 rounded-md"
          type="submit"
          id="login"
        >
          Login
        </button>

        <div className="infoText">
          If you do not have account you can create by clicking on register
          button
        </div>
      </form>
    </>
  );
}

export default Login;
