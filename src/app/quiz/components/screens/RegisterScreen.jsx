"use client";
import { useState } from "react";
import { useQuizStore } from "../../store/useQuizStore";
import Button from "../ui/Button";

export default function RegisterScreen() {
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Start Quiz</h2>
      <input
        placeholder="Name"
        className="w-full border p-2 mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Phone"
        className="text w-full border p-2 mb-3 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button onClick={() => startQuiz({ name, phone })}>
        Start Quiz
      </Button>
    </div>
  );
}
