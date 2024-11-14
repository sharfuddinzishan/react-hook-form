import { useForm } from "react-hook-form";
import Field from "../Field";
import FieldSet from "../fieldSet";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const submitForm = (formData) => {
    const auth = { email: "abc@gmail.com", password: "12345678" };
    const getAuth =
      formData?.email === auth.email && formData?.password === auth.password;
    if (!getAuth) {
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found...`,
      });
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(submitForm)}>
          <FieldSet label="Enter Login Details">
            <Field label="Email" error={errors?.email?.message}>
              <input
                {...register("email", { required: "Email is required." })}
                className={`p-2 border box-border w-[300px] rounded-md ${
                  errors?.email ? "border-red-500" : "border-gray-200"
                }`}
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
              />
            </Field>
            <Field label="Password" error={errors?.password?.message}>
              <input
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Minimum password length 8",
                  },
                })}
                className={`p-2 border box-border w-[300px] rounded-md ${
                  errors?.password ? "border-red-500" : "border-gray-200"
                }`}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
            </Field>
            <Field>
              <button className="text-md text-white cursor-pointer p-1 border rounded-lg bg-purple-500">
                Login
              </button>
            </Field>
            <p className="text-red-700 font-light">
              {errors?.root?.random?.message}
            </p>
          </FieldSet>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
