"use client";

import { useFormState } from "react-dom";
import login from "./action";

export default function Page() {
  const [state, action] = useFormState(login, {});
  return (
    <>
      <h1>Login</h1>
      <form action={action}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
        {state.error && <p>{state.error}</p>}
      </form>
    </>
  );
}
