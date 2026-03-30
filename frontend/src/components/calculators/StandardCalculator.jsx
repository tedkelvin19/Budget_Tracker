import { useMemo, useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";

export default function StandardCalculator() {
  const [expression, setExpression] = useState("");

  const result = useMemo(() => {
    if (!expression) return "0";
    try {
      const safe = expression.replace(/[^0-9+\-*/(). ]/g, "");
      const value = Function(`return (${safe})`)();
      return Number.isFinite(value) ? String(value) : "Error";
    } catch {
      return "Error";
    }
  }, [expression]);

  const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+", "(", ")"];

  return (
    <Card title="Standard Calculator" subtitle="Quick calculations without leaving the app">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="min-h-10 break-all text-sm text-slate-400">{expression || "0"}</div>
        <div className="mt-2 text-3xl font-extrabold text-white">{result}</div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {keys.map((key) => (
          <Button key={key} variant="secondary" className="px-0" onClick={() => setExpression((prev) => prev + key)}>
            {key}
          </Button>
        ))}
        <Button variant="danger" onClick={() => setExpression("")}>C</Button>
        <Button variant="secondary" onClick={() => setExpression((prev) => prev.slice(0, -1))}>⌫</Button>
        <Button className="col-span-2" onClick={() => setExpression(String(result === "Error" ? "" : result))}>
          Use Result
        </Button>
      </div>
    </Card>
  );
}