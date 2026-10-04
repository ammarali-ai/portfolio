"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1700;

/**
 * Types each role, holds, deletes, moves on. The first role is server-rendered;
 * screen readers get the full list once instead of a stream of letters.
 */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(roles[0] ?? "");

  useEffect(() => {
    if (reduceMotion || roles.length < 2) return;
    let index = 0;
    let chars = roles[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const role = roles[index];
      if (deleting) {
        chars -= 1;
        setText(role.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          index = (index + 1) % roles.length;
        }
        timer = setTimeout(tick, DELETE_MS);
      } else {
        const next = roles[index];
        chars += 1;
        setText(next.slice(0, chars));
        if (chars === next.length) {
          deleting = true;
          timer = setTimeout(tick, HOLD_MS);
        } else {
          timer = setTimeout(tick, TYPE_MS);
        }
      }
    };
    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, [reduceMotion, roles]);

  return (
    <>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[0.55ch] animate-[caret_1s_steps(1)_infinite] border-b-2 border-brand motion-reduce:hidden" />
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
    </>
  );
}
