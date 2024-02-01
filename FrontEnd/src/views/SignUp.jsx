import { useState } from "react";

function SignUp({ prop }) {
  const rout = "http://localhost:9999/api/users/register";
  const [avatar, setavatar] = useState("DefaultProfile.png");
  const [imgFile, setimgFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setimgFile(file);
    setavatar(URL.createObjectURL(file));
  };

  async function formSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", e.target.fname.value);
    formData.append("lname", e.target.lname.value);
    formData.append("username", e.target.username.value);
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("profile", imgFile);
    fetch(rout, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
        className="relative flex-col justify-center text-center items-center w-96 max-sm:w-80 bg-neutral-800 p-8 m-8 rounded-xl"
        onSubmit={(e) => {
          formSubmitHandler(e);
        }}
      >
        <img
          className="rounded-full w-24 mx-auto"
          id="preview"
          src={avatar}
          alt="Image preview"
        ></img>
        <div>Select a Profile Picture</div>
        <input
          className="mx-auto m-4 bg-orange-600 opacity-0 w-24 h-24 absolute left-36 top-4 max-sm:left-28"
          onChange={(e) => {
            //load image and set it to circle
            handleImageChange(e);
          }}
          type="file"
          id="profile"
          name="profile"
          accept="image/*"
          required
        ></input>
        <input
          className="w-11/12 p-2 m-1 rounded-md"
          placeholder="First name:"
          type="text"
          id="fname"
          name="fname"
          required
        ></input>
        <input
          className="w-11/12 p-2 m-1 rounded-md"
          placeholder="Last name:"
          type="text"
          id="lname"
          name="lname"
          required
        ></input>
        <input
          className="w-11/12 p-2 m-1 rounded-md"
          placeholder="Username"
          type="text"
          id="username"
          name="username"
          required
        ></input>
        <input
          className="w-11/12 p-2 m-1 rounded-md"
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          required
        ></input>
        <input
          className="w-11/12 p-2 m-1 rounded-md"
          placeholder="password"
          type="password"
          id="password"
          name="password"
          autoComplete=""
          required
        ></input>
        <div className="form-group_buttons">
          <button
            className="bg-transparent hover:bg-neutral-700 border-2 border-neutral-500 hover:border-neutral-300 p-2 w-32 m-4 rounded-md"
            type="submit"
            id="submit"
          >
            SignUp
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
