import clsx from "clsx";
import React from "react";

interface CardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

const Card = ({ type, count = 0, label, icon }: CardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      Card
    </div>
  );
};

export default Card;
