import { Controller, useFieldArray, useForm } from "react-hook-form";
import Field from "../Field";
import FieldSet from "../fieldSet";
import NumberInput from "../NumberInput";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });
  const submitForm = (formData) => {
    console.log(formData);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(submitForm)}>
          <FieldSet label="Enter Your Details">
            <Field label="Full Name" error={errors?.fname?.message}>
              <input
                {...register("fname", { required: "Full name is required." })}
                className={`p-2 border box-border w-[300px] rounded-md ${
                  errors?.email ? "border-red-500" : "border-gray-200"
                }`}
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter Full Name"
              />
            </Field>
            <Field label="Age" error={errors?.age?.message}>
              <Controller
                name="age"
                defaultValue={12}
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <NumberInput
                    id="age"
                    placeholder="Enter Age"
                    className={`p-2 border box-border w-[300px] rounded-md ${
                      errors?.age ? "border-red-500" : "border-gray-200"
                    }`}
                    {...field}
                  />
                )}
                rules={{
                  required: "Age is required..",
                  min: {
                    value: 12,
                    message: "Minimum Age 12 allowed..",
                  },
                  max: {
                    value: 100,
                    message: "Maximum Age 100 allowed..",
                  },
                }}
              />
            </Field>
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
            <Field label="Picture" error={errors?.picture?.message}>
              <input
                {...register("picture", {
                  required: "Picture is required.",
                })}
                type="file"
                name="picture"
                id="picture"
              />
            </Field>
          </FieldSet>
          <FieldSet label="Enter Social Handles">
            {fields?.map((field, index) => {
              return (
                <div
                  className="flex w-max justify-between items-center"
                  key={field.id}
                >
                  <Field label="Social Name">
                    <input
                      {...register(`socials[${index}].name`)}
                      className="p-2 border box-border w-full rounded-md"
                      type="text"
                      name={`socials[${index}].name`}
                      id={`socials[${index}].name`}
                    />
                  </Field>
                  <Field label="Social Url">
                    <input
                      {...register(`socials[${index}].url`)}
                      className="p-2 border box-border w-full rounded-md"
                      type="text"
                      name={`socials[${index}].url`}
                      id={`socials[${index}].url`}
                    />
                  </Field>
                  <button
                    className="text-2xl mt-6"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="mt-8 text-md text-white cursor-pointer p-1 border rounded-lg bg-gray-500 m-auto"
              onClick={() => append({ name: "", url: "" })}
            >
              Add Social Handle
            </button>
          </FieldSet>
          <Field>
            <button className="text-md text-white cursor-pointer p-1 border rounded-lg bg-purple-500">
              Register
            </button>
          </Field>
          <p className="text-red-700 font-light">
            {errors?.root?.random?.message}
          </p>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
