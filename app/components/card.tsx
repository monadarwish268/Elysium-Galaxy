"use client";

type Answer = {
  text: string;
  score: number;
};

type CheckinCardProps = {
  step: number;
  question: string;
  description: string;
  answers: Answer[];
  selected: number | null;
  onAnswer: (score: number, index: number) => void;
  onBack?: () => void;
};

export default function CheckinCard({
  step,
  question,
  description,
  answers,
  selected,
  onAnswer,
  onBack,
}: CheckinCardProps) {
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">

        <p className="text-sm font-semibold text-purple-300">
          Nibras AI Check-in
        </p>

        <p className="mt-2 text-sm text-blue-300">
          Step {step} of 3
        </p>

        <div className="mt-4 h-2 rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <h1 className="mt-10 text-4xl font-bold text-white">
          {question}
        </h1>

        <p className="mt-4 text-white/70">
          {description}
        </p>

        <div className="mt-8 space-y-4">
          {answers.map((answer, index) => (
            <button
              key={answer.text}
              type="button"
              onClick={() => onAnswer(answer.score, index)}
              className={`w-full rounded-2xl border p-5 text-left text-white transition ${
                selected === index
                  ? "border-purple-400 bg-purple-700/70"
                  : "border-white/30 bg-black/30 hover:border-purple-400 hover:bg-white/10"
              }`}
            >
              {answer.text}
            </button>
          ))}
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-8 text-blue-300 hover:text-purple-300"
          >
            ← Back
          </button>
        )}

      </div>
    </main>
  );
}