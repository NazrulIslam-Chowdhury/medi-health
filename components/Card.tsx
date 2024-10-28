import clsx from "clsx";
import Image from "next/image";
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
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          height={32}
          width={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-dark-800">{count}</h2>
      </div>
      <p className="text-14-regular text-gray-700">{label}</p>
    </div>
  );
};

export default Card;
