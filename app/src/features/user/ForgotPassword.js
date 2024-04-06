import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";

function ForgotPassword() {
  const INITIAL_USER_OBJ = {
    email: "",
    password: "",
    password_confirmation: "",
    id: "",
    type: "id",
    token: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

  const submitRequestForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (userObj.email.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    else {
      setLoading(true);
      // Call API to send password reset link
      fetch("http://127.0.0.1:8000/api/passwordRecovery/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            setLoading(false);
            return setErrorMessage(data.errors.email[0]);
          }
          console.log("data is", data);
          setUserObj({ ...userObj, id: data.id });
          setLoading(false);
          setLinkSent(true);
        });
    }
  };

  const submitChangeForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (userObj.email.trim() === "")
      return setErrorMessage("Email Id is required!");
    else {
      setLoading(true);
      // Call API to send password reset link
      fetch("http://127.0.0.1:8000/api/passwordRecovery/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);

          if (data.status === "error") {
            return setErrorMessage(data.message);
          }
          if (userObj.type === "id") {
            setUserObj({ ...userObj, type: "reset" });
            setCodeSent(true);
          } else {
            setSuccessMessage(data.message);
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          }
        })
        .catch((e) => {
          setLoading(false);
          return setErrorMessage("Something is wrong");
        });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot Password
            </h2>

            {linkSent && !codeSent && (
              <>
                <div className="text-center mt-8">
                  <CheckCircleIcon className="inline-block w-32 text-success" />
                </div>
                <p className="my-4 text-xl font-bold text-center">Code Sent</p>
                <p className="mt-4 mb-8 font-semibold text-center">
                  Check your email to reset password
                </p>
                <div className="text-center mt-4">
                  <form onSubmit={(e) => submitChangeForm(e)}>
                    <div className="mb-4">
                      <InputText
                        type="token"
                        defaultValue={userObj.token}
                        updateType="token"
                        containerStyle="mt-4"
                        labelTitle="Verification Code"
                        updateFormValue={updateFormValue}
                      />
                    </div>

                    <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                    <button
                      type="submit"
                      className={
                        "btn mt-2 w-full btn-primary" +
                        (loading ? " loading" : "")
                      }
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </>
            )}

            {codeSent && (
              <>
                <div className="text-center mt-8">
                  <CheckCircleIcon className="inline-block w-32 text-success" />
                </div>
                <p className="my-4 text-xl font-bold text-center">
                  Code Is Valid
                </p>
                <p className="mt-4 mb-8 font-semibold text-center">
                  Reset Your Password Now
                </p>
                <div className="text-center mt-4">
                  <form onSubmit={(e) => submitChangeForm(e)}>
                    <div className="mb-4">
                      <InputText
                        type="password"
                        defaultValue={userObj.password}
                        updateType="password"
                        containerStyle="mt-4"
                        labelTitle="password"
                        updateFormValue={updateFormValue}
                      />
                    </div>
                    <div className="mb-4">
                      <InputText
                        type="password"
                        defaultValue={userObj.password}
                        updateType="password_confirmation"
                        containerStyle="mt-4"
                        labelTitle="Retype Password"
                        updateFormValue={updateFormValue}
                      />
                    </div>
                    <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                    <p className="mt-12 text-green-600 text-lg font-medium">
                      {successMessage}
                    </p>
                    <button
                      type="submit"
                      className={
                        "btn mt-2 w-full btn-primary" +
                        (loading ? " loading" : "")
                      }
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </>
            )}

            {!linkSent && (
              <>
                <p className="my-8 font-semibold text-center">
                  We will send password reset code on your email
                </p>
                <form onSubmit={(e) => submitRequestForm(e)}>
                  <div className="mb-4">
                    <InputText
                      type="email"
                      defaultValue={userObj.email}
                      updateType="email"
                      containerStyle="mt-4"
                      labelTitle="Email"
                      updateFormValue={updateFormValue}
                    />
                  </div>

                  <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                  <button
                    type="submit"
                    className={
                      "btn mt-2 w-full btn-primary" +
                      (loading ? " loading" : "")
                    }
                  >
                    Send Reset Code
                  </button>

                  <div className="text-center mt-4">
                    Don't have an account yet?{" "}
                    <Link to="/register">
                      <button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
