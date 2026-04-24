"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuizStore } from "../../store/useQuizStore";
import { User, Phone, ArrowRight } from "lucide-react";

export default function RegisterScreen() {
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isDisabled = !name || !phone;

  return (
    <div className="min-h-screen flex flex-col justify-center px-4">
      
      {/* Centered content container */}
      <div className="w-full max-w-sm mx-auto">

        {/* Image */}
        <div className="w-full mb-6">
          <Image
            src="/bible-quiz.png"
            alt="CGFJ Bible Quiz"
            width={400}
            height={200}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          CGFJ Bible Quiz
        </h1>
        <p className="text-sm text-base-content/70 text-center mt-1">
          Enter your details to start
        </p>

        {/* Inputs */}
        <div className="mt-6 flex flex-col gap-3">

          <label className="input input-bordered w-full flex items-center gap-2">
            <User size={18} className="opacity-60" />
            <input
              type="text"
              placeholder="Your Name"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>

          <label className="input input-bordered w-full flex items-center gap-2">
            <Phone size={18} className="opacity-60" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="grow"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </label>

        </div>

        {/* Button */}
        <button
          className="btn btn-primary w-full mt-6 flex items-center justify-center gap-2"
          disabled={isDisabled}
          onClick={() => startQuiz({ name, phone })}
        >
          Start Quiz
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}
