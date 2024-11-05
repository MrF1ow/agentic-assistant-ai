"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { handleConfirmSignUp } from "@/lib/cognitoActions";

export default function ConfirmSignUpForm() {
  const [errorMessage, dispatch, isPending] = useActionState(
    handleConfirmSignUp,
    undefined
  );
  return (
    <form action={dispatch} className="max-w-lg w-full mx-auto">
      <div className="mb-12">
        <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold max-md:text-center">
          Confirm Account
        </h3>
      </div>
      <div className="mt-6">
        <label className="text-gray-800 text-xs block mb-2" htmlFor="email">
          Email
        </label>
        <div className="relative flex items-center">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            className="w-[18px] h-[18px] absolute right-2"
            viewBox="0 0 682.667 682.667"
          >
            <defs>
              <clipPath id="a" clipPathUnits="userSpaceOnUse">
                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
              <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="40"
                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                data-original="#000000"
              ></path>
              <path
                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="mt-6">
        <label className="text-gray-800 text-xs block mb-2" htmlFor="code">
          Code
        </label>
        <div className="relative flex items-center">
          <input
            className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
            id="code"
            type="code"
            name="code"
            placeholder="Enter code"
            required
            minLength={6}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#bbb"
            stroke="#bbb"
            className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
            viewBox="0 0 128 128"
          >
            <path
              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
              data-original="#000000"
            ></path>
          </svg>
        </div>
      </div>

      <div className="mt-12">
        <ConfirmButton pending={isPending} />
        <p className="text-sm mt-6 text-gray-800">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 font-semibold hover:underline ml-1"
          >
            Login here
          </Link>
        </p>
      </div>
      <div className="flex h-8 items-end space-x-1">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function ConfirmButton({ pending }: { pending: boolean }) {
  return <Button aria-disabled={pending}>Confirm</Button>;
}
