import QuizFlow from "./components/flow/QuizFlow";
export default function QuizPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <QuizFlow />
      </div>
    </main>
  );
}
