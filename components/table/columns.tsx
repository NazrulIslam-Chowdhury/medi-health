"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.type";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "Patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-medium min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image}
            alt={doctor?.name}
            height={100}
            width={100}
            className="size-8"
          />
          <p className=" whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => (
      <div className="flex gap-1">
        <AppointmentModal
          type="schedule"
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
        />
        <AppointmentModal
          type="cancel"
          patientId={data.patient.$id}
          userId={data.userId}
          appointment={data}
        />
      </div>
    ),
  },
];
