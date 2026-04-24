"use client";
import { useState } from "react";
import { useQuizStore } from "../../store/useQuizStore";
import { User, Phone, ArrowRight } from "lucide-react";

export default function RegisterScreen() {
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isDisabled = !name || !phone;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        
        <div className="card-body">
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-center">
            Welcome 👋
          </h2>
          <p className="text-sm text-base-content/70 text-center">
            Enter your details to start the quiz
          </p>

          {/* Name Input */}
          <label className="form-control mt-4">
            <div className="input input-bordered flex items-center gap-2">
              <User size={18} className="opacity-60" />
              <input
                type="text"
                placeholder="Your Name"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>

          {/* Phone Input */}
          <label className="form-control mt-3">
            <div className="input input-bordered flex items-center gap-2">
              <Phone size={18} className="opacity-60" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="grow"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </label>

          {/* CTA Button */}
          <div className="card-actions mt-5">
            <button
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isDisabled}
              onClick={() => startQuiz({ name, phone })}
            >
              Start Quiz
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
