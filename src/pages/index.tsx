import { useState, useEffect, useRef } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Card from "@/components/Card";

// data
import awsServices from "@/data/aws-services";
import links from "@/data/aws-links";

// create a function that takes an object and returns an array of its keys in random order
const keys = (obj: any) => {
  return Object.keys(obj).sort();
};

// shuffle array
const shuffle = (arr: any[]) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
  }
  return newArr;
};

const randomizeRange = (n: number) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return shuffle(arr);
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(keys(awsServices));
  const [randomOrder, setRandomOrder] = useState(
    randomizeRange(questions.length)
  );
  const [prevQuestion, setPrevQuestion] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setLoading(false);
    containerRef.current.children[
      randomOrder[currentQuestion]
    ].classList.remove("hidden");
    containerRef.current.children[randomOrder[prevQuestion]].classList.add(
      "hidden"
    );
  }, [currentQuestion, prevQuestion, randomOrder]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-6">
        <div ref={containerRef}>
          {questions.map((q, i: number) => (
            <div key={i} className="hidden">
              <Card
                front={
                  <div className="h-full w-full flex justify-center items-center animate-fade-in">
                    {q}
                  </div>
                }
                back={
                  <div
                    className="h-full w-full flex flex-col justify-center items-center animate-fade-in"
                    // onclick open  google.com in a new tab
                    onClick={() => window.open(links[q as keyof typeof links])}
                  >
                    {awsServices[q as keyof typeof awsServices]}
                  </div>
                }
              />
            </div>
          ))}
        </div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div className="flex w-full justify-between gap-6">
            <button
              className={`${
                currentQuestion > 0
                  ? "bg-red-400 cursor-pointer"
                  : "bg-neutral-800 cursor-not-allowed"
              } flex-1 flex justify-center py-3 rounded transition-colors duration-300 ease-out`}
              onClick={() => {
                setPrevQuestion(currentQuestion);
                setCurrentQuestion(currentQuestion - 1);
              }}
              disabled={currentQuestion === 0}
            >
              prev
            </button>
            <button
              className={`${
                currentQuestion < questions.length - 1
                  ? "bg-green-700 hover:bg-green-600 cursor-pointer"
                  : "bg-neutral-800 cursor-not-allowed"
              } flex-1 flex justify-center py-3 rounded transition-colors duration-300 ease-out`}
              onClick={() => {
                setPrevQuestion(currentQuestion);
                setCurrentQuestion(currentQuestion + 1);
              }}
              disabled={currentQuestion === questions.length - 1}
            >
              next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
